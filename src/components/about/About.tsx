"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccordionGallery from "@/components/about/AccordionGallery";

import Skills from "./Skills";

import { aboutData } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(".about-reveal");
      const statementLines = gsap.utils.toArray<HTMLElement>(
        ".about-statement-line",
      );
      const principles = gsap.utils.toArray<HTMLElement>(".about-principle");
      const currentlyItems = gsap.utils.toArray<HTMLElement>(
        ".about-currently-item",
      );
      const educationItems =
        gsap.utils.toArray<HTMLElement>(".about-education");
      const certificateItems =
        gsap.utils.toArray<HTMLElement>(".about-certificate");
      const profile = section.querySelector<HTMLElement>(".about-profile");

      if (prefersReducedMotion) {
        gsap.set(
          [
            ...revealElements,
            ...statementLines,
            ...principles,
            ...currentlyItems,
            ...educationItems,
            ...certificateItems,
          ],
          { opacity: 1, y: 0 },
        );
        if (profile) gsap.set(profile, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      /*
       * =====================================
       * INITIAL STATE
       * — smaller offsets = smoother, less
       *   "jumpy" reveal on scroll
       * =====================================
       */

      gsap.set(revealElements, { opacity: 0, y: 16 });
      gsap.set(statementLines, { opacity: 0, y: 36 });
      gsap.set(principles, { opacity: 0, y: 22 });
      gsap.set(currentlyItems, { opacity: 0, y: 16 });
      gsap.set(educationItems, { opacity: 0, y: 18 });
      gsap.set(certificateItems, { opacity: 0, y: 16 });

      if (profile) {
        gsap.set(profile, { opacity: 0, y: 24, scale: 0.98 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      timeline.to(
        revealElements,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.06,
        },
        0,
      );

      timeline.to(
        statementLines,
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.07,
        },
        0.1,
      );

      if (profile) {
        timeline.to(
          profile,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
          },
          0.28,
        );
      }

      timeline.to(
        principles,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
        },
        0.4,
      );

      timeline.to(
        currentlyItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.05,
        },
        0.58,
      );

      timeline.to(
        educationItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.06,
        },
        0.68,
      );

      timeline.to(
        certificateItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.05,
        },
        0.72,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /*
   * =========================================
   * CURSOR SPOTLIGHT (Approach rows)
   * =========================================
   *
   * Sets --x / --y CSS vars on the row so the
   * radial-gradient glow follows the pointer.
   * Pure DOM write, no re-render needed.
   */

  const handlePrincipleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--x", `${x}%`);
    target.style.setProperty("--y", `${y}%`);
  };

  const statementParts = aboutData.statement.split(",");

  return (
    <section
      ref={sectionRef}
      id="about"
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
          w-full
          max-w-[1440px]
          px-5
          py-16
          sm:py-20
          md:px-10
          md:py-28
          lg:px-16
          lg:py-36
        "
      >
        {/* ═══════════════════════════════════════
            HEADER
        ═══════════════════════════════════════ */}

        <div
          className="
            about-reveal
            mb-12
            flex
            items-center
            justify-between
            border-b
            border-[var(--border)]
            pb-5
            sm:mb-16
            md:mb-24
            lg:mb-28
          "
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
            {aboutData.label}
          </span>

          <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--foreground-subtle)]">
            01
          </span>
        </div>

        {/* ═══════════════════════════════════════
            INTRO
        ═══════════════════════════════════════ */}

        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Statement */}

          <div className="lg:col-span-8">
            <h2 className="font-medium leading-[0.9] tracking-[-0.06em] text-[clamp(2.6rem,7vw,7rem)]">
              {statementParts.map((part, index) => (
                <span
                  key={`${part}-${index}`}
                  className="about-statement-line block overflow-hidden"
                >
                  {part.trim()}
                  {index < statementParts.length - 1 ? "," : ""}
                </span>
              ))}
            </h2>
          </div>

          {/* Description + Profile */}

          <div className="flex flex-col justify-between gap-8 sm:gap-10 lg:col-span-4">
            <p className="about-reveal max-w-[390px] text-sm leading-[1.9] text-[var(--foreground-muted)] md:text-base">
              {aboutData.description}
            </p>

            {/* Profile specimen */}

            <div
              className="
                about-profile
                group
                relative
                aspect-[4/5]
                w-full
                max-w-[320px]
                overflow-hidden
                border
                border-[var(--border)]
                bg-[var(--surface)]
                lg:ml-auto
              "
            >
              <img
                src={aboutData.profile.image}
                alt={aboutData.profile.name}
                loading="lazy"
                decoding="async"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  grayscale
                  transition-transform
                  duration-[900ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-[1.045]
                "
              />

              {/* subtle overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[var(--background)] opacity-10 mix-blend-multiply" />

              {/* top metadata */}
              <div className="absolute left-5 right-5 top-5 flex items-start justify-between md:left-6 md:right-6 md:top-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white">
                  PROFILE
                </span>
                <span className="font-mono text-[9px] tracking-[0.12em] text-white/70">
                  01
                </span>
              </div>

              {/* bottom information */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
                <div className="mb-3 h-px w-10 bg-white transition-all duration-700 group-hover:w-16" />

                <h3 className="text-2xl font-medium tracking-[-0.04em] text-white">
                  {aboutData.profile.name}
                </h3>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/80">
                  {aboutData.profile.role}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                  {aboutData.profile.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            SELECTED MOMENTS
        ═══════════════════════════════════════ */}

        <div className="mt-28 md:mt-40">
          <div
            className="
              about-reveal
              mb-8
              flex
              items-center
              gap-4
              font-mono
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[var(--foreground-subtle)]
            "
          >
            <span>01</span>

            <span
              className="
                h-px
                w-8
                bg-[var(--border-strong)]
              "
            />

            <span>Selected Moments</span>
          </div>

          <div className="about-gallery">
            <AccordionGallery items={aboutData.gallery} />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            APPROACH
        ═══════════════════════════════════════ */}

        <div className="mt-16 sm:mt-20 md:mt-28 lg:mt-32">
          <div className="about-reveal mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
            <span>01</span>
            <span className="h-px w-8 bg-[var(--border-strong)]" />
            <span>Approach</span>
          </div>

          <div className="border-t border-[var(--border)]">
            {aboutData.principles.map((principle) => (
              <div
                key={principle.number}
                onMouseMove={handlePrincipleMouseMove}
                className="
                  about-principle
                  group
                  relative
                  cursor-default
                  overflow-hidden
                  border-b
                  border-[var(--border)]
                "
              >
                {/* CURSOR SPOTLIGHT */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--foreground) 6%, transparent), transparent 70%)",
                  }}
                />

                {/* LEFT ACCENT */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[2px]
                    origin-top
                    scale-y-0
                    bg-[var(--foreground)]
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-y-100
                  "
                />

                <div
                  className="
                    relative
                    grid
                    grid-cols-[40px_1fr]
                    gap-4
                    py-8
                    pl-4
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:translate-x-1
                    sm:grid-cols-[48px_1fr]
                    sm:gap-5
                    md:grid-cols-[80px_220px_1fr]
                    md:gap-8
                    md:py-10
                    md:group-hover:translate-x-2
                  "
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--foreground-subtle)] transition-colors duration-300 group-hover:text-[var(--foreground)]">
                    {principle.number}
                  </span>

                  <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--foreground)]">
                    {principle.title}
                  </h3>

                  <p className="col-span-2 max-w-[540px] text-sm leading-[1.9] text-[var(--foreground-muted)] md:col-span-1">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            CURRENTLY
        ═══════════════════════════════════════ */}

        <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 md:mt-28 md:grid-cols-12 lg:mt-32">
          <div className="md:col-span-4">
            <div className="about-reveal flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
              <span>02</span>
              <span className="h-px w-8 bg-[var(--border-strong)]" />
              <span>Currently</span>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-[var(--border)]">
              {aboutData.currently.map((item, index) => (
                <div
                  key={item}
                  className="
                    about-currently-item
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[var(--border)]
                    py-5
                  "
                >
                  <span className="text-sm uppercase tracking-[0.08em] text-[var(--foreground)] transition-transform duration-300 group-hover:translate-x-1">
                    {item}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--foreground-subtle)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            EDUCATION & CERTIFICATES
            — merged into one section, side-by-side
            on desktop, so the page reads shorter
        ═══════════════════════════════════════ */}

        <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 md:mt-28 md:grid-cols-12 lg:mt-32">
          <div className="md:col-span-4">
            <div className="about-reveal flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
              <span>03</span>
              <span className="h-px w-8 bg-[var(--border-strong)]" />
              <span>Education &amp; Certificates</span>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
              {/* EDUCATION */}

              <div>
                <p className="about-reveal mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                  Education
                </p>

                <div className="border-t border-[var(--border)]">
                  {aboutData.education.map((item, index) => (
                    <div
                      key={`${item.period}-${item.institution}`}
                      className="
                        about-education
                        group
                        relative
                        overflow-hidden
                        border-b
                        border-[var(--border)]
                      "
                    >
                      <span
                        className="
                          pointer-events-none
                          absolute
                          left-0
                          top-0
                          h-full
                          w-[2px]
                          origin-top
                          scale-y-0
                          bg-[var(--foreground)]
                          transition-transform
                          duration-300
                          ease-out
                          group-hover:scale-y-100
                        "
                      />

                      <div className="grid grid-cols-1 gap-2 py-6 pl-4 transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
                          {item.period}
                        </span>
                        <h3 className="text-base font-medium">
                          {item.institution}
                        </h3>
                        <p className="text-sm text-[var(--foreground-muted)]">
                          {item.field}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATES */}

              <div>
                <p className="about-reveal mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                  Certificates
                </p>

                <div className="border-t border-[var(--border)]">
                  {aboutData.certificates.map((certificate, index) => (
                    <div
                      key={`${certificate.title}-${index}`}
                      className="
                        about-certificate
                        group
                        relative
                        overflow-hidden
                        border-b
                        border-[var(--border)]
                      "
                    >
                      <span
                        className="
                          pointer-events-none
                          absolute
                          left-0
                          top-0
                          h-full
                          w-[2px]
                          origin-top
                          scale-y-0
                          bg-[var(--foreground)]
                          transition-transform
                          duration-300
                          ease-out
                          group-hover:scale-y-100
                        "
                      />

                      <div className="grid grid-cols-1 gap-1 py-5 pl-4 transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <span className="text-sm text-[var(--foreground)]">
                          {certificate.title}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[var(--foreground-muted)]">
                            {certificate.issuer}
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--foreground-subtle)]">
                            {certificate.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            END SPACE
        ═══════════════════════════════════════ */}

        <div className="mt-16 border-b border-[var(--border)] sm:mt-20 md:mt-28" />
      </div>
    </section>
  );
}
