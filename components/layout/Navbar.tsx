'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    const updateActiveLink = () => {
      const sections = ['projects', 'about', 'services', 'contact'];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      setActiveLink(current ? `#${current}` : '/');
    };

    handleScroll();
    updateActiveLink();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveLink);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateActiveLink);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 sm:px-6 lg:px-8">
      <motion.nav
        initial={false}
        animate={{
          y: 0,
          opacity: 1,
          scale: isScrolled ? 0.98 : 1,
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.78)' : 'rgba(10, 10, 10, 0.12)',
          borderColor: isScrolled ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)',
          boxShadow: isScrolled ? '0 24px 60px rgba(0, 0, 0, 0.34)' : '0 0 0 rgba(0, 0, 0, 0)',
          backdropFilter: 'blur(24px)',
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-full border px-4 sm:px-6 lg:h-18 lg:px-8"
      >
        <Link href="/" className="text-lg font-semibold tracking-[-0.02em] text-zinc-50 transition-colors duration-300 hover:text-zinc-300 sm:text-xl">
          Balaji
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <motion.div
                key={link.href}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className="group relative px-1 py-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-zinc-50"
                >
                <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] rounded-full bg-zinc-50 transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.03, boxShadow: '0 12px 30px rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="hidden rounded-full bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_0_30px_rgba(255,255,255,0.13)] transition-all duration-300 hover:bg-zinc-200 sm:inline-flex"
          >
            Let&apos;s Talk
          </motion.a>

          <motion.button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-end bg-black/60 px-3 py-3 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full max-w-sm flex-col rounded-[2rem] border border-white/10 bg-zinc-950/90 p-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-50">Menu</span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-50"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-3" aria-label="Mobile navigation">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base font-medium text-zinc-200 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950"
              >
                Let&apos;s Talk
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
