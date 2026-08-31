"use client";

import { useEffect, useRef } from "react";

type Skill = {
  name: string;
  icon: React.ReactNode;
};

const skills: Skill[] = [
  {
    name: "React",
    icon: <ReactIcon />,
  },
  {
    name: "Next.js",
    icon: <NextIcon />,
  },
  {
    name: "TypeScript",
    icon: <TypeScriptIcon />,
  },
  {
    name: "JavaScript",
    icon: <JavaScriptIcon />,
  },
  {
    name: "Node.js",
    icon: <NodeIcon />,
  },
  {
    name: "GSAP",
    icon: <GsapIcon />,
  },
  {
    name: "Tailwind",
    icon: <TailwindIcon />,
  },
  {
    name: "PostgreSQL",
    icon: <PostgresIcon />,
  },
  {
    name: "Linux",
    icon: <LinuxIcon />,
  },
];

export default function SkillsLoop() {
  const sectionRef = useRef<HTMLElement>(null);

  const trackRef = useRef<HTMLDivElement>(null);

  const firstSetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    const track = trackRef.current;

    const firstSet = firstSetRef.current;

    if (!section || !track || !firstSet) {
      return;
    }

    /*
     * =====================================
     * REDUCED MOTION
     * =====================================
     */

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    /*
     * =====================================
     * STATE
     * =====================================
     */

    let currentX = 0;

    /*
     * MAIN SPEED
     *
     * Smaller = slower.
     *
     * 0.22 feels much calmer
     * than the previous 0.55.
     */

    let speed = 0.22;

    let targetSpeed = 0.22;

    let previousTime = performance.now();

    let frameId = 0;

    /*
     * =====================================
     * WIDTH
     * =====================================
     */

    const getWidth = () => {
      return firstSet.offsetWidth;
    };

    /*
     * =====================================
     * ANIMATION
     * =====================================
     */

    const animate = (time: number) => {
      const delta = Math.min(time - previousTime, 32);

      previousTime = time;

      /*
       * Smooth acceleration /
       * deceleration.
       */

      speed += (targetSpeed - speed) * 0.025;

      /*
       * Move track.
       */

      currentX -= speed * delta;

      /*
       * Seamless reset.
       */

      const width = getWidth();

      if (width > 0 && currentX <= -width) {
        currentX += width;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    /*
     * =====================================
     * HOVER
     * =====================================
     *
     * Slow down instead of stopping.
     */

    const handleEnter = () => {
      targetSpeed = 0.08;
    };

    const handleLeave = () => {
      targetSpeed = 0.22;
    };

    section.addEventListener("mouseenter", handleEnter);

    section.addEventListener("mouseleave", handleLeave);

    /*
     * =====================================
     * RESIZE
     * =====================================
     */

    const handleResize = () => {
      const width = getWidth();

      if (width > 0 && currentX <= -width) {
        currentX = currentX % width;
      }
    };

    window.addEventListener("resize", handleResize);

    /*
     * =====================================
     * CLEANUP
     * =====================================
     */

    return () => {
      cancelAnimationFrame(frameId);

      section.removeEventListener("mouseenter", handleEnter);

      section.removeEventListener("mouseleave", handleLeave);

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative

        w-full

        overflow-hidden

        border-y
        border-[var(--border)]

        bg-[var(--background)]

        py-6

        md:py-7
      "
    >
      {/* LEFT FADE */}

      <div
        className="
          pointer-events-none

          absolute

          inset-y-0
          left-0

          z-20

          w-20

          bg-gradient-to-r

          from-[var(--background)]

          to-transparent

          md:w-40
        "
      />

      {/* RIGHT FADE */}

      <div
        className="
          pointer-events-none

          absolute

          inset-y-0
          right-0

          z-20

          w-20

          bg-gradient-to-l

          from-[var(--background)]

          to-transparent

          md:w-40
        "
      />

      {/* TRACK */}

      <div
        ref={trackRef}
        className="
          flex

          w-max

          items-center

          will-change-transform
        "
      >
        {/* FIRST SET */}

        <div
          ref={firstSetRef}
          className="
            flex

            shrink-0

            items-center
          "
        >
          {skills.map((skill, index) => (
            <SkillItem key={`first-${index}`} skill={skill} index={index} />
          ))}
        </div>

        {/* SECOND SET */}

        <div
          className="
            flex

            shrink-0

            items-center
          "
        >
          {skills.map((skill, index) => (
            <SkillItem key={`second-${index}`} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * =========================================
 * SKILL ITEM
 * =========================================
 */

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
  const wave = Math.sin(index * 0.7) * 2.5;

  return (
    <div
      className="
        flex

        shrink-0

        items-center

        gap-3

        px-7

        md:px-9

        will-change-transform
      "
      style={{
        transform: `translateY(${wave}px)`,
      }}
    >
      {/* ICON */}

      <span
        className="
          flex

          h-5
          w-5

          shrink-0

          items-center
          justify-center

          text-[var(--foreground)]
        "
      >
        {skill.icon}
      </span>

      {/* NAME */}

      <span
        className="
          font-mono

          text-[10px]

          font-medium

          tracking-[0.14em]

          uppercase

          text-[var(--foreground-muted)]

          md:text-[11px]
        "
      >
        {skill.name}
      </span>

      {/* SEPARATOR */}

      <span
        className="
          ml-4

          h-1
          w-1

          shrink-0

          rounded-full

          bg-[var(--border-strong)]
        "
      />
    </div>
  );
}

/*
 * =========================================
 * REACT
 * =========================================
 */

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <ellipse
        cx="12"
        cy="12"
        rx="3"
        ry="8.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <ellipse
        cx="12"
        cy="12"
        rx="3"
        ry="8.5"
        transform="rotate(60 12 12)"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <ellipse
        cx="12"
        cy="12"
        rx="3"
        ry="8.5"
        transform="rotate(120 12 12)"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

/*
 * =========================================
 * NEXT.JS
 * =========================================
 */

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />

      <path
        d="M8 8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M8 8l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M16 8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/*
 * =========================================
 * TYPESCRIPT
 * =========================================
 */

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path d="M6.5 8h7" stroke="currentColor" strokeWidth="1.5" />

      <path d="M10 8v8" stroke="currentColor" strokeWidth="1.5" />

      <path
        d="M14 15.5c.7.4 1.4.6 2.2.6 1 0 1.6-.4 1.6-1.1 0-.6-.4-.9-1.5-1.3l-.5-.2c-1-.4-1.6-.9-1.6-1.8 0-1.2 1-2 2.5-2 .8 0 1.4.2 2 .5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/*
 * =========================================
 * JAVASCRIPT
 * =========================================
 */

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 9v6.5c0 1-.5 1.5-1.5 1.5S5 16.5 5 15.5"
        transform="translate(2 0)"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M14 15.5c.5 1 1.2 1.5 2.3 1.5 1.2 0 2-.6 2-1.5 0-.8-.5-1.2-1.6-1.6l-.5-.2c-1-.4-1.4-.8-1.4-1.5 0-.8.6-1.3 1.5-1.3.8 0 1.3.3 1.7.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/*
 * =========================================
 * NODE.JS
 * =========================================
 */

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 3.5l7.5 4.3v8.4L12 20.5l-7.5-4.3V7.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M9 9.2v5.6l3 1.7 3-1.7V9.2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/*
 * =========================================
 * GSAP
 * =========================================
 */

function GsapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 12h5l2-6 2 12 2-6h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
 * =========================================
 * TAILWIND
 * =========================================
 */

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 13c2.2-5 5.1-5 7.2-2.5C13.3 13 15.4 13 20 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M4 18c2.2-5 5.1-5 7.2-2.5C13.3 18 15.4 18 20 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/*
 * =========================================
 * POSTGRESQL
 * =========================================
 */

function PostgresIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M7 6.5C7 4.6 9.2 3 12 3s5 1.6 5 3.5v7c0 2-2.2 3.5-5 3.5s-5-1.5-5-3.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M17 7.5c2-.5 3.5-.2 3.8.8.3 1-.8 2.2-2.8 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/*
 * =========================================
 * LINUX
 * =========================================
 */

function LinuxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />

      <circle cx="9" cy="10" r="1" fill="currentColor" />

      <circle cx="15" cy="10" r="1" fill="currentColor" />

      <path
        d="M8.5 14c1.8 1.5 5.2 1.5 7 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
