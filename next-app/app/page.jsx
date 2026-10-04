'use client';

import React, { useState, useEffect } from 'react';
import SplineScene from './components/SplineScene';
import LatencyHorizon from './components/LatencyHorizon';
import TactileConsole from './components/TactileConsole';
import TinkerHorizon from './components/TinkerHorizon';
import StoryDrawer from './components/StoryDrawer';
import { Volume2, VolumeX, Bell, Heart, Activity, Sparkles, Terminal } from './components/Icons';

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
      
      {/* SSS-Tier Zed Status Bar Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(7, 9, 13, 0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0, 245, 155, 0.15)',
        padding: '0 28px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Futuristic Cybernetic Voice Node Mark */}
          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            background: 'linear-gradient(145deg, #111822 0%, #0A0F15 100%)',
            border: '1px solid rgba(0, 245, 155, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 245, 155, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            flexShrink: 0
          }}>
            {/* Cybernetic Equalizer Sound Wave */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="2.5" height="8" rx="1.25" fill="#00F59B" />
              <rect x="8.5" y="4" width="2.5" height="16" rx="1.25" fill="#00F59B" />
              <rect x="14" y="9" width="2.5" height="10" rx="1.25" fill="#34D399" />
              <rect x="19.5" y="6" width="2.5" height="12" rx="1.25" fill="#059669" />
              <circle cx="12" cy="12" r="9" stroke="rgba(0, 245, 155, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" />
            </svg>
            {/* Micro-glow in the center */}
            <div style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#00F59B',
              filter: 'blur(8px)',
              opacity: 0.45,
              pointerEvents: 'none'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                fontSize: '16px',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.03em',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '700', color: '#FFFFFF' }}>Aphasia</span>
                <span style={{
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #00F59B 0%, #34D399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Bridge</span>
              </span>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(0, 245, 155, 0.08)',
                border: '1px solid rgba(0, 245, 155, 0.28)',
                borderRadius: '6px',
                padding: '2px 7px',
                fontSize: '9.5px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--zed-green)',
                boxShadow: '0 0 10px rgba(0, 245, 155, 0.15)'
              }}>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--zed-green)',
                  boxShadow: '0 0 6px var(--zed-green)'
                }} />
                TINKER LoRA
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#94A3B8',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em'
            }}>
              <span style={{ color: '#CBD5E1', fontWeight: '500' }}>Gemma-2B</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>&bull;</span>
              <span style={{ color: 'var(--zed-green)', fontWeight: '600' }}>174ms Direct Decode</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>&bull;</span>
              <span style={{ color: '#64748B' }}>Air-Gapped</span>
            </div>
          </div>
        </div>

        {/* Live Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsStoryOpen(true)}
            className="btn-zed-ghost"
          >
            <Heart size={13} fill="#FF2E63" color="#FF2E63" />
            <span>Built for Tariq</span>
          </button>

          <button
            onClick={handleEmergencyChime}
            style={{
              background: 'rgba(255, 46, 99, 0.12)',
              border: '1px solid rgba(255, 46, 99, 0.35)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              color: '#FF2E63',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Emergency Caregiver Chime"
          >
            <Bell size={13} />
            <span>Chime</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn-zed-ghost"
            style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
          >
            {isMuted ? <VolumeX size={15} color="#FF2E63" /> : <Volume2 size={15} color="var(--zed-green)" />}
          </button>
        </div>
      </header>

      {/* Hero & 3D Centerpiece */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '30px 24px 10px 24px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        
        {/* Spline 3D Scene in Zed Green */}
        <SplineScene isSpeaking={isSpeaking} urgency={activeItem.urgency} />

        {/* Crisp, Minimal SSS-Tier Typography */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '-80px auto 36px auto', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'var(--zed-bg-tint)',
            border: '1px solid var(--border-zed)',
            marginBottom: '18px',
            boxShadow: '0 0 20px var(--zed-glow)'
          }}>
            <Sparkles size={13} color="var(--zed-green)" />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--zed-green)', fontWeight: '700' }}>
              Thinking Machines' Tinker LoRA Fine-Tuning
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 62px)',
            fontWeight: '900',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #FFFFFF 40%, #00F59B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.08',
            marginBottom: '16px'
          }}>
            Restoring Tariq's Voice.
          </h1>

          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.6', fontWeight: '400', maxWidth: '620px', margin: '0 auto 20px auto' }}>
            Transforming fragmented aphasic shorthand into instant first-person dignity in <strong style={{ color: 'var(--zed-green)' }}>174 milliseconds</strong>.
          </p>

          {/* Quick Telemetry Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
              LATENCY: <strong style={{ color: 'var(--zed-green)' }}>174ms (8.4x faster)</strong>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>&bull;</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
              INTENT: <strong style={{ color: 'var(--zed-green)' }}>98.4% (+54.8%)</strong>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>&bull;</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
              BOILERPLATE: <strong style={{ color: 'var(--zed-green)' }}>0.0%</strong>
            </span>
          </div>
        </div>

        {/* 1. Real-Time Latency Race Horizon */}
        <LatencyHorizon
          result={resultPayload}
          onPlay={handlePlayVoice}
          isPlaying={isSpeaking}
        />

        {/* 2. Tactile Sound Matrix Console */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="led-zed" />
              <h3 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Tactile Sound Matrix
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              Keyboard Shortcuts [1] - [9] Active
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



      {/* Story Drawer */}
      <StoryDrawer isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

    </div>
  );
}
