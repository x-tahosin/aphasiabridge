'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, Droplets, Bed, Heart, ShieldAlert, Smile, 
  Send, Sparkles, Volume2 
} from './Icons';

export default function TactileConsole({ dataset, onSelect, activeShorthand, onCustomSubmit }) {
  const [filter, setFilter] = useState('ALL');
  const [customText, setCustomText] = useState('');

  const domains = [
    { id: 'ALL', label: 'All Keys' },
    { id: 'URGENT_PAIN', label: '🚨 Urgent Pain' },
    { id: 'DAILY_NEEDS', label: '💧 Hydration & Food' },
    { id: 'PHYSICAL_COMFORT', label: '🛏️ Bedside Position' },
    { id: 'FAMILY_EMOTION', label: '❤️ Love & Family' },
    { id: 'AUTONOMY_CHOICE', label: '🧠 Agency' },
  ];

  const items = filter === 'ALL' 
    ? dataset 
    : dataset.filter(d => d.category === filter);

  return (
    <div style={{ marginTop: '24px' }}>
      
      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
        {domains.map(d => (
          <button
            key={d.id}
            onClick={() => setFilter(d.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              border: filter === d.id ? '1px solid var(--cyan-core)' : '1px solid rgba(255,255,255,0.08)',
              background: filter === d.id ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255,255,255,0.02)',
              color: filter === d.id ? 'var(--cyan-core)' : '#94A3B8',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Tactile Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '14px',
        marginTop: '8px'
      }}>
        {items.slice(0, 12).map((item) => {
          const isUrgent = item.urgency === 'critical' || item.urgency === 'high';
          const isSelected = activeShorthand === item.shorthand;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`tactile-key ${isUrgent ? 'tactile-key-urgent' : ''}`}
              style={{
                borderColor: isSelected ? 'var(--cyan-core)' : undefined,
                boxShadow: isSelected ? '0 0 25px var(--cyan-glow)' : undefined
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isUrgent ? '#FF3366' : '#64748B',
                  fontWeight: '700'
                }}>
                  {item.category.replace('_', ' ')}
                </span>

                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#10B981', fontWeight: '700' }}>
                  {item.tinker_latency_ms}ms
                </span>
              </div>

              {/* Shorthand Token Fragment */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: '600',
                color: isUrgent ? '#FDA4AF' : '#F1F5F9',
                marginBottom: '6px'
              }}>
                "{item.shorthand}"
              </div>

              {/* Dignified Preview */}
              <div style={{
                fontSize: '12px',
                color: '#94A3B8',
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

      {/* Direct Shorthand Terminal Input */}
      <div className="glass-surface" style={{ padding: '16px 20px', marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Custom Shorthand (e.g. cold water... throat burn... bendy straw)"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F8FAFC',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && customText.trim()) {
              onCustomSubmit(customText.trim());
              setCustomText('');
            }
          }}
        />

        <button
          onClick={() => {
            if (customText.trim()) {
              onCustomSubmit(customText.trim());
              setCustomText('');
            }
          }}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            background: 'var(--cyan-core)',
            color: '#030508',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Send size={13} />
          <span>Decode</span>
        </button>
      </div>

    </div>
  );
}
