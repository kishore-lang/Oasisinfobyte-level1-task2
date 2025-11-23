import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Instagram, Phone } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/kishore-lang",
    color: "from-primary to-primary",
    caption: "Browse repos",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/kishore-jagadesan/",
    color: "from-secondary to-secondary",
    caption: "Professional updates",
  },
  {
    name: "Phone",
    icon: Phone,
    url: "tel:+916379311955",
    color: "from-green-500 to-emerald-500",
    caption: "Quick call",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/kishorx.__/#",
    color: "from-accent to-primary",
    caption: "Visual stories",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:kishorekishore0783@gmail.com",
    color: "from-primary to-secondary",
    caption: "Drop a note",
  },
];

// Lines + Particles background implemented with canvas (lightweight, no extra deps)
// Features:
// - Nodes (particles) connected by lines when near
// - Pointer interaction: repel on hover / touch
// - Reduced motion respect
// - Mobile-friendly performance (particle count scales with viewport)

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const pointer = useRef({ x: -9999, y: -9999, down: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Particle config scaled by screen size
    const config = {
      baseCount: 60,
      maxDistance: 140,
      maxLineWidth: 0.8,
      speed: 0.4,
      particleRadius: 1.5,
    };

    let particles: Array<any> = [];

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
      // recompute particle count by area
      const area = width * height;
      const count = Math.max(20, Math.floor((config.baseCount * area) / (1024 * 768)));
      initParticles(count);
    };

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const initParticles = (count: number) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-config.speed, config.speed),
          vy: rand(-config.speed, config.speed),
          r: config.particleRadius,
        });
      }
    };

    const distance = (a: any, b: any) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      for (let p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Pointer repulsion
        const ptr = pointer.current;
        const px = ptr.x;
        const py = ptr.y;
        if (px > -9000) {
          const dist = Math.hypot(p.x - px, p.y - py);
          if (dist < 80) {
            const angle = Math.atan2(p.y - py, p.x - px);
            const force = (80 - dist) / 80;
            p.vx += Math.cos(angle) * 0.6 * force;
            p.vy += Math.sin(angle) * 0.6 * force;
          }
        }

        // slight velocity damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = distance(a, b);
          if (d < config.maxDistance) {
            const alpha = 1 - d / config.maxDistance;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.lineWidth = Math.min(config.maxLineWidth, alpha * config.maxLineWidth);
            ctx.strokeStyle = `rgba(160,200,255,${alpha * 0.7})`;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event handlers for pointer
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = (e.clientX - rect.left);
      pointer.current.y = (e.clientY - rect.top);
    };
    const onLeave = () => {
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    };

    // Touch
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) {
        pointer.current.x = (t.clientX - rect.left);
        pointer.current.y = (t.clientY - rect.top);
      }
    };

    // Reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      resize();
      if (!prefersReduced) {
        if (animationRef.current == null) animationRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    start();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch as any);
      canvas.removeEventListener("touchend", onLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-20"
      aria-hidden
    />
  );
};

export const Social: React.FC = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Particle background */}
      <ParticlesBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            Let's <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-10 md:mb-12"
          >
            Feel free to reach out for collaborations or just a friendly hello
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.15 + idx * 0.08 }}
                  whileHover={{ scale: 1.04, rotateX: -6, rotateY: 8 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group"
                  aria-label={social.name}
                >
                  <div className="glass-card relative flex flex-col items-center gap-2 px-5 py-6 sm:px-6 sm:py-7 rounded-2xl transform-gpu will-change-transform transition-shadow duration-300 shadow-sm hover:shadow-lg">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <span className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br ${social.color} text-background shadow-[0_0_20px_rgba(148,163,184,0.45)]`}>
                        <Icon size={24} className="text-background" />
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-foreground">{social.name}</p>
                      <span className="text-xs text-muted-foreground tracking-tight">{social.caption}</span>
                    </div>
                  </div>

                  {/* soft glow */}
                  <div className="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-40 transition-all duration-500 blur-xl" />
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.7 }}
            className="mt-8 sm:mt-10 md:mt-12 glass-card p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Available for Opportunities</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Currently open to freelance projects and full-time positions.
              Let's build something amazing together!
            </p>

            <motion.a
              href="https://wa.me/916379311955?text=hello%20Kishore"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-primary to-secondary text-background font-semibold rounded-full shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-shadow"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* decorative gradients for depth */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-secondary/8 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent/8 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Social;

