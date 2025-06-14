"use client";

import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTheme } from "../../app/ThemeContext";
import OrganicBackground from "../OrganicBackground";
import ThemeToggle from "../ThemeToggle";
import SparkleButton from "../SparkleButton";
import cx from "../../utils/cx"; // Assuming you have a utility for conditional classnames
import Footer from "../Footer";

const PlaygroundPage = ({ onHidePlayground }) => {
  const { theme } = useTheme();

  return (
    <div
      className={cx(
        "min-h-screen relative",
        theme === "dark"
          ? "bg-slate-900 text-amber-100"
          : "bg-amber-50 text-slate-800"
      )}
    >
      <OrganicBackground />

      <header
        className={cx(
          "sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300",
          theme === "dark"
            ? "bg-slate-900/80 border-red-500/20"
            : "bg-amber-50/80 border-red-200/30"
        )}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 flex items-center justify-between h-20">
          <div className="relative">
            <div className="flex items-center gap-4 mb-2">
              <Sparkles
                size={24}
                className={cx(
                  "transition-colors duration-300",
                  theme === "dark" ? "text-red-400" : "text-red-600"
                )}
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Playground
              </h1>
            </div>
            <p
              className={cx(
                "text-sm font-light",
                theme === "dark" ? "text-stone-400" : "text-stone-600"
              )}
            >
              A space for front-end experiments and creative explorations.
            </p>
          </div>

          <button
            onClick={onHidePlayground}
            className={cx(
              "flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 border-2",
              "backdrop-blur-sm shadow-lg group relative overflow-hidden",
              theme === "dark"
                ? "bg-slate-800/60 text-amber-200 hover:bg-slate-700/60 border-red-500/30 hover:border-red-400/50 shadow-red-900/20"
                : "bg-white/60 text-red-700 hover:bg-amber-50/60 border-red-300/40 hover:border-red-400/60 shadow-red-200/30"
            )}
          >
            <div className="absolute inset-0 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 bg-white/10" />
            <ArrowLeft
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span className="relative z-10">Back to Portfolio</span>
          </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cx(
              "absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 animate-pulse",
              theme === "dark" ? "bg-red-500" : "bg-red-400"
            )}
            style={{ animationDelay: "0s", animationDuration: "4s" }}
          />
          <div
            className={cx(
              "absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl opacity-15 animate-pulse",
              theme === "dark" ? "bg-orange-500" : "bg-orange-400"
            )}
            style={{ animationDelay: "2s", animationDuration: "6s" }}
          />
          <div
            className={cx(
              "absolute bottom-32 left-1/4 w-20 h-20 rounded-full blur-xl opacity-25 animate-pulse",
              theme === "dark" ? "bg-yellow-500" : "bg-yellow-400"
            )}
            style={{ animationDelay: "1s", animationDuration: "5s" }}
          />
        </div>

        <SparkleButton />
      </main>

      <Footer />

      <ThemeToggle />
    </div>
  );
};

export default PlaygroundPage;
