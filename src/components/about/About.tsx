"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

import { education } from "@/data/education";

import { certificates } from "@/data/certificates";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
      /*
       * PROFILE
       */

      const profile = section.querySelector(".about-profile");

      if (profile) {
        gsap.fromTo(
          profile,
          {
            y: 50,

            opacity: 0,
          },
          {
            y: 0,

            opacity: 1,

            duration: 1.1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: profile,

              start: "top 82%",

              once: true,
            },
          },
        );
      }

      /*
       * PHOTO
       */

      const photo = section.querySelector(".about-photo");

      if (photo) {
        gsap.fromTo(
          photo,
          {
            clipPath: "inset(0 0 100% 0)",

            scale: 1.08,
          },
          {
            clipPath: "inset(0 0 0% 0)",

            scale: 1,

            duration: 1.3,

            ease: "power4.inOut",

            scrollTrigger: {
              trigger: photo,

              start: "top 82%",

              once: true,
            },
          },
        );
      }

      /*
       * CONTENT
       */

      const content = section.querySelector(".about-content");

      if (content) {
        gsap.fromTo(
          content,
          {
            y: 40,

            opacity: 0,
          },
          {
            y: 0,

            opacity: 1,

            duration: 1,

            delay: 0.15,

            ease: "power3.out",

            scrollTrigger: {
              trigger: content,

              start: "top 82%",

              once: true,
            },
          },
        );
      }

      /*
       * EDUCATION
       */

      const educationRows = section.querySelectorAll(".education-row");

      educationRows.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            y: 30,

            opacity: 0,
          },
          {
            y: 0,

            opacity: 1,

            duration: 0.8,

            delay: index * 0.08,

            ease: "power3.out",

            scrollTrigger: {
              trigger: row,

              start: "top 90%",

              once: true,
            },
          },
        );
      });

      /*
       * CERTIFICATES
       */

      const certificateRows = section.querySelectorAll(".certificate-row");

      certificateRows.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            y: 30,

            opacity: 0,
          },
          {
            y: 0,

            opacity: 1,

            duration: 0.8,

            delay: index * 0.06,

            ease: "power3.out",

            scrollTrigger: {
              trigger: row,

              start: "top 90%",

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
      id="about"
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
            about-profile

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
            ABOUT
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
            02 / 04
          </span>
        </div>

        {/* =====================================
            PROFILE
        ===================================== */}

        <div
          className="
            grid

            gap-12

            md:grid-cols-[0.75fr_1.25fr]

            md:gap-20

            lg:grid-cols-[0.65fr_1.35fr]

            lg:gap-32
          "
        >
          {/* PHOTO */}

          <div
            className="
              about-photo

              aspect-[4/5]

              max-w-[420px]

              overflow-hidden

              bg-[var(--surface)]
            "
          >
            <img
              src="/profile/photo.webp"

              alt="Zyan Dev"

              className="
                h-full

                w-full

                object-cover
              "
            />
          </div>

          {/* CONTENT */}

          <div
            className="
              about-content

              flex

              flex-col

              justify-center
            "
          >
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
              SOFTWARE ENGINEER
            </p>

            <h2
              className="
                m-0

                max-w-[900px]

                font-sans

                text-[clamp(3rem,7vw,7rem)]

                font-medium

                leading-[0.88]

                tracking-[-0.065em]
              "
            >
              I build things
              <br />
              with purpose.
            </h2>

            <div
              className="
                mt-10

                max-w-[600px]
              "
            >
              <p
                className="
                  text-base

                  leading-[1.8]

                  text-[var(--foreground-muted)]

                  md:text-lg
                "
              >
                I&apos;m a software engineer interested in building thoughtful
                digital products and experiences.
              </p>

              <p
                className="
                  mt-6

                  text-base

                  leading-[1.8]

                  text-[var(--foreground-muted)]

                  md:text-lg
                "
              >
                I enjoy working across design and engineering, especially when
                technology can make an experience feel simpler and more
                intuitive.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            EDUCATION
        ===================================== */}

        <div
          className="
            mt-32

            md:mt-48
          "
        >
          <div
            className="
              mb-10

              flex

              items-center

              justify-between

              border-t

              border-[var(--border)]

              pt-4
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
              EDUCATION
            </span>
          </div>

          <div>
            {education.map((item) => (
              <div
                key={item.id}
                className="
                    education-row

                    grid

                    gap-5

                    border-b

                    border-[var(--border)]

                    py-7

                    md:grid-cols-[1fr_1.5fr_auto]

                    md:items-center

                    md:gap-10
                  "
              >
                <div>
                  <p
                    className="
                        m-0

                        text-lg

                        font-medium

                        tracking-[-0.02em]
                      "
                  >
                    {item.institution}
                  </p>

                  <p
                    className="
                        mt-2

                        text-sm

                        text-[var(--foreground-muted)]
                      "
                  >
                    {item.degree}
                    {" · "}
                    {item.field}
                  </p>
                </div>

                <p
                  className="
                      m-0

                      max-w-[500px]

                      text-sm

                      leading-relaxed

                      text-[var(--foreground-muted)]
                    "
                >
                  {item.description}
                </p>

                <span
                  className="
                      font-mono

                      text-[9px]

                      tracking-[0.12em]

                      text-[var(--foreground-subtle)]

                      md:text-right
                    "
                >
                  {item.startYear}
                  {" — "}
                  {item.endYear}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================
            CERTIFICATES
        ===================================== */}

        <div
          className="
            mt-32

            md:mt-48
          "
        >
          <div
            className="
              mb-10

              flex

              items-center

              justify-between

              border-t

              border-[var(--border)]

              pt-4
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
              CERTIFICATES
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
              {String(certificates.length).padStart(2, "0")}
            </span>
          </div>

          <div>
            {certificates.map((certificate, index) => (
              <a
                key={certificate.id}

                href={certificate.credentialUrl ?? "#"}

                target="_blank"

                rel="noopener noreferrer"

                className="
                    certificate-row

                    group

                    grid

                    gap-5

                    border-b

                    border-[var(--border)]

                    py-7

                    no-underline

                    md:grid-cols-[60px_1fr_auto]

                    md:items-center

                    md:gap-10
                  "
              >
                {/* NUMBER */}

                <span
                  className="
                      font-mono

                      text-[9px]

                      tracking-[0.1em]

                      text-[var(--foreground-subtle)]
                    "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* INFO */}

                <div>
                  <p
                    className="
                        m-0

                        text-lg

                        font-medium

                        tracking-[-0.02em]

                        transition-transform

                        duration-500

                        ease-out

                        group-hover:translate-x-1
                      "
                  >
                    {certificate.title}
                  </p>

                  <p
                    className="
                        mt-2

                        text-sm

                        text-[var(--foreground-muted)]
                      "
                  >
                    {certificate.issuer}
                  </p>
                </div>

                {/* YEAR */}

                <span
                  className="
                      font-mono

                      text-[9px]

                      tracking-[0.12em]

                      text-[var(--foreground-subtle)]
                    "
                >
                  {certificate.year}

                  <span
                    className="
                        ml-4

                        inline-block

                        transition-transform

                        duration-500

                        group-hover:translate-x-1
                      "
                  >
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
