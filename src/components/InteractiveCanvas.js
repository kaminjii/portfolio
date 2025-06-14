import React, { useState, useRef, useMemo } from "react";
import { useTheme } from "../app/ThemeContext";
import cx from "../utils/cx";

const InteractiveCanvas = ({ children }) => {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target !== e.currentTarget && e.target.closest("button")) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoom = zoom - e.deltaY * 0.001;
    setZoom(Math.min(Math.max(newZoom, 0.5), 2));
  };

  const canvasBg = useMemo(() => {
    return theme === "dark"
      ? "radial-gradient(circle, hsl(15 25% 25%) 1px, transparent 1px)"
      : "radial-gradient(circle, hsl(45 30% 85%) 1px, transparent 1px)";
  }, [theme]);

  const showIndicators = zoom > 1.1;

  return (
    <div
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      className={cx(
        "w-full h-full rounded-3xl overflow-hidden cursor-grab transition-all duration-500 relative border-2",
        "shadow-2xl backdrop-blur-sm",
        theme === "dark"
          ? "bg-slate-900/40 border-red-500/30 shadow-red-900/20 hover:border-red-400/50"
          : "bg-amber-50/60 border-red-300/40 shadow-red-200/30 hover:border-red-400/60"
      )}
      style={{
        background: canvasBg,
        backgroundSize: "32px 32px",
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
        }}
      >
        {children}
      </div>

      <div
        className={cx(
          "absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl",
          showIndicators ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cx(
            "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r rounded-l-3xl",
            theme === "dark" ? "from-slate-900/60" : "from-amber-50/80"
          )}
        />
        <div
          className={cx(
            "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l rounded-r-3xl",
            theme === "dark" ? "from-slate-900/60" : "from-amber-50/80"
          )}
        />
        <div
          className={cx(
            "absolute top-0 left-0 right-0 h-16 bg-gradient-to-b rounded-t-3xl",
            theme === "dark" ? "from-slate-900/60" : "from-amber-50/80"
          )}
        />
        <div
          className={cx(
            "absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t rounded-b-3xl",
            theme === "dark" ? "from-slate-900/60" : "from-amber-50/80"
          )}
        />
      </div>
    </div>
  );
};

export default InteractiveCanvas;
