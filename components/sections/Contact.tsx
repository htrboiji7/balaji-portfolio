"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="mx-auto w-[92%] max-w-7xl">

        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Build Something"
          description="Have an idea, project or opportunity? Let's connect and create something premium together."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            mt-20
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-2xl
            p-12
            text-center
          "
        >
          <p className="text-neutral-400 max-w-2xl mx-auto leading-7">
            I’m currently available for freelance work, collaborations and full-time opportunities.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              Email Me
            </Button>

            <Button variant="secondary">
              View Resume
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
