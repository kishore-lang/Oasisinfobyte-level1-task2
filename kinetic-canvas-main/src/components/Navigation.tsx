// Navigation.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Home,
  User as UserIcon,
  FolderKanban,
  Award,
  Mail,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItemVariants: Variants = {
  rest: { scale: 1, y: 0, opacity: 0.85 },
  hover: {
    scale: 1.04,
    y: -2,
    opacity: 1,
    transition: { type: "spring", stiffness: 250, damping: 20 },
  },
  tap: {
    scale: 0.98,
    y: -1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export const Navigation: React.FC<{ onSearch?: (query: string) => void }> = ({
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchRef = useRef<HTMLInputElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "#about", icon: UserIcon },
    { name: "Projects", path: "#projects", icon: FolderKanban },
    { name: "Certifications", path: "#certifications", icon: Award },
    { name: "Contact", path: "#contact", icon: Mail },
  ];

  // SEARCH HANDLER
  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    if (onSearch) onSearch(value.toLowerCase());
  };

  useEffect(() => {
    if (!showSearch) {
      setSearchTerm("");
    }
  }, [showSearch]);

  // PROGRESS + AUTO-HIDE NAV
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight || 1;
      setScrollProgress((window.scrollY / total) * 100);

      const currentY = window.scrollY;
      const down = currentY > lastY;

      document.documentElement.style.setProperty(
        "--nav-translate-y",
        down && currentY > 80 ? "-120%" : "0%"
      );

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CLICK OUTSIDE HANDLERS
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (showSearch && searchRef.current && !searchRef.current.contains(target)) {
        setShowSearch(false);
      }

      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSearch, showUserMenu]);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.12 }}
        />
      </div>

      {/* NAV */}
      <motion.nav
        style={{ translateY: "var(--nav-translate-y)" } as any}
        className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-background/70 border-b border-white/10 shadow-lg z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="text-xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              Portfolio
            </motion.div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 relative">
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full opacity-30 blur-3xl bg-gradient-to-r from-primary/30 via-transparent to-secondary/30"
              animate={{ rotate: [0, 45, 0], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {navItems
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    className="relative overflow-hidden flex items-center gap-2 text-base text-foreground/80 px-3 py-2 rounded-lg"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={navItemVariants}
                    transition={{ delay: i * 0.05 }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                    <span className="relative flex items-center gap-2">
                      <Icon size={18} />
                      {item.name}
                    </span>
                  </motion.a>
                );
              })}
            {navItems.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No matching navigation links found.
              </p>
            )}

            {/* SEARCH */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    ref={searchRef}
                    key="search-input"
                    className="px-3 py-2 rounded-lg bg-foreground/10 text-sm outline-none"
                    placeholder="Search..."
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    autoFocus
                  />
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  setShowSearch((v) => {
                    const next = !v;
                    if (!next) setSearchTerm("");
                    return next;
                  });
                }}
                className="p-2 rounded-lg hover:bg-foreground/10"
              >
                <Search size={20} />
              </button>
            </div>

            {/* USER MENU */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:scale-105 transition"
              >
                <UserIcon size={18} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-3 w-44 bg-background/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl p-2 flex flex-col gap-1"
                  >
                    <a className="px-3 py-2 rounded-md hover:bg-foreground/10" href="#profile">
                      Profile
                    </a>
                    <a className="px-3 py-2 rounded-md hover:bg-foreground/10" href="#settings">
                      Settings
                    </a>
                    <a className="px-3 py-2 rounded-md hover:bg-foreground/10" href="#logout">
                      Logout
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-foreground/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-xl bg-background/80 border-t border-white/10 shadow-lg"
            >
              <div className="p-4 flex flex-col gap-3">
                {/* MOBILE SEARCH */}
                <div className="flex items-center gap-2 bg-foreground/10 p-2 rounded-lg">
                  <Search size={18} />
                  <input
                    placeholder="Search..."
                    onChange={(e) => handleSearchInput(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-base py-3 px-2 rounded-lg hover:bg-foreground/10"
                    >
                      <Icon size={20} />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;
