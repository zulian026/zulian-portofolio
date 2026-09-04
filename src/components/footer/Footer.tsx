"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactData } from "@/data/contact";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".footer-reveal");

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 16 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="
        relative
        w-full
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          gap-10
          px-5
          py-10
          md:px-10
          md:py-12
          lg:px-16
        "
      >
        {/* Top row */}
        <div
          className="
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* Brand / short note */}
          <div className="footer-reveal max-w-sm">
            <p
              className="
                text-sm
                leading-relaxed
                text-[var(--foreground-muted)]
              "
            >
              {contactData.footerNote ||
                "Designed & built with care. Always open for new opportunities."}
            </p>
          </div>

          {/* Links */}
          <div className="footer-reveal flex flex-wrap gap-x-8 gap-y-3">
            {contactData.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="
                  group
                  relative
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--foreground-subtle)]
                  transition-colors
                  duration-300
                  hover:text-[var(--foreground)]
                "
              >
                {social.label}
                <span
                  className="
                    absolute
                    -bottom-0.5
                    left-0
                    h-px
                    w-full
                    origin-left
                    scale-x-0
                    bg-current
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-x-100
                  "
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="
            footer-reveal
            flex
            flex-col
            items-start
            justify-between
            gap-4
            border-t
            border-[var(--border)]
            pt-6
            sm:flex-row
            sm:items-center
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-[var(--foreground-subtle)]
            "
          >
            © {currentYear} — All rights reserved
          </span>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contactData.email}`}
              data-cursor="mail"
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-[var(--foreground-subtle)]
                transition-colors
                duration-300
                hover:text-[var(--foreground)]
              "
            >
              {contactData.email}
            </a>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-cursor="pointer"
              className="
                group
                inline-flex
                items-center
                gap-2
                font-mono
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-[var(--foreground-subtle)]
                transition-colors
                duration-300
                hover:text-[var(--foreground)]
              "
            >
              Back to top
              <span
                className="
                  inline-block
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
