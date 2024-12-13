import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { shareCard } from '../utils/cardExport';

export default function GithubWrapped() {
    const location = useLocation();
    const { userData } = location.state || {};
    const cardRef = useRef(null);

    const stats = userData?.stats || {
        commits: 0,
        pullRequests: 0,
        issues: 0,
        contributions: 0,
        streak: 0,
        topLanguages: [],
        mostActiveTime: 'N/A',
        mostProductiveDay: 'N/A',
        topRepos: []
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-white p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Your 2024 GitHub Wrapped
                </h1>
                <p className="text-gray-400">Let's explore your coding journey</p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={cardRef}
                    className="arc-card bg-white/10 backdrop-blur-xl p-8 rounded-3xl mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex items-center space-x-6">
                        <img
                            src={userData?.avatar_url}
                            alt={userData?.name}
                            className="w-24 h-24 rounded-2xl"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{userData?.name}</h2>
                            <p className="text-gray-400">@{userData?.login}</p>
                            <div className="mt-2 flex space-x-4">
                                <span className="text-sm bg-white/5 px-3 py-1 rounded-full">
                                    {stats.commits} commits
                                </span>
                                <span className="text-sm bg-white/5 px-3 py-1 rounded-full">
                                    {stats.pullRequests} PRs
                                </span>
                                <span className="text-sm bg-white/5 px-3 py-1 rounded-full">
                                    {stats.issues} issues
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Top Languages</h3>
                        <div className="space-y-3">
                            {stats.topLanguages.map((lang) => (
                                <div key={lang.name} className="relative">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{lang.name}</span>
                                        <span>{lang.percentage}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full"
                                            style={{ backgroundColor: lang.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${lang.percentage}%` }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4">
                            <h4 className="text-sm text-gray-400 mb-2">Most Active Time</h4>
                            <p className="text-xl font-semibold">{stats.mostActiveTime}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4">
                            <h4 className="text-sm text-gray-400 mb-2">Contribution Streak</h4>
                            <p className="text-xl font-semibold">{stats.streak} days</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-sm text-gray-400">GitHub Wrapped 2024</span>
                        <img src="/github-mark.png" alt="GitHub" className="h-6 opacity-50" />
                    </div>
                </motion.div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => shareCard(cardRef.current, userData)}
                        className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Share on Twitter
                    </button>
                    <button
                        onClick={() => {/* handle download */}}
                        className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                    >
                        Download Card
                    </button>
                </div>
            </div>
        </div>
    );
}