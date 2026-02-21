import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const [, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-18 justify-center overflow-hidden bg-black"
    >
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-40"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Epic Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-7xl md:text-3xl lg:text-7xl font-black tracking-tighter">
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  "CODE 212",
                  2500,
                  "Code & Compete",
                  2000,
                  "CGI CLUB",
                  2000,
                ]}
                speed={20}
                deletionSpeed={30}
                repeat={Infinity}
              />
            </span>
            <span className="text-cyan-400 animate-pulse ml-2">{"</>"}</span>
          </h1>
        </motion.div>

        {/* Clean Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-6 text-xl md:text-2xl font-mono text-cyan-300 tracking-widest"
        >
          Code 212 Learning Center x CGI Club ENSA Marrakech
        </motion.p>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            Coding League is a bi-weekly competitive programming contest divided
            into rounds that helps students at Cadi Ayyad University improve
            their problem-solving and coding skills.
          </p>
          <br className="hidden md:block" />
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            This is where{" "}
            <span className="text-cyan-400 font-bold">progress</span> happens,
            round after round.
          </p>
        </motion.div>

        {/* Killer CTA Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
          className="mt-10 relative inline-block"
        >
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSdXbK_rxjbQNu70Ds89tWuiHBr8ZsN02yJJDHBiAUp0jaUI9w/viewform?usp=dialog",
                "_blank"
              )
            }
            className="relative px-6 py-3 text-2xl md:text-3xl font-black font-mono tracking-widest
            bg-white text-black rounded-full overflow-hidden group
            shadow-2xl shadow-cyan-500/50 transition-all duration-500
            hover:shadow-cyan-400 hover:shadow-2xl cursor-pointer"
          >
            <span className="relative z-10">Register Now</span>

            {/* Pulse Ring */}
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75"></span>

            {/* Shockwave Effect */}
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
              initial={{ scale: 1, opacity: 0.6 }}
              whileHover={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
