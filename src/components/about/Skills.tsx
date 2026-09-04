"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { skillsData } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const groups = section.querySelectorAll(".skills-group");
      const items = section.querySelectorAll(".skill-item");

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set([...groups, ...items], {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.set(groups, {
        opacity: 0,
        y: 30,
      });

      gsap.set(items, {
        opacity: 0,
        y: 15,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      timeline.to(groups, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      timeline.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.45",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        border-t
        border-[var(--border)]
        py-24
        md:py-32
        lg:py-40
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          md:px-10
          lg:px-16
        "
      >
        {/* HEADER */}
        <div
          className="
            mb-16
            flex
            items-center
            gap-4
            font-mono
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-[var(--foreground-subtle)]
            md:mb-24
          "
        >
          <span>02</span>

          <span className="h-px w-8 bg-[var(--border-strong)]" />

          <span>Technical Skills</span>
        </div>

        {/* GROUPS */}
        <div className="space-y-16 md:space-y-24">
          {skillsData.map((group) => (
            <div key={group.number} className="skills-group">
              {/* GROUP HEADER */}
              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[var(--border)]
                  pb-4
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--foreground-subtle)]
                "
              >
                <span>
                  {group.number} / {group.title}
                </span>

                <span>{String(group.items.length).padStart(2, "0")} ITEMS</span>
              </div>

              {/* ITEMS */}
              <div>
                {group.items.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="
                      skill-item
                      group
                      grid
                      grid-cols-[32px_1fr_auto]
                      items-center
                      gap-4
                      border-b
                      border-[var(--border)]
                      py-5
                      transition-colors
                      duration-500
                      hover:bg-[var(--surface)]
                      md:grid-cols-[48px_1fr_220px]
                      md:py-6
                    "
                  >
                    {/* NUMBER */}
                    <span
                      className="
                        font-mono
                        text-[10px]
                        text-[var(--foreground-subtle)]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* NAME */}
                    <span
                      className="
                        text-xl
                        font-normal
                        tracking-[-0.03em]
                        text-[var(--foreground)]
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:translate-x-2
                        md:text-2xl
                      "
                    >
                      {skill.name}
                    </span>

                    {/* CONTEXT */}
                    <span
                      className="
                        text-right
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.12em]
                        text-[var(--foreground-muted)]
                        md:text-[10px]
                      "
                    >
                      {skill.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
