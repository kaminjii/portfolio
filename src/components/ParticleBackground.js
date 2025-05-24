import React, { useEffect, useRef } from 'react';
import { useTheme } from '../app/ThemeContext';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mousePosition = { x: undefined, y: undefined };
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize(); // Ensure dimensions are set on mount
    window.addEventListener('resize', handleResize);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mousePosition = {
        x: e.x,
        y: e.y
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Particle class with theme-aware colors
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Use appropriate particle color based on theme
        this.color = theme === 'dark' ? '#0d9488' : '#14b8a6';
        this.density = Math.random() * 30 + 1;
      }
      
      update() {
        // Regular movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Mouse interaction
        if (mousePosition.x !== undefined && mousePosition.y !== undefined) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          // Maximum distance for mouse effect
          const maxDistance = 100;
          const force = (maxDistance - distance) / maxDistance;
          
          if (distance < maxDistance) {
            // Move particles away from mouse
            this.x -= forceDirectionX * force * this.density / 10;
            this.y -= forceDirectionY * force * this.density / 10;
            
            // Increase size slightly when affected by mouse
            this.size = this.baseSize + force * 2;
          } else {
            // Return to base size when not affected
            if (this.size > this.baseSize) {
              this.size -= 0.1;
            }
          }
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particlesArray = [];
    const particleCount = Math.min(60, window.innerWidth / 20);
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles with lines
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 140) {
            ctx.beginPath();
            const strokeColor = theme === 'dark' 
              ? `rgba(13, 148, 136, ${0.15 - distance/1000})` 
              : `rgba(20, 184, 166, ${0.15 - distance/1000})`;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 opacity-50"
    />
  );
};

export default ParticleBackground;
