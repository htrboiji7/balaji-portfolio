"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const projects = [
  {
    title: "AI SaaS Platform",
    category: "Artificial Intelligence",
    description:
      "Production-ready AI platform with authentication, payments, AI workflows and scalable architecture.",
    size: "large",
  },
  {
    title: "Automation Suite",
    category: "Workflow Automation",
    description:
      "Automating business operations through APIs and intelligent workflows.",
    size: "small",
  },
  {
    title: "Developer Toolkit",
    category: "Full Stack",
    description:
      "Modern developer experience focused on speed, scalability and clean engineering.",
    size: "small",
  },
  {
    title: "Backend Infrastructure",
    category: "Architecture",
    description:
      "Scalable backend systems built for high performance and reliability.",
    size: "wide",
  },
];

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="relative py-32"
    >
      <div className="mx-auto w-[92%] max-w-7xl">

        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          description="A curated collection of AI systems, backend architectures and modern software engineered with performance and premium user experience."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project, index) => (

            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                p-8
                transition-all
                duration-500

                ${
                  project.size === "large"
                    ? "lg:col-span-2 lg:row-span-2 min-h-[520px]"
                    : project.size === "wide"
                    ? "lg:col-span-2 min-h-[260px]"
                    : "min-h-[250px]"
                }
              `}
            >

              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                {project.category}
              </span>

              <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">
                {project.title}
              </h3>

              <p className="mt-5 max-w-md leading-8 text-neutral-400">
                {project.description}
              </p>

              <div className="mt-10 flex items-center gap-2 text-white">

                View Case Study

                <motion.span
                  whileHover={{
                    x: 5,
                  }}
                >
                  →
                </motion.span>

              </div>

              <div className="absolute inset-0 rounded-[32px] border border-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            </motion.article>

          ))}

        </div>

      </div>

    </section>
  );
}
