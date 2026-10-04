'use client';

import React from 'react';
import { X, Heart, Shield, Zap, Sparkles } from './Icons';

export default function StoryDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-surface" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '36px',
        position: 'relative',
        border: '1px solid rgba(0, 242, 254, 0.3)',
        boxShadow: '0 30px 80px rgba(0, 242, 254, 0.15)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '8px',
            color: '#94A3B8',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Heart size={14} fill="#FF3366" color="#FF3366" />
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF3366', fontWeight: '700' }}>
            Built for a Friend &bull; Hacktoberfest 2026
          </span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF', marginBottom: '16px' }}>
          Tariq's Voice Restored
        </h2>

        <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            Eight months ago, my close friend Tariq suffered severe <strong style={{ color: '#F8FAFC' }}>Broca’s Expressive Aphasia</strong> following an accident. His intellect remained sharp, but his speech highway was severed.
          </p>

          <p>
            When he typed <code style={{ color: '#F59E0B' }}>"left arm... numb... nurse"</code> into ChatGPT, the AI gave him a 60-word medical disclaimer. Tariq didn't want advice. <strong>He needed a voice.</strong>
          </p>

          <div style={{
            background: 'rgba(0, 242, 254, 0.05)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            color: '#E2E8F0',
            fontStyle: 'italic',
            fontSize: '13px'
          }}>
            "When AphasiaBridge turned my clumsy words into full, dignified sentences spoken in my own voice in 174ms, I cried. I was no longer a patient—I was Tariq again."
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            background: 'var(--cyan-core)',
            color: '#030508',
            fontWeight: '800',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Return to Console
        </button>
      </div>
    </div>
  );
}
