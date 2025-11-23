import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    screenshots: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetails = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
  }, [project]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length
    );
  }, [project]);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextImage, prevImage, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="bg-background border border-border rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-4 sm:p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl sm:text-3xl font-bold">{project.title}</h2>

            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-8">
            {/* Description */}
            <section>
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Tech Stack */}
            <section>
              <h3 className="text-xl font-semibold mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Screenshots */}
            <section>
              <h3 className="text-xl font-semibold mb-4">
                Screenshots ({project.screenshots.length})
              </h3>

              {project.screenshots.length > 0 && (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative bg-muted rounded-xl overflow-hidden aspect-video flex items-center justify-center group cursor-pointer">
                    <motion.img
                      key={currentImageIndex}
                      src={project.screenshots[currentImageIndex]}
                      alt="Screenshot"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isZoomed ? "scale-125" : "scale-100"
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    />

                    {/* Zoom Icon */}
                    <div className="absolute top-3 right-3 bg-black/40 p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                      <Maximize2 size={20} />
                    </div>

                    {/* Left / Right Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="text-center text-sm text-muted-foreground">
                    {currentImageIndex + 1} / {project.screenshots.length}
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex items-center justify-center gap-2">
                    {project.screenshots.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`View screenshot ${index + 1}`}
                        className={cn(
                          "h-2.5 w-2.5 rounded-full transition-all border border-white/20",
                          index === currentImageIndex
                            ? "bg-primary"
                            : "bg-white/40 hover:bg-white/70",
                        )}
                      />
                    ))}
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {project.screenshots.map((shot, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
                          index === currentImageIndex
                            ? "border-primary scale-105"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={shot}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
