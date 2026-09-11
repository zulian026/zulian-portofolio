"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import IntroName from "./IntroName";

const INTRO_STORAGE_KEY = "zyan-intro-completed";
const STAIR_COLUMNS = 7; // jumlah kolom tangga, tweak sesuai selera

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /*
     * =========================================
     * CHECK INTRO STATUS
     * =========================================
     */
    let introCompleted = false;
    try {
      introCompleted = sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    } catch {
      introCompleted = false;
    }

    const landing = document.querySelector(".landing-reveal");

    if (introCompleted) {
      root.style.visibility = "hidden";
      root.style.opacity = "0";
      root.style.pointerEvents = "none";
      if (landing) {
        gsap.set(landing, { opacity: 1, scale: 1, filter: "blur(0px)" });
      }
      return;
    }

    /*
     * =========================================
     * REDUCED MOTION GUARD
     * =========================================
     */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      root.style.visibility = "hidden";
      root.style.opacity = "0";
      root.style.pointerEvents = "none";
      if (landing) {
        gsap.set(landing, { opacity: 1, scale: 1, filter: "blur(0px)" });
      }
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      } catch {
        // ignore
      }
      return;
    }

    /*
     * =========================================
     * ELEMENTS
     * =========================================
     */
    const letters = root.querySelectorAll(".intro-letter");
    const name = root.querySelector(".intro-name");
    const progress = progressRef.current;
    const progressNumber = progressNumberRef.current;
    const progressBar = progressBarRef.current;
    const flash = flashRef.current;
    const noise = noiseRef.current;
    const columns = root.querySelectorAll(".intro-stair-column");

    if (
      !letters.length ||
      !name ||
      !progress ||
      !progressNumber ||
      !progressBar ||
      !flash ||
      !noise ||
      !columns.length ||
      !landing
    ) {
      console.error("[Intro] Animation target missing", {
        letters: letters.length,
        name: Boolean(name),
        progress: Boolean(progress),
        progressNumber: Boolean(progressNumber),
        progressBar: Boolean(progressBar),
        flash: Boolean(flash),
        noise: Boolean(noise),
        columns: columns.length,
        landing: Boolean(landing),
      });
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * =====================================
       * INITIAL STATE
       * =====================================
       */
      gsap.set(columns, { y: "0%" });

      gsap.set(letters, {
        y: "130%",
        opacity: 0,
        filter: "blur(10px)",
        scale: 1.05,
        rotationX: 55,
        transformPerspective: 600,
        transformOrigin: "50% 100%",
      });

      gsap.set(name, {
        x: "-50%",
        y: "-50%",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(progress, { opacity: 0, y: 12 });
      gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(flash, { opacity: 0 });
      gsap.set(noise, { opacity: 0.025 });

      gsap.set(landing, {
        opacity: 0,
        scale: 1.06,
        filter: "blur(6px)",
        transformOrigin: "center center",
      });

      const tl = gsap.timeline();

      /*
       * 01 — LETTER FLIP-IN
       */
      tl.to(letters, {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        rotationX: 0,
        duration: 0.4,
        stagger: 0.07,
        ease: "power4.out",
      });

      /*
       * 02 — SETTLE MICRO-BOUNCE
       */
      tl.to(letters, {
        y: "-2px",
        duration: 0.1,
        stagger: 0.015,
        ease: "power2.out",
      });
      tl.to(letters, {
        y: "0px",
        duration: 0.12,
        stagger: 0.015,
        ease: "power2.inOut",
      });

      /*
       * 03 — HOLD
       */
      tl.to({}, { duration: 0.2 });

      /*
       * 04 — PROGRESS APPEAR
       */
      tl.to(progress, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });

      /*
       * 05 — LOADING (non-linear, terasa "nyata")
       */
      const loading = { value: 0 };
      const updateProgress = () => {
        const value = Math.round(loading.value);
        progressNumber.textContent = `${String(value).padStart(2, "0")}%`;
        gsap.set(progressBar, { scaleX: loading.value / 100 });
      };

      tl.to(loading, {
        value: 58,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: updateProgress,
      });
      tl.to(loading, {
        value: 82,
        duration: 0.35,
        ease: "power1.inOut",
        onUpdate: updateProgress,
      });
      tl.to({}, { duration: 0.1 }); // micro-stutter, kesan nge-load beneran
      tl.to(loading, {
        value: 100,
        duration: 0.3,
        ease: "power3.out",
        onUpdate: updateProgress,
      });

      /*
       * 06 — 100% HOLD + PULSE
       */
      tl.to(progressNumber, {
        scale: 1.12,
        duration: 0.12,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      /*
       * 07 — PROGRESS OUT
       */
      tl.to(progress, {
        opacity: 0,
        y: -10,
        duration: 0.28,
        ease: "power3.inOut",
      });

      /*
       * 08 — NAME LIFT
       */
      tl.to(
        letters,
        {
          y: "-130%",
          opacity: 0,
          filter: "blur(6px)",
          rotationX: -40,
          duration: 0.5,
          stagger: 0.03,
          ease: "power4.inOut",
        },
        "-=0.05",
      );
      tl.to(
        name,
        {
          scale: 0.96,
          duration: 0.6,
          ease: "power2.out",
        },
        "<",
      );

      /*
       * 09 — FLASH BURST (nandain mulai transisi)
       */
      tl.fromTo(
        flash,
        { opacity: 0 },
        {
          opacity: 0.16,
          duration: 0.1,
          ease: "power2.out",
        },
        "-=0.2",
      );
      tl.to(flash, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(
        noise,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      );

      /*
       * 10 — STAIRCASE WIPE
       * Tiap kolom swipe ke atas dengan stagger → efek tangga,
       * ngereveal landing per-strip, bukan satu curtain gede.
       */
      tl.to(
        columns,
        {
          y: "-100%",
          duration: 0.7,
          ease: "power4.inOut",
          stagger: {
            each: 0.08,
            from: "start",
          },
          onComplete: () => {
            try {
              sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
            } catch {
              // ignore
            }
            root.style.visibility = "hidden";
            root.style.pointerEvents = "none";
          },
        },
        "-=0.15",
      );

      tl.to(
        landing,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        },
        "-=0.9",
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        text-[var(--foreground)]
      "
    >
      {/* STAIRCASE COLUMNS — pengganti bg solid di root */}
      <div className="absolute inset-0 z-0 flex">
        {Array.from({ length: STAIR_COLUMNS }).map((_, i) => (
          <div
            key={i}
            className="
              intro-stair-column
              h-full
              flex-1
              bg-[var(--background)]
              will-change-transform
            "
          />
        ))}
      </div>

      <div
        ref={noiseRef}
        className="
          intro-noise
          pointer-events-none
          absolute
          inset-0
          z-50
        "
      />

      <IntroName />

      <div
        ref={progressRef}
        className="
          absolute
          left-1/2
          top-[calc(50%+7rem)]
          z-20
          w-[min(280px,calc(100vw-48px))]
          -translate-x-1/2
          will-change-[transform,opacity]
        "
      >
        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            font-mono
            text-[9px]
            leading-none
            tracking-[0.18em]
            uppercase
            text-[var(--foreground-muted)]
          "
        >
          <span>INITIALIZING</span>
          <span ref={progressNumberRef} className="inline-block">
            00%
          </span>
        </div>

        <div
          className="
            h-px
            w-full
            overflow-hidden
            bg-[var(--border)]
          "
        >
          <div
            ref={progressBarRef}
            className="
              h-full
              w-full
              origin-left
              bg-[var(--foreground)]
              will-change-transform
            "
          />
        </div>
      </div>

      <div
        ref={flashRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[100]
          bg-[var(--background)]
        "
      />
    </div>
  );
}
