'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircleMore,
  Sparkles,
} from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormTouched = Partial<Record<keyof FormValues, boolean>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
};

const infoCards = [
  {
    title: 'Availability',
    text: 'Available for freelance & collaboration',
    icon: <Sparkles size={18} />,
  },
  {
    title: 'Response Time',
    text: 'Usually replies within 24 hours',
    icon: <Clock3 size={18} />,
  },
  {
    title: 'Location',
    text: 'India • Remote-friendly worldwide',
    icon: <MapPin size={18} />,
  },
  {
    title: 'Preferred Communication',
    text: 'Email, LinkedIn, GitHub',
    icon: <MessageCircleMore size={18} />,
  },
];

const socialCards = [
  {
    title: 'GitHub',
    description: 'Open-source work, experiments and product builds',
    href: 'https://github.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 19c-5 1.5-5-2.5-7-3" />
        <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    description: 'Professional background and collaborative opportunities',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        <path d="M5 10h2v10H5z" />
        <path d="M11 10h2v1.5h.03c.28-.53 1.01-1.08 2.08-1.08 2.23 0 4.19 1.46 4.19 4.61V20h-2v-8.93c0-2.13-.04-4.88-2.97-4.88-2.98 0-3.43 2.32-3.43 4.72V20h-2z" />
      </svg>
    ),
  },
  {
    title: 'Email',
    description: 'Best for detailed project conversations',
    href: 'mailto:hello@balaji.dev',
    icon: <Mail size={18} />,
  },
  {
    title: 'X',
    description: 'Thoughts around product, AI and engineering',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 5h2l-6.7 7.7L22 19h-5.2l-4.1-5.4L7.8 19H5.7l6.5-7.4L2 5h5.3l3.8 5L18 5Z" />
      </svg>
    ),
  },
];

const projectTypes = ['Product Design', 'Full Stack Build', 'AI Product', 'Automation', 'Backend System', 'Consulting'];

function validateField(name: keyof FormValues, value: string): string | undefined {
  if (name === 'name' && !value.trim()) return 'Please share your name.';
  if (name === 'email') {
    if (!value.trim()) return 'An email helps me reply quickly.';
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) return 'Please enter a valid email.';
  }
  if (name === 'message' && !value.trim()) return 'A short project summary helps a lot.';
  return undefined;
}

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {};
    (Object.keys(nextValues) as Array<keyof FormValues>).forEach((field) => {
      if (field === 'company' || field === 'budget' || field === 'projectType') return;
      const message = validateField(field, nextValues[field]);
      if (message) nextErrors[field] = message;
    });
    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;
    const nextValues = { ...values, [fieldName]: value };
    setValues(nextValues);
    setIsSubmitted(false);

    if (touched[fieldName]) {
      const fieldError = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = event.target;
    const fieldName = name as keyof FormValues;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const fieldError = validateField(fieldName, values[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues(initialValues);
      setTouched({});
    }, 1100);
  };

  return (
    <section id="contact" style={{ padding: '5.5rem 1rem 6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="contact-shell">
        <div className="contact-glow one" />
        <div className="contact-glow two" />
        <div className="contact-glow three" />

        <motion.div
          className="contact-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-badge">
            <span className="contact-dot" />
            Let&apos;s Connect
          </div>
          <h2 className="contact-title">Let&apos;s Build Something Exceptional.</h2>
          <p className="contact-copy">Inviting startups, recruiters, founders and collaborators who want thoughtful digital experiences built with care.</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-left"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24, filter: 'blur(8px)' }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="info-stack">
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className="info-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.01, boxShadow: '0 18px 40px rgba(255,255,255,0.08)' }}
                >
                  <div className="info-icon">{card.icon}</div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-stack">
              {socialCards.map((card, index) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={card.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="social-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 42px rgba(255,255,255,0.09)' }}
                >
                  <div className="social-icon">{card.icon}</div>
                  <div className="social-copy">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <span className="social-arrow">↗</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24, filter: 'blur(8px)' }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field-row">
                <div className={`field ${errors.name ? 'error' : ''}`}>
                  <input id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder=" " autoComplete="name" />
                  <label htmlFor="name">Name</label>
                  <span className="field-line" />
                </div>
                <div className={`field ${errors.email ? 'error' : ''}`}>
                  <input id="email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder=" " autoComplete="email" />
                  <label htmlFor="email">Email</label>
                  <span className="field-line" />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <input id="company" name="company" value={values.company} onChange={handleChange} onBlur={handleBlur} placeholder=" " autoComplete="organization" />
                  <label htmlFor="company">Company</label>
                  <span className="field-line" />
                </div>
                <div className="field">
                  <select id="projectType" name="projectType" value={values.projectType} onChange={handleChange} onBlur={handleBlur}>
                    <option value="" />
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="projectType">Project Type</label>
                  <span className="field-line" />
                </div>
              </div>

              <div className="field">
                <input id="budget" name="budget" value={values.budget} onChange={handleChange} onBlur={handleBlur} placeholder=" " autoComplete="off" />
                <label htmlFor="budget">Budget</label>
                <span className="field-line" />
              </div>

              <div className={`field textarea ${errors.message ? 'error' : ''}`}>
                <textarea id="message" name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} placeholder=" " rows={5} />
                <label htmlFor="message">Message</label>
                <span className="field-line" />
              </div>

              <div className="form-footer">
                <motion.button
                  type="submit"
                  className="submit-button"
                  whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01, boxShadow: '0 18px 44px rgba(125,211,252,0.2)' }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Sending…
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle2 size={18} />
                      Sent Successfully
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
                <p className="form-hint">Prefer a direct note? hello@balaji.dev</p>
              </div>

              <div className="form-status" aria-live="polite">
                {isSubmitted && 'Thanks — your note is ready for follow-up and I’ll reply soon.'}
                {!isSubmitted && Object.keys(errors).length > 0 && 'A few details will help me respond with the right context.'}
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="contact-cta"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h3>Have an ambitious idea?</h3>
            <p>Let&apos;s turn it into a real product with clarity, craft and momentum.</p>
          </div>
          <a href="mailto:hello@balaji.dev" className="cta-button">
            Book a Call
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .contact-shell {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          padding: 0 1rem;
        }

        .contact-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
        }

        .contact-glow.one { width: 18rem; height: 18rem; background: rgba(125, 211, 252, 0.26); top: -3rem; left: -2rem; }
        .contact-glow.two { width: 16rem; height: 16rem; background: rgba(167, 139, 250, 0.2); top: 12rem; right: -2rem; }
        .contact-glow.three { width: 14rem; height: 14rem; background: rgba(255,255,255,0.16); bottom: 4rem; left: 38%; }

        .contact-header {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto 2rem;
          text-align: center;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.6rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.05);
          color: #d4d4d8;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
        }

        .contact-dot {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #7dd3fc, #a78bfa);
          box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.16);
          animation: pulseDot 2.6s ease-in-out infinite;
        }

        .contact-title {
          margin: 1rem 0 0.9rem;
          font-size: clamp(2.2rem, 4.4vw, 3.4rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #f8fafc;
        }

        .contact-copy {
          margin: 0;
          color: #a1a1aa;
          font-size: 1.03rem;
          line-height: 1.8;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 1.15rem;
          align-items: start;
          margin-top: 2.2rem;
        }

        .contact-left,
        .contact-form-panel,
        .contact-cta {
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
          backdrop-filter: blur(24px);
          border-radius: 32px;
        }

        .contact-left {
          padding: 1.2rem;
        }

        .info-stack,
        .social-stack {
          display: grid;
          gap: 0.8rem;
        }

        .info-card,
        .social-card {
          position: relative;
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
          padding: 1rem 1rem;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }

        .info-card::before,
        .social-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.16), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .info-card:hover::before,
        .social-card:hover::before {
          transform: translateX(100%);
        }

        .info-icon,
        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 999px;
          color: #f8fafc;
          background: linear-gradient(135deg, rgba(125, 211, 252, 0.18), rgba(167, 139, 250, 0.16));
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .info-card h3,
        .social-card h3 {
          margin: 0 0 0.2rem;
          font-size: 0.97rem;
          color: #f8fafc;
        }

        .info-card p,
        .social-card p {
          margin: 0;
          color: #a1a1aa;
          font-size: 0.92rem;
          line-height: 1.65;
        }

        .social-card {
          text-decoration: none;
          color: inherit;
          justify-content: space-between;
        }

        .social-copy {
          flex: 1;
        }

        .social-arrow {
          color: #f8fafc;
          font-size: 1rem;
          transition: transform 0.25s ease;
        }

        .social-card:hover .social-arrow {
          transform: translate(3px, -3px);
        }

        .contact-form-panel {
          padding: 1.2rem;
        }

        .contact-form {
          display: grid;
          gap: 1rem;
        }

        .field-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.85rem;
        }

        .field {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .field textarea,
        .field input,
        .field select {
          width: 100%;
          appearance: none;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: #f8fafc;
          border-radius: 18px;
          padding: 1rem 1rem 0.9rem;
          font: inherit;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          backdrop-filter: blur(16px);
          min-height: 3.2rem;
        }

        .field textarea {
          resize: vertical;
          min-height: 8.2rem;
          padding-top: 1.3rem;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: transparent;
        }

        .field:hover input,
        .field:hover textarea,
        .field:hover select {
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.06);
        }

        .field:focus-within input,
        .field:focus-within textarea,
        .field:focus-within select {
          border-color: rgba(125, 211, 252, 0.5);
          box-shadow: 0 0 0 1px rgba(125, 211, 252, 0.14), 0 0 24px rgba(125, 211, 252, 0.12);
          background: rgba(255,255,255,0.07);
        }

        .field label {
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #a1a1aa;
          pointer-events: none;
          transition: transform 0.25s ease, color 0.25s ease, top 0.25s ease;
          transform-origin: left center;
          background: transparent;
        }

        .field:focus-within label,
        .field input:not(:placeholder-shown) + label,
        .field textarea:not(:placeholder-shown) + label,
        .field select:not([value='']) + label,
        .field select:focus + label {
          transform: translateY(-0.78rem) scale(0.82);
          color: #e2e8f0;
          top: 0;
        }

        .field-line {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }

        .field:focus-within .field-line {
          transform: scaleX(1);
        }

        .field.error input,
        .field.error textarea,
        .field.error select {
          border-color: rgba(251, 113, 133, 0.55);
          box-shadow: 0 0 0 1px rgba(251, 113, 133, 0.14);
        }

        .field.error label {
          color: #fda4af;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.25rem;
          flex-wrap: wrap;
        }

        .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          border: none;
          border-radius: 999px;
          padding: 0.95rem 1.2rem;
          font-weight: 700;
          color: #04070b;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          box-shadow: 0 14px 32px rgba(255,255,255,0.12);
          cursor: pointer;
          min-width: 11.6rem;
        }

        .submit-button:hover {
          transform: translateY(-2px);
        }

        .submit-button:focus-visible {
          outline: 2px solid rgba(125, 211, 252, 0.8);
          outline-offset: 4px;
        }

        .spinner {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 999px;
          border: 2px solid rgba(4,7,11,0.25);
          border-top-color: rgba(4,7,11,0.85);
          animation: spin 0.8s linear infinite;
        }

        .form-hint {
          margin: 0;
          color: #a1a1aa;
          font-size: 0.9rem;
        }

        .form-status {
          min-height: 1.2rem;
          color: #cbd5e1;
          font-size: 0.92rem;
        }

        .contact-cta {
          position: relative;
          z-index: 1;
          margin-top: 1.15rem;
          padding: 1.35rem 1.35rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          overflow: hidden;
        }

        .contact-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0.08), transparent 50%, rgba(125,211,252,0.12));
          pointer-events: none;
        }

        .contact-cta h3 {
          margin: 0 0 0.35rem;
          color: #f8fafc;
          font-size: 1.12rem;
        }

        .contact-cta p {
          margin: 0;
          color: #a1a1aa;
          line-height: 1.7;
          max-width: 38rem;
        }

        .cta-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.9rem 1.1rem;
          border-radius: 999px;
          color: #f8fafc;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.08);
        }

        .cta-button:focus-visible {
          outline: 2px solid rgba(125, 211, 252, 0.7);
          outline-offset: 4px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .contact-left,
          .contact-form-panel,
          .contact-cta {
            border-radius: 24px;
          }

          .field-row {
            grid-template-columns: 1fr;
          }

          .contact-cta {
            flex-direction: column;
            align-items: flex-start;
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
