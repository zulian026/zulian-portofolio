"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

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
      const header = section.querySelector(".projects-header");

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
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      const rows = section.querySelectorAll(".project-row");

      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        w-full
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1400px]
          px-6
          py-28
          md:px-10
          md:py-40
          lg:px-16
          lg:py-52
        "
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            projects-header
            mb-12
            border-t
            border-[var(--border)]
            pt-4
            md:mb-16
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.16em]
                uppercase
                text-[var(--foreground-muted)]
              "
            >
              PROJECTS
            </span>

            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.16em]
                uppercase
                text-[var(--foreground-muted)]
              "
            >
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div
            className="
              mt-12
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <h2
              className="
                m-0
                font-sans
                text-[clamp(3rem,7vw,7rem)]
                font-medium
                leading-[0.88]
                tracking-[-0.065em]
              "
            >
              Other things
              <br />
              I&apos;ve built.
            </h2>

            <p
              className="
                max-w-[340px]
                text-sm
                leading-[1.7]
                text-[var(--foreground-muted)]
                md:text-right
              "
            >
              A broader collection of projects, experiments, and ideas explored
              along the way.
            </p>
          </div>
        </div>

        {/* =====================================
            COLUMN LABEL
        ===================================== */}

        <div
          className="
            hidden
            grid-cols-[60px_1fr_180px_100px_40px]
            gap-6
            border-b
            border-[var(--border)]
            pb-3
            md:grid
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground-subtle)]
            "
          >
            NO.
          </span>

          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground-subtle)]
            "
          >
            PROJECT
          </span>

          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground-subtle)]
            "
          >
            CATEGORY
          </span>

          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground-subtle)]
            "
          >
            YEAR
          </span>
        </div>

        {/* =====================================
            PROJECT LIST
        ===================================== */}

        <div>
          {projects.map((project, index) => {
            const content = (
              <>
                {/* NUMBER */}

                <span
                  className="
                      font-mono
                      text-[9px]
                      tracking-[0.1em]
                      text-[var(--foreground-subtle)]
                    "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* PROJECT */}

                <div
                  className="
                      min-w-0
                    "
                >
                  <span
                    className="
                        block
                        truncate
                        font-sans
                        text-xl
                        font-medium
                        tracking-[-0.03em]
                        text-[var(--foreground)]
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:translate-x-1
                        md:text-2xl
                        lg:text-3xl
                      "
                  >
                    {project.title}
                  </span>

                  <span
                    className="
                        mt-2
                        block
                        truncate
                        text-xs
                        text-[var(--foreground-muted)]
                        md:hidden
                      "
                  >
                    {project.category}
                    {" · "}
                    {project.year}
                  </span>
                </div>

                {/* CATEGORY */}

                <span
                  className="
                      hidden
                      font-mono
                      text-[9px]
                      tracking-[0.12em]
                      uppercase
                      text-[var(--foreground-muted)]
                      md:block
                    "
                >
                  {project.category}
                </span>

                {/* YEAR */}

                <span
                  className="
                      hidden
                      font-mono
                      text-[9px]
                      tracking-[0.12em]
                      text-[var(--foreground-muted)]
                      md:block
                    "
                >
                  {project.year}
                </span>

                {/* ARROW */}

                <span
                  className="
                      flex
                      items-center
                      justify-end
                      text-sm
                      text-[var(--foreground-muted)]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:translate-x-1
                    "
                >
                  ↗
                </span>
              </>
            );

            return project.href ? (
              <a
                key={project.id}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="
                    project-row
                    group
                    grid
                    grid-cols-[30px_1fr_auto]
                    items-center
                    gap-4
                    border-b
                    border-[var(--border)]
                    py-6
                    no-underline
                    transition-opacity
                    duration-500
                    hover:opacity-70
                    md:grid-cols-[60px_1fr_180px_100px_40px]
                    md:gap-6
                    md:py-7
                  "
              >
                {content}
              </a>
            ) : (
              <div
                key={project.id}
                className="
                    project-row
                    grid
                    grid-cols-[30px_1fr_auto]
                    items-center
                    gap-4
                    border-b
                    border-[var(--border)]
                    py-6
                    md:grid-cols-[60px_1fr_180px_100px_40px]
                    md:gap-6
                    md:py-7
                  "
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* =====================================
            FOOTNOTE
        ===================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground-subtle)]
            "
          >
            {projects.length} PROJECTS
          </span>

          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground-subtle)]
            "
          >
            END OF LIST
          </span>
        </div>
      </div>
    </section>
  );
}
