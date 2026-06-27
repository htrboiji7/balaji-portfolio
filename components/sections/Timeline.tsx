"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const timeline = [
  {
    year: "2024",
    title: "Started Web Development",
    desc: "بدأ learning frontend, HTML, CSS, JavaScript and basic UI design principles.",
  },
  {
    year: "2024",
    title: "React & Next.js",
    desc: "Built modern web apps using React, Next.js and Tailwind CSS.",
  },
  {
    year: "2025",
    title: "Backend & APIs",
    desc: "Worked with Node.js, Express, MongoDB and built scalable APIs.",
  },
  {
    year: "2025",
    title: "AI Integration",
    desc: "Integrated OpenAI APIs and built AI-powered applications and automation tools.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-32">
      <div className="mx-auto w-[92%] max-w-7xl">

        <SectionHeading
          eyebrow="Journey"
          title="Experience Timeline"
          description="A short journey of how I evolved from beginner to building AI systems and full-stack apps."
        />

        <div className="mt-20 relative border-l border-white/10 pl-8 space-y-12">

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >

              {/* Dot */}
              <div className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-white" />

              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {item.year}
              </span>

              <h3 className="mt-2 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-neutral-400 leading-7">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
