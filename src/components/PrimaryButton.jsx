import { motion } from "framer-motion";
import clsx from "clsx";

const variants = {
  primary:
    "bg-marvel-red text-white shadow-glow-red hover:bg-red-600 border border-red-500",
  secondary:
    "border border-marvel-gold text-marvel-gold hover:bg-marvel-gold/10 shadow-glow-gold",
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
      "flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] transition-all font-oswald clip-path-slant",
      variants[variant]
    )}
    style={{
      clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)",
    }}
  >
    {label}
    {Icon ? <Icon size={18} /> : null}
  </motion.a>
);

export default PrimaryButton;
