"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const previewImageRef = useRef<HTMLImageElement | null>(null);
  const previewTitleRef = useRef<HTMLParagraphElement | null>(null);
  const previewCategoryRef = useRef<HTMLParagraphElement | null>(null);

  const activeProjectRef = useRef<string | null>(null);

  useEffect(() => {
    const preview = previewRef.current;

    if (!preview) return;

    gsap.set(preview, {
      opacity: 0,
      scale: 0.8,
      xPercent: -50,
      yPercent: -50,
      pointerEvents: "none",
    });
  }, []);

  const movePreview = (event: React.MouseEvent) => {
    const preview = previewRef.current;

    if (!preview) return;

    gsap.to(preview, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const showPreview = (
    project: Project,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const preview = previewRef.current;
    const image = previewImageRef.current;
    const title = previewTitleRef.current;
    const category = previewCategoryRef.current;

    if (!preview || !image || !title || !category) return;

    activeProjectRef.current = project.id;

    image.src = project.image;
    image.alt = project.title;

    title.textContent = project.title;
    category.textContent = project.category;

    gsap.killTweensOf(preview);

    gsap.set(preview, {
      x: event.clientX,
      y: event.clientY,
      opacity: 0,
      scale: 0.8,
      xPercent: -50,
      yPercent: -50,
    });

    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const hidePreview = () => {
    const preview = previewRef.current;

    if (!preview) return;

    activeProjectRef.current = null;

    gsap.to(preview, {
      opacity: 0,
      scale: 0.8,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleProjectClick = (project: Project) => {
    const preview = previewRef.current;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    /*
     * Mobile tidak punya floating preview (hidden md:block), jadi tidak
     * ada koordinat yang bisa dipakai FLIP. Pastikan storage lama
     * tidak nyangkut lalu biarkan navigasi normal.
     */
    if (isMobile || !preview) {
      try {
        sessionStorage.removeItem("project-transition");
      } catch {
        // Ignore storage errors.
      }

      return;
    }

    const previewRect = preview.getBoundingClientRect();

    const rowElement = document.querySelector<HTMLElement>(
      `[data-project-id="${project.id}"]`,
    );

    const rowRect = rowElement?.getBoundingClientRect();

    try {
      sessionStorage.setItem(
        "project-transition",
        JSON.stringify({
          id: project.id,
          slug: project.slug,
          image: project.image,

          previewRect: {
            left: previewRect.left,
            top: previewRect.top,
            width: previewRect.width,
            height: previewRect.height,
          },

          rowRect: rowRect
            ? {
                left: rowRect.left,
                top: rowRect.top,
                width: rowRect.width,
                height: rowRect.height,
              }
            : null,
        }),
      );
    } catch {
      // Ignore storage errors.
    }
  };

  return (
    <section id="projects" className="relative border-t border-[var(--border)]">
      {/* Floating project preview */}
      <div
        ref={previewRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9990]
          hidden
          w-[320px]
          overflow-hidden
          rounded-sm
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-2xl
          md:block
        "
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            ref={previewImageRef}
            src=""
            alt=""
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <p
            ref={previewTitleRef}
            className="
              text-sm
              font-medium
              tracking-[-0.02em]
              text-[var(--foreground)]
            "
          />

          <p
            ref={previewCategoryRef}
            className="
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-[var(--foreground-muted)]
            "
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.16em]
                text-[var(--foreground-muted)]
              "
            >
              Selected work
            </span>
          </div>

          <h2
            className="
              max-w-3xl
              text-[clamp(2.5rem,6vw,5.5rem)]
              font-medium
              leading-[0.95]
              tracking-[-0.06em]
              text-[var(--foreground)]
            "
          >
            Other things I&apos;ve built.
          </h2>
        </div>

        {/* Projects */}
        <div className="border-t border-[var(--border)]">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              data-project-id={project.id}
              data-cursor="open"
              onClick={() => handleProjectClick(project)}
              onMouseEnter={(event) => showPreview(project, event)}
              onMouseMove={movePreview}
              onMouseLeave={hidePreview}
              className="
                group
                grid
                grid-cols-[48px_1fr_auto]
                items-center
                gap-4
                border-b
                border-[var(--border)]
                py-6
                transition-opacity
                duration-500
                hover:opacity-60
                md:grid-cols-[64px_1fr_180px_80px_24px]
              "
            >
              {/* Number */}
              <span
                className="
                  font-mono
                  text-[11px]
                  text-[var(--foreground-subtle)]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Project */}
              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                    text-[var(--foreground)]
                    md:text-2xl
                  "
                >
                  {project.title}
                </h3>

                <p
                  className="
                    mt-1
                    line-clamp-1
                    text-sm
                    text-[var(--foreground-muted)]
                    md:hidden
                  "
                >
                  {project.description}
                </p>
              </div>

              {/* Category */}
              <span
                className="
                  hidden
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-[var(--foreground-muted)]
                  md:block
                "
              >
                {project.category}
              </span>

              {/* Year */}
              <span
                className="
                  text-right
                  font-mono
                  text-[11px]
                  text-[var(--foreground-muted)]
                "
              >
                {project.year}
              </span>

              {/* Arrow */}
              <span
                className="
                  text-lg
                  text-[var(--foreground-muted)]
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-[var(--foreground)]
                "
              >
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
