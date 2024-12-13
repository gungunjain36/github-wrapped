// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GitCommit, GitFork, Star } from "lucide-react";

const GitHubWrappedCard = () => {
  // Mock data - replace with actual data in a real application
  const userData = {
    username: "octocat",
    totalContributions: 3642,
    longestStreak: 23,
    topLanguages: [
      { name: "JavaScript", percentage: 40 },
      { name: "TypeScript", percentage: 30 },
      { name: "Python", percentage: 20 },
      { name: "Other", percentage: 10 },
    ],
    totalRepositories: 56,
    totalStars: 1337,
    totalForks: 420,
  };

  return (
    <Card className="w-full max-w-md bg-[#0d1117] text-white">
      <CardHeader className="border-b border-[#30363d]">
        <CardTitle className="text-xl font-bold">GitHub Wrapped 2023</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{userData.username}</h2>
          <p className="text-[#8b949e]">Year in Review</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Contributions</h3>
            <p className="text-4xl font-bold text-green-500">{userData.totalContributions}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Longest Streak</h3>
            <p className="text-4xl font-bold text-yellow-500">{userData.longestStreak} days</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Top Languages</h3>
            <div className="space-y-2">
              {userData.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center">
                  <span className="w-24 text-sm">{lang.name}</span>
                  <Progress value={lang.percentage} className="flex-grow h-2" />
                  <span className="ml-2 text-sm">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-center">
            <div>
              <GitCommit className="mx-auto mb-2" />
              <p className="text-sm text-[#8b949e]">Repositories</p>
              <p className="font-bold">{userData.totalRepositories}</p>
            </div>
            <div>
              <Star className="mx-auto mb-2" />
              <p className="text-sm text-[#8b949e]">Total Stars</p>
              <p className="font-bold">{userData.totalStars}</p>
            </div>
            <div>
              <GitFork className="mx-auto mb-2" />
              <p className="text-sm text-[#8b949e]">Total Forks</p>
              <p className="font-bold">{userData.totalForks}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubWrappedCard;
