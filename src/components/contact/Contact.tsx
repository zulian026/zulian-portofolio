"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactData } from "@/data/contact";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(".contact-reveal");
      const headingLines = gsap.utils.toArray<HTMLElement>(
        ".contact-heading-line",
      );
      const headingInner = gsap.utils.toArray<HTMLElement>(
        ".contact-heading-inner",
      );
      const socialItems = gsap.utils.toArray<HTMLElement>(".contact-social");
      const email = section.querySelector<HTMLElement>(".contact-email");

      if (prefersReducedMotion) {
        gsap.set([revealElements, socialItems], {
          opacity: 1,
          y: 0,
        });
        gsap.set(headingInner, {
          yPercent: 0,
        });
        if (email) {
          gsap.set(email, {
            opacity: 1,
            y: 0,
          });
        }
        return;
      }

      gsap.set(revealElements, {
        opacity: 0,
        y: 20,
      });

      // heading now animates via an inner span (clip-path reveal on the
      // parent overflow-hidden wrapper), which reads cleaner than a fade
      gsap.set(headingInner, {
        yPercent: 110,
      });

      gsap.set(socialItems, {
        opacity: 0,
        y: 16,
      });

      if (email) {
        gsap.set(email, {
          opacity: 0,
          y: 24,
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      timeline.to(
        revealElements,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        0,
      );

      timeline.to(
        headingInner,
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.1,
      );

      if (email) {
        timeline.to(
          email,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.45,
        );
      }

      timeline.to(
        socialItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.55,
      );
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
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          min-h-[85svh]
          w-full
          max-w-[1440px]
          flex-col
          px-5
          py-20
          md:px-10
          md:py-28
          lg:min-h-[90svh]
          lg:px-16
          lg:py-32
        "
      >
        {/* ─────────────────────────────────────
            HEADER
        ───────────────────────────────────── */}
        <div
          className="
            contact-reveal
            flex
            items-center
            justify-between
            border-b
            border-[var(--border)]
            pb-5
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[var(--foreground-muted)]
            "
          >
            {contactData.label}
          </span>
          <span
            className="
              font-mono
              text-[10px]
              tracking-[0.16em]
              text-[var(--foreground-subtle)]
            "
          >
            05
          </span>
        </div>

        {/* ─────────────────────────────────────
            MAIN
        ───────────────────────────────────── */}
        <div
          className="
            mt-auto
            grid
            grid-cols-1
            gap-14
            pt-24
            md:pt-32
            lg:grid-cols-12
            lg:gap-10
          "
        >
          {/* Heading */}
          <div className="lg:col-span-8">
            <h2
              className="
                font-medium
                leading-[0.84]
                tracking-[-0.065em]
                text-[clamp(3.5rem,9vw,9rem)]
              "
            >
              <span className="contact-heading-line block overflow-hidden">
                <span className="contact-heading-inner block">
                  {contactData.heading.line1}
                </span>
              </span>
              <span className="contact-heading-line block overflow-hidden">
                <span className="contact-heading-inner block">
                  {contactData.heading.line2}
                </span>
              </span>
              <span className="contact-heading-line block overflow-hidden">
                <span className="contact-heading-inner block">
                  {contactData.heading.line3}
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}
          <div
            className="
              flex
              flex-col
              justify-end
              lg:col-span-4
              lg:pb-2
            "
          >
            <p
              className="
                contact-reveal
                max-w-[380px]
                text-sm
                leading-[1.9]
                text-[var(--foreground-muted)]
                md:text-base
              "
            >
              {contactData.description}
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────
            BOTTOM
        ───────────────────────────────────── */}
        <div
          className="
            mt-20
            grid
            grid-cols-1
            gap-10
            border-t
            border-[var(--border)]
            pt-8
            md:mt-28
            md:grid-cols-12
            md:gap-10
          "
        >
          {/* Email */}
          <div className="md:col-span-7">
            <span
              className="
                contact-reveal
                mb-4
                block
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-[var(--foreground-subtle)]
              "
            >
              GET IN TOUCH
            </span>
            <a
              href={`mailto:${contactData.email}`}
              data-cursor="mail"
              className="
                contact-email
                group
                inline-flex
                w-fit
                items-center
                gap-4
                text-lg
                tracking-[-0.02em]
                text-[var(--foreground)]
                transition-colors
                duration-500
                md:text-2xl
              "
            >
              <span
                className="
                  relative
                  after:absolute
                  after:bottom-[-4px]
                  after:left-0
                  after:h-px
                  after:w-full
                  after:origin-left
                  after:scale-x-0
                  after:bg-current
                  after:transition-transform
                  after:duration-500
                  after:ease-out
                  group-hover:after:scale-x-100
                "
              >
                {contactData.email}
              </span>
              <span
                className="
                  inline-flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--border)]
                  text-sm
                  text-[var(--foreground-muted)]
                  transition-all
                  duration-500
                  ease-out
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:border-[var(--foreground)]
                  group-hover:text-[var(--foreground)]
                "
              >
                ↗
              </span>
            </a>
          </div>

          {/* Socials */}
          <div className="md:col-span-5">
            <span
              className="
                contact-reveal
                mb-4
                block
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-[var(--foreground-subtle)]
              "
            >
              SOCIALS
            </span>
            <div className="flex flex-col">
              {contactData.socials.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="
                    contact-social
                    group
                    relative
                    flex
                    items-center
                    justify-between
                    overflow-hidden
                    border-b
                    border-[var(--border)]
                    px-1
                    py-3
                    text-sm
                    text-[var(--foreground)]
                  "
                >
                  {/* highlight sweep, sits behind content */}
                  <span
                    aria-hidden
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      -translate-x-full
                      bg-[var(--foreground)]/[0.04]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:translate-x-0
                    "
                  />
                  <span
                    className="
                      relative
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:translate-x-1
                    "
                  >
                    {social.label}
                  </span>
                  <span
                    className="
                      relative
                      flex
                      items-center
                      gap-3
                      font-mono
                      text-[9px]
                      text-[var(--foreground-subtle)]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                    <span
                      className="
                        inline-block
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    >
                      ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────
            FOOTER NOTE
        ───────────────────────────────────── */}
        <div
          className="
            contact-reveal
            mt-10
            flex
            items-center
            justify-between
            font-mono
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-[var(--foreground-subtle)]
          "
        >
          <span>{contactData.footerNote}</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  );
}
