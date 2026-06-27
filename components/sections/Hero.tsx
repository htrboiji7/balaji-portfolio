
"use client";

import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.06),transparent_60%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      </div>

      <div className="container relative z-10">

        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
          >

            <Badge>
              Available for Freelance & Full-Time
            </Badge>

            <h1 className="mt-8 text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.92] tracking-[-0.06em]">

              Building AI
              <br />

              Systems,
              <br />

              Automations &
              <br />

              Modern Software.

            </h1>

            <p className="mt-8 max-w-xl text-lg text-neutral-400 leading-8">

              AI Engineer, Full Stack Developer,
              Backend Builder and API Integration
              Specialist crafting premium digital
              experiences with performance,
              scalability and exceptional design.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button>
                View Projects
              </Button>

              <Button variant="secondary">
                Contact Me
              </Button>

            </div>

          </motion.div>

          {/* RIGHT SIDE WILL COME IN PART 2 */}

        </div>

      </div>

    </section>
  );
}
