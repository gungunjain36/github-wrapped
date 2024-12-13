import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// Create an axios instance with default config
const githubAPI = axios.create({
    baseURL: GITHUB_API,
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
});

async function fetchWithAuth(url) {
    const response = await githubAPI.get(url);
    return response.data;
}

async function getLanguageStats(username) {
    const repos = await fetchWithAuth(`/users/${username}/repos`);
    const languageMap = {};
    
    await Promise.all(repos.map(async (repo) => {
        try {
            const languages = await fetchWithAuth(repo.languages_url.replace(GITHUB_API, ''));
            Object.entries(languages).forEach(([lang, bytes]) => {
                languageMap[lang] = (languageMap[lang] || 0) + bytes;
            });
        } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
        }
    }));

    const total = Object.values(languageMap).reduce((a, b) => a + b, 0);
    const languageStats = Object.entries(languageMap)
        .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / total) * 100),
            color: getLanguageColor(name)
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 4);

    return languageStats;
}

async function getCommitStats(username) {
    const currentYear = new Date().getFullYear();
    const repos = await fetchWithAuth(`/users/${username}/repos`);
    let totalCommits = 0;

    await Promise.all(repos.map(async (repo) => {
        try {
            const commits = await fetchWithAuth(
                `/repos/${username}/${repo.name}/commits?since=${currentYear}-01-01`
            );
            totalCommits += commits.length;
        } catch (error) {
            console.error(`Error fetching commits for ${repo.name}:`, error);
        }
    }));

    return totalCommits;
}

async function getContributionStats(username) {
    try {
        const events = await fetchWithAuth(`/users/${username}/events/public`);
        const currentYear = new Date().getFullYear();
        
        // Initialize stats
        const stats = {
            pullRequests: 0,
            issues: 0,
            contributions: 0,
            streak: 0,
            contributionsByDay: new Array(7).fill(0),
            contributionsByHour: new Array(24).fill(0),
            totalStars: 0,
            totalForks: 0
        };

        // Process events
        events.forEach(event => {
            const eventDate = new Date(event.created_at);
            if (eventDate.getFullYear() === currentYear) {
                if (event.type === 'PullRequestEvent') stats.pullRequests++;
                if (event.type === 'IssuesEvent') stats.issues++;
                if (event.type === 'PushEvent') {
                    stats.contributions++;
                    stats.contributionsByDay[eventDate.getDay()]++;
                    stats.contributionsByHour[eventDate.getHours()]++;
                }
            }
        });

        // Get total stars and forks
        const repos = await fetchWithAuth(`/users/${username}/repos`);
        repos.forEach(repo => {
            stats.totalStars += repo.stargazers_count;
            stats.totalForks += repo.forks_count;
        });

        // Calculate streak (simplified version)
        const sortedEvents = events
            .filter(e => e.type === 'PushEvent')
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        if (sortedEvents.length > 0) {
            let currentStreak = 1;
            let currentDate = new Date(sortedEvents[0].created_at);

            for (let i = 1; i < sortedEvents.length; i++) {
                const eventDate = new Date(sortedEvents[i].created_at);
                const diffDays = Math.floor((currentDate - eventDate) / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    currentStreak++;
                    currentDate = eventDate;
                } else {
                    break;
                }
            }
            stats.streak = currentStreak;
        }

        return stats;
    } catch (error) {
        console.error('Error fetching contribution stats:', error);
        return {
            pullRequests: 0,
            issues: 0,
            contributions: 0,
            streak: 0,
            contributionsByDay: new Array(7).fill(0),
            contributionsByHour: new Array(24).fill(0),
            totalStars: 0,
            totalForks: 0
        };
    }
}

async function getTopRepositories(username) {
    const repos = await fetchWithAuth(`/users/${username}/repos?sort=stars&direction=desc`);
    return repos.slice(0, 3).map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count
    }));
}

async function getActivityPattern(username) {
    const events = await fetchWithAuth(`/users/${username}/events/public`);
    const activityHours = new Array(24).fill(0);
    const activityDays = new Array(7).fill(0);

    events.forEach(event => {
        const date = new Date(event.created_at);
        activityHours[date.getHours()]++;
        activityDays[date.getDay()]++;
    });

    const mostActiveHour = activityHours.indexOf(Math.max(...activityHours));
    const mostActiveDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        activityDays.indexOf(Math.max(...activityDays))
    ];

    return {
        mostActiveTime: `${mostActiveHour}:00`,
        mostProductiveDay: mostActiveDay
    };
}

async function getPrivateContributions(username) {
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    totalCommitContributions
                    restrictedContributionsCount
                    totalRepositoryContributions
                    totalPullRequestContributions
                    totalIssueContributions
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                    commitContributionsByRepository {
                        repository {
                            name
                            isPrivate
                            primaryLanguage {
                                name
                                color
                            }
                        }
                        contributions {
                            totalCount
                        }
                    }
                }
                repositories(first: 100, privacy: PRIVATE, orderBy: {field: UPDATED_AT, direction: DESC}) {
                    totalCount
                    nodes {
                        name
                        stargazerCount
                        forkCount
                        primaryLanguage {
                            name
                            color
                        }
                        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                            edges {
                                size
                                node {
                                    name
                                    color
                                }
                            }
                        }
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    history {
                                        totalCount
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables: { username } }),
        });

        const data = await response.json();
        return data.data.user;
    } catch (error) {
        console.error('Error fetching private contributions:', error);
        return null;
    }
}

export default async function fetchUserInfo(username) {
    try {
        const [userData, privateData] = await Promise.all([
            fetchWithAuth(`/users/${username}`),
            getPrivateContributions(username)
        ]);

        // Calculate contribution stats
        const contributionCollection = privateData?.contributionsCollection || {};
        const privateRepos = privateData?.repositories || { totalCount: 0, nodes: [] };
        
        // Calculate private languages distribution
        const privateLangMap = {};
        privateRepos.nodes.forEach(repo => {
            repo.languages?.edges.forEach(edge => {
                const lang = edge.node.name;
                privateLangMap[lang] = (privateLangMap[lang] || 0) + edge.size;
            });
        });

        const privateLanguages = Object.entries(privateLangMap)
            .map(([name, size]) => ({
                name,
                percentage: Math.round((size / Object.values(privateLangMap).reduce((a, b) => a + b, 0)) * 100),
                color: LANGUAGE_COLORS[name] || '#858585'
            }))
            .sort((a, b) => b.percentage - a.percentage);

        const totalPrivateStars = privateRepos.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0);
        const totalPrivateForks = privateRepos.nodes.reduce((acc, repo) => acc + repo.forkCount, 0);
        
        // Get contribution streak
        const weeks = contributionCollection.contributionCalendar?.weeks || [];
        const contributionDays = weeks.flatMap(week => week.contributionDays);
        const sortedDays = contributionDays.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let currentStreak = 0;
        for (const day of sortedDays) {
            if (day.contributionCount > 0) {
                currentStreak++;
            } else {
                break;
            }
        }

        // Get repository-specific commit counts
        const repoContributions = contributionCollection.commitContributionsByRepository || [];
        const privateCommits = repoContributions
            .filter(contrib => contrib.repository.isPrivate)
            .reduce((acc, contrib) => acc + contrib.contributions.totalCount, 0);

        const publicCommits = repoContributions
            .filter(contrib => !contrib.repository.isPrivate)
            .reduce((acc, contrib) => acc + contrib.contributions.totalCount, 0);

        // Fetch the rest of the stats
        const [languageStats, contributionStats, topRepos, activityPattern] = 
            await Promise.all([
                getLanguageStats(username),
                getContributionStats(username),
                getTopRepositories(username),
                getActivityPattern(username)
            ]);

        return {
            ...userData,
            stats: {
                publicCommits,
                privateCommits,
                totalCommits: contributionCollection.totalCommitContributions || 0,
                pullRequests: contributionCollection.totalPullRequestContributions || 0,
                issues: contributionCollection.totalIssueContributions || 0,
                totalContributions: contributionCollection.contributionCalendar?.totalContributions || 0,
                privateContributions: contributionCollection.restrictedContributionsCount || 0,
                privateRepos: privateRepos.totalCount,
                privateLanguages,
                streak: currentStreak,
                totalStars: (contributionStats.totalStars || 0) + totalPrivateStars,
                totalForks: (contributionStats.totalForks || 0) + totalPrivateForks,
                topLanguages: languageStats,
                ...activityPattern,
                topRepos,
                privateStats: {
                    totalRepos: privateRepos.totalCount,
                    languages: privateLanguages,
                    totalCommits: privateCommits,
                    stars: totalPrivateStars,
                    forks: totalPrivateForks
                }
            }
        };
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        throw error;
    }
}

// Language color mapping
const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
};

function getLanguageColor(language) {
    return LANGUAGE_COLORS[language] || '#858585';
}
