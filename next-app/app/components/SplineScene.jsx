'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SplineScene({ isSpeaking, urgency }) {
  const canvasRef = useRef(null);
  const splineContainerRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.targetX = e.clientX - rect.left - width / 2;
      mousePos.current.targetY = e.clientY - rect.top - height / 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for neural speech mesh
    const numParticles = 54;
    const particles = [];
    const isUrgent = urgency === 'critical' || urgency === 'high';

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += isSpeaking ? 0.045 : 0.016;

      // Smooth mouse follow
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      const centerX = width / 2 + mousePos.current.x * 0.15;
      const centerY = height / 2 + mousePos.current.y * 0.15;
      const baseRadius = Math.min(width, height) * 0.24;
      const pulseMultiplier = isSpeaking 
        ? 1 + Math.sin(time * 8) * 0.14 
        : 1 + Math.sin(time * 2.5) * 0.04;
      const radius = baseRadius * pulseMultiplier;

      // Outer glow gradient in Zed Green
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius * 2.0);
      if (isUrgent) {
        glowGrad.addColorStop(0, 'rgba(255, 46, 99, 0.4)');
        glowGrad.addColorStop(0.5, 'rgba(255, 46, 99, 0.1)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(0, 245, 155, 0.35)');
        glowGrad.addColorStop(0.45, 'rgba(16, 185, 129, 0.12)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2.0, 0, Math.PI * 2);
      ctx.fill();

      // Core 3D Mesh Wireframe Orbit Rings in Zed Green
      for (let ring = 1; ring <= 5; ring++) {
        ctx.beginPath();
        const ringR = (radius / 5) * ring;
        ctx.strokeStyle = ring === 5 
          ? (isUrgent ? 'rgba(255, 46, 99, 0.7)' : 'rgba(0, 245, 155, 0.85)')
          : (ring === 4 ? 'rgba(0, 245, 155, 0.35)' : 'rgba(255, 255, 255, 0.06)');
        ctx.lineWidth = ring === 5 ? 2 : 1;
        
        const wobble = Math.sin(time + ring * 1.2) * 8;
        ctx.ellipse(centerX, centerY, ringR + wobble, ringR * 0.65, time * 0.35 + ring * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Interconnected synaptic neural particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (isSpeaking ? 2.2 : 1);
        p.y += p.vy * (isSpeaking ? 2.2 : 1);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.fillStyle = isUrgent ? 'rgba(255, 46, 99, 0.9)' : 'rgba(0, 245, 155, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes with Zed Green synaptic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 95) {
            ctx.strokeStyle = isUrgent
              ? `rgba(255, 46, 99, ${0.2 * (1 - dist / 95)})`
              : `rgba(0, 245, 155, ${0.22 * (1 - dist / 95)})`;
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSpeaking, urgency]);

  // Try loading interactive Spline runtime asynchronously
  useEffect(() => {
    let appInstance = null;
    let isCancelled = false;

    async function loadSpline() {
      try {
        const container = splineContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const width = rect.width || 800;
        const height = rect.height || 380;

        const { Application } = await import('@splinetool/runtime');
        const splineCanvas = document.createElement('canvas');
        splineCanvas.width = width;
        splineCanvas.height = height;
        splineCanvas.style.width = '100%';
        splineCanvas.style.height = '100%';
        splineCanvas.style.position = 'absolute';
        splineCanvas.style.inset = '0';
        splineCanvas.style.pointerEvents = 'none';

        container.appendChild(splineCanvas);
        const app = new Application(splineCanvas);
        await app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
        if (!isCancelled) {
          appInstance = app;
          setSplineLoaded(true);
        }
      } catch (err) {
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
      {/* Interactive 3D Neural Sound Canvas in Zed Green */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          opacity: splineLoaded ? 0.35 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
