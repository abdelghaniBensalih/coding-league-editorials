import React from "react";
import { motion } from "framer-motion";
import Leaderboard from "../components/Leaderboard";

const LeaderboardPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main
      id="leaderboard"
      className="min-h-screen bg-gradient-to-b from-black/50 via-black to-black/50 pt-32 pb-20"
    >
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="inline-block">
            <span className="text-cyan-400 text-sm md:text-base font-mono uppercase tracking-widest">
              🏆 Competitive Rankings
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 tracking-tight"
        >
          Leaderboard
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex gap-2 mb-8 flex-wrap"
        >
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
          <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-transparent rounded-full opacity-60" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-lg md:text-xl mb-4 max-w-2xl"
        >
          Track the top performers in our competitive programming league. Rankings
          are updated from our Codeforces competition data.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-sm mb-12 flex items-center gap-2"
        >
          <span className="text-cyan-400">→</span> Click any handle to view the
          Codeforces profile
        </motion.p>

        {/* Leaderboard Table */}
        <motion.div variants={itemVariants}>
          <Leaderboard />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="mt-12 space-y-4"
        >
          <div className="p-6 rounded-lg bg-black/40 border border-cyan-900/30">
            <p className="text-gray-400 text-sm">
              <span className="text-cyan-400 font-semibold">💡 Scoring:</span> Rankings
              are calculated based on scores from our competitive programming challenges.
              Achieve top scores to climb the leaderboard!
            </p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-700/50">
            <p className="text-gray-300 text-sm">
              <span className="text-purple-300 font-semibold">🎯 Onsite Bonus:</span> Competitors
              who participate <span className="text-purple-300 font-semibold">onsite</span> receive a bonus multiplier on their score:
              <span className="block mt-2 text-purple-200 font-mono">
                Onsite Points = (Problems Solved × 1.20) + 1
              </span>
              <span className="block text-gray-400 mt-2 text-xs">
                We encourage onsite participation to foster community engagement and create a balanced competitive environment.
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default LeaderboardPage;
