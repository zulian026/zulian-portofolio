"use client";

import { useEffect, useRef } from "react";

type Skill = {
  name: string;
  icon: React.ReactNode;
};

const skills: Skill[] = [
  { name: "React", icon: <ReactIcon /> },
  { name: "Next.js", icon: <NextIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
  { name: "JavaScript", icon: <JavaScriptIcon /> },
  { name: "Node.js", icon: <NodeIcon /> },
  { name: "GSAP", icon: <GsapIcon /> },
  { name: "Tailwind", icon: <TailwindIcon /> },
  { name: "PostgreSQL", icon: <PostgresIcon /> },
  { name: "Linux", icon: <LinuxIcon /> },
];

export default function SkillsLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;

    if (!section || !track || !firstSet) return;

    // Reduced motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    // Snake wave config
    const AMPLITUDE = 18; // tinggi liukan (px)
    const WAVELENGTH = 280; // panjang gelombang (px)
    const TILT = 5; // derajat tilt

    // State
    let currentX = 0;
    let speed = 0.2;
    let targetSpeed = 0.2;
    let previousTime = performance.now();
    let frameId = 0;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>("[data-skill-item]"),
    );
    let baseLefts: number[] = [];

    const getWidth = () => firstSet.offsetWidth;

    const measure = () => {
      baseLefts = items.map((el) => el.offsetLeft);
    };

    measure();

    // Animation loop
    const animate = (time: number) => {
      const delta = Math.min(time - previousTime, 32);
      previousTime = time;

      // Smooth speed transition
      speed += (targetSpeed - speed) * 0.04;

      currentX -= speed * delta;

      const width = getWidth();
      if (width > 0 && currentX <= -width) {
        currentX += width;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Snake wave – world position based
      for (let i = 0; i < items.length; i++) {
        const worldX = baseLefts[i] + currentX;
        const phase = worldX / WAVELENGTH;
        const y = Math.sin(phase) * AMPLITUDE;
        const tilt = Math.cos(phase) * TILT;

        items[i].style.transform =
          `translate3d(0, ${y}px, 0) rotate(${tilt}deg)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // Hover slowdown
    const handleEnter = () => {
      targetSpeed = 0.07;
    };
    const handleLeave = () => {
      targetSpeed = 0.2;
    };

    section.addEventListener("mouseenter", handleEnter);
    section.addEventListener("mouseleave", handleLeave);

    // Resize
    const handleResize = () => {
      const width = getWidth();
      if (width > 0 && currentX <= -width) {
        currentX = currentX % width;
      }
      measure();
    };

    window.addEventListener("resize", handleResize);

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
        mt-16
        w-full
        overflow-hidden
        bg-[var(--background)]
        py-14
        md:mt-24
        md:py-16
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
        <div ref={firstSetRef} className="flex shrink-0 items-center">
          {skills.map((skill, index) => (
            <SkillItem key={`first-${index}`} skill={skill} />
          ))}
        </div>

        {/* SECOND SET */}
        <div className="flex shrink-0 items-center">
          {skills.map((skill, index) => (
            <SkillItem key={`second-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   SKILL ITEM
   ========================================= */
function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div
      data-skill-item
      className="
        group
        flex
        shrink-0
        items-center
        gap-3
        px-6
        will-change-transform
        md:px-8
      "
    >
      <span
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          text-[var(--foreground)]
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {skill.icon}
      </span>

      <span
        className="
          font-mono
          text-[10px]
          font-medium
          tracking-[0.16em]
          uppercase
          text-[var(--foreground-muted)]
          transition-colors
          duration-300
          group-hover:text-[var(--foreground)]
          md:text-[11px]
        "
      >
        {skill.name}
      </span>

      <span
        className="
          ml-3
          h-1
          w-1
          shrink-0
          rounded-full
          bg-[var(--border-strong)]
          opacity-60
        "
      />
    </div>
  );
}

/* === ICONS (tidak diubah) === */
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
