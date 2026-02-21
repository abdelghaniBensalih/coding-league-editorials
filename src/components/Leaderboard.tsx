import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

type Entry = {
  handle: string;
  score: number;
};

const getMedalIcon = (rank: number): string => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "";
};

const getRankColor = (rank: number): string => {
  if (rank === 1) return "from-yellow-600/40 to-yellow-900/20";
  if (rank === 2) return "from-gray-400/30 to-gray-700/20";
  if (rank === 3) return "from-orange-600/30 to-orange-800/20";
  return "";
};

const ITEMS_PER_PAGE = 10;

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<Entry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await fetch("/leaderboard.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Entry[];
        const sorted = json.slice().sort((a, b) => b.score - a.score);
        if (!cancelled) setData(sorted);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Failed to load leaderboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;
    return data.filter((entry) =>
      entry.handle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-3 border-cyan-400/30 border-t-cyan-400 rounded-full"
        />
        <span className="ml-4 text-gray-300">Loading leaderboard…</span>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-red-950/40 rounded-lg border border-red-600/50"
      >
        <p className="text-red-400 font-medium">⚠️ Error loading leaderboard</p>
        <p className="text-red-300 text-sm mt-1">{error}</p>
      </motion.div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No leaderboard data available.
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search by handle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 md:px-6 py-3 rounded-lg bg-black/40 border border-cyan-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-400 mt-2">
            Found {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}
          </p>
        )}
      </motion.div>

      {/* No Results */}
      {searchQuery && filteredData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-400"
        >
          No users found matching "{searchQuery}"
        </motion.div>
      )}

      {/* Table */}
      {filteredData.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl shadow-2xl shadow-cyan-500/10 border border-cyan-900/50">
            <table className="min-w-full bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-md">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-b border-cyan-800/50">
                  <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                    Handle
                  </th>
                  <th className="px-4 md:px-6 py-4 text-right text-xs md:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => {
                  const actualRank =
                    data.findIndex((e) => e.handle === row.handle) + 1;
                  const isTopThree = actualRank <= 3;
                  const gradientBg = getRankColor(actualRank);

                  return (
                    <motion.tr
                      key={row.handle}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      className={`border-t border-cyan-900/20 transition-all duration-300 hover:bg-white/5 ${
                        isTopThree
                          ? `bg-gradient-to-r ${gradientBg} shadow-lg`
                          : "hover:bg-cyan-900/10"
                      }`}
                    >
                      <td
                        className={`px-4 md:px-6 py-4 font-mono font-bold ${
                          isTopThree
                            ? "text-lg text-yellow-300"
                            : "text-cyan-400"
                        }`}
                      >
                        <span className="mr-2">{getMedalIcon(actualRank)}</span>
                        <span className="text-gray-100">{actualRank}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <a
                          className="font-semibold text-cyan-200 hover:text-cyan-100 transition-colors duration-200 inline-flex items-center gap-1 group"
                          href={`https://codeforces.com/profile/${encodeURIComponent(
                            row.handle
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {row.handle}
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            ↗
                          </span>
                        </a>
                      </td>
                      <td
                        className={`px-4 md:px-6 py-4 text-right font-mono font-bold ${
                          isTopThree
                            ? "text-lg text-yellow-300"
                            : "text-gray-200"
                        }`}
                      >
                        {row.score}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center gap-2 flex-wrap"
            >
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-cyan-900/30 text-cyan-300 border border-cyan-700/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-800/50 transition-all duration-200"
              >
                ← Prev
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                        currentPage === page
                          ? "bg-cyan-500 text-black font-bold"
                          : "bg-cyan-900/30 text-cyan-300 border border-cyan-700/50 hover:bg-cyan-800/50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-cyan-900/30 text-cyan-300 border border-cyan-700/50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-800/50 transition-all duration-200"
              >
                Next →
              </button>
            </motion.div>
          )}

          {/* Results Info */}
          <div className="text-center text-sm text-gray-400">
            Showing {startIdx + 1} to{" "}
            {Math.min(startIdx + ITEMS_PER_PAGE, filteredData.length)} of{" "}
            {filteredData.length} results
            {searchQuery && ` (filtered from ${data.length} total)`}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
