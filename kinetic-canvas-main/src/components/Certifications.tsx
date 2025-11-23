import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { ExternalLink, Award, Book, Briefcase, Users, FileText, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: "coursera" | "infosys" | "internship" | "workshop" | "project" ;
  date: string;
  credentialUrl: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage?: string;
}

const certificates: Certificate[] = [
  // Coursera Courses
  {
    id: "coursera-1",
    title: "Mathematical Foundations for Cryptography",
    issuer: "Coursera",
    category: "coursera",
    date: "August 30, 2024",
    credentialUrl: "https://i.ibb.co/TMm52b2Z/coursera-1.jpg",
    description: "Mathematical Foundations for Cryptography, gaining essential understanding of number theory, modular arithmetic, and mathematical principles used in modern cryptographic systems",
    icon: <Book className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",
  },
  {
    id: "coursera-2",
    title: "CObject-Oriented Design",
    issuer: "University of Alberta",
    category: "coursera",
    date: "June 10, 2024 ",
    credentialUrl: "https://coursera-certificate-images.s3.amazonaws.com/RJRK5626RGU6",
    description: "Object-Oriented Design is the process of structuring software using objects, classes, and their interactions to create modular, reusable, and maintainable systems.",
    icon: <Book className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",

  },
  {
    id: "coursera-3",
    title: "Agile Projects: Developing Tasks with Taiga",
    issuer: "Coursera",
    category: "coursera",
    date: "February 28, 2024 ",
    credentialUrl: "https://coursera-certificate-images.s3.amazonaws.com/2H7SCDTKEKXP",
    description: "AA practical introduction to planning, managing, and tracking Agile project tasks using the Taiga project management platform.",
    icon: <Book className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",

  },
  {
    id: "coursera-4",
    title: "CUsing probability distributions for real world problems in R",
    issuer: "Coursera",
    category: "coursera",
    date: " May 17, 2024",
    credentialUrl: "https://coursera-certificate-images.s3.amazonaws.com/Y2P7X7DVKGZF",
    description: "Applied statistical techniques in R to model, analyze, and solve real-world problems using various probability distributions.",
    icon: <Book className="w-5 h-5" />,
        backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",

  },
  {
    id: "coursera-5",
    title: "Introduction to Environmental Law and Policy",
    issuer: "The University of North Carolina at Chapel Hill",
    category: "coursera",
    date: "June 21, 2024 ",
    credentialUrl: "https://coursera-certificate-images.s3.amazonaws.com/CWMCCW2GFNZZ",
    description: "Explored the foundational principles of environmental law and policy, including regulations, frameworks, and global environmental governance.",
    icon: <Book className="w-5 h-5" />,
        backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",

  },
  {
    id: "coursera-6",
    title: "Files and directories in the Linux filesystem",
    issuer: "Coursera",
    category: "coursera",
    date: "February 28, 2024 ",
    credentialUrl: "https://coursera-certificate-images.s3.amazonaws.com/YJ4SNSF4ZXD9",
    description: "Learned the structure, navigation, and management of files and directories within the Linux filesystem using essential commands.",
    icon: <Book className="w-5 h-5" />,
        backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",

  },
  {
    id: "coursera-7",
    title: "Create a value proposition canvas in Miro",
    issuer: "Coursera",
    category: "coursera",
    date: " February 28, 2024",
    credentialUrl: "https://coursera-certificate-images.s3.amazonaws.com/5V7S95JK944Z",
    description: "Gained hands-on experience in building a Value Proposition Canvas using Miro to analyze customer needs and align product value.",
    icon: <Book className="w-5 h-5" />,
        backgroundImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop",

  },
  // Infosys Springboard
  {
    id: "infosys-1",
    title: "JavaScript: Getting Started with JavaScript Programming",
    issuer: "Infosys Springboard",
    category: "infosys",
    date: "November 13, 2025",
    credentialUrl: "https://i.ibb.co/3yJkbDwD/1-4fa2a531-4f9e-438a-b795-225b0528b927.jpg",
    description: "JavaScript (JS) is one of the core technologies of the web, alongside HTML and CSS. It allows you to create interactive, dynamic pages and is also used on servers, mobile apps, desktop apps, and more.",
    icon: <Users className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
  },
   
  // Internship Certificate
  {
    id: "internship-1",
    title: "Internship Certificate",
    issuer: "CodeBinding Coimbatore",
    category: "internship",
    date: "2 June 2025-16 June 2025",
    credentialUrl: "https://i.ibb.co/1tdJQctb/IMG-E2900.jpg",
    description: "A 14-day web development internship covering HTML, CSS, JavaScript, backend, database, and deployment.",
    icon: <Briefcase className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  // Workshop Certificate
  {
    id: "workshop-1",
    title: " E-Commerce Workshop Certificate",
    issuer: "CodeBinding Coimbatore",
    category: "workshop",
    date: "16 June 2025",
    credentialUrl: "https://i.ibb.co/S7J9v37n/IMG-E2896.jpg",
    description: "By the One day, participants will learn to build and deploy a functional e-commerce web application using modern web technologies (HTML, CSS, JavaScript, backend basics, database, and payment workflow).",
    icon: <Trophy className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  // Project Completion Certificate
  {
    id: "project-1",
    title: "Project Completion Certificate",
    issuer: "CodeBinding Coimbatore",
    category: "project",
    date: "2 June 2025-16 June 2025",
    credentialUrl: "https://i.ibb.co/vCf6DJCt/IMG-E2899.jpg",
    description: "Projecton Online Food Delivery application using HTML, CSS, JavaScript,PHP",
    icon: <FileText className="w-5 h-5" />,
    backgroundImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
  },
];

const categoryConfig = {
  coursera: { label: "Coursera Courses", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500/10" },
  infosys: { label: "Infosys Springboard", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/10" },
  internship: { label: "Internship", color: "from-green-500 to-emerald-500", bgColor: "bg-green-500/10" },
  workshop: { label: "Workshop", color: "from-orange-500 to-red-500", bgColor: "bg-orange-500/10" },
  project: { label: "Project Completion", color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-500/10" },
};

const aiHighlights = [
  {
    title: "Generative AI",
    detail: "Prompt design, fine-tuning, and persona crafting to orchestrate reliable creative outputs.",
  },
  {
    title: "Foundation Models",
    detail: "Applied LLMs to augment documentation and planning, plus built RLHF-inspired evaluation loops.",
  },
  {
    title: "AI Safety & Ethics",
    detail: "Carefully scoped model use, bias mitigation, and guardglass deployment patterns.",
  },
];

const courseraLogo = (
  <svg viewBox="0 0 64 64" role="presentation" className="h-8 w-8">
    <defs>
      <linearGradient id="coursera-gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#0056A7" />
        <stop offset="100%" stopColor="#0056EF" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#coursera-gradient)" />
    <path
      d="M25 18a6 6 0 0 1 6 6v16a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V24a10 10 0 1 0-20 0v16a6 6 0 0 0 6 6h7v-6h-7v-8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v8h4v-8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v8h4V26a10 10 0 0 0-10-8h-4z"
      fill="#fff"
    />
  </svg>
);

const infosysLogo = (
  <svg viewBox="0 0 64 64" role="presentation" className="h-8 w-8">
    <rect width="64" height="64" rx="16" fill="#262d3a" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="#6dd2ff"
      fontSize="12"
      fontWeight="700"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
    >
      info
    </text>
  </svg>
);

const ImageWithFallback: React.FC<{ src?: string; alt: string; fallback: React.ReactNode }> = ({ src, alt, fallback }) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return <>{fallback}</>;
  }

  return <img src={src} alt={alt} className="h-8 object-contain" onError={() => setErrored(true)} />;
};

type PartnerLogo = {
  id: string;
  src?: string;
  alt?: string;
  label?: string;
  logoComponent?: React.ReactNode;
  certIds?: string[];
};

const partnerLogos = [
  {
    id: "coursera-1",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Coursera_logo.svg",
    alt: "Coursera",
    label: "Coursera",
    logoComponent: courseraLogo,
    certIds: certificates.filter((cert) => cert.category === "coursera").map((cert) => cert.id),
  },
  {
    id: "infosys-1",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Infosys_logo.svg",
    alt: "Infosys",
    label: "Infosys",
    logoComponent: infosysLogo,
    certIds: certificates.filter((cert) => cert.category === "infosys").map((cert) => cert.id),
  },
  {
    id: "internship-1",
    label: "CodeBinding",
    certIds: certificates.filter((cert) => cert.category === "internship").map((cert) => cert.id),
  },
  {
    id: "workshop-1",
    label: "Workshop",
    certIds: certificates.filter((cert) => cert.category === "workshop").map((cert) => cert.id),
  },
  {
    id: "project-1",
    label: "Project",
    certIds: certificates.filter((cert) => cert.category === "project").map((cert) => cert.id),
  },
];

export const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<"all" | Certificate["category"]>("all");
  const marqueeControls = useAnimationControls();
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [hoveredLogoId, setHoveredLogoId] = useState<string | null>(null);
  const rotationIndexRef = useRef(0);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredCerts =
    filter === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === filter);

  const categories = Object.entries(categoryConfig).map(([key]) => key as Certificate["category"]);

  const startMarquee = useCallback(() => {
    marqueeControls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 18,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      },
    });
  }, [marqueeControls]);

  useEffect(() => {
    startMarquee();
  }, [startMarquee]);

  const handleLogoHover = (id: string) => {
    setHoveredLogoId(id);
  };

  const handleLogoLeave = () => {
    setHoveredLogoId(null);
  };

  useEffect(() => {
    if (rotationTimerRef.current) {
      clearInterval(rotationTimerRef.current);
      rotationTimerRef.current = null;
    }

    if (!hoveredLogoId) {
      setPreviewCert(null);
      return;
    }

    const logo = partnerLogos.find((l) => l.id === hoveredLogoId);
    const certs = (logo?.certIds ?? [])
      .map((id) => certificates.find((cert) => cert.id === id))
      .filter(Boolean) as Certificate[];

    if (!certs.length) {
      setPreviewCert(null);
      return;
    }

    rotationIndexRef.current = 0;
    setPreviewCert(certs[0]);

    rotationTimerRef.current = setInterval(() => {
      rotationIndexRef.current = (rotationIndexRef.current + 1) % certs.length;
      setPreviewCert(certs[rotationIndexRef.current]);
    }, 3200);

    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current);
        rotationTimerRef.current = null;
      }
    };
  }, [hoveredLogoId, certificates]);

  return (
    <section id="certifications" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-3">
            <Award className="w-8 h-8 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Professional certifications and training courses completed across various platforms
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const count = certificates.filter((c) => c.category === category).length;
            const isActive = filter === category;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(isActive ? "all" : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${categoryConfig[category].color} text-white`
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {categoryConfig[category].label} ({count})
              </motion.button>
            );
          })}
        </div>

        {/* Trusted Partners Marquee */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-background/80 to-slate-900/80">
          <div className="px-6 py-4 text-sm text-muted-foreground tracking-wide uppercase">
            Trusted by a global network of teams
          </div>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => marqueeControls.stop()}
            onMouseLeave={() => {
              startMarquee();
              handleLogoLeave();
            }}
          >
            <motion.div
              className="flex items-center gap-10 whitespace-nowrap px-6"
              animate={marqueeControls}
              initial={{ x: 0 }}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, index) => {
                const logoCert = certificates.find((cert) => cert.id === logo.id);
                return (
                  <motion.div
                    key={`${logo.id}-${index}`}
                    onMouseEnter={() => handleLogoHover(logo.id)}
                    onClick={() => logoCert && setSelectedCert(logoCert)}
                    className="flex items-center gap-3 px-4 py-3 min-w-[120px] cursor-pointer"
                  >
                    <ImageWithFallback
                      src={logo.src}
                      alt={logo.alt ?? logo.label ?? "logo"}
                      fallback={logo.logoComponent ?? (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs uppercase tracking-[0.3em] text-white">
                          {logo.label?.[0] ?? "#"}
                        </span>
                      )}
                    />
                    {logo.label && (
                      <span className="text-xs font-semibold text-white sm:inline hidden">
                        {logo.label}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          {previewCert && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-4 border-t border-white/10 bg-background/80"
            >
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Preview</p>
                <p className="text-base font-semibold text-white">{previewCert.title}</p>
                <p className="text-xs">{previewCert.issuer}</p>
                <p className="text-xs text-muted-foreground">{previewCert.date}</p>
                <button
                  onClick={() => previewCert && setSelectedCert(previewCert)}
                  className="mt-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white bg-gradient-to-r from-primary to-secondary rounded-full"
                >
                  View certificate
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* AI Knowledge Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-indigo-900/60 p-6 shadow-[0_15px_35px_rgba(15,23,42,0.7)]"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Advanced AI Knowledge
              </p>
              <h3 className="text-2xl font-semibold text-white">Responsible AI expertise & tooling</h3>
            </div>
            <motion.div
              className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow"
              animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.05, 1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {aiHighlights.map((item) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:border-primary/70"
                whileHover={{ translateY: -4, boxShadow: "0 20px 40px rgba(59,130,246,0.25)" }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-300">Focus</p>
                <p className="text-base font-semibold text-white mt-1">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer"
              >
                <div
                  className={`h-full rounded-lg border border-white/10 ${categoryConfig[cert.category].bgColor} 
                    backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg relative overflow-hidden`}
                  style={{
                    backgroundImage: cert.backgroundImage ? `url(${cert.backgroundImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {cert.backgroundImage && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                  )}
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${categoryConfig[cert.category].color} 
                          text-white flex-shrink-0`}
                      >
                        {cert.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                          {cert.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {categoryConfig[cert.category].label}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                      {cert.issuer}
                    </p>

                    <p className="text-xs text-muted-foreground mb-4">{cert.date}</p>

                    <div className="flex items-center justify-between">
                      <a
                        href={cert.credentialUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        View Certificate
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No certificates found in this category</p>
          </motion.div>
        )}
      </div>

      {/* Certificate Detail Dialog */}
      <AnimatePresence>
        {selectedCert && (
          <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${categoryConfig[selectedCert.category].color} 
                      text-white`}
                  >
                    {selectedCert.icon}
                  </div>
                  {selectedCert.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Category
                  </label>
                  <p className="text-sm font-medium">
                    {categoryConfig[selectedCert.category].label}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Issuer
                  </label>
                  <p className="text-sm font-medium">{selectedCert.issuer}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Date Completed
                  </label>
                  <p className="text-sm font-medium">{selectedCert.date}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Description
                  </label>
                  <p className="text-sm text-muted-foreground">{selectedCert.description}</p>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Full Certificate
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};
