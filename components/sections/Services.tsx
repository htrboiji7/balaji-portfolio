'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Full Stack Development',
    description: 'End-to-end product experiences designed for performance, clarity, and long-term maintainability.',
    deliverables: ['Product UI', 'Frontend architecture', 'Design system refinement'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),
    size: 'large',
  },
  {
    title: 'Backend Engineering',
    description: 'Reliable APIs, services, and infrastructure built to support growth without compromising speed.',
    deliverables: ['API design', 'Service orchestration', 'Scalable architecture'],
    technologies: ['Node.js', 'FastAPI', 'PostgreSQL', 'REST APIs'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 7h12" />
        <path d="M6 12h12" />
        <path d="M6 17h8" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'AI Integrations',
    description: 'Thoughtful AI product layers that blend model intelligence with user experience and operational control.',
    deliverables: ['Model integration', 'Tooling layer', 'Prompt flows'],
    technologies: ['OpenAI', 'Gemini', 'LangChain', 'Python'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 4a8 8 0 1 0 8 8" />
        <path d="M13 8c4 0 7 3 7 7" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'API Development',
    description: 'Elegant integrations and developer-facing interfaces with strong contracts and long-term resilience.',
    deliverables: ['SDKs', 'Webhook systems', 'Documentation'],
    technologies: ['TypeScript', 'Node.js', 'FastAPI', 'OpenAPI'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 7h10v10H7z" />
        <path d="M10 10h4v4h-4z" />
      </svg>
    ),
    size: 'medium',
  },
  {
    title: 'Workflow Automation',
    description: 'Operational systems that remove friction and turn repetitive work into reliable, trackable processes.',
    deliverables: ['Automation flows', 'Monitoring', 'Fallback logic'],
    technologies: ['Python', 'Zapier', 'Make', 'API Integration'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 6h8" />
        <path d="M8 18h8" />
        <path d="M8 6v12" />
        <path d="M16 6v12" />
      </svg>
    ),
    size: 'medium',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Deployment pipelines and cloud architecture tuned for speed, safety, and effortless iteration.',
    deliverables: ['CI/CD', 'Container setup', 'Scaling strategy'],
    technologies: ['Docker', 'GitHub Actions', 'Vercel', 'AWS'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 12h14" />
        <path d="M8 8h2" />
        <path d="M8 16h2" />
        <path d="M14 8h2" />
        <path d="M14 16h2" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Performance Optimization',
    description: 'Refinements that sharpen user experience, reduce friction, and raise product quality at every level.',
    deliverables: ['Profiling', 'Speed tuning', 'Reliability improvements'],
    technologies: ['Vercel', 'Redis', 'PostgreSQL', 'Monitoring'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 18V9" />
        <path d="M12 18V5" />
        <path d="M18 18v-6" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Technical Consulting',
    description: 'Strategic guidance for product direction, stack decisions, and engineering execution from first principles.',
    deliverables: ['Roadmaps', 'Architecture reviews', 'Execution planning'],
    technologies: ['System Design', 'Product Strategy', 'AI Strategy', 'Leadership'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
      </svg>
    ),
    size: 'medium',
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '5.5rem 1rem 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="services-shell">
        <div className="services-inner">
          <div className="services-badge">What I Build</div>
          <h2 className="services-title">Engineering <span>Services</span></h2>
          <p className="services-copy">Modern software is designed, built, and scaled with precision — combining thoughtful product strategy, engineering depth, and calm execution from concept to launch.</p>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className={`service-card ${service.size}`}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.56, delay: index * 0.06 }}
                whileHover={{ y: -8, scale: 1.01, rotateX: 2, rotateY: -2 }}
              >
                <div className="service-icon">{service.icon}</div>
                <div className="service-card-header">
                  <h3>{service.title}</h3>
                  <span>Premium</span>
                </div>
                <p>{service.description}</p>
                <div className="service-deliverables">
                  {service.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="service-stack">
                  {service.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <Link href="#contact" className="service-link">
                  Learn More
                  <span>↗</span>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="service-cta"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div>
              <h3>Have an idea?</h3>
              <p>Let’s build something exceptional with the clarity, craft, and momentum your product deserves.</p>
            </div>
            <Link href="#contact" className="service-cta-button">Start a Project</Link>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .services-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .services-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .services-badge {
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

        .services-badge::before {
          content: '';
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #7dd3fc, #a78bfa);
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.16);
          animation: pulseDot 2.6s ease-in-out infinite;
        }

        .services-title {
          font-size: clamp(2.2rem, 4.8vw, 3.15rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 1rem 0 1rem;
          max-width: 44rem;
        }

        .services-title span {
          background: linear-gradient(135deg, #f8fafc 0%, #8b5cf6 55%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .services-copy {
          max-width: 46rem;
          margin: 0 0 2.2rem;
          color: #a1a1aa;
          font-size: 1.02rem;
          line-height: 1.8;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        }

        .service-card {
          position: relative;
          overflow: hidden;
          padding: 1.2rem;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
          backdrop-filter: blur(24px);
          min-height: 18rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.16) 28%, transparent 55%, rgba(255,255,255,0.08) 100%);
          transform: translateX(-120%);
          transition: transform 0.9s ease;
          pointer-events: none;
        }

        .service-card:hover::before {
          transform: translateX(120%);
        }

        .service-card.large { grid-column: span 7; }
        .service-card.medium { grid-column: span 5; }
        .service-card.small { grid-column: span 4; }

        .service-icon {
          width: 3rem;
          height: 3rem;
          display: grid;
          place-items: center;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #f5f5f5;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.07);
          box-shadow: 0 10px 24px rgba(255,255,255,0.08);
        }

        .service-icon svg {
          width: 1.1rem;
          height: 1.1rem;
        }

        .service-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.7rem;
        }

        .service-card-header h3 {
          margin: 0;
          font-size: 1.08rem;
          line-height: 1.2;
          color: #f5f5f5;
        }

        .service-card-header span {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #d4d4d8;
          padding: 0.38rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
        }

        .service-card p {
          margin: 0;
          color: #a1a1aa;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .service-deliverables,
        .service-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .service-deliverables span,
        .service-stack span {
          padding: 0.45rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #f5f5f5;
          font-size: 0.72rem;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: auto;
          width: fit-content;
          color: #f5f5f5;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .service-link:hover {
          transform: translateX(3px);
          color: #d4d4d8;
        }

        .service-link span {
          transition: transform 0.25s ease;
        }

        .service-link:hover span {
          transform: translate(2px, -2px);
        }

        .service-cta {
          margin-top: 1.2rem;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02));
          padding: 1.35rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 44px rgba(0,0,0,0.24);
          backdrop-filter: blur(18px);
        }

        .service-cta h3 {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
          color: #f5f5f5;
        }

        .service-cta p {
          margin: 0;
          color: #a1a1aa;
          line-height: 1.7;
        }

        .service-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 1.1rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #f8fafc, #dbeafe);
          color: #06080d;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 12px 30px rgba(255,255,255,0.16);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .service-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(255,255,255,0.2);
        }

        @media (max-width: 1024px) {
          .service-card.large,
          .service-card.medium,
          .service-card.small { grid-column: span 6; }
        }

        @media (max-width: 768px) {
          .services-shell { padding: 0 0.8rem; }
          .service-card.large,
          .service-card.medium,
          .service-card.small { grid-column: span 12; min-height: auto; }
          .service-cta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
