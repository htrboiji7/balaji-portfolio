"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const projects = [
  {
    title: "AI SaaS Platform",
    category: "Artificial Intelligence",
    description:
      "Production-ready AI platform with modern architecture, authentication, payments and intelligent workflows.",
    size: "large",
  },
  {
    title: "Automation Suite",
    category: "Workflow",
    description:
      "End-to-end business automation powered by APIs and AI.",
    size: "small",
  },
  {
    title: "Developer Toolkit",
    category: "Full Stack",
    description:
      "Modern engineering tools built with scalability in mind.",
    size: "small",
  },
  {
    title: "Backend Infrastructure",
    category: "Architecture",
    description:
      "Scalable backend systems engineered for high performance.",
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
          description="A curated collection of systems, AI applications and modern software engineered with scalability, performance and refined user experience."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
