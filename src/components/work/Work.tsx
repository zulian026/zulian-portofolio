"use client";

import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeProject, setActiveProject] = useState<string | null>(null);

  /*
   * =========================================
   * SCROLL REVEAL
   * =========================================
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * =====================================
       * HEADER
       * =====================================
       */

      const header = section.querySelector(".work-header");

      if (header) {
        gsap.fromTo(
          header,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      /*
       * =====================================
       * CARDS
       * =====================================
       */

      const cards = section.querySelectorAll(".work-card");

      cards.forEach((card) => {
        const image = card.querySelector(".work-image");

        const info = card.querySelector(".work-info");

        const meta = card.querySelector(".work-meta");

        /*
         * CARD
         */

        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );

        /*
         * IMAGE REVEAL
         */

        if (image) {
          gsap.fromTo(
            image,
            {
              clipPath: "inset(0 100% 0 0)",
              scale: 1.08,
            },
            {
              clipPath: "inset(0 0% 0 0)",
              scale: 1,
              duration: 1.35,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        /*
         * INFO
         */

        if (info) {
          gsap.fromTo(
            info,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        /*
         * META
         */

        if (meta) {
          gsap.fromTo(
            meta,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.7,
              delay: 0.25,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            },
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * =========================================
   * HOVER HANDLER
   * =========================================
   */

  const handleProjectEnter = (id: string) => {
    setActiveProject(id);
  };

  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <section
      ref={sectionRef}
      id="work"
      className="
        relative

        w-full

        bg-[var(--background)]

        text-[var(--foreground)]
      "
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <div
        className="
          work-header

          mx-auto

          max-w-[1400px]

          px-6

          pt-28
          pb-20

          md:px-10

          md:pt-36
          md:pb-28

          lg:px-16

          lg:pt-44
          lg:pb-36
        "
      >
        <div
          className="
            flex

            flex-col

            gap-8

            md:flex-row

            md:items-end

            md:justify-between
          "
        >
          <div>
            <p
              className="
                mb-5

                font-mono

                text-[10px]

                font-medium

                tracking-[0.16em]

                text-[var(--foreground-muted)]

                uppercase
              "
            >
              SELECTED WORK
            </p>

            <h2
              className="
                m-0

                font-sans

                text-[clamp(3rem,7vw,7rem)]

                font-medium

                leading-[0.88]

                tracking-[-0.06em]
              "
            >
              Things I&apos;ve
              <br />
              built.
            </h2>
          </div>

          <p
            className="
              max-w-[340px]

              text-sm

              leading-relaxed

              text-[var(--foreground-muted)]

              md:text-right
            "
          >
            A selection of projects, experiments, and digital products I&apos;ve
            worked on.
          </p>
        </div>
      </div>

      {/* =====================================
          PROJECT LIST
      ===================================== */}

      <div
        className="
          mx-auto

          max-w-[1400px]

          px-6

          md:px-10

          lg:px-16
        "
        onMouseLeave={handleProjectLeave}
      >
        {projects.map((project, index) => {
          const isInactive =
            activeProject !== null && activeProject !== project.id;

          return (
            <div
              key={project.id}
              className={`
                  transition-opacity
                  duration-700
                  ease-out

                  ${isInactive ? "opacity-35" : "opacity-100"}
                `}
              onMouseEnter={() => handleProjectEnter(project.id)}
            >
              <WorkCard project={project} index={index} />
            </div>
          );
        })}
      </div>

      {/* =====================================
          BOTTOM SPACE
      ===================================== */}

      <div
        className="
          h-24

          md:h-32

          lg:h-40
        "
      />
    </section>
  );
}
