import React, { useEffect, useRef } from 'react';
import { useTheme } from '../app/ThemeContext';

const OrganicBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const blobsRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Blob class for organic shapes
    class Blob {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 200 + 100;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.points = [];
        this.numPoints = 6;
        this.angle = 0;
        
        // Generate initial points 
        for (let i = 0; i < this.numPoints; i++) {
          const angle = (i / this.numPoints) * Math.PI * 2;
          const radius = this.size + Math.random() * 50;
          this.points.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            originalX: Math.cos(angle) * radius,
            originalY: Math.sin(angle) * radius
          });
        }
        
        // Color based on theme
        const colors = theme === 'dark' 
          ? ['rgba(6, 90, 217, 0.03)', 'rgba(60, 136, 251, 0.03)', 'rgba(9, 77, 180, 0.03)']
          : ['rgba(6, 66, 217, 0.02)', 'rgba(60, 108, 251, 0.02)', 'rgba(170, 208, 254, 0.02)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        // Move blob
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
          this.speedX *= -1;
        }
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
          this.speedY *= -1;
        }
        
        // Animate blob shape
        this.angle += 0.01;
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i];
          const wobble = Math.sin(this.angle + i) * 20;
          point.x = point.originalX + wobble;
          point.y = point.originalY + wobble;
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        
        // Draw organic blob shape
        ctx.beginPath();
        
        // Move to first point
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        // Draw smooth curves between points
        for (let i = 0; i < this.points.length; i++) {
          const p1 = this.points[i];
          const p2 = this.points[(i + 1) % this.points.length];
          const p3 = this.points[(i + 2) % this.points.length];
          
          const cp1x = p1.x + (p2.x - p1.x) * 0.5;
          const cp1y = p1.y + (p2.y - p1.y) * 0.5;
          const cp2x = p2.x + (p3.x - p2.x) * 0.5;
          const cp2y = p2.y + (p3.y - p2.y) * 0.5;


          ctx.quadraticCurveTo(p1.x, p1.y, cp1x, cp1y);
          ctx.quadraticCurveTo(p2.x, p2.y, cp2x, cp2y);
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Create blobs
    const numBlobs = 5;
    for (let i = 0; i < numBlobs; i++) {
      blobsRef.current.push(
        new Blob(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each blob
      blobsRef.current.forEach(blob => {
        blob.update();
        blob.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      blobsRef.current = [];
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default OrganicBackground;
