export default function IntroName() {
  const name = "ZYAN DEV";

  return (
    <div
      className="
        intro-name

        absolute

        left-1/2
        top-1/2

        z-10

        flex

        whitespace-nowrap

        pointer-events-none

        font-sans

        text-[clamp(4rem,12vw,12rem)]

        font-medium

        leading-[0.85]

        tracking-[-0.08em]

        text-[var(--foreground)]

        will-change-[transform,opacity,filter]
      "
    >
      {name.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="
              inline-block

              overflow-hidden
            "
        >
          <span
            className="
                intro-letter

                inline-block

                will-change-[transform,opacity,filter]
              "
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        </span>
      ))}
    </div>
  );
}
