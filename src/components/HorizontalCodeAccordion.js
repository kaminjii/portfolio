import React, { useState } from "react";
import { Eye } from "lucide-react";
import { useTheme } from "../app/ThemeContext";
import cx from "../utils/cx";

const HorizontalCodeAccordion = ({ items }) => {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState(items[0]?.id || "jsx");
  const [isExpanded, setIsExpanded] = useState(false);

  const activeItem = items.find((item) => item.id === activeId) || items[0];

  return (
    <div className="w-full">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cx(
            "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border-2",
            "backdrop-blur-sm shadow-lg",
            theme === "dark"
              ? "bg-slate-800/60 border-red-500/30 text-amber-200"
              : "bg-white/60 border-red-300/40 text-red-700"
          )}
        >
          <div className="flex items-center gap-3">
            {activeItem?.icon && (
              <activeItem.icon size={20} className="text-red-500" />
            )}
            <span className="font-medium">{activeItem?.title} Code</span>
          </div>
          <Eye
            size={18}
            className={cx(
              "transition-transform duration-300",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      {/* Desktop Horizontal Layout */}
      <div
        className="hidden lg:flex w-full h-[450px] min-h-[400px] gap-4 transition-all duration-500"
        onMouseLeave={() => setActiveId(items[0]?.id || "jsx")}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              className={cx(
                "relative rounded-3xl transition-all duration-700 ease-out overflow-hidden cursor-pointer group border-2",
                "backdrop-blur-sm shadow-xl hover:shadow-2xl",
                isActive
                  ? "flex-grow-[10]"
                  : "flex-grow-[1] hover:flex-grow-[1.2]",
                theme === "dark"
                  ? "bg-slate-800/40 border-red-500/25 hover:border-red-400/45 shadow-red-900/10"
                  : "bg-white/60 border-red-200/50 hover:border-red-300/70 shadow-red-100/20"
              )}
            >
              <div
                className={cx(
                  "absolute top-0 left-0 w-20 h-full flex items-center justify-center py-6 pointer-events-none z-10 transition-all duration-700",
                  "bg-gradient-to-b rounded-l-3xl",
                  theme === "dark"
                    ? "from-slate-800/60 to-slate-900/40"
                    : "from-white/70 to-amber-50/50"
                )}
              >
                <div
                  className="flex items-center gap-4 rotate-180"
                  style={{ writingMode: "vertical-rl" }}
                >
                  <item.icon
                    size={22}
                    className={cx(
                      "transition-all duration-500",
                      isActive
                        ? theme === "dark"
                          ? "text-red-400 drop-shadow-sm"
                          : "text-red-600"
                        : theme === "dark"
                          ? "text-stone-500"
                          : "text-stone-400",
                      isActive && "scale-110"
                    )}
                  />
                  <span
                    className={cx(
                      "font-semibold text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-500",
                      isActive
                        ? theme === "dark"
                          ? "text-amber-200"
                          : "text-stone-800"
                        : theme === "dark"
                          ? "text-stone-400"
                          : "text-stone-500"
                    )}
                  >
                    {item.title}
                  </span>
                </div>
              </div>

              <div
                className={cx(
                  "absolute inset-0 w-full h-full transition-all duration-500",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}
              >
                <div className={cx("w-full h-full p-6", isActive && "pl-24")}>
                  {item.content}
                </div>
              </div>

              <div
                className={cx(
                  "absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none",
                  isActive ? "opacity-100" : "opacity-0",
                  theme === "dark"
                    ? "bg-gradient-to-br from-red-500/8 to-orange-500/8"
                    : "bg-gradient-to-br from-red-200/25 to-orange-200/25"
                )}
              />

              <div
                className={cx(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 rounded-r-full transition-all duration-500",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-75",
                  theme === "dark"
                    ? "bg-red-400 shadow-lg shadow-red-400/50"
                    : "bg-red-500 shadow-lg shadow-red-500/50"
                )}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked Layout */}
      <div
        className={cx(
          "lg:hidden transition-all duration-500 overflow-hidden",
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-4 pt-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={cx(
                "rounded-2xl border-2 overflow-hidden transition-all duration-300",
                "backdrop-blur-sm shadow-lg",
                theme === "dark"
                  ? "bg-slate-800/60 border-red-500/30"
                  : "bg-white/60 border-red-300/40"
              )}
            >
              <button
                onClick={() =>
                  setActiveId(activeId === item.id ? items[0]?.id : item.id)
                }
                className={cx(
                  "w-full flex items-center gap-3 p-4 text-left transition-all duration-300",
                  activeId === item.id
                    ? theme === "dark"
                      ? "bg-red-500/10 text-amber-200"
                      : "bg-red-50 text-red-700"
                    : theme === "dark"
                      ? "text-stone-300 hover:text-amber-200"
                      : "text-stone-600 hover:text-red-700"
                )}
              >
                <item.icon
                  size={20}
                  className={cx(
                    "transition-colors duration-300",
                    activeId === item.id
                      ? theme === "dark"
                        ? "text-red-400"
                        : "text-red-600"
                      : theme === "dark"
                        ? "text-stone-500"
                        : "text-stone-400"
                  )}
                />
                <span className="font-medium">{item.title}</span>
                <Eye
                  size={16}
                  className={cx(
                    "ml-auto transition-transform duration-300",
                    activeId === item.id ? "rotate-180" : ""
                  )}
                />
              </button>

              <div
                className={cx(
                  "transition-all duration-500 overflow-hidden",
                  activeId === item.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="p-4 h-96">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCodeAccordion;
