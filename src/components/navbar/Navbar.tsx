"use client";

import { useEffect, useRef, useState } from "react";

import { useLenis } from "lenis/react";

import { useTheme } from "@/components/theme/ThemeProvider";

type SectionId = "top" | "work" | "about" | "projects" | "contact";

const navigation: {
  id: Exclude<SectionId, "top">;
  label: string;
}[] = [
  {
    id: "work",
    label: "WORK",
  },
  {
    id: "about",
    label: "ABOUT",
  },
  {
    id: "projects",
    label: "PROJECTS",
  },
  {
    id: "contact",
    label: "CONTACT",
  },
];

const sections: SectionId[] = ["top", "work", "about", "projects", "contact"];

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);

  const innerRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLElement>(null);

  const progressRef = useRef(0);

  const targetProgressRef = useRef(0);

  const rafRef = useRef<number | null>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("top");

  const { theme, toggleTheme } = useTheme();

  /*
   * =========================================
   * NAVBAR MOTION
   * =========================================
   */

  const renderNavbar = () => {
    const navbar = navbarRef.current;

    const inner = innerRef.current;

    const menu = menuRef.current;

    if (!navbar || !inner || !menu) {
      rafRef.current = null;

      return;
    }

    /*
     * Smooth interpolation.
     */

    progressRef.current +=
      (targetProgressRef.current - progressRef.current) * 0.075;

    const progress = progressRef.current;

    /*
     * =====================================
     * WIDTH
     * =====================================
     */

    const expandedWidth = 1180;

    const collapsedWidth = 760;

    const width = expandedWidth + (collapsedWidth - expandedWidth) * progress;

    navbar.style.width = `min(${width}px, calc(100vw - 32px))`;

    /*
     * =====================================
     * PADDING
     * =====================================
     */

    const expandedX = 24;

    const expandedY = 17;

    const collapsedX = 20;

    const collapsedY = 13;

    const paddingX = expandedX + (collapsedX - expandedX) * progress;

    const paddingY = expandedY + (collapsedY - expandedY) * progress;

    inner.style.padding = `${paddingY}px ${paddingX}px`;

    /*
     * =====================================
     * INNER GAP
     * =====================================
     */

    const expandedGap = 48;

    const collapsedGap = 28;

    const gap = expandedGap + (collapsedGap - expandedGap) * progress;

    inner.style.gap = `${gap}px`;

    /*
     * =====================================
     * MENU GAP
     * =====================================
     */

    const expandedMenuGap = 34;

    const collapsedMenuGap = 24;

    const menuGap =
      expandedMenuGap + (collapsedMenuGap - expandedMenuGap) * progress;

    menu.style.gap = `${menuGap}px`;

    /*
     * =====================================
     * MENU SCALE
     * =====================================
     */

    const scale = 1 - progress * 0.04;

    menu.style.transform = `scale(${scale})`;

    /*
     * =====================================
     * CONTINUE
     * =====================================
     */

    if (Math.abs(targetProgressRef.current - progressRef.current) > 0.001) {
      rafRef.current = requestAnimationFrame(renderNavbar);
    } else {
      rafRef.current = null;
    }
  };

  /*
   * =========================================
   * UPDATE NAVBAR TARGET
   * =========================================
   */

  const updateTarget = (value: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, value));

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(renderNavbar);
    }
  };

  /*
   * =========================================
   * ACTIVE SECTION
   * =========================================
   */

  const updateActiveSection = (scroll: number) => {
    /*
     * At the very top.
     */

    if (scroll < 80) {
      setActiveSection("top");

      return;
    }

    /*
     * Navbar reference line.
     *
     * Section becomes active when
     * it reaches roughly 35% of
     * the viewport.
     */

    const activationPoint = scroll + window.innerHeight * 0.35;

    let current: SectionId = "top";

    for (const id of sections) {
      const element = document.getElementById(id);

      if (!element) {
        continue;
      }

      const top = element.offsetTop;

      if (activationPoint >= top) {
        current = id;
      }
    }

    setActiveSection(current);
  };

  /*
   * =========================================
   * LENIS
   * =========================================
   */

  useLenis((lenis) => {
    const scroll = lenis.scroll;

    /*
     * Navbar morph.
     */

    if (scroll <= 20) {
      updateTarget(0);
    } else {
      const start = 20;

      const end = 180;

      const progress = (scroll - start) / (end - start);

      updateTarget(Math.max(0, Math.min(1, progress)));
    }

    /*
     * Active section.
     */

    updateActiveSection(scroll);
  });

  /*
   * =========================================
   * CLICK NAVIGATION
   * =========================================
   */

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: SectionId,
  ) => {
    event.preventDefault();

    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    /*
     * Dispatch navigation event
     * for our Lenis bridge.
     */

    window.dispatchEvent(
      new CustomEvent("portfolio:navigate", {
        detail: {
          target: id,
        },
      }),
    );

    /*
     * Update active state
     * immediately.
     */

    setActiveSection(id);
  };

  /*
   * =========================================
   * INITIAL RENDER
   * =========================================
   */

  useEffect(() => {
    const navbar = navbarRef.current;

    const inner = innerRef.current;

    const menu = menuRef.current;

    if (!navbar || !inner || !menu) {
      return;
    }

    navbar.style.width = "min(1180px, calc(100vw - 32px))";

    inner.style.padding = "17px 24px";

    inner.style.gap = "48px";

    menu.style.gap = "34px";

    menu.style.transform = "scale(1)";

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);

        rafRef.current = null;
      }
    };
  }, []);

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <header
      ref={navbarRef}
      className="
        fixed

        left-1/2
        top-6

        z-[9000]

        -translate-x-1/2

        will-change-[width]
      "
    >
      <div
        ref={innerRef}
        className="
          flex

          w-full

          items-center

          rounded-full

          border
          border-[var(--border)]

          bg-[color-mix(in_srgb,var(--surface)_78%,transparent)]

          backdrop-blur-xl
          backdrop-saturate-150

          shadow-[0_1px_8px_rgba(0,0,0,0.025)]

          transition-colors
          duration-400
        "
      >
        {/* =================================
            LOGO
        ================================= */}

        <a
          href="#top"
          onClick={(event) => handleNavigation(event, "top")}
          className="
            mr-auto

            shrink-0

            font-sans

            text-[13px]

            font-semibold

            leading-none

            tracking-[-0.025em]

            text-[var(--foreground)]

            no-underline

            transition-opacity
            duration-300

            hover:opacity-60
          "
        >
          ZYAN DEV
        </a>

        {/* =================================
            NAVIGATION
        ================================= */}

        <nav
          ref={menuRef}
          className="
            flex

            items-center

            mr-7

            origin-right

            whitespace-nowrap

            will-change-[gap,transform]
          "
        >
          {navigation.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavigation(event, item.id)}
                className={`
                    group

                    relative

                    font-mono

                    text-[10px]

                    font-medium

                    leading-none

                    tracking-[0.12em]

                    no-underline

                    transition-colors
                    duration-300

                    ${
                      isActive
                        ? "text-[var(--foreground)]"
                        : "text-[var(--foreground-muted)]"
                    }
                  `}
              >
                {item.label}

                {/* UNDERLINE */}

                <span
                  className={`
                      absolute

                      -bottom-[7px]

                      left-0

                      h-px

                      w-full

                      origin-left

                      bg-[var(--foreground)]

                      transition-transform

                      duration-500

                      ease-[cubic-bezier(0.16,1,0.3,1)]

                      ${isActive ? "scale-x-100" : "scale-x-0"}

                      group-hover:scale-x-100
                    `}
                />
              </a>
            );
          })}
        </nav>

        {/* =================================
            THEME
        ================================= */}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          className="
            relative

            flex

            h-[30px]
            w-[30px]

            shrink-0

            cursor-pointer

            items-center
            justify-center

            rounded-full

            border
            border-[var(--border)]

            bg-transparent

            text-[var(--foreground)]

            transition-all

            duration-350

            ease-out

            hover:border-[var(--border-strong)]

            hover:bg-[var(--surface)]

            hover:scale-105

            active:scale-95
          "
        >
          <span
            className="
              flex

              h-full
              w-full

              items-center
              justify-center

              text-[15px]

              leading-none

              transition-transform

              duration-500

              ease-out
            "
          >
            {theme === "light" ? "☼" : "☾"}
          </span>
        </button>
      </div>
    </header>
  );
}
