'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SplineScene({ isSpeaking, urgency }) {
  const canvasRef = useRef(null);
  const splineContainerRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);

  // High-performance Canvas Fallback & Ambient Resonance Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for neural speech mesh
    const numParticles = 48;
    const particles = [];
    const color = urgency === 'critical' || urgency === 'high' ? '#FF3366' : '#00F2FE';

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += isSpeaking ? 0.04 : 0.015;

      // Draw central pulsating neural orb
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.22;
      const pulseMultiplier = isSpeaking ? 1 + Math.sin(time * 6) * 0.12 : 1 + Math.sin(time * 2) * 0.04;
      const radius = baseRadius * pulseMultiplier;

      // Outer glow gradient
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.8);
      if (urgency === 'critical' || urgency === 'high') {
        glowGrad.addColorStop(0, 'rgba(255, 51, 102, 0.35)');
        glowGrad.addColorStop(0.5, 'rgba(255, 51, 102, 0.1)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
        glowGrad.addColorStop(0.4, 'rgba(16, 185, 129, 0.15)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Core 3D Mesh Wireframe Circles
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        const ringR = (radius / 4) * ring;
        ctx.strokeStyle = ring === 4 
          ? (urgency === 'critical' ? 'rgba(255, 51, 102, 0.6)' : 'rgba(0, 242, 254, 0.7)')
          : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = ring === 4 ? 2 : 1;
        
        const wobble = Math.sin(time + ring) * 8;
        ctx.ellipse(centerX, centerY, ringR + wobble, ringR * 0.65, time * 0.3 + ring, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Interconnected synaptic neural particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (isSpeaking ? 2 : 1);
        p.y += p.vy * (isSpeaking ? 2 : 1);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.fillStyle = urgency === 'critical' ? 'rgba(255, 51, 102, 0.8)' : 'rgba(0, 242, 254, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 * (1 - dist / 85)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSpeaking, urgency]);

  // Try loading interactive Spline runtime asynchronously
  useEffect(() => {
    let appInstance = null;
    let isCancelled = false;

    async function loadSpline() {
      try {
        const { Application } = await import('@splinetool/runtime');
        const splineCanvas = document.createElement('canvas');
        splineCanvas.style.width = '100%';
        splineCanvas.style.height = '100%';
        splineCanvas.style.position = 'absolute';
        splineCanvas.style.inset = '0';
        splineCanvas.style.pointerEvents = 'none';

        if (splineContainerRef.current) {
          splineContainerRef.current.appendChild(splineCanvas);
          const app = new Application(splineCanvas);
          // Spline 3D Scene
          await app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
          if (!isCancelled) {
            appInstance = app;
            setSplineLoaded(true);
          }
        }
      } catch (err) {
        // Fallback gracefully to our interactive canvas engine
        setSplineLoaded(false);
      }
    }

    loadSpline();

    return () => {
      isCancelled = true;
      if (appInstance && typeof appInstance.dispose === 'function') {
        appInstance.dispose();
      }
    };
  }, []);

  return (
    <div className="spline-wrapper" ref={splineContainerRef}>
      {/* Interactive 3D Neural Sound Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          opacity: splineLoaded ? 0.3 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
