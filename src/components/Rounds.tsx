import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import type { Round } from "./RoundCard";

const Rounds = () => {
  const [rounds, setRounds] = useState<{ [key: string]: Round }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await fetch("/rounds.json", { cache: "no-cache" });
        if (!response.ok) throw new Error("Failed to fetch rounds");
        const data = await response.json();
        setRounds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchRounds();
  }, []);

  return (
    <section
      id="rounds"
      className="container mx-auto px-4 py-6 sm:py-6 bg-gradient-to-br from-slate-50 via-cyan-50/20 to-purple-50/20 min-h-[70vh] scroll-mt-20"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 sm:mb-16 text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-black tracking-wider text-black">
          Past Rounds
        </h2>
        <div className="flex justify-center mt-2">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-2 bg-gradient-to-r from-cyan-500 to-purple-600 w-32 sm:w-48 rounded-full"
          />
        </div>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl font-light font-mono">
          View past rounds to see challenges tackled and their editorials
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border-4 border-black rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-32 bg-gray-200 border-b-4 border-black" />
              <div className="p-8 space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="flex justify-between items-center mt-6">
                  <div className="h-10 w-32 bg-gray-300 rounded" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <p className="text-4xl font-black text-red-600 font-mono">
            ERROR 404
          </p>
          <p className="text-xl text-gray-700 mt-4">{error}</p>
        </motion.div>
      )}

      {/* Rounds Grid */}
      {!loading && !error && Object.keys(rounds).length === 0 && (
        <p className="text-center text-3xl font-mono text-gray-500 py-20">
          No active rounds yet. Stay sharp.
        </p>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {Object.entries(rounds).map(([roundId, round]) => (
          <motion.div
            key={roundId}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={`/rounds/${roundId}`}
              className="h-full bg-white border-4 border-black rounded-lg overflow-hidden 
                shadow-xl hover:shadow-2xl transition-all duration-500 
                group relative flex flex-col"
            >
              {/* Neon Glow on Hover */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur-xl transition-opacity duration-700 -z-10"
              />

              {/* Header */}
              <div className="bg-black p-6 sm:p-8 text-white border-b-4 border-black relative overflow-hidden">
                <h3 className="text-2xl sm:text-3xl font-mono font-black tracking-wider">
                  {roundId.replace("round", "ROUND ")}
                </h3>
                <p className="text-cyan-400 text-sm sm:text-base font-mono mt-2 opacity-90">
                  {round.date}
                </p>
                {/* Scanline Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent 
                  translate-y-full group-hover:translate-y-0 transition-transform duration-1000"
                />
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col">
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-light line-clamp-3">
                  {round.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  {/* Problem Count Badge */}
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="bg-black text-white px-5 py-3 rounded font-mono text-sm sm:text-base font-bold
                      shadow-lg border-2 border-black
                      relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {round.problems.length} PROBLEMS
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.span>

                  {/* Arrow */}
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-4xl font-black text-black"
                  >
                    →
                  </motion.span>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Rounds;
