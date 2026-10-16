import { projects } from "./projects";

import { useEffect } from "react";

const ROTATION_DURATION_MS = 5000;

export default function Carousell({ active, setActive, onSelect }) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % projects.length);
    }, ROTATION_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion, setActive]);

  return (
    <div className="carousel" aria-label="Selected projects">
      <div className="project-strip">
        {projects.map(([title, image], index) => (
          <button
            className={`project-tile ${active === index ? "active" : ""}`}
            key={title}
            onClick={() => {
              setActive(index);
              onSelect?.(index);
              document.getElementById("work")?.scrollIntoView({ block: "start" });
            }}
            aria-label={`View ${title} in the spotlight`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            aria-pressed={active === index}
          >
            <img src={image} alt={title} />
            <span className="tile-number">0{index + 1}</span>
            <span className="tile-title">{title}</span>
            {active === index && !reducedMotion && (
              <span className="rotation-track" aria-hidden="true">
                <span key={active} className="rotation-progress" style={{ animationDuration: `${ROTATION_DURATION_MS}ms` }} />
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="carousel-controls">
        <span>{projects[active][0]}</span>
        <div>
          <span>
            0{active + 1} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

