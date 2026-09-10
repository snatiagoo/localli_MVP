"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// "onDark" (default) is for the navy sidebar, which stays navy in both
// themes — "onLight" is for placing the toggle directly on a page's own
// background (e.g. the landing page nav), which does change with the theme.
export function ThemeToggle({ variant = "onDark" }: { variant?: "onDark" | "onLight" }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIsDark(!isDark);
  }

  const colors =
    variant === "onDark"
      ? "text-white/80 hover:bg-white/10 hover:text-white"
      : "text-muted hover:bg-border/50 hover:text-foreground";

  return (
    <button
      onClick={toggle}
      title="Cambiar tema"
      className={`flex items-center justify-center w-10 h-10 rounded-full ${colors}`}
    >
      {isDark ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
    </button>
  );
}
