"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import { useLenis } from "lenis/react";

export default function Landing() {
  const heroRef = useRef<HTMLElement>(null);

  const scrollContentRef = useRef<HTMLDivElement>(null);

  const entranceRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);

  const titleLinesRef = useRef<HTMLSpanElement[]>([]);

  const metaRef = useRef<HTMLDivElement>(null);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const footerRef = useRef<HTMLDivElement>(null);

  const indexRef = useRef<HTMLDivElement>(null);

  /*
   * =========================================
   * HERO ENTRANCE
   * =========================================
   */

  useLayoutEffect(() => {
    const hero = heroRef.current;

    const entrance = entranceRef.current;

    const lines = titleLinesRef.current;

    const meta = metaRef.current;

    const description = descriptionRef.current;

    const footer = footerRef.current;

    const index = indexRef.current;

    if (
      !hero ||
      !entrance ||
      !lines.length ||
      !meta ||
      !description ||
      !footer ||
      !index
    ) {
      return;
    }

    /*
     * =====================================
     * INITIAL
     * =====================================
     */

    gsap.set(lines, {
      y: "115%",
    });

    gsap.set(meta, {
      y: 25,
      opacity: 0,
    });

    gsap.set(description, {
      y: 30,
      opacity: 0,
    });

    gsap.set(footer, {
      y: 25,
      opacity: 0,
    });

    gsap.set(index, {
      opacity: 0,
    });

    /*
     * =====================================
     * INTRO DETECTION
     * =====================================
     */

    const intro = document.querySelector(".intro");

    let entranceTimeline: gsap.core.Timeline | null = null;

    const playEntrance = () => {
      if (entranceTimeline) {
        return;
      }

      entranceTimeline = gsap.timeline();

      /*
       * TITLE
       */

      entranceTimeline.to(lines, {
        y: "0%",

        duration: 0.9,

        stagger: 0.08,

        ease: "power4.out",
      });

      /*
       * META
       */

      entranceTimeline.to(
        meta,
        {
          y: 0,

          opacity: 1,

          duration: 0.65,

          ease: "power3.out",
        },
        "-=0.6",
      );

      /*
       * DESCRIPTION
       */

      entranceTimeline.to(
        description,
        {
          y: 0,

          opacity: 1,

          duration: 0.7,

          ease: "power3.out",
        },
        "-=0.45",
      );

      /*
       * FOOTER
       */

      entranceTimeline.to(
        footer,
        {
          y: 0,

          opacity: 1,

          duration: 0.7,

          ease: "power3.out",
        },
        "-=0.5",
      );

      /*
       * INDEX
       */

      entranceTimeline.to(
        index,
        {
          opacity: 1,

          duration: 0.5,

          ease: "power2.out",
        },
        "-=0.45",
      );
    };

    /*
     * No intro.
     */

    if (!intro) {
      playEntrance();
    }

    /*
     * Intro already finished.
     */

    if (intro && intro.style.visibility === "hidden") {
      playEntrance();
    }

    /*
     * Watch intro.
     */

    let started = false;

    const observer = intro
      ? new MutationObserver(() => {
          if (!started && intro.style.visibility === "hidden") {
            started = true;

            playEntrance();

            observer.disconnect();
          }
        })
      : null;

    if (observer && intro) {
      observer.observe(intro, {
        attributes: true,

        attributeFilter: ["style"],
      });
    }

    return () => {
      observer?.disconnect();

      entranceTimeline?.kill();
    };
  }, []);

  /*
   * =========================================
   * MOUSE PARALLAX
   * =========================================
   */

  useLayoutEffect(() => {
    const hero = heroRef.current;

    const entrance = entranceRef.current;

    if (!hero || !entrance) {
      return;
    }

    /*
     * Don't run mouse interaction
     * on touch devices.
     */

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      return;
    }

    const target = {
      x: 0,
      y: 0,
    };

    const current = {
      x: 0,
      y: 0,
    };

    const update = () => {
      current.x += (target.x - current.x) * 0.06;

      current.y += (target.y - current.y) * 0.06;

      gsap.set(entrance, {
        x: current.x,
        y: current.y,
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;

      const y = event.clientY / window.innerHeight - 0.5;

      target.x = x * 10;

      target.y = y * 7;
    };

    window.addEventListener("mousemove", onMouseMove, {
      passive: true,
    });

    gsap.ticker.add(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);

      gsap.ticker.remove(update);
    };
  }, []);

  /*
   * =========================================
   * LENIS SCROLL
   * =========================================
   */

  useLenis((lenis) => {
    const scrollContent = scrollContentRef.current;

    const meta = metaRef.current;

    const description = descriptionRef.current;

    const footer = footerRef.current;

    const index = indexRef.current;

    if (!scrollContent || !meta || !description || !footer || !index) {
      return;
    }

    const viewport = window.innerHeight;

    const progress = Math.max(0, Math.min(1, lenis.scroll / (viewport * 0.8)));

    /*
     * =====================================
     * HERO PARALLAX
     * =====================================
     */

    const contentY = progress * -75;

    gsap.set(scrollContent, {
      y: contentY,
    });

    /*
     * =====================================
     * META
     * =====================================
     */

    gsap.set(meta, {
      opacity: Math.max(0, 1 - progress * 1.4),
    });

    /*
     * =====================================
     * DESCRIPTION
     * =====================================
     */

    gsap.set(description, {
      opacity: Math.max(0, 1 - progress * 1.15),
    });

    /*
     * =====================================
     * FOOTER
     * =====================================
     */

    gsap.set(footer, {
      opacity: Math.max(0, 1 - progress * 1.35),
    });

    /*
     * =====================================
     * INDEX
     * =====================================
     */

    gsap.set(index, {
      opacity: Math.max(0, 1 - progress * 1.5),
    });
  });

  /*
   * =========================================
   * TITLE REF
   * =========================================
   */

  const registerLine = (element: HTMLSpanElement | null) => {
    if (element && !titleLinesRef.current.includes(element)) {
      titleLinesRef.current.push(element);
    }
  };

  return (
    <section
      ref={heroRef}
      className="
        relative

        min-h-screen
        w-full

        overflow-hidden

        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* =====================================
          SCROLL CONTENT
      ===================================== */}

      <div
        ref={scrollContentRef}
        className="
          relative

          min-h-screen
          w-full

          will-change-transform
        "
      >
        {/* ===================================
            ENTRANCE
        =================================== */}

        <div
          ref={entranceRef}
          className="
            relative

            flex
            min-h-screen
            w-full

            flex-col

            justify-between

            px-6
            pb-8
            pt-28

            md:px-12
            md:pb-12
            md:pt-[160px]

            will-change-transform
          "
        >
          {/* =================================
              META
          ================================= */}

          <div
            ref={metaRef}
            className="
              absolute

              left-6
              right-6
              top-[104px]

              z-2

              flex
              items-start
              justify-between

              md:left-12
              md:right-12
              md:top-[118px]

              will-change-[transform,opacity]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              <span
                className="
                  font-mono

                  text-[9px]

                  font-medium

                  leading-none

                  tracking-[0.15em]

                  text-[var(--foreground)]
                "
              >
                SOFTWARE
              </span>

              <span
                className="
                  font-mono

                  text-[9px]

                  leading-none

                  tracking-[0.15em]

                  text-[var(--foreground-muted)]
                "
              >
                ENGINEER
              </span>
            </div>

            <div
              className="
                flex
                flex-col

                items-end

                gap-1
              "
            >
              <span
                className="
                  font-mono

                  text-[9px]

                  leading-none

                  tracking-[0.15em]

                  text-[var(--foreground-muted)]
                "
              >
                2026
              </span>

              <span
                className="
                  font-mono

                  text-[9px]

                  leading-none

                  tracking-[0.15em]

                  text-[var(--foreground-muted)]
                "
              >
                INDONESIA
              </span>
            </div>
          </div>

          {/* =================================
              TITLE
          ================================= */}

          <div
            className="
              flex

              flex-1

              items-center
            "
          >
            <h1
              ref={titleRef}
              className="
                m-0

                max-w-[1400px]

                font-sans

                text-[clamp(4.5rem,15vw,13rem)]

                font-medium

                leading-[0.78]

                tracking-[-0.09em]

                text-[var(--foreground)]
              "
            >
              {/* LINE 1 */}

              <span
                className="
                  block
                  overflow-hidden
                "
              >
                <span
                  ref={registerLine}
                  className="
                    block
                    will-change-transform
                  "
                >
                  I DESIGN
                </span>
              </span>

              {/* LINE 2 */}

              <span
                className="
                  block
                  overflow-hidden
                "
              >
                <span
                  ref={registerLine}
                  className="
                    block
                    will-change-transform
                  "
                >
                  &amp; BUILD
                </span>
              </span>

              {/* LINE 3 */}

              <span
                className="
                  block
                  overflow-hidden
                "
              >
                <span
                  ref={registerLine}
                  className="
                    block

                    text-[var(--foreground-muted)]

                    will-change-transform
                  "
                >
                  DIGITAL
                </span>
              </span>

              {/* LINE 4 */}

              <span
                className="
                  block
                  overflow-hidden
                "
              >
                <span
                  ref={registerLine}
                  className="
                    block
                    will-change-transform
                  "
                >
                  EXPERIENCES.
                </span>
              </span>
            </h1>
          </div>

          {/* =================================
              FOOTER
          ================================= */}

          <div
            ref={footerRef}
            className="
              flex

              flex-col

              gap-8

              md:flex-row
              md:items-end
              md:justify-between

              will-change-[transform,opacity]
            "
          >
            <p
              ref={descriptionRef}
              className="
                m-0

                max-w-[390px]

                text-[14px]

                leading-[1.55]

                tracking-[-0.01em]

                text-[var(--foreground-muted)]

                md:text-[15px]

                will-change-[transform,opacity]
              "
            >
              Thoughtful software and digital experiences built with clarity,
              purpose, and attention to detail.
            </p>

            {/* SCROLL INDICATOR */}

            <div
              className="
                flex

                items-center

                gap-4

                font-mono

                text-[9px]

                leading-none

                tracking-[0.14em]

                text-[var(--foreground-muted)]
              "
            >
              <span
                className="
                  relative

                  block

                  h-px

                  w-[44px]

                  overflow-hidden

                  bg-[var(--border)]
                "
              >
                <span
                  className="
                    absolute

                    inset-y-0
                    left-0

                    w-full

                    bg-[var(--foreground)]

                    animate-[hero-scroll-line_2.4s_cubic-bezier(0.16,1,0.3,1)_infinite]
                  "
                />
              </span>

              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          PAGE INDEX
      ===================================== */}

      <div
        ref={indexRef}
        className="
          absolute

          bottom-8
          right-6

          z-3

          font-mono

          text-[9px]

          leading-none

          tracking-[0.12em]

          text-[var(--foreground-subtle)]

          md:bottom-12
          md:right-12

          will-change-[opacity]
        "
      >
        00 / 04
      </div>
    </section>
  );
}
