"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const services = [
  {
    title: "AI Development",
    desc: "Building intelligent systems using OpenAI, automation workflows, and custom AI tools.",
  },
  {
    title: "Full Stack Development",
    desc: "Modern web applications using Next.js, React, TypeScript and scalable backend systems.",
  },
  {
    title: "Backend Engineering",
    desc: "Secure APIs, database design, authentication systems, and scalable server architecture.",
  },
  {
    title: "UI Engineering",
    desc: "Premium UI design with focus on performance, accessibility and modern user experience.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32">
      <div className="mx-auto w-[92%] max-w-7xl">

        <SectionHeading
          eyebrow="What I Do"
          title="Services"
          description="High-quality engineering services focused on AI, scalability and modern web experiences."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2">

          {services.map((service, i) => (
            <motion.div
              key={service.title}
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
                transition-all
              "
            >
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="mt-4 text-neutral-400 leading-7">
                {service.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
