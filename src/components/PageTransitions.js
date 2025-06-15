// src/components/PageTransitions.js
"use client";

import React, { useState, useRef, useEffect } from "react";

const PageTransitions = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef(null);
  const shapeGroupsRef = useRef([]);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const mapImageRef = useRef(null);
  const grayImageRef = useRef(null);
  const clipRectRef = useRef(null);

  // Animation states
  const screens = ["home", "map", "article"];
  const screenTitles = ["Discover", "Explore", "Learn"];
  const screenDescriptions = [
    "Interactive geometric shapes that transform with smooth animations",
    "Immersive 3D perspective view of geographic content",
    "Detailed content with rich typography and engaging visuals",
  ];

  useEffect(() => {
    // Initialize the component - set initial states
    if (heroRef.current && shapeGroupsRef.current.length > 0) {
      // Set initial styles similar to the original
      const hero = heroRef.current;
      hero.style.transformStyle = "preserve-3d";
      hero.style.perspective = "700px";

      // Initialize shape groups
      shapeGroupsRef.current.forEach((group, index) => {
        if (group) {
          const paths = group.querySelectorAll("path");
          paths.forEach((path) => {
            path.style.strokeDasharray = "100%";
            path.style.strokeDashoffset = index % 2 === 0 ? "68%" : "33%";
            path.style.transition =
              "all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          });
        }
      });
    }
  }, []);

  const transitionToNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextScreen = (currentScreen + 1) % 3;

    if (nextScreen === 1) {
      animateToMap();
    } else if (nextScreen === 2) {
      animateToArticle();
    } else {
      animateToHome();
    }

    setCurrentScreen(nextScreen);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const animateToMap = () => {
    const hero = heroRef.current;
    const text = textRef.current;
    const clipRect = clipRectRef.current;
    const grayImage = grayImageRef.current;

    // Animate to 3D perspective view
    if (hero) {
      hero.style.transform =
        "translateZ(20px) rotateX(70deg) translateY(100px) translateX(40px)";
      hero.style.transition = "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
    }

    // Scale and transform clip rect
    if (clipRect) {
      clipRect.style.transform = "scaleY(0.75)";
      clipRect.style.transition = "transform 0.5s ease-out";
    }

    // Fade out gray overlay to reveal map
    if (grayImage) {
      grayImage.style.opacity = "0";
      grayImage.style.transition = "opacity 0.5s ease-out";
    }

    // Animate text position
    if (text) {
      text.style.transform = "translateY(-20vh)";
      text.style.transition = "transform 0.8s ease-out";
    }

    // Transform shape groups
    shapeGroupsRef.current.forEach((group, index) => {
      if (group) {
        const paths = group.querySelectorAll("path");
        paths.forEach((path) => {
          path.style.transform = "scaleX(0.93) scaleY(2.22)";
          path.style.strokeWidth = "5";
          path.style.transformOrigin = "493px 351px";
        });
      }
    });
  };

  const animateToArticle = () => {
    const hero = heroRef.current;
    const text = textRef.current;
    const clipRect = clipRectRef.current;

    // Animate shapes to form article layout
    if (hero) {
      hero.style.transform = "translateX(-125px) translateY(70px)";
      hero.style.transition = "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
    }

    // Transform clip rect
    if (clipRect) {
      clipRect.style.transform =
        "scaleX(0.5) scaleY(1.2) translateX(-35px) translateY(-50px)";
      clipRect.style.transition = "transform 0.8s ease-out";
    }

    // Animate text
    if (text) {
      text.style.transform = "translateY(-30vh) translateX(-50px)";
      text.style.transition = "transform 0.8s ease-out";
    }

    // Transform shapes to create article-like layout
    shapeGroupsRef.current.forEach((group, index) => {
      if (group) {
        const paths = group.querySelectorAll("path");
        paths.forEach((path) => {
          path.style.strokeDashoffset = index % 2 === 0 ? "27.75%" : "71%";
          path.style.transform = "translateY(-67px) rotate(90deg)";
          path.style.strokeWidth = "1";
          path.style.transformOrigin = "527px 351px";
        });
      }
    });
  };

  const animateToHome = () => {
    const hero = heroRef.current;
    const text = textRef.current;
    const clipRect = clipRectRef.current;
    const grayImage = grayImageRef.current;

    // Reset to home state
    if (hero) {
      hero.style.transform =
        "translateZ(0) rotateX(0) translateY(0) translateX(0)";
      hero.style.transition = "transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
    }

    // Reset clip rect
    if (clipRect) {
      clipRect.style.transform =
        "scaleX(1) scaleY(1) translateX(0) translateY(0)";
      clipRect.style.transition = "transform 0.5s ease-out";
    }

    // Show gray overlay
    if (grayImage) {
      grayImage.style.opacity = "1";
      grayImage.style.transition = "opacity 0.5s ease-out";
    }

    // Reset text position
    if (text) {
      text.style.transform = "translateY(0) translateX(0)";
      text.style.transition = "transform 0.8s ease-out";
    }

    // Reset shape groups
    shapeGroupsRef.current.forEach((group, index) => {
      if (group) {
        const paths = group.querySelectorAll("path");
        paths.forEach((path) => {
          path.style.strokeDashoffset = index % 2 === 0 ? "68%" : "33%";
          path.style.transform = "translateY(0) rotate(0) scaleX(1) scaleY(1)";
          path.style.strokeWidth = "9";
          path.style.transformOrigin = "527px 351px";
        });
      }
    });
  };

  const pageTransitionsStyles = `
    .page-transitions-container {
      width: 100%;
      height: 100%;
      background: #000;
      color: white;
      font-family: 'Inter', -apple-system, sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hero-area {
      width: 60%;
      position: relative;
      max-width: 800px;
    }
    
    .hero-svg {
      width: 100%;
      height: auto;
      max-height: 400px;
    }
    
    .text-area {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      z-index: 10;
      padding: 20px;
    }
    
    .main-title {
      font-size: 3rem;
      font-weight: 300;
      margin: 0 0 20px 0;
      letter-spacing: -0.02em;
    }
    
    .transition-button {
      background: none;
      border: 3px solid white;
      color: white;
      padding: 12px 30px;
      font-family: inherit;
      font-size: 0.9rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
      z-index: 1;
    }
    
    .transition-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 100%;
      background: white;
      z-index: -1;
      transform: rotate(-45deg) translate(-100%, -100%);
      transform-origin: 0% 100%;
      transition: transform 0.3s, opacity 0.3s;
      opacity: 0;
    }
    
    .transition-button:hover {
      color: black;
    }
    
    .transition-button:hover::before {
      opacity: 1;
      transform: rotate(0deg) translate(0, 0);
    }
    
    .transition-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .screen-info {
      margin-top: 20px;
      opacity: 0.8;
    }
    
    .screen-title {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .screen-description {
      font-size: 0.9rem;
      line-height: 1.4;
      max-width: 300px;
      margin-left: auto;
    }
    
    .shape-group path {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      mix-blend-mode: screen;
    }
    
    .shape-group-1 path { stroke: #3953a4; }
    .shape-group-2 path { stroke: #6abd45; }
    .shape-group-3 path { stroke: #ed2024; }
    
    .map-image, .gray-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .gray-image {
      position: absolute;
      top: 0;
      left: 0;
    }
    
    @media (max-width: 768px) {
      .hero-area {
        width: 90%;
      }
      
      .main-title {
        font-size: 2rem;
      }
      
      .text-area {
        position: relative;
        text-align: center;
        padding: 10px;
        margin-top: 20px;
      }
      
      .screen-description {
        margin: 0 auto;
      }
    }
  `;

  return (
    <div className="page-transitions-container">
      <style dangerouslySetInnerHTML={{ __html: pageTransitionsStyles }} />

      <div className="hero-area">
        <svg
          ref={heroRef}
          className="hero-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1054.9 703.6"
        >
          <defs>
            <clipPath id="clip-path-transitions">
              <rect
                ref={clipRectRef}
                x="25.6"
                y="108"
                width="1011.3"
                height="550"
                fill="none"
              />
            </clipPath>
          </defs>

          <g style={{ clipPath: "url(#clip-path-transitions)" }}>
            <image
              ref={mapImageRef}
              width="1000"
              height="667"
              transform="scale(1.05)"
              xlinkHref="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='667' viewBox='0 0 1000 667'%3E%3Crect width='1000' height='667' fill='%23234' /%3E%3Cpath d='M100 200 Q300 100 500 200 T900 300' stroke='%23567' stroke-width='2' fill='none'/%3E%3C/svg%3E"
            />
            <image
              ref={grayImageRef}
              className="gray-image"
              width="1000"
              height="667"
              transform="scale(1.05)"
              xlinkHref="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='667' viewBox='0 0 1000 667'%3E%3Crect width='1000' height='667' fill='%23333' /%3E%3C/svg%3E"
            />
          </g>

          {/* Basic geometric shapes */}
          <rect
            x="417.9"
            y="268.9"
            width="217"
            height="217"
            fill="none"
            stroke="#fff"
            strokeWidth="9"
          />
          <polygon
            points="525.6 271.6 650 487 401.2 487 525.6 271.6"
            fill="none"
            stroke="#fff"
            strokeWidth="9"
          />

          {/* Animated shape groups */}
          <g id="shapes">
            <g
              ref={(el) => (shapeGroupsRef.current[0] = el)}
              className="shape-group shape-group-1"
            >
              <path
                d="M634.9,335.9h-217s-57,6-56-58.5c1.1-71,162,37.5,162,37.5s12.9,4.4,1.7,23.7L401.2,554"
                strokeWidth="9"
              />
              <path
                d="M634.9,335.9h-217s-57,6-56-58.5c1.1-71,162,37.5,162,37.5s12.9,4.4,1.7,23.7L401.2,554"
                strokeWidth="9"
              />
            </g>

            <g
              ref={(el) => (shapeGroupsRef.current[1] = el)}
              className="shape-group shape-group-2"
            >
              <path
                d="M525.6,338.6,647.4,546.4l5,6.5c-44,16.5-8,60-8,60,39,51.5,63.5.5,63.5.5,32.5-72-40.1-59.8-61.2-60.1-7-.1-11.8-.4-11.8-.4h-217"
                strokeWidth="9"
              />
              <path
                d="M525.6,338.6,647.4,546.4l5,6.5c-44,16.5-8,60-8,60,39,51.5,63.5.5,63.5.5,32.5-72-40.1-59.8-61.2-60.1-7-.1-11.8-.4-11.8-.4h-217"
                strokeWidth="9"
              />
            </g>

            <g
              ref={(el) => (shapeGroupsRef.current[2] = el)}
              className="shape-group shape-group-3"
            >
              <path
                d="M634.9,552.9v-217s10.5-84-61.5-83.5c-70.1.5-60.1,64.4-47.8,86.2S650,554,650,554"
                strokeWidth="9"
              />
              <path
                d="M634.9,552.9v-217s10.5-84-61.5-83.5c-70.1.5-60.1,64.4-47.8,86.2S650,554,650,554"
                strokeWidth="9"
              />
            </g>
          </g>
        </svg>

        <div ref={textRef} className="text-area">
          <h1 className="main-title">{screenTitles[currentScreen]}</h1>

          <button
            ref={buttonRef}
            className="transition-button"
            onClick={transitionToNext}
            disabled={isAnimating}
          >
            {currentScreen === 0 && "Explore →"}
            {currentScreen === 1 && "Read More →"}
            {currentScreen === 2 && "Return Home →"}
          </button>

          <div className="screen-info">
            <div className="screen-title">
              {screens[currentScreen].charAt(0).toUpperCase() +
                screens[currentScreen].slice(1)}{" "}
              Mode
            </div>
            <div className="screen-description">
              {screenDescriptions[currentScreen]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTransitions;
