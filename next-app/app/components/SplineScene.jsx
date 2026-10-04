'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SplineScene({ isSpeaking, urgency }) {
  const canvasRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Smooth mouse parallax listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // High-performance 60-120fps Canvas Ambient Resonance Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth * 1.5);
    let height = (canvas.height = canvas.offsetHeight * 1.5);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 1.5;
      height = canvas.height = canvas.offsetHeight * 1.5;
    };

    window.addEventListener('resize', handleResize);

    const numParticles = 46;
    const particles = [];
    const isUrgent = urgency === 'critical' || urgency === 'high';

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += isSpeaking ? 0.04 : 0.015;

      const centerX = width / 2;
      const centerY = height / 2 - 20;
      const baseRadius = Math.min(width, height) * 0.26;
      const pulseMultiplier = isSpeaking 
        ? 1 + Math.sin(time * 7) * 0.12 
        : 1 + Math.sin(time * 2) * 0.03;
      const radius = baseRadius * pulseMultiplier;

      // Outer glow in Zed Green
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.9);
      if (isUrgent) {
        glowGrad.addColorStop(0, 'rgba(255, 46, 99, 0.35)');
        glowGrad.addColorStop(0.5, 'rgba(255, 46, 99, 0.08)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(0, 245, 155, 0.3)');
        glowGrad.addColorStop(0.45, 'rgba(16, 185, 129, 0.08)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.9, 0, Math.PI * 2);
      ctx.fill();

      // Holographic Orbit Rings in Zed Green
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        const ringR = (radius / 4) * ring;
        ctx.strokeStyle = ring === 4 
          ? (isUrgent ? 'rgba(255, 46, 99, 0.6)' : 'rgba(0, 245, 155, 0.75)')
          : (ring === 3 ? 'rgba(0, 245, 155, 0.25)' : 'rgba(255, 255, 255, 0.05)');
        ctx.lineWidth = ring === 4 ? 1.5 : 1;
        
        const wobble = Math.sin(time + ring * 1.2) * 6;
        ctx.ellipse(centerX, centerY, ringR + wobble, ringR * 0.65, time * 0.25 + ring * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Synaptic particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (isSpeaking ? 2 : 1);
        p.y += p.vy * (isSpeaking ? 2 : 1);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = isUrgent ? 'rgba(255, 46, 99, 0.85)' : 'rgba(0, 245, 155, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 90) {
            ctx.strokeStyle = isUrgent
              ? `rgba(255, 46, 99, ${0.18 * (1 - dist / 90)})`
              : `rgba(0, 245, 155, ${0.2 * (1 - dist / 90)})`;
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

  return (
    <div className="spline-wrapper" style={{ perspective: '1200px' }}>
      {/* Background Holographic Sound Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* 3D Cybernetic Robot Avatar with Smooth Hardware Parallax */}
      <div
        style={{
          position: 'relative',
          width: '310px',
          height: '310px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotateY(${tilt.x * 14}deg) rotateX(${-tilt.y * 10}deg) translateZ(20px)`,
          transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maskImage: 'radial-gradient(circle at 50% 50%, black 55%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 55%, transparent 75%)'
        }}>
          <img
            src="/images/cybernetic_robot.jpg"
            alt="Tinker Cybernetic Neural Voice Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'screen',
              filter: isSpeaking 
                ? 'drop-shadow(0 0 35px rgba(0, 245, 155, 0.6)) contrast(1.15) brightness(1.1)' 
                : 'drop-shadow(0 0 20px rgba(0, 245, 155, 0.35)) contrast(1.1)',
              transition: 'filter 0.3s ease'
            }}
          />
        </div>

        {/* Ambient Focal Glow in Center */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: urgency === 'critical' ? 'rgba(255, 46, 99, 0.25)' : 'rgba(0, 245, 155, 0.25)',
          filter: 'blur(35px)',
          zIndex: -1,
          animation: 'zedPulse 3s infinite'
        }} />
      </div>
    </div>
  );
}
