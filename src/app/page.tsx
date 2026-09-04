import Intro from "@/components/intro/Intro";
import Landing from "@/components/landing/Landing";
import Navbar from "@/components/navbar/Navbar";
import Work from "@/components/work/Work";
import SkillsLoop from "@/components/skills/SkillsLoop";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Projects from "@/components/project/Project";
import Footer from "@/components/footer/Footer";
import Skills from "@/components/about/Skills";

export default function Home() {
  return (
    <main
      id="top"
      className="
        min-h-screen

        bg-[var(--background)]

        text-[var(--foreground)]
      "
    >
      <Navbar />

      {/* HERO */}

      <div
        className="
          landing-reveal

          relative

          min-h-screen
        "
      >
        <Landing />
      </div>

      {/* SKILLS */}

      {/*<SkillsLoop />*/}

      {/* WORK */}

      <Work />

      <About />

      <Skills />

      <Projects />

      <Contact />

      <Footer />

      {/* INTRO */}

      <Intro />
    </main>
  );
}
