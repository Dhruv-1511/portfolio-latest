import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowUpRight, FiX } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/content";

const ProjectCard = ({ project, index, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(project)}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Full Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${project.logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gradient Overlay - Changes on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"
        animate={isHovered ? { opacity: 0.85 } : { opacity: 0.6 }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        animate={
          isHovered ? { opacity: 0.4, scale: 1.05 } : { opacity: 0.1, scale: 1 }
        }
        transition={{ duration: 0.6 }}
      />

      {/* Project Number - Always Visible */}
      <motion.div
        className="absolute left-6 top-6 z-10"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
          <span className="text-2xl font-bold text-brand-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* {project.logo ? (
        <motion.div
          className="absolute right-6 top-6 z-10"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-slate-950/80 p-2 shadow-2xl backdrop-blur-xl">
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      ) : null} */}

      {/* Tech Tags - Top Right */}
      {/* <div className="absolute right-6 top-6 z-10 flex flex-col gap-2">
        {project.stack.slice(0, 2).map((tech, techIndex) => (
          <motion.span
            key={tech}
            className="rounded-full border border-white/20 bg-slate-950/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + techIndex * 0.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(99, 102, 241, 0.3)",
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div> */}

      {/* Hover Information Overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-8"
        initial={false}
        animate={{
          backdropFilter: isHovered ? "blur(0px)" : "blur(0px)",
        }}
      >
        {/* Content Container */}
        <motion.div
          className="relative"
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background for Content */}
          <motion.div
            className="absolute inset-0 -inset-x-8 -inset-y-8 rounded-2xl bg-gradient-to-t from-slate-950/95 via-slate-950/90 to-slate-950/80 backdrop-blur-xl"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Title */}
            <motion.h3
              className="mb-2 text-3xl font-bold leading-tight text-white md:text-4xl"
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.9,
              }}
              transition={{ delay: isHovered ? 0.15 : 0 }}
            >
              <span className="bg-gradient-to-r from-white via-brand-200 to-sky-200 bg-clip-text text-transparent">
                {project.title}
              </span>
            </motion.h3>

            {/* Click Hint */}
            <motion.div
              className="flex items-center gap-2 text-sm text-slate-300"
              animate={{
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              <span>Click to view details</span>
              <FiArrowUpRight className="text-brand-300" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Accent Line - Animated */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
      />

      {/* Corner Glow Effect */}
      <motion.div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/30 to-transparent blur-3xl"
        animate={
          isHovered ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0.3 }
        }
        transition={{ duration: 0.6 }}
      />
    </motion.article>
  );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-4 z-50 mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95 shadow-2xl backdrop-blur-2xl md:inset-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-xl text-white transition-all hover:border-brand-500/50 hover:bg-brand-500/20"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX size={24} />
            </motion.button>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto">
              {/* Hero Image Section */}
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Project Number */}
                <motion.div
                  className="absolute left-8 top-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-brand-500/50 bg-slate-950/90 backdrop-blur-xl shadow-2xl">
                    <span className="text-3xl font-bold text-brand-300">
                      {String(projects.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Tech Tags */}
                <div className="absolute right-8 top-8 flex flex-col gap-3">
                  {project.logo ? (
                    <motion.div
                      className=""
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-slate-950/80 p-3 shadow-2xl backdrop-blur-xl">
                        <img
                          src={project.logo}
                          alt={`${project.title} logo`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                {/* Category Badge */}
                <motion.div
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-300">
                    Featured Project
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-white via-brand-200 to-sky-200 bg-clip-text text-transparent">
                    {project.title}
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="mb-8 text-lg leading-relaxed text-slate-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {project.description}
                </motion.p>

                {/* Tech Stack */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-gradient-to-r from-slate-800/70 to-slate-900/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + tagIndex * 0.05 }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: "rgba(99, 102, 241, 0.5)",
                          color: "#a5b4fc",
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn flex items-center gap-3 rounded-xl bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-xl shadow-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-500/50"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Live Demo</span>
                    <FiArrowUpRight size={20} />
                  </motion.a>
                </motion.div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Projects"
          title="Crafting digital experiences that inspire and convert."
          subtitle="A collection of innovative projects showcasing modern design, cutting-edge technology, and exceptional user experiences."
        />

        {/* Grid Layout */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={handleOpenModal}
            />
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute right-0 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: "rgba(99, 102, 241, 0.4)" }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-8"
            style={{ background: "rgba(14, 165, 233, 0.4)" }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
