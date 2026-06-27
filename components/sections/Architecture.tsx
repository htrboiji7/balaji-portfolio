"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const layers = [
  {
    title: "Frontend Layer",
    desc: "Next.js 14 App Router, TypeScript, Tailwind UI, Framer Motion animations.",
  },
  {
    title: "API Layer",
    desc: "REST APIs, server actions, secure routes, authentication handling.",
  },
  {
    title: "Backend Layer",
    desc: "Node.js services, scalable architecture, microservice-ready structure.",
  },
  {
    title: "Data Layer",
    desc: "PostgreSQL / MongoDB with Prisma ORM and optimized queries.",
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="py-32">
      <div className="mx-auto w-[92%] max-w-7xl">

        <SectionHeading
          eyebrow="System Design"
          title="Architecture"
          description="How the system is structured from frontend to database with scalability in mind."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2">

          {layers.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-10
              "
            >
              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-4 text-neutral-400 leading-7">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
