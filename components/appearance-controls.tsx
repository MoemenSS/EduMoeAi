"use client";
import { useEffect, useState } from "react";
import { Palette, Zap } from "lucide-react";
const themes = [
  { id: "ruby", color: "#f43f6d", label: "Ruby" },
  { id: "space", color: "#a78bfa", label: "Space" },
  { id: "oxford", color: "#38bdf8", label: "Oxford" },
  { id: "lava", color: "#fb923c", label: "Lava" },
];
export function AppearanceControls() {
  const [theme, setTheme] = useState("ruby");
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let savedTheme = "ruby",
        savedLite: string | null = null;
      try {
        savedTheme = localStorage.getItem("edumoe-theme") || "ruby";
        savedLite = localStorage.getItem("edumoe-lite");
      } catch {}
      const memory = (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory;
      const useLite =
        savedLite === null
          ? Boolean(memory && memory <= 4)
          : savedLite === "true";
      setTheme(savedTheme);
      setLite(useLite);
      document.documentElement.dataset.theme = savedTheme;
      document.documentElement.dataset.lite = String(useLite);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  function changeTheme(value: string) {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    try {
      localStorage.setItem("edumoe-theme", value);
    } catch {}
  }
  function changeLite() {
    setLite(!lite);
    document.documentElement.setAttribute("data-lite", String(!lite));
    try {
      localStorage.setItem("edumoe-lite", String(!lite));
    } catch {}
  }
  return (
    <details className="appearance-menu">
      <summary aria-label="Appearance settings">
        <Palette size={17} />
      </summary>
      <div className="appearance-popover glass-panel">
        <strong>Make it yours.</strong>
        <span>Same EduMoe. Your atmosphere.</span>
        <div className="theme-swatches">
          {themes.map((item) => (
            <button
              key={item.id}
              onClick={() => changeTheme(item.id)}
              aria-label={`${item.label} theme`}
              aria-pressed={theme === item.id}
              style={{ background: item.color }}
            />
          ))}
        </div>
        <button
          className="lite-toggle"
          onClick={changeLite}
          aria-pressed={lite}
        >
          <Zap size={14} /> Low power effects{" "}
          <strong>{lite ? "On" : "Off"}</strong>
        </button>
      </div>
    </details>
  );
}
