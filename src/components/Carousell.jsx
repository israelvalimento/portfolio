import { projects } from "./projects";
import "./Carousell.css";
import { useEffect, useId, useRef } from "react";

export default function Carousell({ active, setActive, onSelect }) {
  const curveId = useId().replace(/:/g, "");
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const tiles = Array.from(stage.querySelectorAll("[data-project-index]"));
    let frame;
    let lastCheck = -Infinity;
    let centeredIndex = -1;

    const trackCenter = (time) => {
      if (time - lastCheck >= 80) {
        lastCheck = time;
        const bounds = stage.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        let closestDistance = Infinity;
        let closestIndex = 0;
        for (const tile of tiles) {
          const tileBounds = tile.getBoundingClientRect();
          const distance = Math.abs(tileBounds.left + tileBounds.width / 2 - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = Number(tile.dataset.projectIndex);
          }
        }
        if (closestIndex !== centeredIndex) {
          centeredIndex = closestIndex;
          setActive(closestIndex);
        }
      }
      frame = requestAnimationFrame(trackCenter);
    };

    frame = requestAnimationFrame(trackCenter);
    return () => cancelAnimationFrame(frame);
  }, [setActive]);
  return (
    <div className="carousel" aria-label="Selected projects">
      <svg className="carousel-curve-definition" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id={curveId} clipPathUnits="objectBoundingBox">
            <path d="M0,.23 C.22,.23 .3,0 .5,0 S.78,.23 1,.23 L1,.77 C.78,.77 .7,1 .5,1 S.22,.77 0,.77 Z" />
          </clipPath>
        </defs>
      </svg>
      <div ref={stageRef} className="carousel-ribbon-stage" style={{ clipPath: `url(#${curveId})` }}>
        <div className="project-strip">
          {[0, 1, 2].map((copy) => (
            <div className="carousel-group" key={copy}>
              {projects.map(([title, image], index) => (
                <button
                  type="button"
                  className={`project-tile ${active === index ? "active" : ""}`}
                  key={title}
                  data-project-index={index}
                  onClick={() => {
                    onSelect?.(index);
                    document.getElementById("work")?.scrollIntoView({ block: "start" });
                  }}
                  aria-label={`View ${title} in the spotlight`}
                  aria-pressed={active === index}
                >
                  <img src={image} alt={title} draggable="false" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
