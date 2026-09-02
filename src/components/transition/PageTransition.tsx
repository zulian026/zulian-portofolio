"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type RectData = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ProjectTransition = {
  id: string;
  slug: string;
  image: string;
  previewRect: RectData;
  rowRect: RectData | null;
};

type ProjectBackTransition = {
  id: string;
  slug: string;
  image: string;
  rect: RectData | null;
};

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const sharedImageRef = useRef<HTMLImageElement | null>(null);

  const firstRenderRef = useRef(true);
  const navigatingRef = useRef(false);

  const pendingTransitionRef = useRef<ProjectTransition | null>(null);

  /*
   * ---------------------------------------------------------
   * INITIAL SETUP
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const background = backgroundRef.current;
    const image = sharedImageRef.current;

    if (!background || !image) return;

    gsap.set(background, {
      scaleY: 0,
      opacity: 1,
      transformOrigin: "bottom",
    });

    gsap.set(image, {
      opacity: 0,
      display: "none",
    });
  }, []);

  /*
   * ---------------------------------------------------------
   * READ FORWARD TRANSITION
   * ---------------------------------------------------------
   */

  const readProjectTransition = (): ProjectTransition | null => {
    try {
      const raw = sessionStorage.getItem("project-transition");

      if (!raw) return null;

      const parsed = JSON.parse(raw);

      if (
        !parsed ||
        typeof parsed.id !== "string" ||
        typeof parsed.slug !== "string" ||
        typeof parsed.image !== "string" ||
        !parsed.previewRect
      ) {
        return null;
      }

      const rect = parsed.previewRect;

      if (
        typeof rect.left !== "number" ||
        typeof rect.top !== "number" ||
        typeof rect.width !== "number" ||
        typeof rect.height !== "number"
      ) {
        return null;
      }

      return {
        id: parsed.id,
        slug: parsed.slug,
        image: parsed.image,

        previewRect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },

        rowRect: parsed.rowRect ?? null,
      };
    } catch {
      return null;
    }
  };

  /*
   * ---------------------------------------------------------
   * READ BACK TRANSITION
   * ---------------------------------------------------------
   */

  const readBackTransition = (): ProjectBackTransition | null => {
    try {
      const raw = sessionStorage.getItem("project-back-transition");

      if (!raw) return null;

      const parsed = JSON.parse(raw);

      if (
        !parsed ||
        typeof parsed.id !== "string" ||
        typeof parsed.slug !== "string" ||
        typeof parsed.image !== "string"
      ) {
        return null;
      }

      return {
        id: parsed.id,
        slug: parsed.slug,
        image: parsed.image,
        rect: parsed.rect ?? null,
      };
    } catch {
      return null;
    }
  };

  /*
   * ---------------------------------------------------------
   * CLEAR STORAGE
   * ---------------------------------------------------------
   */

  const clearForwardStorage = () => {
    try {
      sessionStorage.removeItem("project-back-transition");
    } catch {
      // Ignore storage errors.
    }
  };

  const clearAllProjectStorage = () => {
    try {
      sessionStorage.removeItem("project-transition");
      sessionStorage.removeItem("project-back-transition");
    } catch {
      // Ignore storage errors.
    }
  };

  /*
   * ---------------------------------------------------------
   * RESET TRANSITION
   * ---------------------------------------------------------
   */

  const resetTransition = () => {
    const background = backgroundRef.current;
    const image = sharedImageRef.current;

    if (!background || !image) return;

    gsap.killTweensOf([background, image]);

    gsap.set(background, {
      scaleY: 0,
      opacity: 1,
      transformOrigin: "bottom",
    });

    gsap.set(image, {
      opacity: 0,
      display: "none",
      scale: 1,
      filter: "blur(0px)",
    });
  };

  /*
   * ---------------------------------------------------------
   * FORWARD FLIP
   *
   * Projects -> Project Detail
   * ---------------------------------------------------------
   */

  const runForwardTransition = async (transition: ProjectTransition) => {
    const background = backgroundRef.current;
    const image = sharedImageRef.current;

    if (!background || !image) return;

    /*
     * Wait until destination DOM is mounted.
     */
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });

    /*
     * Find project detail cover.
     */
    const target = document.querySelector<HTMLElement>(
      ".project-cover-wrapper",
    );

    /*
     * Fallback.
     */
    if (!target) {
      gsap.set(background, {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "top",
      });

      gsap.to(background, {
        scaleY: 0,
        duration: 0.9,
        ease: "power4.inOut",

        onComplete: () => {
          navigatingRef.current = false;
          pendingTransitionRef.current = null;

          clearForwardStorage();
        },
      });

      return;
    }

    const targetRect = target.getBoundingClientRect();

    /*
     * Use same image as preview.
     */
    image.src = transition.image;

    /*
     * Start at old preview position — sedikit soft (blur + scale down)
     * lalu jadi tajam saat mencapai destination.
     */
    gsap.set(image, {
      display: "block",
      opacity: 1,

      position: "fixed",

      left: transition.previewRect.left,
      top: transition.previewRect.top,

      width: transition.previewRect.width,
      height: transition.previewRect.height,

      x: 0,
      y: 0,

      scale: 0.985,

      filter: "blur(1.5px)",

      borderRadius: 2,

      objectFit: "cover",
    });

    /*
     * Hide actual destination cover.
     */
    gsap.set(target, {
      opacity: 0,
    });

    /*
     * Background is currently covering page.
     */
    gsap.set(background, {
      scaleY: 1,
      opacity: 1,
      transformOrigin: "top",
    });

    const timeline = gsap.timeline();

    /*
     * Slight background reveal — dijaga tetap redup, image-driven.
     */
    timeline.to(
      background,
      {
        opacity: 0.18,
        duration: 0.4,
        ease: "power2.out",
      },
      0,
    );

    /*
     * FLIP.
     */
    timeline.to(
      image,
      {
        left: targetRect.left,
        top: targetRect.top,

        width: targetRect.width,
        height: targetRect.height,

        borderRadius: 0,

        scale: 1.015,

        filter: "blur(0px)",

        duration: 1.2,

        ease: "expo.inOut",
      },
      0,
    );

    /*
     * Reveal real cover.
     */
    timeline.call(() => {
      gsap.set(target, {
        opacity: 1,
      });
    });

    /*
     * Fade shared image over actual cover.
     */
    timeline.to(
      image,
      {
        opacity: 0,

        scale: 1,

        duration: 0.5,

        ease: "power2.out",
      },
      "-=0.18",
    );

    /*
     * Remove overlay.
     */
    timeline.to(
      background,
      {
        scaleY: 0,
        opacity: 1,

        duration: 0.9,

        ease: "expo.inOut",

        transformOrigin: "top",
      },
      "-=0.3",
    );

    timeline.call(() => {
      resetTransition();

      navigatingRef.current = false;
      pendingTransitionRef.current = null;

      /*
       * PENTING: jangan hapus "project-transition" di sini.
       * Data ini masih dibutuhkan tombol Back di halaman detail
       * untuk membangun "project-back-transition".
       */
      clearForwardStorage();
    });
  };

  /*
   * ---------------------------------------------------------
   * BACK FLIP
   *
   * Project Detail -> Projects
   * ---------------------------------------------------------
   */

  const runBackTransition = async (transition: ProjectBackTransition) => {
    const background = backgroundRef.current;
    const image = sharedImageRef.current;

    if (!background || !image) return;

    /*
     * Wait until Projects DOM is mounted.
     */
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });

    /*
     * Find original project row.
     */
    const target = document.querySelector<HTMLElement>(
      `[data-project-id="${transition.id}"]`,
    );

    /*
     * No target / no saved position.
     */
    if (!target || !transition.rect) {
      gsap.set(background, {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "top",
      });

      gsap.to(background, {
        scaleY: 0,

        duration: 0.9,

        ease: "power4.inOut",

        onComplete: () => {
          navigatingRef.current = false;

          clearAllProjectStorage();
        },
      });

      return;
    }

    const targetRect = target.getBoundingClientRect();

    /*
     * Same project image.
     */
    image.src = transition.image;

    /*
     * Start at detail cover position — sedikit soft, kebalikan dari forward.
     */
    gsap.set(image, {
      display: "block",
      opacity: 1,

      position: "fixed",

      left: transition.rect.left,
      top: transition.rect.top,

      width: transition.rect.width,
      height: transition.rect.height,

      x: 0,
      y: 0,

      scale: 1.015,

      filter: "blur(1.5px)",

      borderRadius: 0,

      objectFit: "cover",
    });

    /*
     * Hide actual project row.
     */
    gsap.set(target, {
      opacity: 0,
    });

    /*
     * Background.
     */
    gsap.set(background, {
      scaleY: 1,
      opacity: 1,
      transformOrigin: "top",
    });

    const timeline = gsap.timeline();

    /*
     * FLIP back.
     */
    timeline.to(
      image,
      {
        left: targetRect.left,
        top: targetRect.top,

        width: targetRect.width,
        height: targetRect.height,

        borderRadius: 2,

        scale: 0.985,

        filter: "blur(0px)",

        duration: 1.2,

        ease: "expo.inOut",
      },
      0,
    );

    /*
     * Slight background reveal — dijaga tetap redup.
     */
    timeline.to(
      background,
      {
        opacity: 0.18,

        duration: 0.5,

        ease: "power2.out",
      },
      0,
    );

    /*
     * Reveal real row.
     */
    timeline.call(() => {
      gsap.set(target, {
        opacity: 1,
      });
    });

    /*
     * Fade shared image.
     */
    timeline.to(
      image,
      {
        opacity: 0,

        scale: 1,

        duration: 0.5,

        ease: "power2.out",
      },
      "-=0.18",
    );

    /*
     * Remove overlay.
     */
    timeline.to(
      background,
      {
        scaleY: 0,
        opacity: 1,

        duration: 0.9,

        ease: "expo.inOut",

        transformOrigin: "top",
      },
      "-=0.3",
    );

    timeline.call(() => {
      resetTransition();

      navigatingRef.current = false;

      /*
       * Ronde forward+back sudah selesai total, sekarang aman
       * hapus keduanya.
       */
      clearAllProjectStorage();
    });
  };

  /*
   * ---------------------------------------------------------
   * ROUTE CHANGE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    /*
     * Initial page load:
     * no animation.
     */
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const runTransition = async () => {
      /*
       * BACK first.
       */
      const backTransition = readBackTransition();

      if (backTransition) {
        await runBackTransition(backTransition);

        return;
      }

      /*
       * FORWARD.
       */
      const forwardTransition = pendingTransitionRef.current;

      if (forwardTransition) {
        await runForwardTransition(forwardTransition);

        return;
      }

      /*
       * NORMAL PAGE TRANSITION.
       */
      const background = backgroundRef.current;

      if (!background) return;

      gsap.killTweensOf(background);

      gsap.set(background, {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "top",
      });

      gsap.to(background, {
        scaleY: 0,

        duration: 0.9,

        ease: "power4.inOut",

        onComplete: () => {
          navigatingRef.current = false;
        },
      });
    };

    void runTransition();
  }, [pathname]);

  /*
   * ---------------------------------------------------------
   * COVER-THEN-NAVIGATE EVENT
   *
   * Dipakai oleh tombol Back (bukan <a>, jadi tidak lewat
   * click interceptor di bawah). Menutup layar dulu dengan
   * overlay, baru push route.
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleCoverNavigate = (event: Event) => {
      const detail = (event as CustomEvent<{ href: string }>).detail;

      if (!detail?.href) return;

      if (navigatingRef.current) return;

      navigatingRef.current = true;

      const background = backgroundRef.current;
      const image = sharedImageRef.current;

      if (!background) {
        router.push(detail.href);

        navigatingRef.current = false;

        return;
      }

      gsap.killTweensOf([background, image]);

      gsap.set(background, {
        scaleY: 0,
        opacity: 1,
        transformOrigin: "bottom",
      });

      if (image) {
        gsap.set(image, {
          display: "none",
          opacity: 0,
        });
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          router.push(detail.href);
        },
      });

      timeline.to(
        background,
        {
          scaleY: 1,

          duration: 0.85,

          ease: "power4.inOut",
        },
        0,
      );
    };

    window.addEventListener("app:navigate-with-cover", handleCoverNavigate);

    return () => {
      window.removeEventListener(
        "app:navigate-with-cover",
        handleCoverNavigate,
      );
    };
  }, [router]);

  /*
   * ---------------------------------------------------------
   * CLICK INTERCEPTOR
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      /*
       * Only left click.
       */
      if (event.button !== 0) return;

      /*
       * Ignore modifier clicks.
       */
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const clicked = event.target;

      if (!(clicked instanceof Element)) {
        return;
      }

      const link = clicked.closest("a");

      if (!link) return;

      /*
       * Ignore new tab/download.
       */
      if (link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) return;

      /*
       * External.
       */
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      /*
       * Hash-only links.
       */
      if (href.startsWith("#")) {
        return;
      }

      let destination: URL;

      try {
        destination = new URL(href, window.location.origin);
      } catch {
        return;
      }

      /*
       * Same origin only.
       */
      if (destination.origin !== window.location.origin) {
        return;
      }

      /*
       * Same page.
       */
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      /*
       * Prevent double navigation.
       */
      if (navigatingRef.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      navigatingRef.current = true;

      const background = backgroundRef.current;

      const image = sharedImageRef.current;

      if (!background || !image) {
        router.push(
          destination.pathname + destination.search + destination.hash,
        );

        navigatingRef.current = false;

        return;
      }

      /*
       * Check project transition.
       */
      const projectTransition = readProjectTransition();

      pendingTransitionRef.current = projectTransition;

      /*
       * Kill old animations.
       */
      gsap.killTweensOf([background, image]);

      /*
       * Prepare background.
       */
      gsap.set(background, {
        scaleY: 0,
        opacity: 1,
        transformOrigin: "bottom",
      });

      /*
       * Prepare shared image — soft entrance, sama seperti runForwardTransition.
       */
      if (projectTransition) {
        image.src = projectTransition.image;

        gsap.set(image, {
          display: "block",
          opacity: 1,

          position: "fixed",

          left: projectTransition.previewRect.left,

          top: projectTransition.previewRect.top,

          width: projectTransition.previewRect.width,

          height: projectTransition.previewRect.height,

          x: 0,
          y: 0,

          scale: 0.985,

          filter: "blur(1.5px)",

          borderRadius: 2,

          objectFit: "cover",
        });
      } else {
        gsap.set(image, {
          display: "none",
          opacity: 0,
        });
      }

      /*
       * Cover current page.
       */
      const timeline = gsap.timeline({
        onComplete: () => {
          router.push(
            destination.pathname + destination.search + destination.hash,
          );
        },
      });

      timeline.to(
        background,
        {
          scaleY: 1,

          duration: 0.85,

          ease: "power4.inOut",
        },
        0,
      );
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [router]);

  /*
   * ---------------------------------------------------------
   * RENDER
   *
   * z-[99998] — CustomCursor tetap di z-[99999], jangan dibalik.
   * ---------------------------------------------------------
   */

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-[99998]
      "
      aria-hidden="true"
    >
      {/* Background overlay */}
      <div
        ref={backgroundRef}
        className="
          absolute
          inset-0
          origin-bottom
          bg-[var(--background)]
          will-change-transform
        "
      />

      {/* Shared project image */}
      <img
        ref={sharedImageRef}
        alt=""
        className="
          absolute
          left-0
          top-0
          opacity-0
          object-cover
          will-change-[left,top,width,height,transform,opacity,filter]
        "
      />
    </div>
  );
}
