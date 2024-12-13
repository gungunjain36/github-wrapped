import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function GitHubCard() {
  const location = useLocation();
  const { userData } = location.state || {}; 

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 overflow-hidden">
        <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-blue-600 opacity-20 rounded-full filter blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-20 rounded-full filter blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        ></motion.div>
      </motion.div>
      <div className="w-96  p-6 rounded-xl shadow-2xl transform transition-transform hover:scale-105 hover:shadow-2xl">
        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            className="w-16 h-16 rounded-full border-4 border-indigo-500 transform transition-transform hover:scale-110"
            src={userData?.avatar_url}
            alt="Profile Picture"
          />
          <div>
            <h2 className="text-2xl font-semibold text-purple-300">{userData?.name}</h2>
            <p className="text-sm text-gray-300">{userData?.bio}</p>
          </div>
        </div>

        {/* GitHub Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-cyan-200">Location:</span>
            <span className="text-gray-100">{userData?.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-cyan-200">Followers:</span>
            <span className="text-gray-100">{userData?.followers}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-cyan-200">Following:</span>
            <span className="text-gray-100">{userData?.following}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-cyan-200">Public Repos:</span>
            <span className="text-gray-100">{userData?.public_repos}</span>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <a
            href={userData?.blog}
            className="ml-2 text-red-200 hover:text-indigo-800 font-semibold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Personal Blog
          </a>
          <a
            href={userData?.html_url}
            className="m-2 text-red-200 hover:text-indigo-800 font-semibold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profile
          </a>
          <a
            href={`https://twitter.com/${userData?.twitter_username}`}
            className="text-red-200 hover:text-indigo-800 font-semibold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter Profile
          </a>
        </div>
      </div>
    </div>
  );
}
