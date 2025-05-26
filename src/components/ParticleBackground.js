import React, { useEffect, useRef } from 'react';

const MeshBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let time = 0;

    // High-performance canvas setup
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking with smoothing
    let targetMouse = { x: 0.5, y: 0.5 };
    const handleMouseMove = (e) => {
      targetMouse = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color schemes with more organic, flowing colors
    const colors = {
      dark: {
        bg: 'rgba(17, 24, 39, 0)',                     // Tailwind gray-900 (lighter)
        primary: { r: 31, g: 41, b: 55, a: 0.4 },      // Tailwind gray-800
        secondary: { r: 55, g: 65, b: 81, a: 0.3 },    // Tailwind gray-700
        tertiary: { r: 75, g: 85, b: 99, a: 0.25 },    // Tailwind gray-600
        accent: { r: 107, g: 114, b: 128, a: 0.2 },    // Tailwind gray-500
        highlight: { r: 156, g: 163, b: 175, a: 0.15 } // Tailwind gray-400
      },
      light: {
        bg: 'rgba(255, 255, 255, 0)',
        primary: { r: 75, g: 85, b: 99, a: 0.25 },     // Tailwind gray-600
        secondary: { r: 107, g: 114, b: 128, a: 0.2 }, // Tailwind gray-500
        tertiary: { r: 156, g: 163, b: 175, a: 0.15 }, // Tailwind gray-400
        accent: { r: 209, g: 213, b: 219, a: 0.1 },    // Tailwind gray-300
        highlight: { r: 229, g: 231, b: 235, a: 0.08 } // Tailwind gray-200
      }
    };

    const currentColors = colors[theme];

    // Organic blob class with more fluid motion
    class OrganicBlob {
      constructor(x, y, color, scale = 1) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.scale = scale;
        this.points = [];
        this.numPoints = 6 + Math.floor(Math.random() * 4);
        this.angleStep = (Math.PI * 2) / this.numPoints;
        this.baseRadius = 150 * scale;
        this.time = Math.random() * Math.PI * 2;
        this.speed = 0.0005 + Math.random() * 0.0015;
        
        // Initialize points
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            angle: this.angleStep * i,
            radius: this.baseRadius,
            noise: Math.random() * 0.5 + 0.5,
            speed: 0.001 + Math.random() * 0.002
          });
        }
      }

      update(mouseX, mouseY, deltaTime) {
        // Smooth mouse following
        mouseRef.current.x += (targetMouse.x - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (targetMouse.y - mouseRef.current.y) * 0.05;
        
        // Update time
        this.time += this.speed * deltaTime;
        
        // Mouse influence
        const dx = mouseX * canvas.width - this.x;
        const dy = mouseY * canvas.height - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 400) {
          const force = (400 - distance) / 400;
          this.x += (dx / distance) * force * 0.5;
          this.y += (dy / distance) * force * 0.5;
        }
        
        // Organic movement
        this.x += Math.sin(this.time * 1.5) * 0.3;
        this.y += Math.cos(this.time * 1.2) * 0.3;
        
        // Update each point for organic shape
        this.points.forEach((point, i) => {
          point.angle += point.speed;
          const noiseScale = Math.sin(this.time + i) * 0.3 + 0.7;
          point.radius = this.baseRadius * (0.8 + point.noise * 0.4 * noiseScale);
        });
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Create organic gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.baseRadius * 1.5);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        
        // Draw organic blob shape
        ctx.beginPath();
        
        // Use quadratic curves for smooth organic shape
        const firstPoint = this.points[0];
        ctx.moveTo(
          Math.cos(firstPoint.angle) * firstPoint.radius,
          Math.sin(firstPoint.angle) * firstPoint.radius
        );
        
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i];
          const nextPoint = this.points[(i + 1) % this.points.length];
          
          const cpx = Math.cos(point.angle + this.angleStep / 2) * point.radius * 1.1;
          const cpy = Math.sin(point.angle + this.angleStep / 2) * point.radius * 1.1;
          const x = Math.cos(nextPoint.angle) * nextPoint.radius;
          const y = Math.sin(nextPoint.angle) * nextPoint.radius;
          
          ctx.quadraticCurveTo(cpx, cpy, x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create organic blobs
    const blobs = [
      new OrganicBlob(
        canvas.width * 0.2,
        canvas.height * 0.3,
        currentColors.primary,
        1.5
      ),
      new OrganicBlob(
        canvas.width * 0.8,
        canvas.height * 0.2,
        currentColors.secondary,
        1.8
      ),
      new OrganicBlob(
        canvas.width * 0.5,
        canvas.height * 0.7,
        currentColors.tertiary,
        1.6
      ),
      new OrganicBlob(
        canvas.width * 0.1,
        canvas.height * 0.8,
        currentColors.accent,
        1.3
      ),
      new OrganicBlob(
        canvas.width * 0.9,
        canvas.height * 0.6,
        currentColors.highlight,
        1.4
      ),
      new OrganicBlob(
        canvas.width * 0.3,
        canvas.height * 0.5,
        currentColors.primary,
        1.2
      )
    ];

    let lastTime = performance.now();

    // Animation loop
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Clear canvas
      ctx.fillStyle = currentColors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw blobs
      blobs.forEach(blob => {
        blob.update(mouseRef.current.x, mouseRef.current.y, deltaTime);
        blob.draw(ctx);
      });
      
      // Add flowing mesh lines
      drawFlowingMesh(ctx, time);
      
      time += 0.001 * deltaTime;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Draw organic flowing mesh
    const drawFlowingMesh = (ctx, time) => {
      const gridSize = 80;
      const waveAmplitude = 20;
      
      ctx.strokeStyle = theme === 'dark' 
        ? 'rgba(55, 65, 81, 0.05)'  // Tailwind gray-700
        : 'rgba(75, 85, 99, 0.03)'; // Tailwind gray-600
      ctx.lineWidth = 1;
      
      // Create flowing horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20) {
          const waveY = y + Math.sin(x * 0.01 + time * 2) * waveAmplitude * Math.sin(y * 0.005 + time);
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
      }
      
      // Create flowing vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 20) {
          const waveX = x + Math.cos(y * 0.01 + time * 2) * waveAmplitude * Math.cos(x * 0.005 + time);
          if (y === 0) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }
        ctx.stroke();
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          filter: 'blur(120px) contrast(1.2)',
          opacity: theme === 'dark' ? 0.5 : 0.4
        }}
      />
      {/* Additional gradient overlays for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, ${theme === 'dark' ? 'rgba(55, 65, 81, 0.15)' : 'rgba(75, 85, 99, 0.08)'} 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, ${theme === 'dark' ? 'rgba(75, 85, 99, 0.12)' : 'rgba(107, 114, 128, 0.06)'} 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, ${theme === 'dark' ? 'rgba(107, 114, 128, 0.1)' : 'rgba(156, 163, 175, 0.05)'} 0%, transparent 50%),
            radial-gradient(ellipse at center, transparent 0%, ${theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.15)'} 100%)
          `,
          pointerEvents: 'none'
        }}
      />
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
          opacity: theme === 'dark' ? 0.4 : 0.2,
          mixBlendMode: 'soft-light',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

// // Usage example
// export default function Demo() {
//   const [theme, setTheme] = React.useState('dark');
  
//   return (
//     <div className="relative min-h-screen">
//       <MeshBackground theme={theme} />
      
//       {/* Demo content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
//         <h1 className={`text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//           Organic Mesh Background
//         </h1>
//         <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//           Fluid, organic gradients that respond to your mouse movement
//         </p>
//         <button
//           onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//           className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//             theme === 'dark' 
//               ? 'bg-teal-400 text-gray-900 hover:bg-teal-300' 
//               : 'bg-teal-600 text-white hover:bg-teal-700'
//           }`}
//         >
//           Toggle Theme
//         </button>
        
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
//           <div className={`p-6 rounded-lg backdrop-blur-sm ${
//             theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
//           }`}>
//             <h3 className="text-teal-400 font-semibold mb-2">Organic Motion</h3>
//             <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
//               Fluid blob shapes with natural, flowing movements
//             </p>
//           </div>
//           <div className={`p-6 rounded-lg backdrop-blur-sm ${
//             theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
//           }`}>
//             <h3 className="text-teal-400 font-semibold mb-2">Interactive</h3>
//             <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
//               Blobs follow and react to mouse movement smoothly
//             </p>
//           </div>
//           <div className={`p-6 rounded-lg backdrop-blur-sm ${
//             theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
//           }`}>
//             <h3 className="text-teal-400 font-semibold mb-2">Performance</h3>
//             <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
//               Optimized canvas rendering with high blur for smooth gradients
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// 
export default MeshBackground;