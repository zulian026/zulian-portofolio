"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import IntroName from "./IntroName";

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);

  const progressNumberRef = useRef<HTMLSpanElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const flashRef = useRef<HTMLDivElement>(null);

  const noiseRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
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

    const landing = document.querySelector(".landing-reveal");

    /*
     * =========================================
     * SAFETY CHECK
     * =========================================
     */

    if (
      !letters.length ||
      !name ||
      !progress ||
      !progressNumber ||
      !progressBar ||
      !flash ||
      !noise ||
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

        landing: Boolean(landing),
      });

      return;
    }

    /*
     * =========================================
     * GSAP CONTEXT
     * =========================================
     */

    const ctx = gsap.context(() => {
      /*
       * =====================================
       * INITIAL LETTER STATE
       * =====================================
       */

      gsap.set(letters, {
        y: "130%",

        opacity: 0,

        filter: "blur(10px)",

        scale: 1.05,
      });

      /*
       * =====================================
       * NAME
       * =====================================
       */

      gsap.set(name, {
        x: "-50%",

        y: "-50%",

        opacity: 1,

        scale: 1,

        filter: "blur(0px)",
      });

      /*
       * =====================================
       * PROGRESS
       * =====================================
       */

      gsap.set(progress, {
        opacity: 0,

        y: 12,
      });

      /*
       * =====================================
       * PROGRESS BAR
       * =====================================
       */

      gsap.set(progressBar, {
        scaleX: 0,

        transformOrigin: "left center",
      });

      /*
       * =====================================
       * FLASH
       * =====================================
       */

      gsap.set(flash, {
        opacity: 0,
      });

      /*
       * =====================================
       * NOISE
       * =====================================
       */

      gsap.set(noise, {
        opacity: 0.025,
      });

      /*
       * =====================================
       * LANDING
       * =====================================
       */

      gsap.set(landing, {
        opacity: 0,

        scale: 1.035,

        transformOrigin: "center center",
      });

      /*
       * =====================================
       * TIMELINE
       * =====================================
       */

      const tl = gsap.timeline();

      /*
       * =====================================
       * 01
       *
       * LETTER COUNTDOWN
       * =====================================
       */

      tl.to(letters, {
        y: "0%",

        opacity: 1,

        filter: "blur(0px)",

        scale: 1,

        duration: 0.3,

        stagger: 0.075,

        ease: "power4.out",
      });

      /*
       * =====================================
       * 02
       *
       * SETTLE
       * =====================================
       */

      tl.to(letters, {
        y: "-2px",

        duration: 0.1,

        stagger: 0.015,

        ease: "power2.out",
      });

      tl.to(letters, {
        y: "0px",

        duration: 0.1,

        stagger: 0.015,

        ease: "power2.inOut",
      });

      /*
       * =====================================
       * 03
       *
       * HOLD
       * =====================================
       */

      tl.to(
        {},
        {
          duration: 0.2,
        },
      );

      /*
       * =====================================
       * 04
       *
       * PROGRESS APPEAR
       * =====================================
       */

      tl.to(progress, {
        opacity: 1,

        y: 0,

        duration: 0.3,

        ease: "power3.out",
      });

      /*
       * =====================================
       * 05
       *
       * LOADING
       * =====================================
       */

      const loading = {
        value: 0,
      };

      tl.to(loading, {
        value: 100,

        duration: 1.15,

        ease: "power2.inOut",

        onUpdate: () => {
          const value = Math.round(loading.value);

          progressNumber.textContent = `${String(value).padStart(2, "0")}%`;

          gsap.set(progressBar, {
            scaleX: loading.value / 100,
          });
        },
      });

      /*
       * =====================================
       * 06
       *
       * 100% HOLD
       * =====================================
       */

      tl.to(
        {},
        {
          duration: 0.12,
        },
      );

      /*
       * =====================================
       * 07
       *
       * PROGRESS OUT
       * =====================================
       */

      tl.to(progress, {
        opacity: 0,

        y: -10,

        duration: 0.28,

        ease: "power3.inOut",
      });

      /*
       * =====================================
       * 08
       *
       * BACKGROUND OPENS
       * =====================================
       *
       * Tidak lagi hardcode putih.
       *
       * Kita hanya membuat intro
       * menjadi sedikit transparan
       * sehingga landing bisa mulai
       * terasa di belakangnya.
       */

      tl.to(root, {
        opacity: 0.98,

        duration: 0.7,

        ease: "power2.inOut",
      });

      /*
       * =====================================
       * 09
       *
       * NOISE OUT
       * =====================================
       */

      tl.to(
        noise,
        {
          opacity: 0,

          duration: 0.55,

          ease: "power2.out",
        },
        "<",
      );

      /*
       * =====================================
       * 10
       *
       * NAME LIFT
       * =====================================
       */

      tl.to(
        letters,
        {
          y: "-130%",

          opacity: 0,

          filter: "blur(6px)",

          duration: 0.55,

          stagger: 0.03,

          ease: "power4.inOut",
        },
        "<",
      );

      tl.to(
        name,
        {
          scale: 0.97,

          duration: 0.7,

          ease: "power2.out",
        },
        "<",
      );

      /*
       * =====================================
       * 11
       *
       * FLASH
       * =====================================
       */

      tl.fromTo(
        flash,
        {
          opacity: 0,
        },
        {
          opacity: 0.12,

          duration: 0.1,

          ease: "power2.out",
        },
      );

      /*
       * =====================================
       * 12
       *
       * FLASH OUT
       * =====================================
       */

      tl.to(flash, {
        opacity: 0,

        duration: 0.35,

        ease: "power2.out",
      });

      /*
       * =====================================
       * 13
       *
       * INTRO OUT
       * =====================================
       */

      tl.to(root, {
        opacity: 0,

        duration: 0.2,

        ease: "power2.out",

        onComplete: () => {
          root.style.visibility = "hidden";

          root.style.pointerEvents = "none";
        },
      });

      /*
       * =====================================
       * 14
       *
       * LANDING REVEAL
       * =====================================
       */

      tl.to(landing, {
        opacity: 1,

        scale: 1,

        duration: 0.85,

        ease: "power3.out",
      });
    }, root);

    /*
     * =========================================
     * CLEANUP
     * =========================================
     */

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ===========================================
   * RENDER
   * ===========================================
   */

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

        bg-[var(--background)]

        text-[var(--foreground)]

        will-change-[opacity]
      "
    >
      {/* =====================================
          NOISE
      ===================================== */}

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

      {/* =====================================
          NAME
      ===================================== */}

      <IntroName />

      {/* =====================================
          PROGRESS
      ===================================== */}

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

          <span ref={progressNumberRef}>00%</span>
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

      {/* =====================================
          FLASH
      ===================================== */}

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
