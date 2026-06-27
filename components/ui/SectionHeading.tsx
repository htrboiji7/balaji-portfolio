"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.05em] leading-[1.05] text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-neutral-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}
