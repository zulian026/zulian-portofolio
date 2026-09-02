"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

type CursorMode = "default" | "view" | "open" | "mail";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLSpanElement>(null);

  const dotRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);

  const modeRef = useRef<CursorMode>("default");

  useEffect(() => {
    /*
     * =========================================
     * DEVICE CHECK
     * =========================================
     */

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      return;
    }

    setEnabled(true);

    const cursor = cursorRef.current;

    const label = labelRef.current;

    const dot = dotRef.current;

    if (!cursor || !label || !dot) {
      return;
    }

    /*
     * =========================================
     * INITIAL
     * =========================================
     */

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.7,
      opacity: 0,
    });

    gsap.set(dot, {
      scale: 1,
    });

    /*
     * =========================================
     * POSITION
     * =========================================
     */

    const position = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const target = {
      x: position.x,
      y: position.y,
    };

    /*
     * =========================================
     * MOUSE MOVE
     * =========================================
     */

    const handleMouseMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      gsap.to(cursor, {
        x: target.x,
        y: target.y,

        duration: 0.55,

        ease: "power3.out",

        overwrite: true,
      });

      if (modeRef.current === "default") {
        gsap.to(dot, {
          scale: 1,

          duration: 0.3,

          ease: "power3.out",
        });
      }
    };

    /*
     * =========================================
     * MOUSE ENTER WINDOW
     * =========================================
     */

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,

        duration: 0.35,

        ease: "power2.out",
      });
    };

    /*
     * =========================================
     * MOUSE LEAVE WINDOW
     * =========================================
     */

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,

        duration: 0.25,

        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    document.addEventListener("mouseenter", handleMouseEnter);

    document.addEventListener("mouseleave", handleMouseLeave);

    /*
     * =========================================
     * CURSOR EVENT SYSTEM
     * =========================================
     */

    const updateCursorMode = (event: Event) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");

      const nextMode =
        (cursorTarget?.dataset.cursor as CursorMode) || "default";

      if (nextMode === modeRef.current) {
        return;
      }

      modeRef.current = nextMode;

      updateVisual(nextMode);
    };

    const updateVisual = (mode: CursorMode) => {
      if (!cursor || !label || !dot) {
        return;
      }

      /*
       * DEFAULT
       */

      if (mode === "default") {
        gsap.to(cursor, {
          scale: 0.7,

          duration: 0.35,

          ease: "power3.out",
        });

        gsap.to(dot, {
          scale: 1,

          duration: 0.35,

          ease: "power3.out",
        });

        gsap.to(label, {
          opacity: 0,

          scale: 0.7,

          duration: 0.2,

          ease: "power2.out",
        });

        return;
      }

      /*
       * LABEL MODES
       */

      const labels: Record<Exclude<CursorMode, "default">, string> = {
        view: "VIEW",
        open: "OPEN ↗",
        mail: "MAIL ↗",
      };

      label.textContent = labels[mode as Exclude<CursorMode, "default">];

      gsap.to(cursor, {
        scale: 1,

        duration: 0.45,

        ease: "power3.out",
      });

      gsap.to(dot, {
        scale: 0,

        duration: 0.35,

        ease: "power3.out",
      });

      gsap.to(label, {
        opacity: 1,

        scale: 1,

        duration: 0.4,

        ease: "power3.out",
      });
    };

    /*
     * pointerover lebih tepat daripada
     * mouseover karena kita hanya ingin
     * mendeteksi perubahan element target.
     */

    document.addEventListener("pointerover", updateCursorMode);

    document.addEventListener("pointerout", updateCursorMode);

    /*
     * =========================================
     * CLEANUP
     * =========================================
     */

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      document.removeEventListener("mouseenter", handleMouseEnter);

      document.removeEventListener("mouseleave", handleMouseLeave);

      document.removeEventListener("pointerover", updateCursorMode);

      document.removeEventListener("pointerout", updateCursorMode);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]

        flex
        h-[76px]
        w-[76px]

        items-center
        justify-center

        rounded-full

        border
        border-[var(--foreground)]

        bg-[var(--foreground)]

        will-change-transform

        mix-blend-normal
      "
    >
      {/* DOT */}

      <div
        ref={dotRef}
        className="
          h-[5px]
          w-[5px]
          rounded-full
          bg-[var(--background)]
          will-change-transform
        "
      />

      {/* LABEL */}

      <span
        ref={labelRef}
        className="
          absolute

          font-mono
          text-[8px]
          font-semibold
          tracking-[0.14em]

          text-[var(--background)]

          opacity-0

          will-change-transform
        "
      >
        VIEW
      </span>
    </div>
  );
}
