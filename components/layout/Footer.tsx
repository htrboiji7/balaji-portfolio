"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/10">
      <div className="mx-auto w-[92%] max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-10"
        >

          {/* Logo */}
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Balaji
          </h2>

          {/* Links */}
          <div className="flex gap-8 text-sm text-neutral-400">
            <a href="#projects" className="hover:text-white transition">
              Projects
            </a>
            <a href="#skills" className="hover:text-white transition">
              Skills
            </a>
            <a href="#services" className="hover:text-white transition">
              Services
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>

        </motion.div>

      </div>
    </footer>
  );
}
