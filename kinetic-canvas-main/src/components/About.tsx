// About.tsx — Final Clean Production Version

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

// ----------------------
// Particle Background
// ----------------------
const Particles = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="w-full h-full opacity-50 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
    </div>
  );
};

// ----------------------
// Variants
// ----------------------
const fadeUpVariants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: { opacity: 1, y: 0 },
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const magnetHover = {
  initial: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { type: "spring", stiffness: 180, damping: 14 },
  },
};

const handleResumeDownload = () => {
  window.open("/kishore_cv.pdf", "_blank", "noopener,noreferrer");
};

// ----------------------
// Data
// ----------------------
const timeline = [
  {
    year: "2020–2021",
    title: "SSLC",
    text: "Scored 90% at Sri Arutsai Vetri Vidyalaya Matric Hr. Sec. School, Tiruttani.",
  },
  {
    year: "2022–2023",
    title: "HSC",
    text: "Achieved 94% at Sri Arutsai Vetri Vidyalaya Matric Hr. Sec. School, Tiruttani.",
  },
  {
    year: "2023–2027",
    title: "B.E. Computer Science",
    text: "Currently pursuing B.E CSE at Sri Krishna College of Technology, Coimbatore.",
  },
  {
    year: "Now",
    title: "Growing & Grinding",
    text: "Hardworking, continuously learning new skills, and preparing to get placed in top companies.",
  },
];


const skills = [
  { title: "Frontend Development", list: ["React.js", "TypeScript", "TailwindCSS", "Framer Motion", "UI/UX"] },
  { title: "Backend Development", list: ["Java (Spring Boot)", "Python", "Node.js", "REST APIs"] },
  { title: "Databases", list: ["MySQL", "MongoDB", "PostgreSQL"] },
  { title: "Tools", list: ["GitHub", "VSCode", "Figma"] },
  { title: "Other Skills", list: ["Problem Solving", "DSA Basics"] },
];

const resumeCards = [
  { title: "Education", desc: "B.E CSE — SKCT (3rd Year)", icon: "🎓" },
  { title: "Specialization", desc: "Frontend • UI/UX • Motion Design", icon: "✨" },
  { title: "Projects", desc: "5+ Web Apps", icon: "🧩" },
  { title: "Backend", desc: "Java • Python • APIs", icon: "💻" },
  { title: "Databases", desc: "MySQL • MongoDB", icon: "🗄️" },
  { title: "Soft Skills", desc: "Communication • Creativity", icon: "🌟" },
];

// ----------------------
// Component
// ----------------------
export const About = () => {
  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden">
      <Particles />

      {/* Auras */}
      <div className="absolute -top-32 -left-28 w-72 h-72 bg-primary/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-36 -right-24 w-80 h-80 bg-secondary/30 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          {/* ------------------------------ */}
          {/* PROFILE + TIMELINE */}
          {/* ------------------------------ */}
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* PROFILE CARD */}
            <motion.div
              variants={fadeUpVariants}
              custom={30}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="glass-effect p-6 sm:p-8 rounded-2xl space-y-6"
            >
              <motion.div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto" variants={magnetHover}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-2 bg-background rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/whhMXRhK/IMG-2374.jpg"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Hi, I’m <span className="font-semibold text-foreground">Kishore J</span>. I build visually
                engaging, smooth-performance web experiences using modern frontend frameworks,
                motion design & creative UI engineering.
              </p>

              <motion.div variants={magnetHover}>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-background shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  onClick={handleResumeDownload}
                >
                  <Download className="mr-2" /> Resume at a Glance
                </Button>
              </motion.div>
            </motion.div>

            {/* TIMELINE */}
            <motion.div
              variants={fadeUpVariants}
              custom={40}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6">Journey So Far</h3>

              <div className="relative ml-4">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/80 via-primary/30 to-transparent" />

                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, delay: index * 0.12 }}
                      className="relative pl-6"
                    >
                      <motion.div
                        className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border border-primary/40 bg-background flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(0,240,255,0)",
                            "0 0 18px rgba(0,240,255,0.35)",
                            "0 0 0px rgba(0,240,255,0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </motion.div>

                      <p className="text-xs uppercase tracking-wide text-primary/80 font-semibold">{item.year}</p>
                      <h4 className="text-sm md:text-base font-semibold">{item.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ------------------------------ */}
          {/* TECH SKILLS */}
          {/* ------------------------------ */}
          <h3 className="text-2xl md:text-3xl font-semibold text-center mt-20 mb-10">
            Technical Skills
          </h3>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                variants={fadeUpVariants}
                custom={40 + i * 10}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-effect p-5 rounded-2xl border border-white/10 hover:shadow-[0_0_25px_rgba(0,200,255,0.3)]"
              >
                <h4 className="text-lg font-semibold mb-3 text-primary/90">{skill.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {skill.list.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ------------------------------ */}
          {/* RESUME AT A GLANCE */}
          {/* ------------------------------ */}
          <h3 className="text-2xl md:text-3xl font-semibold text-center mt-20 mb-10">
            Resume at a Glance
          </h3>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          >
            {resumeCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUpVariants}
                custom={50 + i * 10}
                whileHover={{ scale: 1.06, rotate: -1 }}
                className="glass-effect p-6 rounded-2xl border border-white/10 cursor-pointer hover:shadow-[0_0_35px_rgba(0,200,255,0.25)]"
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
