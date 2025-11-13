import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    className="mb-12 space-y-4 text-center md:mb-16"
  >
    {eyebrow && (
      <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-brand-300">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
