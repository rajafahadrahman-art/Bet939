"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("bet939-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? "☾" : "☀"}
    </button>
  );
}
