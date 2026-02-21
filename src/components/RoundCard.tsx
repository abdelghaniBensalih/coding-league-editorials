import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export type Problem = {
  id: string;
  title: string;
  file: string;
};

export type Round = {
  description: string;
  date: string;
  problems: Problem[];
};

const RoundPage = () => {
  const { roundId } = useParams<{ roundId: string }>();
  const navigate = useNavigate();
  const [round, setRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await fetch("/rounds.json");
        if (!response.ok) throw new Error("Failed to fetch rounds");
        const data = await response.json();
        if (!data[roundId!]) throw new Error("Round not found");
        setRound(data[roundId!]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchRound();
  }, [roundId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-8 border-black border-t-cyan-500 rounded-full"
        />
        <p className="ml-6 text-2xl font-mono font-bold text-black">
          LOADING ROUND...
        </p>
      </div>
    );
  }

  // Error State
  if (error || !round) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-9xl font-black text-red-600 mb-8"
        >
          !
        </motion.div>
        <h1 className="text-5xl font-mono font-black text-black mb-4">
          ROUND NOT FOUND
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-md text-center">
          {error || "This round doesn't exist."}
        </p>
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const element = document.querySelector("#rounds");
              if (element) {
                const header = document.querySelector("header");
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                  top: (element as HTMLElement).offsetTop - headerHeight - 20,
                  behavior: "smooth",
                });
              }
            }, 100);
          }}
          className="bg-black text-white px-8 py-4 font-mono font-bold text-lg hover:bg-gray-900 transition-all hover:scale-105 cursor-pointer"
        >
          ← BACK TO ROUNDS
        </button>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 mt-10 py-12 sm:py-20 grow">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const element = document.querySelector("#rounds");
              if (element) {
                const header = document.querySelector("header");
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                  top: (element as HTMLElement).offsetTop - headerHeight - 20,
                  behavior: "smooth",
                });
              }
            }, 100);
          }}
          className="inline-block mb-12 bg-black text-white px-6 py-3 font-mono font-bold text-sm sm:text-base
              hover:bg-cyan-600 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300
              border-4 border-black cursor-pointer"
        >
          ← BACK TO ROUNDS
        </button>
      </motion.div>

      {/* Round Header - Epic */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-black text-white p-6 sm:p-5 mb-8 border-8 border-black overflow-hidden"
      >
        {/* Glitch Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-black">
          <div className="h-full w-full bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent animate-pulse" />
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-1xl md:text-2xl font-black font-mono tracking-wider mb-2">
            {roundId?.replace("round", "ROUND ")}
          </h1>
          <p className="text-cyan-400 font-mono mb-6 tracking-wider">
            {round.date}
          </p>
          <p className=" text-gray-200 leading-relaxed max-w-5xl font-light">
            {round.description}
          </p>
        </div>
      </motion.div>

      {/* Problems Section */}
      <div>
        {/* Problems Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 flex items-center gap-6 flex-wrap"
        >
          <div
            className="bg-black text-white px-5 py-2 text-2xl sm:text-2xl font-black font-mono border-4 border-black
              shadow-2xl shadow-cyan-500/40"
          >
            {round.problems.length}
          </div>
          <h2 className="text-4xl sm:text-2xl font-black font-mono tracking-wider">
            PROBLEMS
          </h2>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {round.problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={`/rounds/${roundId}/problem/${problem.id}`}
                className="block bg-white border-4 border-black p-8 hover:shadow-2xl 
                    transition-all duration-500 group relative overflow-hidden h-full"
              >
                {/* Neon Hover Glow */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur-xl 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                />

                {/* Problem Number */}
                <div
                  className="bg-black text-white w-10 h-10 flex items-center justify-center 
                    text-2xl font-black font-mono mb-6 border-4 border-black"
                >
                  {index + 1}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black font-mono mb-6 leading-tight line-clamp-2 group-hover:text-cyan-600 transition-colors">
                  {problem.title}
                </h3>

                {/* CTA */}
                <div className="flex items-center gap-3 text-black font-black font-mono text-lg">
                  <span>VIEW PROBLEM</span>
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl"
                  >
                    →
                  </motion.span>
                </div>

                {/* Scanline Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent 
                    translate-y-full group-hover:translate-y-0 transition-transform duration-1000 pointer-events-none"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RoundPage;
