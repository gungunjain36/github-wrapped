/* eslint-disable no-unused-vars */
'use client';

import { useState } from 'react';
import { Github, ArrowRight, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import fetchUserInfo from '../utils/fetchUser';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import AbstractBackground from './AbstractBackground';

export default function GithubUsernameInput() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError('Please enter a valid username');
            return;
        }

        setLoading(true);
        try {
            const userData = await fetchUserInfo(username);
            setLoading(false);
            navigate('/github-card', { state: { userData } });
        } catch (err) {
            setLoading(false);
            setError('Failed to fetch user data. Please try again.');
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0d1117] overflow-hidden">
            <AbstractBackground />
            
            {loading ? (
                <Loader />
            ) : (
                <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
                    <motion.div
                        className="w-full max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Arc-style Card */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl text-white mb-2">YOUR GITHUB WRAPPED CARD</h1>
                                <div className="w-full aspect-[1.6] rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30 backdrop-blur-xl mb-6">
                                    {/* Preview area */}
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Github className="w-16 h-16 text-white/50" />
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    It's time to discover your GitHub journey and share your achievements
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your GitHub username"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-all"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </form>

                            <div className="mt-6 flex justify-center space-x-4">
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                        <Share2 className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                </button>
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <Download className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
// 