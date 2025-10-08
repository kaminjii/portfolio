"use client";

import React, { useState, useEffect } from "react";
import { PiFlowerLotus } from "react-icons/pi";
import { useTheme } from "../app/ThemeContext";

const LandingAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState("initial"); // initial, expanding, fading
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Stage 1: Initial bloom (0.5s)
    const timer1 = setTimeout(() => setStage("expanding"), 500);

    // Stage 2: Expand and fade (1.5s)
    const timer2 = setTimeout(() => setStage("fading"), 1500);

    // Stage 3: Complete (2.5s total)
    const timer3 = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-1000 ${
        stage === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background with gradient */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-stone-950 via-stone-900 to-red-950/30"
            : "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"
        }`}
      />

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-[2000ms] ${
            stage === "initial" ? "scale-0 opacity-0" : "scale-100 opacity-30"
          }`}
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)",
          }}
        />

        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-[2000ms] delay-300 ${
            stage === "initial" ? "scale-0 opacity-0" : "scale-100 opacity-20"
          }`}
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Central element */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Lotus icon with pulsing animation */}
        <div
          className={`relative transition-all duration-1000 ${
            stage === "initial"
              ? "scale-50 opacity-0"
              : stage === "expanding"
                ? "scale-100 opacity-100"
                : "scale-150 opacity-0"
          }`}
        >
          {/* Outer rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-32 h-32 rounded-full border-2 transition-all duration-[1500ms] ${
                stage === "expanding"
                  ? "scale-[2] opacity-0"
                  : "scale-100 opacity-100"
              } ${theme === "dark" ? "border-red-400/30" : "border-red-500/40"}`}
            />
            <div
              className={`absolute w-32 h-32 rounded-full border-2 transition-all duration-[1500ms] delay-150 ${
                stage === "expanding"
                  ? "scale-[2.5] opacity-0"
                  : "scale-100 opacity-100"
              } ${theme === "dark" ? "border-orange-400/20" : "border-orange-500/30"}`}
            />
          </div>

          {/* Main lotus */}
          <div
            className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl ${
              theme === "dark" ? "shadow-red-500/50" : "shadow-red-500/40"
            }`}
          >
            <PiFlowerLotus size={48} className="text-amber-50 animate-pulse" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-1000 ${
                  stage === "expanding"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={`mt-8 transition-all duration-700 delay-300 ${
            stage === "initial"
              ? "opacity-0 translate-y-4"
              : stage === "expanding"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
          }`}
        >
          <h1
            className={`text-4xl font-serif text-center ${
              theme === "dark" ? "text-amber-100" : "text-slate-900"
            }`}
          >
            kaitlin<span className="text-red-400 font-medium">.</span>
          </h1>
          <p
            className={`text-sm text-center mt-2 font-light ${
              theme === "dark" ? "text-stone-400" : "text-slate-600"
            }`}
          >
            Crafting delightful experiences
          </p>
        </div>

        {/* Loading dots */}
        <div
          className={`flex gap-2 mt-6 transition-all duration-500 delay-500 ${
            stage === "initial"
              ? "opacity-0"
              : stage === "expanding"
                ? "opacity-100"
                : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                theme === "dark" ? "bg-red-400" : "bg-red-500"
              }`}
              style={{
                animation: "pulse-dot 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingAnimation;
