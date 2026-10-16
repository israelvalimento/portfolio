import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ring = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      document.documentElement.classList.toggle("custom-cursor-enabled", preference.matches);
      if (!preference.matches) ring.current?.classList.remove("is-visible");
    };
    const move = (event) => {
      if (!preference.matches || event.pointerType === "touch") return;
      const element = ring.current;
      element.style.left = `${event.clientX}px`;
      element.style.top = `${event.clientY}px`;
      element.classList.add("is-visible");
      element.classList.toggle("is-interactive", Boolean(event.target.closest("a, button, input, textarea, select, summary, [role='button']")));
    };
    const hide = () => ring.current?.classList.remove("is-visible");
    const leave = (event) => { if (!event.relatedTarget) hide(); };
    update();
    preference.addEventListener("change", update);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      preference.removeEventListener("change", update);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return <span ref={ring} className="custom-cursor-ring" aria-hidden="true" />;
}
