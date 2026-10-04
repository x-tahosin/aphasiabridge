'use client';

import React, { useEffect, useRef } from 'react';

export default function AudioSpectrogram({ isPlaying }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener('resize', handleResize);

    const numBars = 48;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += isPlaying ? 0.08 : 0.02;

      const barWidth = (width / numBars) * 0.65;
      const gap = (width / numBars) * 0.35;

      for (let i = 0; i < numBars; i++) {
        // Multi-frequency wave formula
        const freq1 = Math.sin(step * 2 + i * 0.25);
        const freq2 = Math.cos(step * 3.5 - i * 0.15);
        const freq3 = Math.sin(step * 5 + i * 0.4);

        let amplitude;
        if (isPlaying) {
          amplitude = Math.abs(freq1 * 0.5 + freq2 * 0.3 + freq3 * 0.2);
          amplitude = Math.max(0.15, amplitude);
        } else {
          amplitude = 0.08 + Math.sin(step + i * 0.2) * 0.04;
        }

        const barHeight = amplitude * (height * 0.75);
        const x = i * (barWidth + gap) + gap;
        const y = height / 2 - barHeight / 2;

        // Zed Green Gradient
        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#00F59B');
        grad.addColorStop(0.5, '#10B981');
        grad.addColorStop(1, '#059669');

        ctx.fillStyle = grad;
        ctx.shadowColor = isPlaying ? '#00F59B' : 'transparent';
        ctx.shadowBlur = isPlaying ? 8 : 0;

        // Rounded bar
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, Math.max(4, barHeight), 4);
        } else {
          ctx.rect(x, y, barWidth, Math.max(4, barHeight));
        }
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <div style={{
      width: '100%',
      background: 'rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(0, 245, 155, 0.15)',
      borderRadius: '12px',
      padding: '12px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="led-zed" style={{ width: '6px', height: '6px' }} />
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--zed-green)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '700' }}>
            {isPlaying ? 'Tariq Vocal Output • 44.1kHz Hi-Fi' : 'Vocal Engine Ready • ElevenLabs Model Clone'}
          </span>
        </div>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
          Sub-200ms Synthesizer
        </span>
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '42px', display: 'block' }}
      />
    </div>
  );
}
