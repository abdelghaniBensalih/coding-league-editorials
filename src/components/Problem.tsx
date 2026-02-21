import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Header from "./Header";

import type { Round, Problem as ProblemType } from "./RoundCard";

const Problem = () => {
  const { roundId, problemId } = useParams<{
    roundId: string;
    problemId: string;
  }>();

  const [problem, setProblem] = useState<ProblemType | null>(null);
  const [content, setContent] = useState<string>("");
  const [round, setRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roundsResponse = await fetch("/rounds.json");
        if (!roundsResponse.ok) throw new Error("Failed to fetch rounds");
        const roundsData = await roundsResponse.json();

        if (!roundsData[roundId!]) throw new Error("Round not found");
        const currentRound = roundsData[roundId!];
        setRound(currentRound);

        const foundProblem = currentRound.problems.find(
          (p: ProblemType) => p.id === problemId
        );
        if (!foundProblem) throw new Error("Problem not found");
        setProblem(foundProblem);

        const contentResponse = await fetch(`/${foundProblem.file}`);
        if (!contentResponse.ok) throw new Error("Failed to load problem");
        const markdownContent = await contentResponse.text();
        setContent(markdownContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roundId, problemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ------------------------------ LOADING ------------------------------ */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-8 border-black border-t-cyan-500 rounded-full"
        />
        <p className="text-3xl font-black font-mono text-black">
          LOADING PROBLEM...
        </p>
      </div>
    );
  }

  /* ------------------------------- ERROR ------------------------------- */
  if (error || !problem || !round) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        <section className="flex-1 flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl font-black text-red-600 mb-8">!</div>

            <h1 className="text-5xl font-black font-mono mb-4">
              ACCESS DENIED
            </h1>

            <p className="text-xl text-gray-700 mb-10">
              {error || "Problem not found"}
            </p>

            <Link
              to="/"
              className="inline-block bg-black text-white px-8 py-4 text-xl font-black font-mono 
              border-4 border-black hover:bg-cyan-600 transition-all"
            >
              ← BACK TO ROUNDS
            </Link>
          </motion.div>
        </section>
      </div>
    );
  }

  /* ----------------------------- MAIN VIEW ----------------------------- */
  return (
    <section className="container mx-auto px-0 mt-8 py-1 grow">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Link
          to={`/rounds/${roundId}`}
          className="inline-block bg-black text-white px-6 mt-17 py-3 font-black font-mono text-lg
            border-4 border-black hover:bg-cyan-600 transition-all"
        >
          ← BACK TO ROUND
        </Link>
      </motion.div>

      {/* Problem Card */}
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-white border-12 border-black shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-black text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-600/30 via-purple-600/20 to-transparent" />

          <div className="relative z-10">
            <p className="text-cyan-400 font-mono text-sm mb-2 tracking-wider">
              {roundId?.replace("round", "ROUND ")} • PROBLEM{" "}
              {problemId?.toUpperCase()}
            </p>

            <h1 className="text-3xl md:text-4xl font-black font-mono">
              {problem.title}
            </h1>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="p-6 md:p-8 prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-black  mb-6 border-b-4 border-black pb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-black mt-10 mb-4 flex items-center gap-3">
                  <span className="text-cyan-500 text-3xl">→</span>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="my-6 space-y-2 text-gray-700">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-6 space-y-2 list-decimal pl-6 text-gray-700">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-2">•</span>
                  <span>{children}</span>
                </li>
              ),
              code: ({ children }) => (
                <code className="bg-black text-cyan-400 px-2 py-1 rounded font-mono text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-black text-gray-300 p-2 rounded-lg overflow-x-auto my-3 border-4 border-gray-800 text-sm leading-relaxed">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyan-500 pl-6 py-4 my-4 italic text-gray-600 bg-gray-50">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full border-4 border-black bg-gray-50">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border-2 border-black px-4 py-3 text-left font-bold bg-black text-white">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-2 border-black px-4 py-3">{children}</td>
              ),
              a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.article>
    </section>
  );
};

export default Problem;
