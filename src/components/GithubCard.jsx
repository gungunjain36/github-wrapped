import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Download, MapPin, Link, Twitter } from 'lucide-react';
import { useRef } from 'react';
import { shareCard } from '../utils/cardExport';
import AbstractShape from './AbstractShape';

export default function GitHubCard() {
  const location = useLocation();
  const { userData } = location.state || {};
  const cardRef = useRef(null);

  const handleShare = async () => {
    await shareCard(cardRef.current, userData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-gray-900">YOUR GITHUB MEMBERSHIP CARD</h1>
          <p className="text-gray-600 text-sm mt-2">Show it off to the world or keep it for yourself.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Card Preview */}
          <motion.div
            ref={cardRef}
            className="w-full lg:w-[400px] bg-[#FFFDF8] rounded-3xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Abstract Shape Area */}
            <div className="w-full aspect-square mb-6 rounded-2xl overflow-hidden">
              <AbstractShape />
            </div>

            {/* Enhanced User Info */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">{userData?.name}</h2>
              <p className="font-mono text-sm text-gray-600 whitespace-pre-wrap">
                {userData?.bio || 'GitHub Explorer'}
              </p>
              
              {/* Additional Profile Info */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {userData?.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {userData.location}
                  </span>
                )}
                {userData?.blog && (
                  <a 
                    href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-500"
                  >
                    <Link className="w-3 h-3" />
                    Website
                  </a>
                )}
                {userData?.twitter_username && (
                  <a 
                    href={`https://twitter.com/${userData.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-500"
                  >
                    <Twitter className="w-3 h-3" />
                    @{userData.twitter_username}
                  </a>
                )}
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="mt-4 flex flex-wrap gap-2">
              {userData?.public_repos > 0 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {userData.public_repos} repos
                </span>
              )}
              {userData?.followers > 0 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {userData.followers} followers
                </span>
              )}
              {userData?.following > 0 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {userData.following} following
                </span>
              )}
              {userData?.stats?.totalStars > 0 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {userData.stats.totalStars} stars
                </span>
              )}
            </div>

            {/* Additional GitHub Info */}
            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Member since</span>
                <span>{formatDate(userData?.created_at)}</span>
              </div>
              {userData?.company && (
                <div className="flex justify-between">
                  <span>Company</span>
                  <span>{userData.company}</span>
                </div>
              )}
              {(userData?.stats?.publicCommits > 0 || userData?.stats?.privateCommits > 0) && (
                <div className="flex justify-between">
                  <span>Total Commits</span>
                  <span>
                    {userData.stats.publicCommits + userData.stats.privateCommits} 
                    {userData.stats.privateCommits > 0 && 
                      ` (${userData.stats.privateCommits} private)`}
                  </span>
                </div>
              )}
              {userData?.stats?.totalContributions > 0 && (
                <div className="flex justify-between">
                  <span>Total Contributions</span>
                  <span>
                    {userData.stats.totalContributions}
                    {userData.stats.privateContributions > 0 && 
                      ` (${userData.stats.privateContributions} private)`}
                  </span>
                </div>
              )}
              {userData?.stats?.streak > 0 && (
                <div className="flex justify-between">
                  <span>Current Streak</span>
                  <span>{userData.stats.streak} days</span>
                </div>
              )}
              {userData?.stats?.privateStats && (
                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  {userData.stats.privateStats.totalRepos > 0 && (
                    <div className="flex justify-between">
                      <span>Private Repositories</span>
                      <span>{userData.stats.privateStats.totalRepos}</span>
                    </div>
                  )}

                  {userData.stats.privateStats.totalCommits > 0 && (
                    <div className="flex justify-between">
                      <span>Private Commits</span>
                      <span>{userData.stats.privateStats.totalCommits}</span>
                    </div>
                  )}
                </div>
              )}
              {userData?.stats?.privateStats?.stars > 0 && (
                <div className="flex justify-between">
                  <span>Private Repository Stars</span>
                  <span>{userData.stats.privateStats.stars}</span>
                </div>
              )}
              {userData?.stats?.privateStats?.forks > 0 && (
                <div className="flex justify-between">
                  <span>Private Repository Forks</span>
                  <span>{userData.stats.privateStats.forks}</span>
                </div>
              )}
              {userData?.stats?.privateLanguages?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">Private Repository Languages</h4>
                  <div className="space-y-2">
                    {userData.stats.privateLanguages.slice(0, 3).map((lang) => (
                      <div key={lang.name} className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-xs text-gray-600">{lang.name} ({lang.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono">GITHUB</span>
                <span className="text-xs">|</span>
                <span className="text-xs">{new Date().toLocaleDateString()}</span>
              </div>
              <span className="text-xs font-mono text-gray-500">@{userData?.login}</span>
            </div>
          </motion.div>

          {/* Stats Section */}
          <div className="flex-1 bg-white rounded-3xl p-8 shadow-lg max-w-xl">
            <h2 className="text-xl font-bold mb-6">2024 GitHub Stats</h2>

            {/* Language Distribution */}
            {userData?.stats?.topLanguages?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">Top Languages</h3>
                <div className="space-y-3">
                  {userData.stats.topLanguages.map((lang) => (
                    <div key={lang.name} className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{lang.name}</span>
                        <span className="text-gray-500">{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
