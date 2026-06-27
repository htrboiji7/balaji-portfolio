"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "OpenAI",
  "Gemini",
  "REST APIs",
  "Docker",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-32"
    >
      <div className="mx-auto w-[92%] max-w-7xl">

        <SectionHeading
          eyebrow="Technology"
          title="Skills & Tech Stack"
          description="Modern technologies I use to build scalable software, AI systems and premium digital experiences."
        />

        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

          {skills.map((skill, index) => (

            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .05,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                text-center
                transition-all
                duration-300
              "
            >

              <h3 className="text-lg font-semibold text-white">
                {skill}
              </h3>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}
