"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { heroData } from "@/data/hero";

export default function Landing() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      const heroTopMeta = section.querySelector<HTMLElement>(".hero-top-meta");
      const heroMain = section.querySelector<HTMLElement>(".hero-main");
      const heroStatus = section.querySelector<HTMLElement>(".hero-status");
      const heroScroll = section.querySelector<HTMLElement>(".hero-scroll");
      const heroRole = section.querySelector<HTMLElement>(".hero-role");
      const heroDescription =
        section.querySelector<HTMLElement>(".hero-description");
      const heroFocus = section.querySelector<HTMLElement>(".hero-focus");

      if (
        !heroTopMeta ||
        !heroMain ||
        !heroStatus ||
        !heroScroll ||
        !heroRole ||
        !heroDescription ||
        !heroFocus
      ) {
        return;
      }

      /* ─────────────────────────────────────────
         REDUCED MOTION
      ───────────────────────────────────────── */
      if (prefersReducedMotion) {
        gsap.set(
          [
            letters,
            heroTopMeta,
            heroMain,
            heroStatus,
            heroScroll,
            heroRole,
            heroDescription,
            heroFocus,
          ],
          { opacity: 1, y: 0 },
        );
        return;
      }

      /* ─────────────────────────────────────────
         INITIAL STATE
      ───────────────────────────────────────── */
      gsap.set(letters, { opacity: 0, y: 72 });
      gsap.set(heroTopMeta, { opacity: 0, y: 14 });
      gsap.set(heroRole, { opacity: 0, y: 18 });
      gsap.set(heroDescription, { opacity: 0, y: 20 });
      gsap.set(heroFocus, { opacity: 0, y: 16 });
      gsap.set(heroStatus, { opacity: 0, y: 12 });
      gsap.set(heroScroll, { opacity: 0, y: 10 });

      /* ─────────────────────────────────────────
         ENTRANCE TIMELINE
      ───────────────────────────────────────── */
      const timeline = gsap.timeline({
        delay: 0.12,
        defaults: { ease: "power3.out" },
      });

      // Top meta
      timeline.to(heroTopMeta, { opacity: 1, y: 0, duration: 0.75 }, 0);

      // Name letters
      timeline.to(
        letters,
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.028,
          ease: "power4.out",
        },
        0.05,
      );

      // Role
      timeline.to(heroRole, { opacity: 1, y: 0, duration: 0.75 }, "-=0.55");

      // Description
      timeline.to(
        heroDescription,
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      );

      // Focus tags
      timeline.to(heroFocus, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45");

      // Status
      timeline.to(heroStatus, { opacity: 1, y: 0, duration: 0.65 }, "-=0.35");

      // Scroll indicator
      timeline.to(heroScroll, { opacity: 1, y: 0, duration: 0.65 }, "-=0.25");

      /* ─────────────────────────────────────────
         SCROLL PARALLAX
      ───────────────────────────────────────── */
      const updateHeroScroll = () => {
        const progress = Math.min(
          Math.max(window.scrollY / (window.innerHeight * 0.85), 0),
          1,
        );

        gsap.set(heroMain, {
          y: progress * -64,
          opacity: 1 - progress * 0.32,
        });

        gsap.set(heroTopMeta, {
          y: progress * -18,
          opacity: 1 - progress,
        });

        gsap.set(heroStatus, {
          y: progress * 12,
          opacity: 1 - progress * 0.8,
        });

        gsap.set(heroScroll, {
          y: progress * 24,
          opacity: 1 - progress,
        });
      };

      window.addEventListener("scroll", updateHeroScroll, { passive: true });
      updateHeroScroll();

      return () => {
        window.removeEventListener("scroll", updateHeroScroll);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* Subtle decorative accent — pure solid blur, no gradient */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-10%]
          h-[480px]
          w-[720px]
          -translate-x-1/2
          rounded-full
          bg-[var(--foreground)]/[0.035]
          blur-[110px]
        "
      />

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1440px]
          flex-col
          px-5
          pb-8
          pt-28
          md:px-10
          md:pb-10
          md:pt-32
          lg:px-16
          lg:pb-12
          lg:pt-36
        "
      >
        {/* ─────────────────────────────────────
            TOP META
        ───────────────────────────────────── */}
        <div
          className="
            hero-top-meta
            flex
            items-center
            justify-between
            font-mono
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-[var(--foreground-subtle)]
          "
        >
          <span>{heroData.availability}</span>
          <span>{heroData.year}</span>
        </div>

        {/* ─────────────────────────────────────
            MAIN HERO
        ───────────────────────────────────── */}
        <div
          className="
            hero-main
            mt-auto
            grid
            grid-cols-1
            gap-12
            pb-12
            md:grid-cols-[1fr_280px]
            md:items-end
            md:gap-14
            md:pb-16
            lg:grid-cols-[1fr_340px]
            lg:gap-16
          "
        >
          {/* NAME */}
          <div>
            <h1
              className="
                font-medium
                leading-[0.78]
                tracking-[-0.075em]
              "
            >
              <span
                className="
                  block
                  overflow-hidden
                  text-[clamp(4.25rem,12.5vw,11.5rem)]
                "
              >
                {heroData.name.first.split("").map((letter, index) => (
                  <span
                    key={`first-${letter}-${index}`}
                    className="hero-letter inline-block will-change-transform"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>

              <span
                className="
                  block
                  overflow-hidden
                  text-[clamp(4.25rem,12.5vw,11.5rem)]
                "
              >
                {heroData.name.last.split("").map((letter, index) => (
                  <span
                    key={`last-${letter}-${index}`}
                    className="hero-letter inline-block will-change-transform"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* RIGHT INFORMATION */}
          <div className="pb-1 md:pb-2">
            {/* ROLE */}
            <div
              className="
                hero-role
                mb-7
                font-mono
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-[var(--foreground-muted)]
              "
            >
              {heroData.role}
            </div>

            {/* DESCRIPTION */}
            <p
              className="
                hero-description
                max-w-[340px]
                text-sm
                leading-[1.85]
                text-[var(--foreground-muted)]
                md:text-[15px]
              "
            >
              {heroData.description}
            </p>

            {/* FOCUS */}
            <div
              className="
                hero-focus
                mt-8
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
              "
            >
              {heroData.focus.map((item, index) => (
                <span
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--foreground-subtle)]
                  "
                >
                  {item}
                  {index < heroData.focus.length - 1 && (
                    <span className="h-px w-3.5 bg-[var(--border)]" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────
            STATUS
        ───────────────────────────────────── */}
        <div
          className="
            hero-status
            mb-6
            flex
            items-center
            justify-between
            font-mono
            text-[10px]
            uppercase
            tracking-[0.14em]
            text-[var(--foreground-subtle)]
            md:mb-8
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                relative
                flex
                h-1.5
                w-1.5
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[var(--foreground)]
                  opacity-60
                "
              />
              <span
                className="
                  relative
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[var(--foreground)]
                "
              />
            </span>
            <span>{heroData.status.label}</span>
          </div>
          <span>{heroData.status.value}</span>
        </div>

        {/* ─────────────────────────────────────
            BOTTOM / SCROLL
        ───────────────────────────────────── */}
        <div
          className="
            hero-scroll
            flex
            items-center
            justify-between
            border-t
            border-[var(--border)]
            pt-5
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[var(--foreground-subtle)]
            "
          >
            {heroData.scrollLabel}
          </span>
          <span
            className="
              text-sm
              leading-none
              text-[var(--foreground-muted)]
            "
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
