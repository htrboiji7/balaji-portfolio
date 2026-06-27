
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

          <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, delay: 0.2 }}
  className="relative hidden lg:flex justify-center items-center"
>
  <div className="relative w-full max-w-[540px] aspect-square">

    {/* Main Glass Card */}

    <div className="absolute inset-0 rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-[0_25px_80px_rgba(0,0,0,.45)]">

      <div className="flex justify-between items-center">

        <span className="text-neutral-500 uppercase tracking-[0.25em] text-xs">
          SYSTEM
        </span>

        <span className="text-white">
          ● Online
        </span>

      </div>

      <div className="mt-10 space-y-5">

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="text-lg font-semibold">
            AI Systems
          </h3>

          <p className="mt-2 text-sm text-neutral-400">
            LLMs, AI Agents & Intelligent Workflows
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="text-lg font-semibold">
            Backend Engineering
          </h3>

          <p className="mt-2 text-sm text-neutral-400">
            APIs, Databases & Scalable Architectures
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="text-lg font-semibold">
            Full Stack
          </h3>

          <p className="mt-2 text-sm text-neutral-400">
            Next.js • TypeScript • Modern UX
          </p>
        </div>

      </div>

    </div>

    {/* Floating Card */}

    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="absolute -top-6 -right-6 rounded-3xl border border-white/10 bg-[#111111]/90 backdrop-blur-xl px-6 py-5"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
        Focus
      </p>

      <h4 className="mt-2 text-xl font-semibold">
        AI + Software
      </h4>
    </motion.div>

    {/* Floating Card */}

    <motion.div
      animate={{
        y: [0, 12, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
      }}
      className="absolute -bottom-6 -left-6 rounded-3xl border border-white/10 bg-[#111111]/90 backdrop-blur-xl px-6 py-5"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
        Stack
      </p>

      <h4 className="mt-2 text-xl font-semibold">
        Next.js • AI • APIs
      </h4>
    </motion.div>

  </div>
</motion.div>

        </div>

      </div>

    </section>
  );
}
