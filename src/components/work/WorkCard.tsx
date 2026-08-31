"use client";

import { useRef } from "react";

import gsap from "gsap";

import { Project } from "@/data/projects";

type WorkCardProps = {
  project: Project;
  index: number;
};

export default function WorkCard({ project, index }: WorkCardProps) {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const cursorRef = useRef<HTMLDivElement>(null);

  /*
   * =========================================
   * MOUSE ENTER
   * =========================================
   */

  const handleMouseEnter = () => {
    const cursor = cursorRef.current;

    const image = imageRef.current;

    if (cursor) {
      gsap.killTweensOf(cursor);

      gsap.to(cursor, {
        scale: 1,

        opacity: 1,

        duration: 0.55,

        ease: "power3.out",
      });
    }

    if (image) {
      gsap.killTweensOf(image);

      gsap.to(image, {
        scale: 1.025,

        duration: 0.9,

        ease: "power3.out",
      });
    }
  };

  /*
   * =========================================
   * MOUSE MOVE
   * =========================================
   */

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = imageWrapperRef.current;

    const image = imageRef.current;

    const cursor = cursorRef.current;

    if (!wrapper || !image) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;

    const normalizedX = x / rect.width - 0.5;

    const normalizedY = y / rect.height - 0.5;

    /*
     * IMAGE
     */

    gsap.to(image, {
      x: normalizedX * 8,

      y: normalizedY * 5,

      duration: 0.65,

      ease: "power3.out",

      overwrite: "auto",
    });

    /*
     * VIEW CURSOR
     */

    if (cursor) {
      gsap.to(cursor, {
        x: event.clientX,

        y: event.clientY,

        duration: 0.25,

        ease: "power3.out",

        overwrite: "auto",
      });
    }
  };

  /*
   * =========================================
   * MOUSE LEAVE
   * =========================================
   */

  const handleMouseLeave = () => {
    const image = imageRef.current;

    const cursor = cursorRef.current;

    if (image) {
      gsap.to(image, {
        x: 0,

        y: 0,

        scale: 1,

        duration: 0.9,

        ease: "power3.out",
      });
    }

    if (cursor) {
      gsap.to(cursor, {
        scale: 0,

        opacity: 0,

        duration: 0.35,

        ease: "power3.inOut",
      });
    }
  };

  /*
   * =========================================
   * CARD
   * =========================================
   */

  const content = (
    <>
      {/* =====================================
          TOP META
      ===================================== */}

      <div
        className="
          work-meta

          mb-8

          flex

          items-center

          justify-between

          font-mono

          text-[9px]

          tracking-[0.14em]

          uppercase

          text-[var(--foreground-muted)]
        "
      >
        <span>{String(index + 1).padStart(2, "0")}</span>

        <span>{project.year}</span>
      </div>

      {/* =====================================
          MAIN
      ===================================== */}

      <div
        className="
          grid

          gap-10

          md:grid-cols-[0.8fr_1.2fr]

          md:items-center

          lg:grid-cols-[0.75fr_1.25fr]

          lg:gap-16
        "
      >
        {/* INFO */}

        <div
          className="
            work-info

            order-2

            md:order-1
          "
        >
          <p
            className="
              mb-4

              font-mono

              text-[9px]

              tracking-[0.14em]

              uppercase

              text-[var(--foreground-muted)]
            "
          >
            {project.category}
          </p>

          <h3
            className="
              m-0

              font-sans

              text-[clamp(2.2rem,4.5vw,4.5rem)]

              font-medium

              leading-[0.9]

              tracking-[-0.055em]

              text-[var(--foreground)]

              transition-transform

              duration-700

              ease-out

              group-hover:translate-x-1
            "
          >
            {project.title}
          </h3>

          <p
            className="
              mt-7

              max-w-[430px]

              text-sm

              leading-[1.7]

              text-[var(--foreground-muted)]
            "
          >
            {project.description}
          </p>

          {/* TECHNOLOGIES */}

          <div
            className="
              mt-9

              flex

              flex-wrap

              gap-x-5

              gap-y-2
            "
          >
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="
                    font-mono

                    text-[9px]

                    tracking-[0.1em]

                    uppercase

                    text-[var(--foreground-subtle)]
                  "
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* IMAGE */}

        <div
          ref={imageWrapperRef}

          onMouseEnter={handleMouseEnter}

          onMouseMove={handleMouseMove}

          onMouseLeave={handleMouseLeave}

          className="
            relative

            order-1

            aspect-[16/10]

            overflow-hidden

            bg-[var(--surface)]

            md:order-2

            cursor-none
          "
        >
          <img
            ref={imageRef}

            src={project.image}

            alt={project.title}

            draggable={false}

            className="
              work-image

              h-full

              w-full

              object-cover

              will-change-transform

              transition-[filter]

              duration-700

              ease-out

              group-hover:brightness-[0.96]
            "
          />

          {/* VIEW CURSOR */}

          <div
            ref={cursorRef}

            className="
              pointer-events-none

              fixed

              left-0
              top-0

              z-[100]

              flex

              h-[76px]
              w-[76px]

              -translate-x-1/2
              -translate-y-1/2

              scale-0

              items-center

              justify-center

              rounded-full

              bg-[var(--foreground)]

              text-[var(--background)]

              opacity-0

              will-change-transform
            "
          >
            <span
              className="
                pointer-events-none

                absolute

                inset-[-3px]

                rounded-full

                border

                border-[var(--background)]

                opacity-80
              "
            />

            <span
              className="
                pointer-events-none

                absolute

                inset-[5px]

                rounded-full

                border

                border-[var(--background)]

                opacity-10
              "
            />

            <span
              className="
                relative

                z-10

                font-mono

                text-[9px]

                font-semibold

                tracking-[0.16em]

                uppercase

                text-[var(--background)]
              "
            >
              VIEW
            </span>
          </div>
        </div>
      </div>

      {/* =====================================
          BOTTOM META
      ===================================== */}

      <div
        className="
          mt-9

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

            tracking-[0.12em]

            uppercase

            text-[var(--foreground-muted)]
          "
        >
          {project.role}
        </span>

        <span
          className="
            flex

            items-center

            font-mono

            text-[9px]

            tracking-[0.12em]

            uppercase

            text-[var(--foreground)]

            transition-transform

            duration-500

            ease-out

            group-hover:translate-x-1
          "
        >
          VIEW PROJECT
          <span
            className="
              ml-2

              transition-transform

              duration-500

              group-hover:translate-x-1
            "
          >
            →
          </span>
        </span>
      </div>
    </>
  );

  /*
   * =========================================
   * RETURN
   * =========================================
   */

  return (
    <article
      className="
        work-card

        group

        relative

        border-t

        border-[var(--border)]

        py-10

        md:py-14

        lg:py-16
      "
    >
      {project.href ? (
        <a
          href={project.href}

          className="
            block

            no-underline
          "

          aria-label={`View ${project.title} project`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
}
