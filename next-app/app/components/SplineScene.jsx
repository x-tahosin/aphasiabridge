'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SplineScene({ isSpeaking, urgency }) {
  const canvasRef = useRef(null);
  const splineContainerRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(true);
  const splineAppRef = useRef(null);

  // 1. Visibility tracking: Pause WebGL and 2D canvas when scrolled out of view
  useEffect(() => {
    const container = splineContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisibleRef.current = visible;
        const app = splineAppRef.current;
        if (app) {
          if (!visible && typeof app.stop === 'function') {
            app.stop();
          } else if (visible && typeof app.play === 'function') {
            app.play();
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 2. High-performance Canvas Ambient Resonance Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isCancelled = false;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let cachedRect = canvas.getBoundingClientRect();
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cachedRect = canvas.getBoundingClientRect();
    };

    let rafMouseId = null;
    const handleMouseMove = (e) => {
      if (!rafMouseId) {
        rafMouseId = requestAnimationFrame(() => {
          if (cachedRect) {
            mousePos.current.targetX = e.clientX - cachedRect.left - width / 2;
            mousePos.current.targetY = e.clientY - cachedRect.top - height / 2;
          }
          rafMouseId = null;
        });
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', () => {
      if (canvas) cachedRect = canvas.getBoundingClientRect();
    }, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Streamlined particle count for 60/120 FPS buttery smoothness
    const numParticles = 26;
    const particles = [];
    const isUrgent = urgency === 'critical' || urgency === 'high';

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1.1,
      });
    }

    let time = 0;
    const maxDist = 80;
    const maxDistSq = maxDist * maxDist;

    const render = () => {
      if (isCancelled) return;

      // Only draw when section is visible in the viewport
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);
        time += isSpeaking ? 0.045 : 0.016;

        // Smooth mouse follow
        mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
        mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

        const centerX = width / 2 + mousePos.current.x * 0.12;
        const centerY = height / 2 + mousePos.current.y * 0.12;
        const baseRadius = Math.min(width, height) * 0.24;
        const pulseMultiplier = isSpeaking 
          ? 1 + Math.sin(time * 8) * 0.14 
          : 1 + Math.sin(time * 2.5) * 0.04;
        const radius = baseRadius * pulseMultiplier;

        // Outer glow gradient in Zed Green
        const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius * 1.9);
        if (isUrgent) {
          glowGrad.addColorStop(0, 'rgba(255, 46, 99, 0.35)');
          glowGrad.addColorStop(0.5, 'rgba(255, 46, 99, 0.08)');
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          glowGrad.addColorStop(0, 'rgba(0, 245, 155, 0.3)');
          glowGrad.addColorStop(0.45, 'rgba(16, 185, 129, 0.1)');
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.9, 0, Math.PI * 2);
        ctx.fill();

        // Core 3D Mesh Wireframe Orbit Rings in Zed Green
        for (let ring = 1; ring <= 5; ring++) {
          ctx.beginPath();
          const ringR = (radius / 5) * ring;
          ctx.strokeStyle = ring === 5 
            ? (isUrgent ? 'rgba(255, 46, 99, 0.7)' : 'rgba(0, 245, 155, 0.85)')
            : (ring === 4 ? 'rgba(0, 245, 155, 0.35)' : 'rgba(255, 255, 255, 0.05)');
          ctx.lineWidth = ring === 5 ? 2 : 1;
          
          const wobble = Math.sin(time + ring * 1.2) * 8;
          ctx.ellipse(centerX, centerY, ringR + wobble, ringR * 0.65, time * 0.35 + ring * 0.8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 1. Move and update particle positions
        const speedMultiplier = isSpeaking ? 2 : 1;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // 2. Batch all particle dots into ONE single draw call
        ctx.fillStyle = isUrgent ? 'rgba(255, 46, 99, 0.85)' : 'rgba(0, 245, 155, 0.85)';
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        // 3. Batch all connecting lines into ONE single stroke call
        ctx.strokeStyle = isUrgent ? 'rgba(255, 46, 99, 0.22)' : 'rgba(0, 245, 155, 0.22)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            if (Math.abs(dx) < maxDist && Math.abs(dy) < maxDist) {
              const distSq = dx * dx + dy * dy;
              if (distSq < maxDistSq) {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
              }
            }
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      if (rafMouseId) cancelAnimationFrame(rafMouseId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSpeaking, urgency]);

  // 3. Load interactive Spline robot with GPU isolation
  useEffect(() => {
    let appInstance = null;
    let isCancelled = false;

    async function loadSpline() {
      try {
        const container = splineContainerRef.current;
        if (!container) return;

        // Clean any old canvas
        const existing = container.querySelector('.spline-runtime-canvas');
        if (existing) existing.remove();

        const rect = container.getBoundingClientRect();
        const width = rect.width || 800;
        const height = rect.height || 380;

        const { Application } = await import('@splinetool/runtime');
        const splineCanvas = document.createElement('canvas');
        splineCanvas.className = 'spline-runtime-canvas';
        splineCanvas.width = width;
        splineCanvas.height = height;
        splineCanvas.style.width = '100%';
        splineCanvas.style.height = '100%';
        splineCanvas.style.position = 'absolute';
        splineCanvas.style.inset = '0';
        splineCanvas.style.pointerEvents = 'none';
        splineCanvas.style.transform = 'translateZ(0)';

        container.appendChild(splineCanvas);
        const app = new Application(splineCanvas);
        await app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
        if (!isCancelled) {
          appInstance = app;
          splineAppRef.current = app;
          setSplineLoaded(true);
          // If not currently visible when loaded, pause
          if (!isVisibleRef.current && typeof app.stop === 'function') {
            app.stop();
          }
        }
      } catch (err) {
        setSplineLoaded(false);
      }
    }

    loadSpline();

    return () => {
      isCancelled = true;
      splineAppRef.current = null;
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
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
