"use client";

import { useTheme } from "../ThemeContext";
import { useEffect, useState } from "react";

export default function MaintenancePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-stone-950" : "bg-stone-50"
      }`}
    >
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-md">
        {/* Small decorative line */}
        <div
          className={`h-px w-12 mx-auto mb-8 ${
            isDark ? "bg-stone-700" : "bg-stone-300"
          }`}
        />

        {/* Heading */}
        <h1
          className={`text-4xl md:text-5xl font-serif font-light mb-4 transition-colors tracking-tight ${
            isDark ? "text-stone-100" : "text-stone-900"
          }`}
        >
          A moment, please
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg font-serif font-light mb-12 transition-colors leading-relaxed ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}
        >
          I&apos;m crafting something new. Back soon.
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-opacity ${
                isDark ? "bg-stone-600" : "bg-stone-400"
              } animate-pulse`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Small decorative line */}
        <div
          className={`h-px w-12 mx-auto mt-8 ${
            isDark ? "bg-stone-700" : "bg-stone-300"
          }`}
        />
      </div>
    </div>
  );
}
