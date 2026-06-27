"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        px-4
        py-2
        text-xs
        font-medium
        tracking-[0.18em]
        uppercase
        text-neutral-300
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
      "
    >
      <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>

      {children}
    </motion.div>
  );
}
