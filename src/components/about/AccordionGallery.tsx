"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type GalleryItem = {
  id: string;
  image: string;
  label: string;
  title: string;
  alt: string;
};

type AccordionGalleryProps = {
  items: GalleryItem[];
};

export default function AccordionGallery({ items }: AccordionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || items.length === 0) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLButtonElement[];
    const images = imagesRef.current.filter(Boolean) as HTMLImageElement[];

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const updatePanels = (index: number, animate = true) => {
        const total = items.length;

        panels.forEach((panel, panelIndex) => {
          const isActive = panelIndex === index;

          const targetFlex = isActive ? 5 : 1;

          if (animate) {
            gsap.to(panel, {
              flexGrow: targetFlex,
              duration: 1.1,
              ease: "power3.inOut",
            });
          } else {
            gsap.set(panel, {
              flexGrow: targetFlex,
            });
          }

          const image = images[panelIndex];

          if (image) {
            if (animate) {
              gsap.to(image, {
                scale: isActive ? 1 : 1.08,
                filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                duration: 1.2,
                ease: "power3.out",
              });
            } else {
              gsap.set(image, {
                scale: isActive ? 1 : 1.08,
                filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
              });
            }
          }

          const content = panel.querySelector<HTMLElement>(
            "[data-gallery-content]",
          );

          if (content) {
            if (animate) {
              gsap.to(content, {
                opacity: isActive ? 1 : 0,
                duration: isActive ? 0.5 : 0.25,
                delay: isActive ? 0.25 : 0,
                ease: "power2.out",
              });
            } else {
              gsap.set(content, {
                opacity: isActive ? 1 : 0,
              });
            }
          }

          const number = panel.querySelector<HTMLElement>(
            "[data-gallery-number]",
          );

          if (number) {
            if (animate) {
              gsap.to(number, {
                opacity: isActive ? 1 : 0.45,
                duration: 0.5,
              });
            } else {
              gsap.set(number, {
                opacity: isActive ? 1 : 0.45,
              });
            }
          }
        });

        if (total > 0) {
          const progress = container.querySelector<HTMLElement>(
            "[data-gallery-progress]",
          );

          if (progress) {
            const width = ((index + 1) / total) * 100;

            gsap.to(progress, {
              width: `${width}%`,
              duration: 0.8,
              ease: "power3.out",
            });
          }
        }
      };

      updatePanels(activeIndex, false);

      const cleanupHandlers: Array<() => void> = [];

      panels.forEach((panel, index) => {
        const handleMouseEnter = () => {
          setActiveIndex(index);
          updatePanels(index);
        };

        panel.addEventListener("mouseenter", handleMouseEnter);

        cleanupHandlers.push(() => {
          panel.removeEventListener("mouseenter", handleMouseEnter);
        });
      });

      return () => {
        cleanupHandlers.forEach((cleanup) => cleanup());
      };
    });

    mm.add("(max-width: 767px)", () => {
      panels.forEach((panel, index) => {
        const isActive = index === activeIndex;

        gsap.set(panel, {
          height: isActive ? "60vh" : "72px",
        });

        const image = images[index];

        if (image) {
          gsap.set(image, {
            scale: isActive ? 1 : 1.05,
            filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
          });
        }

        const content = panel.querySelector<HTMLElement>(
          "[data-gallery-content]",
        );

        if (content) {
          gsap.set(content, {
            opacity: isActive ? 1 : 0,
          });
        }
      });

      const progress = container.querySelector<HTMLElement>(
        "[data-gallery-progress]",
      );

      if (progress) {
        gsap.set(progress, {
          width: `${((activeIndex + 1) / items.length) * 100}%`,
        });
      }

      return undefined;
    });

    return () => {
      mm.revert();
    };
  }, [activeIndex, items]);

  const handlePanelClick = (index: number) => {
    setActiveIndex(index);

    const panel = panelsRef.current[index];

    if (!panel) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!isMobile) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLButtonElement[];

    panels.forEach((item, panelIndex) => {
      gsap.to(item, {
        height: panelIndex === index ? "60vh" : "72px",
        duration: 0.8,
        ease: "power3.inOut",
      });

      const image = imagesRef.current[panelIndex];

      if (image) {
        gsap.to(image, {
          scale: panelIndex === index ? 1 : 1.05,
          filter: panelIndex === index ? "grayscale(0%)" : "grayscale(100%)",
          duration: 0.9,
          ease: "power3.out",
        });
      }

      const content = item.querySelector<HTMLElement>("[data-gallery-content]");

      if (content) {
        gsap.to(content, {
          opacity: panelIndex === index ? 1 : 0,
          duration: 0.4,
          delay: panelIndex === index ? 0.25 : 0,
        });
      }
    });

    const progress = containerRef.current?.querySelector<HTMLElement>(
      "[data-gallery-progress]",
    );

    if (progress) {
      gsap.to(progress, {
        width: `${((index + 1) / items.length) * 100}%`,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      {/* Gallery */}

      <div
        className="
          flex
          h-[72vh]
          min-h-[480px]
          w-full
          flex-col
          gap-px
          overflow-hidden
          border-y
          border-[var(--border)]
          md:h-[560px]
          md:min-h-0
          md:flex-row
        "
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              ref={(element) => {
                panelsRef.current[index] = element;
              }}
              type="button"
              aria-label={`View ${item.title}`}
              aria-pressed={isActive}
              data-cursor="view"
              onClick={() => handlePanelClick(index)}
              onFocus={() => {
                setActiveIndex(index);
              }}
              className="
                group
                relative
                min-h-[72px]
                flex-1
                cursor-pointer
                overflow-hidden
                bg-[var(--surface)]
                text-left
                outline-none
                md:min-h-0
              "
            >
              {/* Image */}

              <img
                ref={(element) => {
                  imagesRef.current[index] = element;
                }}
                src={item.image}
                alt={item.alt}
                draggable={false}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  grayscale
                  transition-none
                  will-change-transform
                "
              />

              {/* Image overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-black/20
                  transition-opacity
                  duration-700
                  group-hover:bg-black/10
                "
              />

              {/* Gradient */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/75
                  via-black/10
                  to-transparent
                  opacity-80
                "
              />

              {/* Vertical number */}

              <span
                data-gallery-number
                className="
                  absolute
                  left-4
                  top-5
                  z-10
                  font-mono
                  text-[9px]
                  tracking-[0.14em]
                  text-white
                  md:left-5
                  md:top-6
                "
              >
                {item.id}
              </span>

              {/* Closed label */}

              <span
                className="
                  pointer-events-none
                  absolute
                  bottom-5
                  left-4
                  z-10
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-white/80
                  md:left-5
                "
              >
                {item.label}
              </span>

              {/* Active content */}

              <div
                data-gallery-content
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  z-10
                  max-w-[420px]
                  md:bottom-7
                  md:left-7
                  md:right-7
                "
              >
                <span
                  className="
                    mb-3
                    block
                    h-px
                    w-8
                    bg-white
                  "
                />

                <h3
                  className="
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                    text-white
                    md:text-2xl
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.14em]
                    text-white/60
                  "
                >
                  {item.label} — {item.id}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.16em]
            text-[var(--foreground-subtle)]
          "
        >
          SELECTED MOMENTS
        </span>

        <span
          className="
            font-mono
            text-[9px]
            tracking-[0.14em]
            text-[var(--foreground-subtle)]
          "
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className="
          relative
          mt-3
          h-px
          w-full
          overflow-hidden
          bg-[var(--border)]
        "
      >
        <div
          data-gallery-progress
          className="
            absolute
            left-0
            top-0
            h-full
            bg-[var(--foreground)]
          "
          style={{
            width: `${((activeIndex + 1) / items.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
