"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-6 flex w-[92%] max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-2xl">

        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Balaji
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-neutral-400 transition-all duration-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="rounded-full border border-white/10 bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:scale-105">
          Resume
        </button>
      </div>
    </motion.header>
  );
}
