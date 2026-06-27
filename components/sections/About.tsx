'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const milestones = [
  {
    year: '2018',
    title: 'Started Programming',
    description: 'Learning how ideas become software through curiosity, persistence, and a lot of small experiments.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 6h10" />
        <path d="M7 10h10" />
        <path d="M7 14h6" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    year: '2019',
    title: 'Built First Project',
    description: 'Turning early concepts into something real taught me the value of shipping, iterating, and refining.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 7h14" />
        <path d="M8 7v10" />
        <path d="M16 7v10" />
        <path d="M5 17h14" />
      </svg>
    ),
  },
  {
    year: '2020',
    title: 'Explored Backend',
    description: 'Moving beyond the surface helped me respect the systems that support every polished interface.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 8h12" />
        <path d="M6 12h8" />
        <path d="M6 16h10" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    year: '2022',
    title: 'Started AI Development',
    description: 'Working with intelligent systems introduced a new kind of product thinking: fast feedback, deeper reasoning, richer interfaces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 4a8 8 0 1 0 8 8" />
        <path d="M13 8c4 0 7 3 7 7" />
      </svg>
    ),
  },
  {
    year: '2024',
    title: 'Learning Cloud & DevOps',
    description: 'Understanding deployment, reliability, and infrastructure made each build more thoughtful and durable.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 12h14" />
        <path d="M8 8h2" />
        <path d="M8 16h2" />
        <path d="M14 8h2" />
        <path d="M14 16h2" />
      </svg>
    ),
  },
  {
    year: 'Now',
    title: 'Building Production Ready Systems',
    description: 'The focus is clear: build software that feels effortless, scales with care, and solves real problems well.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 18V9" />
        <path d="M12 18V5" />
        <path d="M18 18v-6" />
      </svg>
    ),
  },
];

const principles = [
  'Think in Systems',
  'Build with Purpose',
  'Performance Matters',
  'Design for Scale',
  'Never Stop Learning',
];

export default function About() {
  return (
    <section id="about" style={{ padding: '5.5rem 1rem 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="about-shell">
        <div className="about-inner">
          <div className="about-badge">About Me</div>
          <div className="about-grid">
            <motion.div
              className="about-story"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="about-title">Building Systems, <span>Not Just Websites.</span></h2>
              <p className="about-copy">
                I care about building software that feels considered from the first interaction to the final deployment. The goal is never just to ship a screen; it is to create something that works beautifully, scales with purpose, and leaves a lasting impression.
              </p>
              <p className="about-copy secondary">
                My approach is shaped by curiosity, systems thinking, and a deep respect for performance. I enjoy solving complex problems in a way that feels calm, clear, and intentional — whether that means refining user experience, designing robust architecture, or bringing AI into real products.
              </p>
              <div className="about-links">
                <Link href="#projects" className="about-link">View work</Link>
                <Link href="#contact" className="about-link alt">Let’s talk</Link>
              </div>
            </motion.div>

            <motion.div
              className="about-panel"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="about-panel-header">
                <div className="about-panel-title">Engineering Principles</div>
                <div className="about-panel-pill">Philosophy</div>
              </div>
              <div className="about-principles">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle}
                    className="about-principle"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.08 * index }}
                    whileHover={{ y: -3, scale: 1.01, boxShadow: '0 16px 36px rgba(255,255,255,0.08)' }}
                  >
                    <span>◌</span>
                    {principle}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="timeline-shell">
            <div className="timeline-line" />
            <div className="timeline-list">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.06 * index, ease: 'easeOut' }}
                  whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 48px rgba(0,0,0,0.28)' }}
                >
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-content">
                    <div className="timeline-meta">
                      <span>{item.year}</span>
                      <span className="timeline-dot" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="about-quote"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p>“I believe the best software is not just functional — it should feel effortless.”</p>
            <span>— Balaji</span>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .about-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .about-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .about-badge {
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
        }

        .about-badge::before {
          content: '';
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #7dd3fc, #a78bfa);
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.16);
          animation: pulseDot 2.6s ease-in-out infinite;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 1.2rem;
          margin-top: 1.4rem;
          align-items: start;
        }

        .about-story,
        .about-panel {
          position: relative;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
          backdrop-filter: blur(24px);
          padding: 1.6rem;
          overflow: hidden;
        }

        .about-story::before,
        .about-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.16) 30%, transparent 55%, rgba(255,255,255,0.08) 100%);
          opacity: 0.7;
          pointer-events: none;
        }

        .about-title {
          margin: 0 0 1rem;
          font-size: clamp(2rem, 4vw, 2.9rem);
          line-height: 0.98;
          letter-spacing: -0.04em;
          max-width: 34rem;
        }

        .about-title span {
          background: linear-gradient(135deg, #f8fafc 0%, #8b5cf6 55%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-copy {
          margin: 0 0 1rem;
          color: #c7c7cc;
          font-size: 1rem;
          line-height: 1.9;
          max-width: 38rem;
        }

        .about-copy.secondary {
          color: #a1a1aa;
        }

        .about-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 1.2rem;
        }

        .about-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1rem;
          border-radius: 999px;
          text-decoration: none;
          color: #f5f5f5;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .about-link:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
        }

        .about-link.alt {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #06080d;
        }

        .about-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.7rem;
          margin-bottom: 1rem;
        }

        .about-panel-title {
          font-size: 1rem;
          font-weight: 700;
          color: #f5f5f5;
        }

        .about-panel-pill {
          padding: 0.4rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: #d4d4d8;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .about-principles {
          display: grid;
          gap: 0.7rem;
        }

        .about-principle {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.85rem 0.95rem;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: #f5f5f5;
          font-weight: 600;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .about-principle span {
          color: #7dd3fc;
          font-size: 1rem;
        }

        .timeline-shell {
          position: relative;
          margin-top: 1.4rem;
          padding: 0.2rem 0 0.2rem 1rem;
        }

        .timeline-line {
          position: absolute;
          left: 1rem;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.06));
          box-shadow: 0 0 20px rgba(125, 211, 252, 0.12);
        }

        .timeline-list {
          display: grid;
          gap: 0.9rem;
        }

        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          box-shadow: 0 16px 44px rgba(0,0,0,0.2);
          backdrop-filter: blur(18px);
          margin-left: 1rem;
        }

        .timeline-icon {
          width: 2.7rem;
          height: 2.7rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          display: grid;
          place-items: center;
          color: #f5f5f5;
        }

        .timeline-icon svg {
          width: 1rem;
          height: 1rem;
        }

        .timeline-content h3 {
          margin: 0 0 0.35rem;
          font-size: 1rem;
          color: #f5f5f5;
        }

        .timeline-content p {
          margin: 0;
          color: #a1a1aa;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .timeline-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.25rem;
          color: #d4d4d8;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.72rem;
        }

        .timeline-dot {
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: #7dd3fc;
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.14);
        }

        .about-quote {
          margin-top: 1.2rem;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          padding: 1.4rem 1.5rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 44px rgba(0,0,0,0.24);
          backdrop-filter: blur(18px);
        }

        .about-quote p {
          margin: 0 0 0.45rem;
          font-size: clamp(1.05rem, 2.2vw, 1.25rem);
          color: #f5f5f5;
          line-height: 1.7;
        }

        .about-quote span {
          color: #a1a1aa;
          font-size: 0.92rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .about-shell { padding: 0 0.8rem; }
          .timeline-shell { padding-left: 0.7rem; }
          .timeline-line { left: 0.7rem; }
          .timeline-item { margin-left: 0.7rem; }
          .about-links { flex-direction: column; }
          .about-link { width: 100%; }
        }
      `}</style>
    </section>
  );
}
