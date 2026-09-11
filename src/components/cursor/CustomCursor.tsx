"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type CursorMode = "default" | "view" | "mail";

const LABELS: Record<Exclude<CursorMode, "default">, string> = {
  view: "VIEW",
  mail: "MAIL",
};

const DOT_SIZE = 10;
const HOVER_SIZE = 72;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<CursorMode>("default");
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!cursor || !dot || !label) return;

    // Skip di touch device
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    if (pointerQuery.matches) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.4,
        opacity: 0,
        width: DOT_SIZE,
        height: DOT_SIZE,
      });

      gsap.set(dot, { opacity: 1 });

      gsap.set(label, {
        opacity: 0,
        scale: 0.6,
        y: 6,
      });

      const moveX = gsap.quickTo(cursor, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(cursor, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      // Pulse halus tiap gerak, balik lagi ke 1 (yoyo) biar gak numpuk scale
      const scaleTween = gsap.to(cursor, {
        scale: 1.12,
        duration: 0.28,
        ease: "power2.out",
        paused: true,
        yoyo: true,
        repeat: 1,
      });

      let lastX = 0;
      let lastY = 0;

      const setMode = (mode: CursorMode) => {
        if (modeRef.current === mode) return;
        modeRef.current = mode;

        if (mode === "default") {
          gsap.to(cursor, {
            width: DOT_SIZE,
            height: DOT_SIZE,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(dot, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(label, {
            opacity: 0,
            scale: 0.6,
            y: 6,
            duration: 0.25,
            ease: "power2.in",
          });
          return;
        }

        label.textContent = LABELS[mode];

        gsap.to(cursor, {
          width: HOVER_SIZE,
          height: HOVER_SIZE,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        });

        // Dot inti memudar begitu ring membesar jadi label
        gsap.to(dot, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });

        gsap.fromTo(
          label,
          { opacity: 0, scale: 0.55, y: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: 0.05,
          },
        );
      };

      const handlePointerMove = (event: PointerEvent) => {
        const { clientX, clientY } = event;

        moveX(clientX);
        moveY(clientY);

        if (!reducedMotion && modeRef.current === "default") {
          const dx = Math.abs(clientX - lastX);
          const dy = Math.abs(clientY - lastY);
          if ((dx > 2 || dy > 2) && isVisibleRef.current) {
            scaleTween.restart();
          }
        }
        lastX = clientX;
        lastY = clientY;

        if (!isVisibleRef.current && modeRef.current === "default") {
          isVisibleRef.current = true;
          gsap.to(cursor, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      const handlePointerOver = (event: PointerEvent) => {
        const target = event.target as Element | null;
        if (!target) return;

        const interactive = target.closest<HTMLElement>("[data-cursor]");
        const mode = interactive?.dataset.cursor as CursorMode | undefined;

        if (mode === "view" || mode === "mail") {
          setMode(mode);
        }
      };

      const handlePointerOut = (event: PointerEvent) => {
        const target = event.target as Element | null;
        if (!target) return;

        const interactive = target.closest<HTMLElement>("[data-cursor]");
        if (!interactive) return;

        const related = event.relatedTarget as Node | null;
        if (related && interactive.contains(related)) return;

        setMode("default");
      };

      const handlePointerLeave = () => {
        isVisibleRef.current = false;
        setMode("default");
        gsap.to(cursor, {
          opacity: 0,
          scale: 0.6,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handlePointerEnter = () => {
        if (modeRef.current === "default") {
          isVisibleRef.current = true;
          gsap.to(cursor, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      document.addEventListener("pointerover", handlePointerOver);
      document.addEventListener("pointerout", handlePointerOut);
      document.documentElement.addEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      document.documentElement.addEventListener(
        "pointerenter",
        handlePointerEnter,
      );

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerover", handlePointerOver);
        document.removeEventListener("pointerout", handlePointerOut);
        document.documentElement.removeEventListener(
          "pointerleave",
          handlePointerLeave,
        );
        document.documentElement.removeEventListener(
          "pointerenter",
          handlePointerEnter,
        );
      };
    }, cursor);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]
        flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        opacity-0
        will-change-transform
        mix-blend-difference
      "
      style={{ width: DOT_SIZE, height: DOT_SIZE }}
    >
      {/* Ring tipis di sekeliling, biar dot gak flat */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-[var(--foreground)]/40
        "
      />
      {/* Dot inti */}
      <div
        ref={dotRef}
        className="
          absolute
          h-full
          w-full
          rounded-full
          bg-[var(--foreground)]
          shadow-[0_0_10px_var(--foreground)]
        "
      />
      <span
        ref={labelRef}
        className="
          relative
          select-none
          font-mono
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.14em]
          leading-none
          text-[var(--background)]
        "
      />
    </div>
  );
}
