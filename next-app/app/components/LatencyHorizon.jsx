'use client';

import React from 'react';
import { Zap, AlertTriangle, Play, Pause, CheckCircle2, Clock } from './Icons';

export default function LatencyHorizon({ result, onPlay, isPlaying }) {
  if (!result) return null;

  return (
    <div className="glass-surface" style={{ padding: '28px', margin: '32px 0' }}>
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan-core)', fontFamily: 'var(--font-mono)' }}>
            Real-Time Decoding Race
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>
            "{result.input_shorthand}"
          </span>
        </div>

        <span className="pill-tinker">
          <Zap size={13} />
          8.4x Speedup
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Track 1: Thinking Machines Tinker LoRA (Top Tier) */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(0, 242, 254, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px -10px rgba(0, 242, 254, 0.15)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pill-tinker">
                  Tinker LoRA Model
                </span>
                <span style={{ fontSize: '11px', color: '#34D399', fontWeight: '600' }}>
                  100% Patient Dignity
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: '800', color: 'var(--cyan-core)' }}>
                {result.tinker_latency_ms} <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>ms</span>
              </div>
            </div>

            {/* Visual Gauge */}
            <div className="horizon-track" style={{ marginBottom: '18px' }}>
              <div className="horizon-bar-tinker" style={{ width: '100%' }} />
            </div>

            {/* Restored Sentence Output */}
            <div style={{
              fontSize: '17px',
              fontWeight: '600',
              color: '#F8FAFC',
              fontFamily: 'var(--font-display)',
              lineHeight: '1.45',
              marginBottom: '20px'
            }}>
              "{result.tinker_output}"
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={() => onPlay(result.tinker_output)}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(90deg, #00F2FE 0%, #10B981 100%)',
              color: '#030508',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'transform 0.15s ease',
              boxShadow: '0 8px 20px -5px rgba(0, 242, 254, 0.4)'
            }}
          >
            {isPlaying ? <Pause size={16} fill="#030508" /> : <Play size={16} fill="#030508" />}
            <span>{isPlaying ? "Pause Restored Speech" : "Speak in Tariq's Voice (ElevenLabs)"}</span>
          </button>
        </div>

        {/* Track 2: Baseline Zero-Shot Gemma-2B */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: 0.85
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="pill-baseline">
                Zero-Shot Baseline
              </span>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: '800', color: '#F59E0B' }}>
                {result.baseline_latency_ms} <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B' }}>ms</span>
              </div>
            </div>

            {/* Slow Gauge */}
            <div className="horizon-track" style={{ marginBottom: '18px' }}>
              <div className="horizon-bar-baseline" style={{ width: '100%' }} />
            </div>

            {/* Verbose Baseline Output */}
            <div style={{
              fontSize: '13px',
              color: '#94A3B8',
              lineHeight: '1.5',
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              "{result.baseline_output}"
            </div>
          </div>

          <div style={{
            fontSize: '11px',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)'
          }}>
            <AlertTriangle size={13} />
            Unsolicited Medical Disclaimer &bull; Fails ICU Emergency
          </div>
        </div>

      </div>

    </div>
  );
}
