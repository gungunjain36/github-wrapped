/* eslint-disable no-unused-vars */
'use client';

import { useState } from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import fetchUserInfo from '../utils/fetchUser';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';



export default function GithubUsernameInput() {
        const [username, setUsername] = useState('');
        const [, setError] = useState('');
        const [loading, setLoading] = useState(false); // New state for loading
        const navigate = useNavigate(); // For navigation

        const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            // eslint-disable-next-line no-undef
            setError('Please enter a valid username');
            return;
        }

        setLoading(true); // Start loading
        try {
            const userData = await fetchUserInfo(username);
            setLoading(false)
            navigate('/github-card', { state: { userData } });
        } catch (err) {
            setLoading(false); // Stop loading
            setError('Failed to fetch user data. Please try again.');
        }
    };

  return (
    
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 overflow-hidden">
        {loading ? (
            setInterval(()=>{
                <Loader /> 
            },10000)
        // Show loader while fetching data
      ) : (
      <div> 
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

      <motion.div
        className="z-10 w-full max-w-md p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="flex items-center space-x-2 text-2xl font-bold text-gray-700"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Github className="w-8 h-8 text-blue-600" />
            <h2>GitHub Username</h2>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your GitHub username"
              className="w-full px-4 py-3 text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              @github.com
            </span>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Generate Card</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>

          <motion.button
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Wrapped</span>
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>

        </form>
      </motion.div>
      </div>)}
    </div>
  );
}
// 