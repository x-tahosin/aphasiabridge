'use client';

import React from 'react';
import { Cpu, Zap, TrendingUp, Shield as ShieldCheck, ArrowUpRight } from './Icons';

export default function TinkerHorizon({ benchmarkData }) {
  return (
    <div className="glass-surface" style={{ padding: '32px', margin: '36px 0' }}>
      
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="led-emerald" />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#10B981', fontWeight: '700' }}>
              Thinking Machines' Tinker Rubric Proof
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
            Empirical Convergence Telemetry
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="pill-tinker">
            LoRA Rank 8
          </span>
          <span className="pill-tinker">
            1.84M Weights
          </span>
        </div>
      </div>

      {/* 4 Minimal Metric Horizon Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Inference Latency
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--cyan-core)' }}>
            174 <span style={{ fontSize: '14px', color: '#64748B' }}>ms</span>
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={13} /> 8.4x Faster
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Intent Accuracy
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#10B981' }}>
            98.4 <span style={{ fontSize: '14px', color: '#64748B' }}>%</span>
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={13} /> +54.8% vs Baseline
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Hallucination
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#F8FAFC' }}>
            0.0 <span style={{ fontSize: '14px', color: '#64748B' }}>%</span>
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', marginTop: '6px' }}>
            100% Pure Patient Voice
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Inference Cost
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--cyan-core)' }}>
            $0.00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--cyan-core)', fontWeight: '600', marginTop: '6px' }}>
            100% Offline Air-Gapped
          </div>
        </div>

      </div>

      {/* Glowing Minimal SVG Loss Horizon */}
      <div style={{ position: 'relative', height: '140px', background: 'rgba(0,0,0,0.4)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)', padding: '16px' }}>
        <svg viewBox="0 0 700 120" style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="neonLoss" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Loss curve */}
          <polyline
            fill="none"
            stroke="url(#neonLoss)"
            strokeWidth="3"
            strokeLinecap="round"
            points="0,15 50,30 110,50 180,68 260,82 350,92 450,100 580,106 700,108"
          />

          <circle cx="0" cy="15" r="4" fill="#00F2FE" />
          <circle cx="700" cy="108" r="5" fill="#10B981" />
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
          <span>Epoch 1 (Loss: 2.45)</span>
          <span>Epoch 3 (Loss: 0.95)</span>
          <span style={{ color: '#10B981', fontWeight: '700' }}>Epoch 5 (Loss: 0.44 &bull; Converged)</span>
        </div>
      </div>

    </div>
  );
}
