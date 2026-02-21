import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CODE212_LOGO = "/code212.svg";
const CGI_LOGO = "/logo-cgi.png";

interface NavItem {
  to: string;
  label: string;
  scrollTo?: string;
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/leaderboard") {
      setActiveSection("leaderboard");
      return;
    }

    if (location.pathname !== "/") {
      return;
    }

    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const heroElement = document.querySelector("#hero");
    const roundsElement = document.querySelector("#rounds");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === roundsElement) {
            setActiveSection("contests");
          } else if (entry.target === heroElement) {
            setActiveSection("home");
          }
        }
      });
    }, options);

    if (heroElement) observer.observe(heroElement);
    if (roundsElement) observer.observe(roundsElement);

    return () => observer.disconnect();
  }, [location.pathname]);

  const navItems: NavItem[] = [
    { to: "/", label: "HOME", scrollTo: "#hero" },
    { to: "/", label: "CONTESTS", scrollTo: "#rounds" },
    { to: "/leaderboard", label: "LEADERBOARD" },
    {
      to: "https://codeforces.com/group/vdqbV8Vogq",
      label: "CODEFORCES GROUP",
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (item.scrollTo && location.pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(item.scrollTo);
      if (element) {
        const header = document.querySelector("header");
        const headerHeight = header ? header.offsetHeight : 0;
        window.scrollTo({
          top: (element as HTMLElement).offsetTop - headerHeight - 20,
          behavior: "smooth",
        });
      }
    }
    setMobileMenuOpen(false);
  };

  const isActive = (item: NavItem) => {
    if (item.label === "HOME") {
      return activeSection === "home";
    } else if (item.label === "CONTESTS") {
      return activeSection === "contests";
    } else if (item.label === "LEADERBOARD") {
      return activeSection === "leaderboard" || location.pathname === "/leaderboard";
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
            : "bg-black/90"
        }
        border-b ${scrolled ? "border-cyan-500/50" : "border-white"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <img
              src={CODE212_LOGO}
              alt="CODE 212"
              className="h-11 md:h-14 w-auto object-contain filter drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-cyan-500/50"
            />
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
              className="hidden sm:block text-2xl md:text-3xl font-bold text-cyan-400 select-none"
            >
              ×
            </motion.span>
            <img
              src={CGI_LOGO}
              alt="CGI Club"
              className="h-9 md:h-15 w-auto object-contain filter drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-purple-500/50"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={(e) => handleNavClick(e, item)}
                className="relative group px-2 py-1 overflow-hidden"
              >
                <span
                  className={`font-mono text-sm lg:text-base tracking-wider transition-all duration-300
                    ${
                      isActive(item)
                        ? "text-cyan-400 font-bold"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                >
                  {item.label}
                </span>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive(item) ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative p-2 z-50"
            aria-label="Toggle menu"
          >
            <motion.div className="space-y-1.5">
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0,
                }}
                className="block w-7 h-0.5 bg-cyan-400 rounded-full"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="block w-7 h-0.5 bg-cyan-400 rounded-full"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0,
                }}
                className="block w-7 h-0.5 bg-cyan-400 rounded-full"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.nav
        initial={false}
        animate={{
          y: mobileMenuOpen ? 0 : -100,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute top-full left-0 right-0 md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-cyan-900/50 z-40"
      >
        <div className="container mx-auto px-6 py-10 flex flex-col gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNavClick(e, item)}
              className={`font-mono text-2xl tracking-wider transition-all duration-300 text-center
                ${
                  isActive(item)
                    ? "text-cyan-400 scale-110 font-bold"
                    : "text-gray-300 hover:text-white hover:scale-105"
                }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-linear-to-r from-transparent via-cyan-800 to-transparent" />
          <p className="text-center text-gray-500 text-sm font-mono">
            Ready to dominate the leaderboard?
          </p>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
