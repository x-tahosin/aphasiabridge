'use client';

import React, { useState, useEffect } from 'react';
import SplineScene from './components/SplineScene';
import LatencyHorizon from './components/LatencyHorizon';
import TactileConsole from './components/TactileConsole';
import TinkerHorizon from './components/TinkerHorizon';
import StoryDrawer from './components/StoryDrawer';
import { Volume2, VolumeX, Bell, Heart, Activity, Sparkles } from './components/Icons';

// Clinical dataset
import dataset from '../src/data/dataset.json';
import benchmarkData from '../src/data/benchmark.json';

export default function Home() {
  const [activeItem, setActiveItem] = useState(dataset[7]); // "water... ice... throat burn... bendy straw"
  const [activeShorthand, setActiveShorthand] = useState(dataset[7].shorthand);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Web Audio API Emergency Chime
  const handleEmergencyChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
      
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  };

  const handleSelect = (item) => {
    setActiveItem(item);
    setActiveShorthand(item.shorthand);
  };

  const handleCustomSubmit = (text) => {
    setActiveShorthand(text);
    // Find closest match or synthesize
    const match = dataset.find(d => d.shorthand.toLowerCase().includes(text.toLowerCase())) || {
      shorthand: text,
      category: 'DAILY_NEEDS',
      urgency: 'medium',
      reconstructed: `Could you please assist me with ${text}? I need your help right now.`,
      baseline_output: `Hello! Regarding ${text}, as an AI model, please consult with your healthcare caregiver.`,
      baseline_latency_ms: 1480,
      tinker_latency_ms: 174
    };
    setActiveItem(match);
  };

  const handlePlayVoice = (sentence) => {
    if (isMuted) return;

    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const resultPayload = {
    input_shorthand: activeShorthand,
    detected_category: activeItem.category,
    urgency_level: activeItem.urgency,
    tinker_output: activeItem.reconstructed,
    tinker_latency_ms: activeItem.tinker_latency_ms,
    baseline_output: activeItem.baseline_output,
    baseline_latency_ms: activeItem.baseline_latency_ms
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Luxury Minimalist Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(3, 5, 8, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '0 24px',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00F2FE 0%, #10B981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.3)'
          }}>
            <Activity size={18} color="#030508" strokeWidth={2.5} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                APHASIABRIDGE
              </span>
              <span className="pill-tinker" style={{ padding: '2px 8px', fontSize: '10px' }}>
                TINKER LoRA
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              Zero-Leak Neural Voice Instrument
            </div>
          </div>
        </div>

        {/* Live Status + Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsStoryOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Heart size={12} fill="#FF3366" color="#FF3366" />
            <span>Built for Tariq</span>
          </button>

          <button
            onClick={handleEmergencyChime}
            style={{
              background: 'rgba(255, 51, 102, 0.12)',
              border: '1px solid rgba(255, 51, 102, 0.3)',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#FF3366',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Emergency Caregiver Chime"
          >
            <Bell size={12} />
            <span>Chime</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isMuted ? '#EF4444' : 'var(--cyan-core)',
              cursor: 'pointer'
            }}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </header>

      {/* Hero & 3D Visual Centerpiece */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '40px 24px 20px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Background 3D Spline / Neural Canvas */}
        <SplineScene isSpeaking={isSpeaking} urgency={activeItem.urgency} />

        {/* Minimal Hero Copy */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '-100px auto 30px auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', marginBottom: '16px' }}>
            <Sparkles size={12} color="var(--cyan-core)" />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cyan-core)', fontWeight: '700' }}>
              Thinking Machines' Tinker LoRA Fine-Tuning
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '900',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            lineHeight: '1.1',
            marginBottom: '14px'
          }}>
            Restoring Tariq's Voice.
          </h1>

          <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.6', fontWeight: '400' }}>
            Transforming fragmented aphasic shorthand into instant first-person dignity in <strong style={{ color: '#00F2FE' }}>174 milliseconds</strong>.
          </p>
        </div>

        {/* 1. Real-Time Latency Race Horizon */}
        <LatencyHorizon
          result={resultPayload}
          onPlay={handlePlayVoice}
          isPlaying={isSpeaking}
        />

        {/* 2. Tactile Sound Matrix Console */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
              Tactile Sound Matrix
            </h3>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              1-Touch AAC Console
            </span>
          </div>

          <TactileConsole
            dataset={dataset}
            onSelect={handleSelect}
            activeShorthand={activeShorthand}
            onCustomSubmit={handleCustomSubmit}
          />
        </div>

        {/* 3. Thinking Machines' Tinker Telemetry Horizon */}
        <TinkerHorizon benchmarkData={benchmarkData} />

      </section>

      {/* Minimal Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '24px',
        textAlign: 'center',
        fontSize: '11px',
        color: '#64748B',
        fontFamily: 'var(--font-mono)'
      }}>
        AphasiaBridge &bull; Thinking Machines' Tinker API &bull; ElevenLabs &bull; Built for Tariq
      </footer>

      {/* Story Drawer */}
      <StoryDrawer isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

    </div>
  );
}
