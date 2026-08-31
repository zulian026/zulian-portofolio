"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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
      const elements = section.querySelectorAll(".contact-reveal");

      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
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
      id="contact"
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
          py-28
          md:px-10
          md:py-40
          lg:px-16
          lg:py-52
        "
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            contact-reveal
            mb-20
            flex
            items-center
            justify-between
            border-t
            border-[var(--border)]
            pt-4
            md:mb-28
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
            CONTACT
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
            04 / 04
          </span>
        </div>

        {/* =====================================
            MAIN
        ===================================== */}

        <div
          className="
            grid
            gap-16
            md:grid-cols-[1.3fr_0.7fr]
            md:gap-20
            lg:gap-32
          "
        >
          {/* ===================================
              TITLE
          =================================== */}

          <div className="contact-reveal">
            <p
              className="
                mb-6
                font-mono
                text-[9px]
                tracking-[0.16em]
                uppercase
                text-[var(--foreground-muted)]
              "
            >
              HAVE A PROJECT IN MIND?
            </p>

            <h2
              className="
                m-0
                font-sans
                text-[clamp(3.5rem,9vw,9rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.07em]
                text-[var(--foreground)]
              "
            >
              Let&apos;s make
              <br />
              something.
            </h2>
          </div>

          {/* ===================================
              DESCRIPTION
          =================================== */}

          <div
            className="
              contact-reveal
              flex
              flex-col
              justify-end
            "
          >
            <p
              className="
                max-w-[400px]
                text-base
                leading-[1.8]
                text-[var(--foreground-muted)]
                md:text-lg
              "
            >
              Whether you have an idea, a project, or just want to say hello,
              feel free to reach out.
            </p>

            <a
              href="mailto:hello@example.com"
              className="
                group
                mt-10
                inline-flex
                w-fit
                items-center
                gap-4
                border-b
                border-[var(--border)]
                pb-3
                font-mono
                text-[10px]
                tracking-[0.14em]
                uppercase
                text-[var(--foreground)]
                no-underline
                transition-opacity
                duration-500
                hover:opacity-60
              "
            >
              <span>hello@example.com</span>

              <span
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* =====================================
            SOCIAL LINKS
        ===================================== */}

        <div
          className="
            contact-reveal
            mt-28
            grid
            grid-cols-2
            border-t
            border-[var(--border)]
            md:mt-40
            md:grid-cols-4
          "
        >
          {/* GITHUB */}

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              border-b
              border-r
              border-[var(--border)]
              py-5
              font-mono
              text-[9px]
              tracking-[0.14em]
              uppercase
              text-[var(--foreground)]
              no-underline
              opacity-60
              transition-opacity
              duration-500
              hover:opacity-100
              md:border-b-0
            "
          >
            <span>GitHub</span>

            <span
              className="
                ml-3
                inline-block
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </a>

          {/* LINKEDIN */}

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              border-b
              border-[var(--border)]
              px-5
              py-5
              font-mono
              text-[9px]
              tracking-[0.14em]
              uppercase
              text-[var(--foreground)]
              no-underline
              opacity-60
              transition-opacity
              duration-500
              hover:opacity-100
              md:border-b-0
              md:border-r
            "
          >
            <span>LinkedIn</span>

            <span
              className="
                ml-3
                inline-block
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </a>

          {/* INSTAGRAM */}

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              border-r
              border-[var(--border)]
              py-5
              font-mono
              text-[9px]
              tracking-[0.14em]
              uppercase
              text-[var(--foreground)]
              no-underline
              opacity-60
              transition-opacity
              duration-500
              hover:opacity-100
            "
          >
            <span>Instagram</span>

            <span
              className="
                ml-3
                inline-block
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </a>

          {/* X */}

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              px-5
              py-5
              font-mono
              text-[9px]
              tracking-[0.14em]
              uppercase
              text-[var(--foreground)]
              no-underline
              opacity-60
              transition-opacity
              duration-500
              hover:opacity-100
            "
          >
            <span>X / Twitter</span>

            <span
              className="
                ml-3
                inline-block
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1400px]
            flex-col
            gap-3
            px-6
            py-6
            font-mono
            text-[8px]
            tracking-[0.12em]
            uppercase
            text-[var(--foreground-muted)]
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
            lg:px-16
          "
        >
          <span>© {new Date().getFullYear()} ZYAN DEV</span>

          <span>DESIGNED &amp; BUILT WITH CARE</span>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="
              w-fit
              cursor-pointer
              border-0
              bg-transparent
              p-0
              font-mono
              text-[8px]
              tracking-[0.12em]
              uppercase
              text-[var(--foreground)]
              transition-opacity
              duration-300
              hover:opacity-60
            "
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
