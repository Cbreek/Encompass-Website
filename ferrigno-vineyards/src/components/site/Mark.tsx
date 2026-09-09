import { motion } from "motion/react";

/**
 * The Ferrigno diamond. A slowly rotating mark used as the brand signature.
 */
export function Mark({
  size = 40,
  spin = false,
  className = "",
  letterClass = "text-gold",
  borderClass = "border-gold",
}: {
  size?: number;
  spin?: boolean;
  className?: string;
  letterClass?: string;
  borderClass?: string;
}) {
  return (
    <span
      className={`relative inline-grid place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.span
        className={`absolute inset-0 border ${borderClass}`}
        initial={{ rotate: 45 }}
        animate={spin ? { rotate: [45, 405] } : { rotate: 45 }}
        transition={
          spin
            ? { duration: 18, repeat: Infinity, ease: "linear" }
            : { duration: 0.6 }
        }
      />
      <motion.span
        className={`absolute border ${borderClass} opacity-30`}
        style={{ inset: size * 0.16 }}
        initial={{ rotate: 45 }}
        animate={spin ? { rotate: [405, 45] } : { rotate: 45 }}
        transition={
          spin
            ? { duration: 26, repeat: Infinity, ease: "linear" }
            : { duration: 0.6 }
        }
      />
      <span
        className={`font-display leading-none ${letterClass}`}
        style={{ fontSize: size * 0.34 }}
      >
        F
      </span>
    </span>
  );
}
