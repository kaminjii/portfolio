"use client";

import React, { useState, useEffect } from "react";

const GlassmorphismCards = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cards = [
    {
      id: 1,
      title: "Fluffy Clouds",
      subtitle: "Dreamy Skies",
      icon: "☁️",
      description:
        "Soft, billowy clouds drifting gently, perfect for a peaceful daydream or a nap.",
      gradient: "from-sky-300 to-pink-300",
      initialRotation: { x: -5, y: 10, z: -2 },
    },
    {
      id: 2,
      title: "Tiny Paws",
      subtitle: "Kitten Mittens",
      icon: "🐾",
      description:
        "Adorable little paw prints from a playful kitten exploring its world with curiosity and charm.",
      gradient: "from-rose-300 to-yellow-300",
      initialRotation: { x: 5, y: -5, z: 3 },
    },
    {
      id: 3,
      title: "Sweet Berries",
      subtitle: "Forest Treats",
      icon: "🍓",
      description:
        "Juicy, ripe strawberries and blueberries, a delightful and sweet snack found in a sunny meadow.",
      gradient: "from-red-400 to-purple-400",
      initialRotation: { x: -2, y: -8, z: 1 },
    },
  ];

  // --- Effect for Parallax Background ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- CSS Styles embedded in the component ---
  const dynamicStyles = `
    /* Main container and parallax background */
    .scene-container {
      background-image: url('https://images.unsplash.com/photo-1517976487-151227b496c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
      background-size: 110%;
      background-position: center;
      transition: background-position 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Decorative blobs for parallax */
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.6;
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Base card styling */
    .card {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.5s ease, box-shadow 0.5s ease;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      /* Add subtle noise texture */
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiGAAAAXVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GUY2sAAAAD3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eH+83eAAAAQBJREFUeNq1k1sOwzAIBC3g/sc9LQ6hTPL3pWQl8Z4pPuuBwJ3Jsws0T1V3E2Cr8jHhB0HkqYOPDwqPB6kUf2j0iSBkthA+qGgC5hL/fN8n4GzCgwLsvv2IeE9sI/VbtskAN05Qe+B81710Ko3xJ+3SWfRbs2m/Tf39BNpQjG829Dwi9gAx5Pk3mYkLo+5KzE/eDxn75eS+CbG4H8L4gBIo1Fk1mmYHAo92/hI/E1iF6TtsVjNWfuzmF8OMGAd3O2bJmkd+h5S2z0fzWcQys1N1k2V2bIS/E10t5kO15H42PjV/jgMb8t934Lh/AI40P+r5xEyAAAAAASUVORK5CYII=');
    }

    /* Hover effect */
    .card:hover {
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.05, 1.05, 1.05) translateY(-10px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }
    
    /* Card content container */
    .card-content {
      position: relative;
      z-index: 10;
      transition: transform 0.5s ease;
    }

    /* Glow and animated gradient border */
    .card::before, .card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 1.25rem; /* match card's border-radius */
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    /* Glowing effect */
    .card::after {
      z-index: 0;
      filter: blur(25px);
      transform: scale(1.02);
      background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
    }

    /* Animated gradient border */
    .card::before {
      z-index: 1;
      background: linear-gradient(135deg, var(--gradient-from), transparent, var(--gradient-to));
      padding: 1px;
      -webkit-mask: 
         linear-gradient(#fff 0 0) content-box, 
         linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    
    .card:hover::before, .card:hover::after {
      opacity: 1;
    }

    /* Detailed content reveal */
    .details {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-out, opacity 0.4s 0.1s ease-out;
    }

    .card:hover .details {
      max-height: 100px; /* Adjust as needed */
      opacity: 1;
    }

    /* Icon animation and tooltip */
    .icon-wrapper {
      position: relative;
      display: inline-block;
    }
    .icon-animation {
      transition: transform 0.3s ease;
    }
    .card:hover .icon-animation {
      transform: scale(1.1) rotate(5deg);
    }
    
    .tooltip {
      position: absolute;
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0,0,0,0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .icon-wrapper:hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `;

  return (
    <div
      className="scene-container w-full h-full flex items-center justify-center p-8 bg-gray-900 overflow-hidden relative"
      style={{
        "--mouse-x": `${mousePosition.x * -15}px`,
        "--mouse-y": `${mousePosition.y * -15}px`,
        backgroundPosition: `calc(50% + var(--mouse-x)) calc(50% + var(--mouse-y))`,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />

      {/* Parallax Blobs */}
      <div
        className="blob w-96 h-96 bg-purple-500 top-1/4 left-1/4"
        style={{
          transform: `translate(calc(var(--mouse-x) * 0.5), calc(var(--mouse-y) * 0.5))`,
        }}
      />
      <div
        className="blob w-80 h-80 bg-cyan-500 bottom-1/4 right-1/4"
        style={{
          transform: `translate(calc(var(--mouse-x) * 0.8), calc(var(--mouse-y) * 0.8))`,
        }}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
        style={{ perspective: "1000px" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="card rounded-3xl"
            onMouseMove={(e) => {
              const cardEl = e.currentTarget;
              const { left, top, width, height } =
                cardEl.getBoundingClientRect();
              const x = (e.clientX - left - width / 2) / (width / 2);
              const y = (e.clientY - top - height / 2) / (height / 2);
              cardEl.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.05, 1.05, 1.05) translateY(-10px)`;
            }}
            onMouseLeave={(e) => {
              const cardEl = e.currentTarget;
              cardEl.style.transform = `perspective(1000px) rotateX(${card.initialRotation.x}deg) rotateY(${card.initialRotation.y}deg) rotateZ(${card.initialRotation.z}deg)`;
            }}
            style={{
              "--gradient-from":
                card.gradient?.split(" ")[0]?.replace("from-", "#") || "#000",
              "--gradient-to":
                card.gradient?.split(" ")[1]?.replace("to-", "#") || "#fff", // Correct index
              transform: `perspective(1000px) rotateX(${card.initialRotation.x}deg) rotateY(${card.initialRotation.y}deg) rotateZ(${card.initialRotation.z}deg)`,
            }}
          >
            <div className="card-content p-6">
              <div className="flex justify-between items-start">
                <div className="icon-wrapper">
                  <div className="icon-animation text-5xl mb-4">
                    {card.icon}
                  </div>
                  <div className="tooltip">{card.subtitle}</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm">{card.subtitle}</p>

              <div className="details mt-4">
                <p className="text-gray-300 text-sm opacity-90">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs text-white/50 font-semibold uppercase">
                  Discover More
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlassmorphismCards;
