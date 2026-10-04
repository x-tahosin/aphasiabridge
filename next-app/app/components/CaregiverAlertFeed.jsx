'use client';

import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, Shield, Clock } from './Icons';

export default function CaregiverAlertFeed({ alerts = [], onAcknowledge, onClear }) {
  const [filter, setFilter] = useState('ALL');

  const filteredAlerts = filter === 'ALL'
    ? alerts
    : (filter === 'UNACKNOWLEDGED' 
        ? alerts.filter(a => !a.acknowledged) 
        : alerts.filter(a => a.urgency === 'critical' || a.urgency === 'high'));

  const exportCSV = () => {
    if (alerts.length === 0) return;
    const headers = ['Timestamp', 'Patient', 'Urgency', 'Domain', 'Shorthand', 'Reconstructed Message', 'Status'];
    const rows = alerts.map(a => [
      `"${a.timestamp}"`,
      `"Tariq (Bed 4)"`,
      `"${a.urgency.toUpperCase()}"`,
      `"${a.category}"`,
      `"${a.shorthand.replace(/"/g, '""')}"`,
      `"${a.reconstructed.replace(/"/g, '""')}"`,
      `"${a.acknowledged ? 'ACKNOWLEDGED' : 'PENDING'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aphasiabridge_caregiver_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-surface" style={{
      marginTop: '28px',
      padding: '24px 28px',
      border: '1px solid rgba(0, 245, 155, 0.2)',
      borderRadius: '16px',
      background: 'rgba(11, 14, 20, 0.75)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(0, 245, 155, 0.12)',
            border: '1px solid rgba(0, 245, 155, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={16} color="var(--zed-green)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
                Live Bedside Caregiver Feed & Nurse Dispatch
              </span>
              <span className="pill-zed" style={{ fontSize: '9px', padding: '2px 7px' }}>
                Bed 4 &bull; Tariq
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              Real-time ICU/Homecare clinical event logging with audit trail
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setFilter(f => f === 'UNACKNOWLEDGED' ? 'ALL' : 'UNACKNOWLEDGED')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: filter === 'UNACKNOWLEDGED' ? '1px solid #FF6B8B' : '1px solid rgba(255, 255, 255, 0.1)',
              background: filter === 'UNACKNOWLEDGED' ? 'rgba(255, 46, 99, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              color: filter === 'UNACKNOWLEDGED' ? '#FDA4AF' : '#94A3B8',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            {filter === 'UNACKNOWLEDGED' ? 'Showing Pending' : 'Filter Pending'}
          </button>

          <button
            onClick={exportCSV}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 245, 155, 0.3)',
              background: 'rgba(0, 245, 155, 0.08)',
              color: 'var(--zed-green)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Export Shift Log (CSV)</span>
          </button>
        </div>
      </div>

      {/* Alert Feed Table */}
      {alerts.length === 0 ? (
        <div style={{
          padding: '32px',
          textAlign: 'center',
          color: '#64748B',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          border: '1px dashed rgba(255, 255, 255, 0.08)',
          borderRadius: '10px'
        }}>
          No bedside events recorded yet. Click any quick-key or custom prompt above to dispatch an alert.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
          {filteredAlerts.map((alert) => {
            const isCritical = alert.urgency === 'critical';
            const isHigh = alert.urgency === 'high';

            return (
              <div
                key={alert.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: alert.acknowledged 
                    ? 'rgba(255, 255, 255, 0.02)' 
                    : (isCritical ? 'rgba(255, 46, 99, 0.08)' : 'rgba(0, 245, 155, 0.04)'),
                  border: alert.acknowledged
                    ? '1px solid rgba(255, 255, 255, 0.05)'
                    : (isCritical ? '1px solid rgba(255, 46, 99, 0.35)' : '1px solid rgba(0, 245, 155, 0.2)'),
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Status Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px' }}>
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: alert.acknowledged ? '#64748B' : (isCritical ? 'var(--coral-urgent)' : 'var(--zed-green)'),
                    boxShadow: alert.acknowledged ? 'none' : `0 0 8px ${isCritical ? 'var(--coral-urgent)' : 'var(--zed-green)'}`
                  }} />
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: '700',
                    color: alert.acknowledged ? '#64748B' : (isCritical ? '#FDA4AF' : 'var(--zed-green)')
                  }}>
                    {alert.timestamp}
                  </span>
                </div>

                {/* Shorthand & Reconstructed Speech */}
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: isCritical ? '#FDA4AF' : '#E2E8F0',
                      fontWeight: '600'
                    }}>
                      "{alert.shorthand}"
                    </span>
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: '#94A3B8'
                    }}>
                      {alert.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                    &rarr; {alert.reconstructed}
                  </div>
                </div>

                {/* Action button */}
                <div>
                  {alert.acknowledged ? (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: '#64748B'
                    }}>
                      <CheckCircle2 size={13} color="#64748B" />
                      Acknowledged
                    </span>
                  ) : (
                    <button
                      onClick={() => onAcknowledge(alert.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: isCritical ? 'rgba(255, 46, 99, 0.2)' : 'rgba(0, 245, 155, 0.15)',
                        border: isCritical ? '1px solid rgba(255, 46, 99, 0.4)' : '1px solid rgba(0, 245, 155, 0.35)',
                        color: isCritical ? '#FDA4AF' : 'var(--zed-green)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      ✓ Nurse Acknowledge
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
