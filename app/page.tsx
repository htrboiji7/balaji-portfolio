'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Services from '@/components/sections/Services';

function MagneticLink({ href, className, children, ...rest }: Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> & { children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={className}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const offsetX = (x / rect.width - 0.5) * 6;
        const offsetY = (y / rect.height - 0.5) * 6;
        setOffset({ x: offsetX, y: offsetY });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={prefersReducedMotion ? { x: 0, y: 0, scale: 1 } : { x: offset.x, y: offset.y, scale: 1 }}
      whileHover={prefersReducedMotion ? { y: -3, scale: 1.01 } : { y: -3, scale: 1.01, boxShadow: '0 18px 42px rgba(255,255,255,0.14)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.8 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReducedMotion = useReducedMotion();
  const revealTransition = { duration: prefersReducedMotion ? 0.01 : 0.72, ease: [0.22, 1, 0.36, 1] as const };
  const cursorTransition = { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.7 };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createProjectImage = (title: string, accent: string, secondary: string) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 780">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${accent}" />
            <stop offset="100%" stop-color="${secondary}" />
          </linearGradient>
        </defs>
        <rect width="1200" height="780" rx="36" fill="#06080d"/>
        <rect x="40" y="40" width="1120" height="700" rx="28" fill="url(#g)" opacity="0.96"/>
        <rect x="70" y="90" width="1060" height="620" rx="24" fill="#030508" opacity="0.76"/>
        <circle cx="980" cy="180" r="110" fill="white" opacity="0.16"/>
        <circle cx="260" cy="646" r="180" fill="white" opacity="0.08"/>
        <path d="M220 540c90-140 230-230 380-230 110 0 220 48 320 138" stroke="white" stroke-width="16" stroke-linecap="round" opacity="0.24"/>
        <rect x="140" y="164" width="420" height="168" rx="24" fill="white" opacity="0.12"/>
        <rect x="600" y="228" width="300" height="24" rx="12" fill="white" opacity="0.22"/>
        <rect x="600" y="270" width="220" height="18" rx="9" fill="white" opacity="0.14"/>
        <rect x="140" y="370" width="300" height="18" rx="9" fill="white" opacity="0.16"/>
        <rect x="140" y="404" width="360" height="16" rx="8" fill="white" opacity="0.12"/>
        <rect x="140" y="438" width="248" height="16" rx="8" fill="white" opacity="0.12"/>
        <text x="140" y="620" fill="white" font-family="Inter, Segoe UI, sans-serif" font-size="72" font-weight="700">${title}</text>
      </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const filters = ['All', 'AI', 'Full Stack', 'Backend', 'Automation', 'API', 'Open Source'];

  const projects = [
    {
      title: 'Orbit AI Studio',
      category: 'AI',
      description: 'A premium workspace for teams to orchestrate multi-agent workflows, automate support, and ship product insights in real time.',
      status: 'Live • 24/7 monitoring',
      image: createProjectImage('Orbit AI Studio', '#6ee7ff', '#818cf8'),
      tags: ['Next.js', 'OpenAI', 'FastAPI', 'PostgreSQL'],
      actions: ['Live Demo', 'GitHub', 'Case Study'],
      size: 'large',
      accent: 'linear-gradient(135deg, rgba(110,231,255,0.16), rgba(129,140,248,0.18))',
    },
    {
      title: 'Northstar Commerce',
      category: 'Full Stack',
      description: 'A polished commerce layer blending headless storefronts, automated fulfillment, and analytics for ambitious retail brands.',
      status: 'In production',
      image: createProjectImage('Northstar Commerce', '#f59e0b', '#fb7185'),
      tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      actions: ['Live Demo', 'GitHub', 'Case Study'],
      size: 'medium',
      accent: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(251,113,133,0.16))',
    },
    {
      title: 'Signal Forge',
      category: 'Backend',
      description: 'An event-driven data platform built for resilient pipelines, observability, and high-throughput processing at scale.',
      status: 'Stable release',
      image: createProjectImage('Signal Forge', '#34d399', '#14b8a6'),
      tags: ['Python', 'Docker', 'Redis', 'AWS'],
      actions: ['Live Demo', 'GitHub', 'Case Study'],
      size: 'small',
      accent: 'linear-gradient(135deg, rgba(52,211,153,0.16), rgba(20,184,166,0.16))',
    },
    {
      title: 'Cortex Integrations',
      category: 'API',
      description: 'An integration gateway that connects CRMs, billing systems, and internal tools with reliability and auditability.',
      status: 'Open beta',
      image: createProjectImage('Cortex Integrations', '#a78bfa', '#60a5fa'),
      tags: ['FastAPI', 'Vercel', 'Tailwind', 'Framer Motion'],
      actions: ['Live Demo', 'GitHub', 'Case Study'],
      size: 'wide',
      accent: 'linear-gradient(135deg, rgba(167,139,250,0.16), rgba(96,165,250,0.16))',
    },
    {
      title: 'Loop Ledger',
      category: 'Automation',
      description: 'Automated finance operations designed to reduce manual work, enforce controls, and reveal momentum instantly.',
      status: 'Self-hosted',
      image: createProjectImage('Loop Ledger', '#f472b6', '#8b5cf6'),
      tags: ['TypeScript', 'GitHub', 'Docker', 'Gemini'],
      actions: ['Live Demo', 'GitHub', 'Case Study'],
      size: 'medium',
      accent: 'linear-gradient(135deg, rgba(244,114,182,0.16), rgba(139,92,246,0.16))',
    },
  ];

  const filteredProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);

  const skillGroups = [
    {
      title: 'Frontend',
      description: 'Interfaces that feel instant, polished, and unmistakably premium.',
      size: 'large',
      items: [
        { name: 'React', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 3 7v5c0 4.4 2.9 8.5 9 9 6.1-.5 9-4.6 9-9V7l-9-4Z"/><path d="M8 12h8"/></svg> },
        { name: 'Next.js', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.5 3.5 6 19.5h3.5l8.5-16Z"/><path d="M17 19.5h1.5"/></svg> },
        { name: 'TypeScript', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16v12H4z"/><path d="M8 10h3v6H8z"/><path d="M13 10h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/></svg> },
        { name: 'Tailwind CSS', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 4c2 0 3 1 4 3s2 3 4 3c1 0 2-.7 2-2 0-2-2-3-4-3H6Z"/><path d="M6 20c2 0 3-1 4-3s2-3 4-3c1 0 2 .7 2 2 0 2-2 3-4 3H6Z"/></svg> },
        { name: 'Framer Motion', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v8H8l12 8H4V4Z"/></svg> },
      ],
    },
    {
      title: 'Backend',
      description: 'Reliable systems, clean APIs, and production-ready architecture.',
      size: 'small',
      items: [
        { name: 'Node.js', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="M8 9.5h8"/><path d="M8 14.5h5"/></svg> },
        { name: 'Express', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 5h14v14H5z"/><path d="M8 10h8"/><path d="M8 14h5"/></svg> },
        { name: 'FastAPI', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 4h6l-1 6H8l1-6Z"/><path d="M7 10h10l-1 10H8L7 10Z"/></svg> },
        { name: 'REST APIs', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8h12"/><path d="M6 16h12"/><path d="M9 6v12"/><path d="M15 6v12"/></svg> },
        { name: 'WebSockets', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7h14"/><path d="M5 17h14"/><path d="M8 7v10"/><path d="M16 7v10"/></svg> },
      ],
    },
    {
      title: 'AI',
      description: 'Practical AI systems shaped by product context and engineering rigor.',
      size: 'small',
      items: [
        { name: 'OpenAI', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4a8 8 0 1 0 8 8"/><path d="M13 8c4 0 7 3 7 7"/></svg> },
        { name: 'Gemini', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16"/><path d="M4 8l16 8"/><path d="M4 16l16-8"/></svg> },
        { name: 'LangChain', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h12v12H6z"/><path d="M9 9h6v6H9z"/></svg> },
        { name: 'Prompt Engineering', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 8h10"/><path d="M7 12h7"/><path d="M7 16h4"/></svg> },
      ],
    },
    {
      title: 'Automation',
      description: 'Workflow systems that remove friction and make operations feel effortless.',
      size: 'small',
      items: [
        { name: 'Python', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h4c2 0 3 1 3 3v2c0 2-1 3-3 3H8c-2 0-3 1-3 3v2c0 2 1 3 3 3h4"/><path d="M16 4h-4c-2 0-3 1-3 3v2c0 2 1 3 3 3h4c2 0 3 1 3 3v2c0 2-1 3-3 3h-4"/></svg> },
        { name: 'Workflow Automation', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 6h8"/><path d="M8 18h8"/><path d="M8 6v12"/><path d="M16 6v12"/></svg> },
        { name: 'API Integration', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8h12"/><path d="M6 16h12"/><path d="M8 6v4"/><path d="M16 14v4"/></svg> },
      ],
    },
    {
      title: 'Cloud & DevOps',
      description: 'Deployment pipelines, containers, and infrastructure that scale with confidence.',
      size: 'large',
      items: [
        { name: 'Docker', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h12"/><path d="M8 8h2"/><path d="M8 16h2"/><path d="M12 8h2"/><path d="M12 16h2"/><path d="M16 8h2"/></svg> },
        { name: 'GitHub Actions', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 6h8"/><path d="M8 18h8"/><path d="M12 6v12"/></svg> },
        { name: 'Vercel', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 4 8 14H4l8-14Z"/></svg> },
        { name: 'AWS', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4 5 8l7 4 7-4-7-4Z"/><path d="M5 8v8l7 4 7-4V8"/></svg> },
      ],
    },
    {
      title: 'Data & Tools',
      description: 'A focused toolchain for ship-ready delivery, versioning, and collaborative design.',
      size: 'small',
      items: [
        { name: 'PostgreSQL', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 5h10"/><path d="M9 5v14"/><path d="M15 5v14"/><path d="M7 19h10"/></svg> },
        { name: 'MongoDB', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4c-2 0-4 1-4 4v8c0 3 2 4 4 4s4-1 4-4V8c0-3-2-4-4-4Z"/><path d="M8 8c0 2 1 3 4 3s4-1 4-3"/></svg> },
        { name: 'Redis', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16"/><path d="M6 7c3 2 9 2 12 0"/><path d="M6 17c3-2 9-2 12 0"/></svg> },
        { name: 'Git', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M8 7l8 10"/></svg> },
        { name: 'GitHub', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
        { name: 'VS Code', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m4 6 6-2 4 4 6-3v12l-6 3-4-4-6 2V6Z"/><path d="m10 12 4-3"/></svg> },
        { name: 'Figma', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4a3 3 0 0 0 0 6h2V4H8Z"/><path d="M10 10a3 3 0 0 0 0 6h2v-6h-2Z"/><path d="M10 4h2a3 3 0 0 1 0 6h-2V4Z"/><path d="M10 16a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg> },
      ],
    },
  ];

  const skills = [
    ['AI Systems', 'LLMs', 'RAG', 'Fine-tuning'],
    ['Backend', 'Python', 'Node.js', 'Go', 'PostgreSQL'],
    ['Frontend', 'React', 'Next.js', 'TypeScript', 'Tailwind'],
    ['Infrastructure', 'AWS', 'Docker', 'CI/CD', 'Terraform'],
  ];

  const services = [
    {
      title: 'AI Product Design',
      description: 'From prototype to production, I design AI products that are reliable, scalable, and delightful to use.',
    },
    {
      title: 'Full Stack Development',
      description: 'I build polished product experiences and performant backends with modern tooling and architecture.',
    },
    {
      title: 'Automation & Integrations',
      description: 'I connect systems, automate workflows, and reduce operational friction with robust integrations.',
    },
    {
      title: 'Backend Optimization',
      description: 'I improve speed, stability, and maintainability for services handling complex business logic.',
    },
  ];

  return (
    <main className="page-shell">
      <motion.div className="scroll-progress" animate={{ scaleX: scrollProgress || 0.001 }} transition={{ duration: 0.2, ease: 'easeOut' }} />
      <div className="ambient-orb one" />
      <div className="ambient-orb two" />
      <div className="ambient-orb three" />
      <motion.div className="cursor-glow" animate={prefersReducedMotion ? { opacity: 0 } : { x: mouse.x, y: mouse.y, opacity: 0.7 }} transition={cursorTransition} />
      <motion.div className="cursor-ring" animate={prefersReducedMotion ? { opacity: 0 } : { x: mouse.x, y: mouse.y, opacity: 0.9 }} transition={cursorTransition} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: linear-gradient(135deg, #06080d 0%, #080b12 40%, #05060b 100%);
          color: #F5F5F5;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, -20px, 0) scale(1.05); }
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.65; }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.4deg); }
        }

        @keyframes floatCardAlt {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-1.2deg); }
        }

        @keyframes textReveal {
          from { opacity: 0; transform: translateY(18px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .page-shell {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(110, 174, 255, 0.09), transparent 24%),
            radial-gradient(circle at 90% 0%, rgba(187, 130, 255, 0.08), transparent 22%),
            radial-gradient(circle at 50% 100%, rgba(51, 205, 255, 0.06), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(8,11,18,0.2) 100%),
            #06080d;
          color: #F5F5F5;
          isolation: isolate;
        }

        .page-shell::before {
          content: '';
          position: fixed;
          inset: -20%;
          background:
            radial-gradient(circle at 30% 20%, rgba(80, 120, 255, 0.11), transparent 24%),
            radial-gradient(circle at 70% 10%, rgba(255,255,255,0.06), transparent 18%),
            radial-gradient(circle at 50% 100%, rgba(100, 200, 255, 0.08), transparent 28%);
          filter: blur(70px);
          opacity: 0.6;
          z-index: -2;
          animation: drift 24s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .page-shell::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95), transparent 85%);
          opacity: 0.04;
          pointer-events: none;
          z-index: -1;
        }

        .ambient-orb {
          position: fixed;
          border-radius: 999px;
          filter: blur(80px);
          opacity: 0.08;
          pointer-events: none;
          z-index: -1;
          animation: drift 18s ease-in-out infinite alternate;
        }

        .ambient-orb.one { width: 16rem; height: 16rem; background: rgba(101, 163, 255, 0.35); top: 8%; left: -2rem; }
        .ambient-orb.two { width: 14rem; height: 14rem; background: rgba(182, 130, 255, 0.25); top: 40%; right: -2rem; animation-duration: 24s; }
        .ambient-orb.three { width: 12rem; height: 12rem; background: rgba(96, 218, 255, 0.2); bottom: 10%; left: 20%; animation-duration: 20s; }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(120,140,255,0.7));
          box-shadow: 0 0 18px rgba(255,255,255,0.25);
          z-index: 80;
          pointer-events: none;
          will-change: transform;
        }

        .cursor-glow,
        .cursor-ring {
          display: none;
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 999;
        }

        .cursor-glow {
          width: 220px;
          height: 220px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
          filter: blur(24px);
          opacity: 0.65;
        }

        .cursor-ring {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }

        .hover-lift {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
        }

        .btn-primary {
          background: linear-gradient(135deg, #F5F5F5 0%, #E7E7E7 100%);
          color: #06080d;
          border: 1px solid rgba(255,255,255,0.5);
          padding: 0.95rem 1.3rem;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
          box-shadow: 0 10px 30px rgba(255,255,255,0.12);
          will-change: transform, box-shadow;
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 16px 40px rgba(255,255,255,0.2);
          background: linear-gradient(135deg, #ffffff 0%, #ececec 100%);
        }

        .btn-secondary {
          background: rgba(255,255,255,0.04);
          color: #F5F5F5;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.95rem 1.3rem;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          backdrop-filter: blur(18px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          will-change: transform, box-shadow;
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 14px 36px rgba(255,255,255,0.08);
        }

        .nav-link {
          color: #F5F5F5;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .nav-link:hover { color: #D9D9D9; }

        .surface-card {
          position: relative;
          background: linear-gradient(145deg, rgba(20,20,20,0.88), rgba(18,18,18,0.72));
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 16px 44px rgba(0,0,0,0.28);
          backdrop-filter: blur(24px);
        }

        .surface-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent 35%, rgba(255,255,255,0.05));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.8;
        }

        .surface-card:hover {
          transform: translateY(-6px);
          background: linear-gradient(145deg, rgba(24,24,24,0.95), rgba(20,20,20,0.8));
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem;
        }

        .section-copy {
          color: #A3A3A3;
          font-size: 1rem;
          margin: 0 0 2rem;
          max-width: 42rem;
        }

        section[id] {
          position: relative;
        }

        section[id]::before {
          content: '';
          position: absolute;
          inset: 0 0 auto 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
          opacity: 0.8;
          pointer-events: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .cursor-glow,
          .cursor-ring {
            display: block;
          }
        }

        .skills-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem 6rem;
        }

        .skills-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .skills-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          color: #d4d4d8;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
          animation: fadeInUp 0.75s ease-out both;
        }

        .skills-badge::before {
          content: '';
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #7dd3fc, #a78bfa);
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.16);
          animation: pulseDot 2.6s ease-in-out infinite;
        }

        .skills-title {
          font-size: clamp(2.2rem, 4.8vw, 3.15rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 1rem 0 1rem;
          max-width: 46rem;
        }

        .skills-title span {
          background: linear-gradient(135deg, #f8fafc 0%, #8b5cf6 50%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .skills-copy {
          max-width: 46rem;
          margin: 0 0 2.1rem;
          color: #a1a1aa;
          font-size: 1.02rem;
          line-height: 1.8;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        }

        .skill-card {
          position: relative;
          overflow: hidden;
          padding: 1.2rem;
          border-radius: 28px;
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
          backdrop-filter: blur(24px);
          min-height: 16rem;
          will-change: transform, box-shadow;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.18) 30%, transparent 52%, rgba(255,255,255,0.08) 100%);
          opacity: 0.65;
          transform: translateX(-120%);
          transition: transform 0.9s ease;
          pointer-events: none;
        }

        .skill-card:hover {
          transform: translateY(-8px) scale(1.008) rotateX(1.5deg) rotateY(-1.2deg);
          border-color: rgba(255,255,255,0.26);
          box-shadow: 0 36px 90px rgba(0,0,0,0.36);
        }

        .skill-card:hover::before {
          transform: translateX(120%);
        }

        .skill-card.large { grid-column: span 7; }
        .skill-card.small { grid-column: span 5; }

        .skill-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
        }

        .skill-card-title {
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #f5f5f5;
        }

        .skill-card-pill {
          display: inline-flex;
          padding: 0.4rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: #d4d4d8;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .skill-card-copy {
          margin: 0 0 1rem;
          color: #a1a1aa;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .skill-logo-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .skill-logo {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: #f5f5f5;
          font-size: 0.77rem;
          font-weight: 600;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .skill-logo:hover {
          transform: translateY(-2px) scale(1.03) rotate(-1deg);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 10px 24px rgba(255,255,255,0.08);
        }

        .skill-logo svg {
          width: 0.95rem;
          height: 0.95rem;
          flex: 0 0 auto;
        }

        .skill-cta {
          margin-top: 1.2rem;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          padding: 1.25rem 1.3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 44px rgba(0,0,0,0.24);
          backdrop-filter: blur(18px);
        }

        .skill-cta h3 {
          margin: 0 0 0.25rem;
          font-size: 1.08rem;
        }

        .skill-cta p {
          margin: 0;
          color: #a1a1aa;
          font-size: 0.95rem;
        }

        .skill-cta a {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.85rem 1.05rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #06080d;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 12px 30px rgba(255,255,255,0.16);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .skill-cta a:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(255,255,255,0.2);
        }

        @media (max-width: 1024px) {
          .skill-card.large,
          .skill-card.small { grid-column: span 6; }
        }

        @media (max-width: 768px) {
          .btn-primary, .btn-secondary { width: 100%; }
          .hero-shell { padding: 0 1rem 3.5rem; }
          .hero-title { font-size: clamp(2.3rem, 8vw, 3.1rem); }
          .hero-dashboard { min-height: 22rem; }
          .hero-card.one { width: 48%; min-height: 6.4rem; }
          .hero-card.two { width: 40%; min-height: 6.6rem; }
          .hero-card.three { width: 48%; min-height: 6.4rem; }
          .hero-card.four { width: 40%; min-height: 6.2rem; }
        }

        @media (max-width: 640px) {
          .desktop-nav { display: none; }
          .hero-shell { min-height: auto; }
          .hero-dashboard { min-height: 19rem; margin-top: 1rem; }
          .hero-card.one, .hero-card.two, .hero-card.three, .hero-card.four { position: relative; width: 100%; left: auto; right: auto; top: auto; bottom: auto; margin-bottom: 0.75rem; }
          .hero-dashboard { display: flex; flex-direction: column; gap: 0.8rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, -20px, 0) scale(1.05); }
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.65; }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.4deg); }
        }

        @keyframes floatCardAlt {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-1.2deg); }
        }

        @keyframes textReveal {
          from { opacity: 0; transform: translateY(18px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .hero-shell {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          padding: 0 1rem 2.5rem;
          background:
            radial-gradient(circle at 10% 10%, rgba(255,255,255,0.08), transparent 28%),
            radial-gradient(circle at 90% 0%, rgba(255,255,255,0.06), transparent 18%),
            linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(10,10,10,0.3) 100%),
            #0A0A0A;
        }

        .hero-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.95), transparent 85%);
          opacity: 0.16;
          pointer-events: none;
        }

        .hero-shell::after {
          content: '';
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(255,255,255,0.08), transparent 45%);
          filter: blur(90px);
          opacity: 0.18;
          pointer-events: none;
          animation: drift 16s ease-in-out infinite;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.2;
          pointer-events: none;
          animation: drift 18s ease-in-out infinite alternate;
        }

        .hero-glow.one { width: 18rem; height: 18rem; background: rgba(255,255,255,0.2); top: 6%; right: -4rem; }
        .hero-glow.two { width: 16rem; height: 16rem; background: rgba(255,255,255,0.12); bottom: 8%; left: -3rem; animation-duration: 22s; }
        .hero-glow.three { width: 12rem; height: 12rem; background: rgba(255,255,255,0.08); bottom: 20%; right: 10%; animation-duration: 20s; }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          opacity: 0.18;
          pointer-events: none;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.45) 100%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px);
          color: #D4D4D4;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .hero-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 999px;
          background: #5CFF96;
          box-shadow: 0 0 0 0 rgba(92,255,150,0.6);
          animation: pulseDot 1.8s infinite;
        }

        .hero-line {
          display: block;
          animation: textReveal 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-line-1 { animation-delay: 0.08s; }
        .hero-line-2 { animation-delay: 0.16s; }
        .hero-line-3 { animation-delay: 0.24s; }
        .hero-line-4 { animation-delay: 0.32s; }

        .hero-title-gradient {
          background: linear-gradient(120deg, #F5F5F5 0%, #D4D4D4 32%, #8C8C8C 66%, #F5F5F5 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        .hero-title-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }

        .hero-subtitle {
          max-width: 40rem;
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.8;
          color: #A3A3A3;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 1.8rem;
        }

        .hero-actions a {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .hero-actions a::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%);
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }

        .hero-actions a:hover::after {
          transform: translateX(120%);
        }

        .hero-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-top: 1.5rem;
        }

        .hero-socials a {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #F5F5F5;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .hero-socials a:hover {
          transform: translateY(-2px) rotate(2deg);
          border-color: rgba(255,255,255,0.25);
          box-shadow: 0 8px 24px rgba(255,255,255,0.08);
        }

        .hero-dashboard {
          position: relative;
          min-height: 30rem;
          border-radius: 1.5rem;
          padding: 1.2rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(24px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.4);
          overflow: hidden;
        }

        .hero-dashboard::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0.08), transparent 35%, rgba(255,255,255,0.03) 70%, transparent);
          pointer-events: none;
        }

        .hero-card {
          position: absolute;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(20,20,20,0.75);
          backdrop-filter: blur(16px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.24);
          padding: 1rem;
        }

        .hero-card.small { animation: floatCard 8s ease-in-out infinite; }
        .hero-card.alt { animation: floatCardAlt 9s ease-in-out infinite; }

        .hero-card.one { top: 8%; left: 8%; width: 44%; min-height: 7rem; }
        .hero-card.two { top: 18%; right: 8%; width: 38%; min-height: 8rem; }
        .hero-card.three { bottom: 15%; left: 12%; width: 46%; min-height: 8rem; }
        .hero-card.four { bottom: 10%; right: 8%; width: 34%; min-height: 7rem; }

        .hero-card-title {
          font-size: 0.78rem;
          color: #A3A3A3;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .hero-card-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: #F5F5F5;
        }

        .hero-card-pill {
          display: inline-flex;
          gap: 0.4rem;
          align-items: center;
          padding: 0.35rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          font-size: 0.75rem;
          color: #E6E6E6;
          margin-top: 0.6rem;
        }

        .scroll-indicator {
          position: absolute;
          left: 50%;
          bottom: 1.2rem;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          color: #A3A3A3;
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .scroll-mouse {
          width: 1.8rem;
          height: 2.8rem;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          display: grid;
          place-items: center;
          animation: bounce 2s infinite;
        }

        .scroll-mouse::after {
          content: '';
          width: 0.24rem;
          height: 0.7rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.7);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .desktop-nav {
          display: flex;
          gap: 1.25rem;
        }

        .project-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem 6.5rem;
        }

        .project-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .project-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          color: #d4d4d8;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
          animation: fadeInUp 0.7s ease-out both;
        }

        .project-badge::before {
          content: '';
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #7dd3fc, #a78bfa);
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.16);
          animation: pulseDot 2.6s ease-in-out infinite;
        }

        .project-title {
          font-size: clamp(2.25rem, 5vw, 3.35rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 1rem 0 1rem;
          max-width: 42rem;
        }

        .project-title span {
          background: linear-gradient(135deg, #f8fafc 0%, #8b5cf6 45%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-copy {
          max-width: 44rem;
          color: #a1a1aa;
          font-size: 1.02rem;
          margin: 0 0 2rem;
          line-height: 1.8;
        }

        .project-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-bottom: 1.4rem;
        }

        .project-filter {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          color: #e4e4e7;
          padding: 0.7rem 0.95rem;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          backdrop-filter: blur(18px);
        }

        .project-filter:hover,
        .project-filter.active {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 12px 30px rgba(255,255,255,0.08);
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        }

        .project-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.1rem;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
          backdrop-filter: blur(26px);
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, border-color 0.35s ease;
          will-change: transform, box-shadow;
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.16), transparent 40%, rgba(255,255,255,0.06));
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .project-card:hover {
          transform: translateY(-10px) scale(1.01) rotateX(2deg) rotateY(-2deg);
          border-color: rgba(255,255,255,0.28);
          box-shadow: 0 36px 90px rgba(0,0,0,0.36);
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card.large { grid-column: span 7; min-height: 30rem; }
        .project-card.medium { grid-column: span 5; min-height: 26rem; }
        .project-card.small { grid-column: span 4; min-height: 24rem; }
        .project-card.wide { grid-column: span 8; min-height: 24rem; }

        .project-media {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.12);
          min-height: 13.5rem;
          background: rgba(255,255,255,0.03);
        }

        .project-card:hover .project-media img {
          transform: scale(1.06);
        }

        .project-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
          transform-origin: center;
        }

        .project-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.44) 100%);
          pointer-events: none;
        }

        .project-media::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.2) 30%, transparent 55%, rgba(255,255,255,0.14) 100%);
          opacity: 0.6;
          transform: translateX(-120%);
          transition: transform 0.9s ease;
          pointer-events: none;
        }

        .project-card:hover .project-media::before {
          transform: translateX(120%);
        }

        .project-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .project-category {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4d4d8;
          padding: 0.45rem 0.65rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .project-status {
          font-size: 0.8rem;
          color: #a1a1aa;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .project-status::before {
          content: '';
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 999px;
          background: #34d399;
          box-shadow: 0 0 0 4px rgba(52,211,153,0.16);
        }

        .project-card h3 {
          margin: 0;
          font-size: 1.18rem;
          line-height: 1.2;
          color: #f5f5f5;
        }

        .project-card p {
          margin: 0;
          color: #a1a1aa;
          line-height: 1.75;
          font-size: 0.95rem;
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .project-stack span {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.65rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.045);
          color: #f5f5f5;
          font-size: 0.73rem;
          white-space: nowrap;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .project-card:hover .project-stack span {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 8px 18px rgba(255,255,255,0.06);
        }

        .project-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: auto;
          padding-top: 0.2rem;
        }

        .project-actions a {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.7rem 0.95rem;
          border-radius: 999px;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          letter-spacing: 0.01em;
        }

        .project-actions a:hover {
          transform: translateY(-2px) scale(1.01);
        }

        .project-actions a::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }

        .project-actions a:hover::after {
          transform: translateX(120%);
        }

        .project-actions .primary {
          background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(233,233,233,0.92));
          color: #04070d;
          box-shadow: 0 12px 30px rgba(255,255,255,0.12);
        }

        .project-actions .secondary {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          color: #f5f5f5;
        }

        .project-actions .ghost {
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: #e4e4e7;
        }

        .project-cta {
          margin-top: 1.2rem;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 44px rgba(0,0,0,0.24);
          backdrop-filter: blur(18px);
        }

        .project-cta h3 {
          margin: 0 0 0.3rem;
          font-size: 1.25rem;
        }

        .project-cta p {
          margin: 0;
          color: #a1a1aa;
        }

        .project-cta a {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.9rem 1.15rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #06080d;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 12px 30px rgba(255,255,255,0.16);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .project-cta a:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
          .btn-primary, .btn-secondary { width: 100%; }
          .hero-shell { padding: 0 1rem 3.5rem; }
          .hero-title { font-size: clamp(2.3rem, 8vw, 3.1rem); }
          .hero-dashboard { min-height: 22rem; }
          .hero-card.one { width: 48%; min-height: 6.4rem; }
          .hero-card.two { width: 40%; min-height: 6.6rem; }
          .hero-card.three { width: 48%; min-height: 6.4rem; }
          .hero-card.four { width: 40%; min-height: 6.2rem; }
        }

        @media (max-width: 640px) {
          .desktop-nav { display: none; }
          .hero-shell { min-height: auto; }
          .hero-dashboard { min-height: 19rem; margin-top: 1rem; }
          .hero-card.one, .hero-card.two, .hero-card.three, .hero-card.four { position: relative; width: 100%; left: auto; right: auto; top: auto; bottom: auto; margin-bottom: 0.75rem; }
          .hero-dashboard { display: flex; flex-direction: column; gap: 0.8rem; }
        }
      `}</style>

      <Navbar />

      <motion.section
        className="hero-shell"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-glow one" />
        <div className="hero-glow two" />
        <div className="hero-glow three" />
        <div className="hero-noise" />
        <div className="hero-vignette" />

        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 1, paddingTop: '3rem' }}>
          <div style={{ display: 'grid', gap: '2.4rem', alignItems: 'center', gridTemplateColumns: '1.1fr 0.9fr' }}>
            <div style={{ maxWidth: '44rem', paddingTop: '2rem' }}>
              <div className="hero-badge fade-in-up" style={{ animationDelay: '0.05s' }}>
                <span className="hero-dot" />
                Available for freelance
              </div>

              <h1 className="hero-title-gradient" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.6rem)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '1.2rem 0 1rem', fontWeight: 700 }}>
                <span className="hero-line hero-line-1">Building</span>
                <span className="hero-line hero-line-2 hero-title-outline">AI Systems,</span>
                <span className="hero-line hero-line-3">Automations &</span>
                <span className="hero-line hero-line-4">Modern Software.</span>
              </h1>

              <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
                I design and ship premium AI products, backend systems, and automation platforms for founders who want software that feels as sharp as the company behind it.
              </p>

              <div className="hero-actions fade-in-up" style={{ animationDelay: '0.3s' }}>
                <MagneticLink href="#projects" className="btn-primary">View Projects</MagneticLink>
                <MagneticLink href="#contact" className="btn-secondary">Contact Me</MagneticLink>
              </div>

              <div className="hero-socials fade-in-up" style={{ animationDelay: '0.35s' }}>
                {[
                  { href: 'https://github.com', label: 'GitHub', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
                  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/><path d="M5 10h2v10H5z"/><path d="M11 10h2v1.5h.03c.28-.53 1.01-1.08 2.08-1.08 2.23 0 4.19 1.46 4.19 4.61V20h-2v-8.93c0-2.13-.04-4.88-2.97-4.88-2.98 0-3.43 2.32-3.43 4.72V20h-2z"/></svg> },
                  { href: 'mailto:hello@balaji.dev', label: 'Email', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z"/><path d="m4 8 8 6 8-6"/></svg> },
                  { href: 'https://x.com', label: 'Twitter', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 5h2l-6.7 7.7L22 19h-5.2l-4.1-5.4L7.8 19H5.7l6.5-7.4L2 5h5.3l3.8 5L18 5Z"/></svg> }
                ].map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="hero-dashboard">
                <div className="hero-card small one">
                  <div className="hero-card-title">AI Systems</div>
                  <div className="hero-card-value">Llama + RAG</div>
                  <div className="hero-card-pill">Realtime • Secure</div>
                </div>
                <div className="hero-card alt two">
                  <div className="hero-card-title">Integrations</div>
                  <div className="hero-card-value">50+ APIs connected</div>
                  <div className="hero-card-pill">Stable • Observable</div>
                </div>
                <div className="hero-card small three">
                  <div className="hero-card-title">Automation</div>
                  <div className="hero-card-value">Workflow orchestration</div>
                  <div className="hero-card-pill">Fast • Reliable</div>
                </div>
                <div className="hero-card alt four">
                  <div className="hero-card-title">Stack</div>
                  <div className="hero-card-value">Next.js • TS • Docker • AWS</div>
                  <div className="hero-card-pill">Modern • Scalable</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse" />
          <span>Scroll to Explore</span>
        </div>
      </motion.section>

      <section id="projects" style={{ padding: '5.5rem 1rem 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="project-shell">
          <div className="project-inner">
            <motion.div
              className="project-badge"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Featured Work
            </motion.div>
            <motion.h2
              className="project-title"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Selected <span>Projects</span>
            </motion.h2>
            <motion.p
              className="project-copy"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              A curated set of product experiences designed for clarity, speed, and enduring quality — from AI-native platforms to resilient infrastructure and automation layers.
            </motion.p>

            <motion.div className="project-filters" aria-label="Project categories" initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  type="button"
                  className={`project-filter${activeFilter === filter ? ' active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>

            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className={`project-card ${project.size}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.58, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={prefersReducedMotion ? undefined : { y: -10, scale: 1.01, rotateX: 2, rotateY: -2 }}
                  style={{ background: project.accent }}
                >
                  <div className="project-media">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                  <div className="project-topline">
                    <span className="project-category">{project.category}</span>
                    <span className="project-status">{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-stack">
                    {project.tags.map((tag) => {
                      const iconMap: Record<string, ReactNode> = {
                        'Next.js': <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.5 3.5 6 19.5h3.5l8.5-16Z"/><path d="M17 19.5h1.5"/></svg>,
                        React: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 3 7v5c0 4.4 2.9 8.5 9 9 6.1-.5 9-4.6 9-9V7l-9-4Z"/><path d="M8 12h8"/></svg>,
                        TypeScript: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16v12H4z"/><path d="M8 10h3v6H8z"/><path d="M13 10h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/></svg>,
                        'Node.js': <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="M8 9.5h8"/><path d="M8 14.5h5"/></svg>,
                        Python: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h4c2 0 3 1 3 3v2c0 2-1 3-3 3H8c-2 0-3 1-3 3v2c0 2 1 3 3 3h4"/><path d="M16 4h-4c-2 0-3 1-3 3v2c0 2 1 3 3 3h4c2 0 3 1 3 3v2c0 2-1 3-3 3h-4"/></svg>,
                        FastAPI: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 4h6l-1 6H8l1-6Z"/><path d="M7 10h10l-1 10H8L7 10Z"/></svg>,
                        OpenAI: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4a8 8 0 1 0 8 8"/><path d="M13 8c4 0 7 3 7 7"/></svg>,
                        Gemini: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16"/><path d="M4 8l16 8"/><path d="M4 16l16-8"/></svg>,
                        Docker: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h12"/><path d="M8 8h2"/><path d="M8 16h2"/><path d="M12 8h2"/><path d="M12 16h2"/><path d="M16 8h2"/></svg>,
                        MongoDB: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4c-2 0-4 1-4 4v8c0 3 2 4 4 4s4-1 4-4V8c0-3-2-4-4-4Z"/><path d="M8 8c0 2 1 3 4 3s4-1 4-3"/></svg>,
                        PostgreSQL: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 5h10"/><path d="M9 5v14"/><path d="M15 5v14"/><path d="M7 19h10"/></svg>,
                        Redis: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16"/><path d="M6 7c3 2 9 2 12 0"/><path d="M6 17c3-2 9-2 12 0"/></svg>,
                        AWS: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4 5 8l7 4 7-4-7-4Z"/><path d="M5 8v8l7 4 7-4V8"/></svg>,
                        GitHub: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3"/><path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
                        Vercel: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 4 8 14H4l8-14Z"/></svg>,
                        Tailwind: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 4c2 0 3 1 4 3s2 3 4 3c1 0 2-.7 2-2 0-2-2-3-4-3H6Z"/><path d="M6 20c2 0 3-1 4-3s2-3 4-3c1 0 2 .7 2 2 0 2-2 3-4 3H6Z"/></svg>,
                        'Framer Motion': <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v8H8l12 8H4V4Z"/></svg>,
                      };
                      return (
                        <span key={tag}>
                          {iconMap[tag]}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div className="project-actions">
                    <a className="primary" href="#contact">Live Demo</a>
                    <a className="secondary" href="#contact">GitHub</a>
                    <a className="ghost" href="#contact">Case Study</a>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="project-cta" style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
              <div>
                <h3>Interested in working together?</h3>
                <p>Let’s build an experience that feels as refined as the product behind it.</p>
              </div>
              <MagneticLink href="#contact">Let’s build</MagneticLink>
            </div>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '5.5rem 1rem 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="skills-shell">
          <div className="skills-inner">
            <div className="skills-badge">Technical Expertise</div>
            <h2 className="skills-title">Technology <span>Ecosystem</span></h2>
            <p className="skills-copy">A deliberate stack built for clarity, speed, and reliability — spanning product interfaces, backend systems, AI delivery, and the infrastructure behind modern software.</p>

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  className={`skill-card ${group.size}`}
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  whileHover={{ y: -8, scale: 1.01, rotateX: 2, rotateY: -2 }}
                >
                  <div className="skill-card-header">
                    <div className="skill-card-title">{group.title}</div>
                    <div className="skill-card-pill">Core</div>
                  </div>
                  <p className="skill-card-copy">{group.description}</p>
                  <div className="skill-logo-grid">
                    {group.items.map((item) => (
                      <div key={item.name} className="skill-logo" title={item.name}>
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="skill-cta" style={{ animation: 'fadeInUp 0.8s ease-out 0.35s both' }}>
              <div>
                <h3>Interested in collaborating?</h3>
                <p>Let’s build modern software that feels as refined as the product behind it.</p>
              </div>
              <MagneticLink href="#contact">Start a conversation</MagneticLink>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <About />
      <Contact />

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 1rem 2rem', color: '#A3A3A3', textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>© 2024 Balaji. Crafted for modern digital experiences.</div>
      </footer>
    </main>
  );
}
