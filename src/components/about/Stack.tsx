"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { stack } from "@/data/stack";

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
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
      const rows = section.querySelectorAll(".stack-row");

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

          pb-28

          md:px-10

          md:pb-40

          lg:px-16

          lg:pb-52
        "
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            mb-10

            flex

            items-center

            justify-between

            border-t

            border-[var(--border)]

            pt-4
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
            STACK
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
            TOOLS I USE
          </span>
        </div>

        {/* =====================================
            STACK LIST
        ===================================== */}

        <div>
          {stack.map((item, index) => (
            <div
              key={item.name}
              className="
                  stack-row

                  group

                  grid

                  grid-cols-[40px_1fr_auto]

                  items-center

                  gap-4

                  border-b

                  border-[var(--border)]

                  py-5

                  transition-colors

                  duration-500

                  md:grid-cols-[60px_1fr_160px_120px]

                  md:gap-6

                  md:py-6
                "
            >
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

              {/* NAME */}

              <span
                className="
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
                {item.name}
              </span>

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
                {item.category}
              </span>

              {/* LEVEL */}

              <span
                className="
                    font-mono

                    text-[8px]

                    tracking-[0.1em]

                    uppercase

                    text-[var(--foreground-subtle)]
                  "
              >
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
