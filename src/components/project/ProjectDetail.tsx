"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";

type ProjectDetailProps = {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
};

export default function ProjectDetail({
  project,
  previousProject,
  nextProject,
}: ProjectDetailProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>(".project-reveal");

      if (!reveals.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(reveals, {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.set(reveals, {
        opacity: 0,
        y: 28,
      });

      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    try {
      const raw = sessionStorage.getItem("project-transition");

      if (raw) {
        const transition = JSON.parse(raw);

        sessionStorage.setItem(
          "project-back-transition",
          JSON.stringify({
            id: transition.id,
            slug: transition.slug,
            image: transition.image,
            rect: transition.rowRect ?? null,
          }),
        );
      }
    } catch {
      // Ignore storage errors.
    }

    window.dispatchEvent(
      new CustomEvent("app:navigate-with-cover", {
        detail: { href: "/#projects" },
      }),
    );
  };

  return (
    <main
      ref={sectionRef}
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        {/* Back */}
        <button
          type="button"
          data-cursor="open"
          onClick={handleBack}
          className="
            project-reveal
            group
            mb-20
            inline-flex
            items-center
            gap-3
            text-[11px]
            uppercase
            tracking-[0.14em]
            text-[var(--foreground-muted)]
            transition-colors
            duration-300
            hover:text-[var(--foreground)]
          "
        >
          <span
            className="
              transition-transform
              duration-500
              group-hover:-translate-x-1
            "
          >
            ←
          </span>
          Back to projects
        </button>

        {/* ─────────────────────────────────────────────
            PROJECT HERO
        ───────────────────────────────────────────── */}

        <div className="project-reveal mb-16 md:mb-24">
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
            <span>{project.category}</span>

            <span className="h-px w-6 bg-[var(--border-strong)]" />

            <span>{project.year}</span>
          </div>

          <h1
            className="
              max-w-[1200px]
              text-[clamp(3.5rem,10vw,9rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.07em]
              text-[var(--foreground)]
            "
          >
            {project.title}
          </h1>
        </div>

        {/* ─────────────────────────────────────────────
            HERO DESCRIPTION
        ───────────────────────────────────────────── */}

        <div
          className="
            project-reveal
            mb-16
            grid
            grid-cols-1
            gap-8
            md:mb-24
            md:grid-cols-[1fr_320px]
            md:items-end
          "
        >
          <div />

          <div>
            <p
              className="
                text-sm
                leading-relaxed
                text-[var(--foreground-muted)]
                md:text-base
              "
            >
              {project.description}
            </p>

            {project.technologies.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.12em]
                      text-[var(--foreground-subtle)]
                    "
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            HERO COVER

            Satu-satunya `.project-cover-wrapper` di halaman ini —
            jadi target FLIP di PageTransition.tsx (forward & back)
            selalu tepat, tanpa gambar duplikat.

            Image di dalamnya SENGAJA tidak diberi class
            `.project-reveal` agar tidak bentrok dengan FLIP
            transition dari halaman Projects.
        ───────────────────────────────────────────── */}

        <div
          className="
            project-reveal
            project-cover-wrapper
            relative
            aspect-[16/10]
            w-full
            overflow-hidden
            bg-[var(--surface)]
          "
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              transition-transform
              duration-[1600ms]
              ease-out
              hover:scale-[1.015]
            "
          />
        </div>
      </section>

      {/* Overview */}
      {project.overview && (
        <section className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-40">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <span
                className="
                  project-reveal
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--foreground-muted)]
                "
              >
                Overview
              </span>
            </div>

            <p
              className="
                project-reveal
                max-w-3xl
                text-2xl
                leading-[1.3]
                tracking-[-0.04em]
                md:text-4xl
              "
            >
              {project.overview}
            </p>
          </div>
        </section>
      )}

      {/* Case Study */}
      {(project.challenge || project.approach || project.result) && (
        <section
          className="
            border-t
            border-[var(--border)]
          "
        >
          <div className="mx-auto max-w-[1180px] px-6 md:px-8">
            {project.challenge && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  border-b
                  border-[var(--border)]
                  py-16
                  md:grid-cols-[1fr_2fr]
                  md:py-24
                "
              >
                <span
                  className="
                    project-reveal
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--foreground-muted)]
                  "
                >
                  The challenge
                </span>

                <p
                  className="
                    project-reveal
                    max-w-3xl
                    text-xl
                    leading-relaxed
                    tracking-[-0.025em]
                    text-[var(--foreground-muted)]
                    md:text-2xl
                  "
                >
                  {project.challenge}
                </p>
              </div>
            )}

            {project.approach && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  border-b
                  border-[var(--border)]
                  py-16
                  md:grid-cols-[1fr_2fr]
                  md:py-24
                "
              >
                <span
                  className="
                    project-reveal
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--foreground-muted)]
                  "
                >
                  The approach
                </span>

                <p
                  className="
                    project-reveal
                    max-w-3xl
                    text-xl
                    leading-relaxed
                    tracking-[-0.025em]
                    text-[var(--foreground-muted)]
                    md:text-2xl
                  "
                >
                  {project.approach}
                </p>
              </div>
            )}

            {project.result && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  py-16
                  md:grid-cols-[1fr_2fr]
                  md:py-24
                "
              >
                <span
                  className="
                    project-reveal
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--foreground-muted)]
                  "
                >
                  The result
                </span>

                <p
                  className="
                    project-reveal
                    max-w-3xl
                    text-xl
                    leading-relaxed
                    tracking-[-0.025em]
                    text-[var(--foreground-muted)]
                    md:text-2xl
                  "
                >
                  {project.result}
                </p>
              </div>
            )}

            {/* ─────────────────────────────────────────────
                PROJECT GALLERY
            ───────────────────────────────────────────── */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="project-reveal mt-24 md:mt-40">
                <div className="mb-10 flex items-end justify-between border-t border-[var(--border)] pt-6 md:mb-14">
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-[var(--foreground-subtle)]
                    "
                  >
                    Selected Views
                  </span>
                  <span
                    className="
                      text-[10px]
                      tabular-nums
                      tracking-[0.12em]
                      text-[var(--foreground-subtle)]
                    "
                  >
                    {String(project.gallery.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                  {project.gallery.map((image, index) => (
                    <div
                      key={image}
                      className={`
                        group
                        relative
                        overflow-hidden
                        bg-[var(--surface)]
                        ${
                          index === 0
                            ? "aspect-[16/9] md:col-span-2"
                            : "aspect-[4/3]"
                        }
                      `}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} — view ${index + 1}`}
                        fill
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, 1440px"
                        className="
                          object-cover
                          transition-transform
                          duration-[1400ms]
                          ease-out
                          group-hover:scale-[1.02]
                        "
                      />
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-black/[0.02]
                          opacity-0
                          transition-opacity
                          duration-700
                          group-hover:opacity-100
                        "
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          PROJECT NAVIGATION
      ───────────────────────────────────────────── */}
      {(previousProject || nextProject) && (
        <nav
          className="
            project-reveal
            mt-32
            border-t
            border-[var(--border)]
            md:mt-48
          "
          aria-label="Project navigation"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 px-6 md:grid-cols-2 md:px-8">
            {/* Previous */}
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                data-cursor="open"
                className="
                  group
                  border-b
                  border-[var(--border)]
                  py-10
                  md:border-b-0
                  md:border-r
                  md:py-16
                  md:pr-12
                "
              >
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-[var(--foreground-subtle)]
                    "
                  >
                    Previous
                  </span>

                  <span
                    className="
                      transition-transform
                      duration-500
                      group-hover:-translate-x-1
                    "
                  >
                    ←
                  </span>
                </div>

                <div
                  className="
                    text-[clamp(2rem,5vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
                    text-[var(--foreground)]
                    transition-opacity
                    duration-500
                    group-hover:opacity-60
                  "
                >
                  {previousProject.title}
                </div>

                <div
                  className="
                    mt-5
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--foreground-subtle)]
                  "
                >
                  {previousProject.category}
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {/* Next */}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                data-cursor="open"
                className="
                  group
                  py-10
                  md:py-16
                  md:pl-12
                  md:text-right
                "
              >
                <div className="mb-6 flex items-center justify-start gap-3 md:justify-end">
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-[var(--foreground-subtle)]
                    "
                  >
                    Next
                  </span>

                  <span
                    className="
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </div>

                <div
                  className="
                    text-[clamp(2rem,5vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
                    text-[var(--foreground)]
                    transition-opacity
                    duration-500
                    group-hover:opacity-60
                  "
                >
                  {nextProject.title}
                </div>

                <div
                  className="
                    mt-5
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--foreground-subtle)]
                  "
                >
                  {nextProject.category}
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Footer navigation */}
      <section
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
          <Link
            href="/#projects"
            className="
              project-reveal
              group
              block
            "
          >
            <span
              className="
                mb-5
                block
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-[var(--foreground-muted)]
              "
            >
              Continue exploring
            </span>

            <span
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--border)]
                pb-6
                text-[clamp(2.5rem,6vw,5rem)]
                font-medium
                leading-none
                tracking-[-0.06em]
                transition-opacity
                duration-500
                group-hover:opacity-60
              "
            >
              <span>More projects</span>

              <span
                className="
                  text-3xl
                  transition-transform
                  duration-500
                  group-hover:translate-x-2
                "
              >
                →
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
