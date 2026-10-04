'use client';

import React, { useState, useEffect } from 'react';
import { Send, Sparkles, Terminal, CornerDownLeft, Plus } from './Icons';
import AddShortcutModal from './AddShortcutModal';

export default function TactileConsole({ dataset, onSelect, activeShorthand, onCustomSubmit, isDecoding }) {
  const [filter, setFilter] = useState('ALL');
  const [customText, setCustomText] = useState('');
  const [customKeys, setCustomKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load custom keys from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aphasiabridge_custom_keys');
      if (stored) {
        setCustomKeys(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleAddCustomKey = (newKey) => {
    const updated = [newKey, ...customKeys];
    setCustomKeys(updated);
    try {
      localStorage.setItem('aphasiabridge_custom_keys', JSON.stringify(updated));
    } catch (e) {}
    onSelect(newKey);
  };

  // Subtle Web Audio Mechanical Switch Sound
  const playMechanicalClick = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  };

  const domains = [
    { id: 'ALL', label: 'All Keys' },
    { id: 'URGENT_PAIN', label: '🚨 Urgent Pain' },
    { id: 'DAILY_NEEDS', label: '💧 Hydration & Food' },
    { id: 'PHYSICAL_COMFORT', label: '🛏️ Bedside Position' },
    { id: 'FAMILY_EMOTION', label: '❤️ Love & Family' },
    { id: 'AUTONOMY_CHOICE', label: '🧠 Agency' },
  ];

  // Combine default dataset with custom patient keys
  const allKeys = [...customKeys, ...dataset];

  const items = filter === 'ALL' 
    ? allKeys 
    : allKeys.filter(d => d.category === filter);

  const handleKeyClick = (item) => {
    playMechanicalClick();
    onSelect(item);
  };

  // Keyboard shortcut listener for keys 1-9
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9 && items[num - 1]) {
        handleKeyClick(items[num - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items]);

  const quickSamples = [
    "water... ice... throat burn",
    "catheter... pinch... check bag",
    "chest tight... breathe hard",
    "love you... hold hand"
  ];

  return (
    <div style={{ marginTop: '24px' }}>
      
      {/* Category Filter Bar with + Add Key Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {domains.map(d => (
            <button
              key={d.id}
              onClick={() => {
                playMechanicalClick();
                setFilter(d.id);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: filter === d.id ? '1px solid var(--zed-green)' : '1px solid rgba(255,255,255,0.08)',
                background: filter === d.id ? 'var(--zed-bg-tint)' : 'rgba(255,255,255,0.02)',
                color: filter === d.id ? 'var(--zed-green)' : '#94A3B8',
                fontSize: '12px',
                fontWeight: '700',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                boxShadow: filter === d.id ? '0 0 16px var(--zed-glow)' : 'none'
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Add Bedside Key button */}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '8px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(0, 245, 155, 0.4)',
            background: 'rgba(0, 245, 155, 0.08)',
            color: 'var(--zed-green)',
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{ fontSize: '14px', lineHeight: 1 }}>+</span>
          <span>Add Custom Key</span>
        </button>
      </div>

      {/* Tactile Keycap Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '14px',
        marginTop: '8px'
      }}>
        {items.slice(0, 12).map((item, idx) => {
          const isUrgent = item.urgency === 'critical' || item.urgency === 'high';
          const isSelected = activeShorthand === item.shorthand;

          return (
            <div
              key={item.id}
              onClick={() => handleKeyClick(item)}
              className={`tactile-key ${isUrgent ? 'tactile-key-urgent' : ''} ${isSelected ? 'tactile-key-selected' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--zed-green)' : (isUrgent ? 'var(--coral-urgent)' : '#334155'),
                    boxShadow: isSelected ? '0 0 8px var(--zed-green)' : 'none'
                  }} />
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isUrgent ? '#FF6B8B' : (isSelected ? 'var(--zed-green)' : '#64748B'),
                    fontWeight: '700'
                  }}>
                    {item.category.replace('_', ' ')}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {idx < 9 && (
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94A3B8',
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}>
                      [{idx + 1}]
                    </span>
                  )}
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--zed-green)', fontWeight: '700' }}>
                    {item.tinker_latency_ms}ms
                  </span>
                </div>
              </div>

              {/* Shorthand Token Fragment */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: '600',
                color: isUrgent ? '#FDA4AF' : (isSelected ? '#FFFFFF' : '#E2E8F0'),
                marginBottom: '6px'
              }}>
                "{item.shorthand}"
              </div>

              {/* Dignified Preview */}
              <div style={{
                fontSize: '12px',
                color: isSelected ? '#A7F3D0' : '#8592A3',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                &rarr; {item.reconstructed}
              </div>
            </div>
          );
        })}
      </div>

      {/* SSS-Tier Zed Interactive Terminal Input */}
      <div className="glass-surface" style={{
        padding: '18px 22px',
        marginTop: '22px',
        border: '1px solid rgba(0, 245, 155, 0.25)',
        boxShadow: '0 12px 30px -10px rgba(0, 245, 155, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={14} color="var(--zed-green)" />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--zed-green)', fontWeight: '700' }}>
              tariq@aphasiabridge:~$ input shorthand
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {quickSamples.map((sample, i) => (
              <button
                key={i}
                onClick={() => {
                  playMechanicalClick();
                  setCustomText(sample);
                  onCustomSubmit(sample);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: '#94A3B8',
                  cursor: 'pointer'
                }}
              >
                "{sample}"
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type patient shorthand... (press Enter or [Decode])"
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '12px 16px',
              outline: 'none',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customText.trim()) {
                playMechanicalClick();
                onCustomSubmit(customText.trim());
                setCustomText('');
              }
            }}
          />

          <button
            onClick={() => {
              if (customText.trim()) {
                playMechanicalClick();
                onCustomSubmit(customText.trim());
                setCustomText('');
              }
            }}
            disabled={isDecoding}
            className="btn-zed"
            style={{ padding: '12px 20px', borderRadius: '10px', opacity: isDecoding ? 0.7 : 1 }}
          >
            <Send size={13} />
            <span>{isDecoding ? 'Decoding...' : 'Decode'}</span>
          </button>
        </div>
      </div>

      {/* Add Custom Key Modal */}
      <AddShortcutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCustomKey}
      />

    </div>
  );
}
