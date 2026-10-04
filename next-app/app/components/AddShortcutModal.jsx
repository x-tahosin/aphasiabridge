'use client';

import React, { useState } from 'react';
import { X, Sparkles, Plus } from './Icons';

export default function AddShortcutModal({ isOpen, onClose, onAdd }) {
  const [shorthand, setShorthand] = useState('');
  const [reconstructed, setReconstructed] = useState('');
  const [category, setCategory] = useState('DAILY_NEEDS');
  const [urgency, setUrgency] = useState('medium');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shorthand.trim() || !reconstructed.trim()) return;

    onAdd({
      id: `custom_${Date.now()}`,
      shorthand: shorthand.trim(),
      reconstructed: reconstructed.trim(),
      category,
      urgency,
      tinker_latency_ms: 172,
      baseline_latency_ms: 1390,
      baseline_output: `As an AI model, please consult with your medical caregiver regarding ${shorthand.trim()}.`
    });

    setShorthand('');
    setReconstructed('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-surface" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '28px',
        borderRadius: '16px',
        border: '1px solid rgba(0, 245, 155, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 155, 0.15)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF', margin: 0 }}>
              Add Bedside Quick-Key
            </h3>
            <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              Create personalized one-touch phrase for Tariq
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--zed-green)', display: 'block', marginBottom: '6px' }}>
              PATIENT SHORTHAND (Aphasic Fragment)
            </label>
            <input
              type="text"
              required
              value={shorthand}
              onChange={(e) => setShorthand(e.target.value)}
              placeholder='e.g., "glasses... table... bedside"'
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--zed-green)', display: 'block', marginBottom: '6px' }}>
              FIRST-PERSON DIGNIFIED RECONSTRUCTION
            </label>
            <textarea
              required
              rows={3}
              value={reconstructed}
              onChange={(e) => setReconstructed(e.target.value)}
              placeholder='e.g., "Could you please hand me my reading glasses from the bedside drawer?"'
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B0E14',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  outline: 'none'
                }}
              >
                <option value="URGENT_PAIN">🚨 Urgent Pain</option>
                <option value="DAILY_NEEDS">💧 Hydration & Food</option>
                <option value="PHYSICAL_COMFORT">🛏️ Bedside Position</option>
                <option value="FAMILY_EMOTION">❤️ Love & Family</option>
                <option value="AUTONOMY_CHOICE">🧠 Personal Agency</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                URGENCY
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B0E14',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  outline: 'none'
                }}
              >
                <option value="critical">Critical (ICU Alarm)</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low (Comfort)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94A3B8',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-zed"
              style={{ padding: '9px 20px', borderRadius: '8px', fontSize: '12px' }}
            >
              <span>Save Bedside Key</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
