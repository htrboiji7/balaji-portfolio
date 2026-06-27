import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Skills from "@/components/sections/Skills";
import Architecture from "@/components/sections/Architecture";
import Timeline from "@/components/sections/Timeline";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      <Hero />

      <FeaturedProjects />

      <Skills />

      <Architecture />

      <Timeline />

      <Services />

      <Contact />

      <Footer />
    </main>
  );
}
