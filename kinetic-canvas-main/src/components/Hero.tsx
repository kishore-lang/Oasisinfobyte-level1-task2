import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, type Variants, type Transition } from "framer-motion";
import { Scene3D } from "./Scene3D";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const handleResumeDownload = () => {
  // Simple approach: Open PDF in new tab/window
  // This works reliably on both desktop and mobile
  // Mobile users can then use browser's share/save functionality
  window.open("/kishore_cv.pdf", "_blank", "noopener,noreferrer");
};

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), spring);
  const orb1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), spring);
  const orb1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), spring);
  const orb2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), spring);
  const orb2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), spring);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: (prefersReducedMotion
        ? { duration: 0.2 }
        : { staggerChildren: 0.08, delayChildren: 0.15 }) as Transition,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: prefersReducedMotion ? 0.2 : 0.45, ease: "easeOut" } as Transition,
    },
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const firstName = "KISHORE";
  const lastName = "JAGADESAN";
  const [displayedLastName, setDisplayedLastName] = useState(lastName);
  const scrambleInterval = useRef<number | null>(null);
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const triggerScramble = () => {
    if (prefersReducedMotion || scrambleInterval.current) return;

    const duration = 900;
    const start = performance.now();

    scrambleInterval.current = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      setDisplayedLastName(() =>
        lastName
          .split("")
          .map((char, idx) => {
            if (progress > idx / lastName.length) {
              return char;
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      if (progress >= 1 && scrambleInterval.current) {
        window.clearInterval(scrambleInterval.current);
        scrambleInterval.current = null;
        setDisplayedLastName(lastName);
      }
    }, 60);
  };

  useEffect(() => {
    return () => {
      if (scrambleInterval.current) {
        window.clearInterval(scrambleInterval.current);
      }
    };
  }, []);

  const lastNameDisplay = prefersReducedMotion ? lastName : displayedLastName;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5 sm:space-y-6 text-center md:text-left"
        >
          <motion.div variants={itemVariants}>
            <motion.span
              className="text-primary text-xs sm:text-sm md:text-base font-mono"
              animate={prefersReducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
            >
              &lt;Hello World /&gt;
            </motion.span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight"
          >
            <motion.span
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent [background-size:200%_100%] animate-gradient-x inline-block"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            >
              {Array.from(firstName).map((ch, i) => (
                <motion.span
                  key={`fn-${i}-${ch}`}
                  className="inline-block"
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: prefersReducedMotion ? 0.2 : 0.35, ease: "easeOut" }}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.button
              type="button"
              onMouseEnter={triggerScramble}
              onFocus={triggerScramble}
              onClick={triggerScramble}
              className="relative text-foreground inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-md px-1"
            >
              {Array.from(lastNameDisplay).map((ch, i) => (
                <motion.span
                  key={`ln-${i}-${ch}`}
                  className="inline-block"
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.04, duration: prefersReducedMotion ? 0.2 : 0.35, ease: "easeOut" }}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                >
                  {ch}
                </motion.span>
              ))}
              <span className="sr-only">Hover to scramble the last name</span>
            </motion.button>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl md:max-w-2xl mx-auto md:mx-0"
          >
            Crafting beautiful, performant web experiences with modern
            technologies and creative problem-solving.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
          >
            <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-background font-semibold shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] text-sm sm:text-base"
                onClick={handleResumeDownload}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <Download className="relative mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 text-sm sm:text-base"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                View Projects
                <motion.span
                  className="ml-2 inline-flex"
                  whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[520px] xl:h-[620px] relative hidden md:block [perspective:1000px]"
        >
          <motion.div className="absolute inset-0" style={{ rotateX, rotateY }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
            <Scene3D />
          </motion.div>
        </motion.div>
      </div>

      {/* Animated gradient orbs - smaller on mobile */}
      <motion.div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ x: orb1X, y: orb1Y }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ x: orb2X, y: orb2Y }} />
    </section>
  );
}; 