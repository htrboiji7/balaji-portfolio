
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-white text-black hover:bg-neutral-200 shadow-2xl",
    secondary:
      "border border-white/10 bg-white/5 backdrop-blur-xl text-white hover:bg-white hover:text-black",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{
        y: -4,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        h-14
        rounded-full
        px-8
        text-sm
        font-medium
        transition-all
        duration-300
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
