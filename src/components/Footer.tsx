import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/cgi.ensa_m/",
      label: "Instagram",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/company/club-informatique-ensa-marrakech",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-hidden">
      {/* Subtle animated background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-900 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-900 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Branding - Left */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left group">
            <h3
              className="text-3xl font-bold font-mono tracking-widest bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent 
    transform transition-all duration-500 group-hover:scale-110"
            >
              CODE 212
            </h3>

            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              a digital innovation space at Cadi Ayyad University that helps
              students build practical skills in programming. It provides a collaborative workspace, machine access, and
              supports student projects through workshops and mentoring.
            </p>

            <div
              className="mt-6 h-1 w-20 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full 
    transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
            ></div>
          </div>

          {/* CGI Club - Center */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <h3 className="text-xl font-mono font-bold tracking-wider text-gray-300">
                CGI CLUB
              </h3>
              <p className="mt-3 text-gray-500 text-sm">
                Club Génie Informatique
                <br />
                <span className="text-cyan-400">ENSA Marrakech</span>
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-xs text-gray-600 font-mono">
                Powered by
              </span>
              <div className="h-px w-16 bg-linear-to-r from-transparent via-gray-600 to-transparent"></div>
              <span className="text-xs text-gray-600 font-mono">
                Passion & Code
              </span>
            </div>
          </div>

          {/* Social Links - Right */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xl font-mono font-bold tracking-widest mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CONNECT
            </h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`group relative p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 
                      hover:border-cyan-500/50 hover:bg-cyan-500/10 transform hover:scale-110 
                      transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/20`}
                  >
                    <Icon
                      className={`text-2xl transition-all duration-500 group-hover:scale-125 
                        ${
                          social.icon ||
                          "text-gray-400 group-hover:text-cyan-400"
                        }`}
                    />
                    <span
                      className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                      text-xs font-mono bg-black/90 px-3 py-1 rounded-lg whitespace-nowrap 
                      transition-all duration-300"
                    >
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider with animation */}
        <div
          className="relative my-5 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent 
          before:absolute before:inset-0 before:bg-linear-to-r before:from-cyan-500 before:via-purple-500 before:to-pink-500 
          before:h-px before:animate-pulse before:blur-xl"
        ></div>

        {/* Bottom Text */}
        <div className="text-center space-y-1">
          <p className="text-sm font-mono text-gray-400 tracking-wider">
            © 2025 <span className="text-cyan-400">CODE212</span> ×{" "}
            <span className="text-purple-400">CGI CLUB</span> ENSA MARRAKECH
          </p>
          <p className="text-xs text-gray-500 font-light">
            Empowering the next generation of algorithmic thinkers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
