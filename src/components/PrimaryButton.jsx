import { motion } from "framer-motion";
import clsx from "clsx";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-500 via-indigo-500 to-sky-400 text-white shadow-glow-lg hover:shadow-lg hover:shadow-indigo-500/20",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:border-brand-500/40 hover:bg-brand-500/5",
};

const PrimaryButton = ({
  href = "#",
  label,
  variant = "primary",
  icon: Icon,
  download,
}) => (
  <motion.a
    href={href}
    download={download}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={clsx(
      "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] transition-all",
      variants[variant]
    )}
  >
    {label}
    {Icon ? <Icon size={18} /> : null}
  </motion.a>
);

export default PrimaryButton;
