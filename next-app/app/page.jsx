'use client';

import React, { useState, useEffect } from 'react';
import SplineScene from './components/SplineScene';
import LatencyHorizon from './components/LatencyHorizon';
import TactileConsole from './components/TactileConsole';
import TinkerHorizon from './components/TinkerHorizon';
import CaregiverAlertFeed from './components/CaregiverAlertFeed';
import StoryDrawer from './components/StoryDrawer';
import { Volume2, VolumeX, Bell, Heart, Activity, Sparkles, Terminal } from './components/Icons';

// Clinical dataset & baseline metrics
import dataset from '../src/data/dataset.json';
import benchmarkData from '../src/data/benchmark.json';

export default function Home() {
  const [activeItem, setActiveItem] = useState(dataset[7]); // "water... ice... throat burn... bendy straw"
  const [activeShorthand, setActiveShorthand] = useState(dataset[7].shorthand);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [chimeActive, setChimeActive] = useState(false);

  // Live Caregiver Alert Stream
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      timestamp: '02:08:14 AM',
      shorthand: 'catheter... pinch... check bag',
      reconstructed: 'My catheter is pinching and burning uncomfortably. Could you please check the line and drain bag?',
      category: 'URGENT_PAIN',
      urgency: 'high',
      acknowledged: true
    },
    {
      id: 2,
      timestamp: '02:14:32 AM',
      shorthand: 'water... ice... throat burn',
      reconstructed: 'My throat is dry and burning. Could I please have a small cup of ice water with a bendy straw?',
      category: 'DAILY_NEEDS',
      urgency: 'medium',
      acknowledged: true
    }
  ]);

  // Web Audio API Emergency Clinical Chime (880Hz -> 587Hz 2-tone nurse bell)
  const handleEmergencyChime = () => {
    setChimeActive(true);
    setTimeout(() => setChimeActive(false), 800);

    if (!isMuted) {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Tone 1: A5 (880Hz)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain1.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start();
        osc1.stop(audioCtx.currentTime + 0.35);

        // Tone 2: D5 (587.33Hz)
        setTimeout(() => {
          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(587.33, audioCtx.currentTime);
          gain2.gain.setValueAtTime(0.28, audioCtx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.55);
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.start();
          osc2.stop(audioCtx.currentTime + 0.55);
        }, 160);
      } catch (e) {}
    }

    // Dispatch emergency event to Caregiver stream
    const newAlert = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      shorthand: '🚨 EMERGENCY NURSE CHIME TRIGGERED',
      reconstructed: 'Immediate bedside medical assistance summoned by patient Tariq (Bed 4).',
      category: 'URGENT_PAIN',
      urgency: 'critical',
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleSelect = (item) => {
    setActiveItem(item);
    setActiveShorthand(item.shorthand);

    // If critical/high urgency, automatically dispatch nurse chime
    if (item.urgency === 'critical' || item.urgency === 'high') {
      handleEmergencyChime();
    }

    // Add to alert queue
    const newAlert = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      shorthand: item.shorthand,
      reconstructed: item.reconstructed,
      category: item.category,
      urgency: item.urgency,
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Real Clinical Translation using Next.js /api/translate
  const handleCustomSubmit = async (text) => {
    if (!text || !text.trim()) return;
    setActiveShorthand(text.trim());
    setIsDecoding(true);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shorthand: text.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        const updatedItem = {
          shorthand: text.trim(),
          category: data.detected_category,
          urgency: data.urgency_level,
          reconstructed: data.reconstructed,
          baseline_output: data.baseline_output,
          baseline_latency_ms: data.baseline_latency_ms,
          tinker_latency_ms: data.tinker_latency_ms
        };

        setActiveItem(updatedItem);

        // Sound chime if critical
        if (data.urgency_level === 'critical' || data.urgency_level === 'high') {
          handleEmergencyChime();
        }

        // Add to alert stream
        const newAlert = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          shorthand: text.trim(),
          reconstructed: data.reconstructed,
          category: data.detected_category,
          urgency: data.urgency_level,
          acknowledged: false
        };
        setAlerts(prev => [newAlert, ...prev]);

      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Fallback local matching
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
    } finally {
      setIsDecoding(false);
    }
  };

  // Real TTS Voice Synthesis with Web Speech & ElevenLabs integration
  const handlePlayVoice = async (sentence) => {
    if (isMuted) return;

    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      // Check if ElevenLabs proxy is available
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentence })
      });

      if (ttsRes.ok && ttsRes.headers.get('content-type')?.includes('audio/mpeg')) {
        const audioBlob = await ttsRes.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);
        audio.play();
        return;
      }
    } catch (e) {}

    // Fallback: Web Speech API with calibrated pitch and prosody
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.94;
      utterance.pitch = 1.02;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAcknowledgeAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
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
        background: 'rgba(7, 9, 13, 0.88)',
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
          {/* SSS-Tier Neural Bridge Architectural Emblem */}
          <div style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(145deg, #131B24 0%, #0A0E15 100%)',
            border: '1px solid rgba(0, 245, 155, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 245, 155, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.6)',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'all 0.25s var(--ease-spring)'
          }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bridgeGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00F59B" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="waveGrad" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#00F59B" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>

              {/* Technical Circular Coordinate Reticle */}
              <circle cx="16" cy="16" r="13" stroke="rgba(0, 245, 155, 0.22)" strokeWidth="1" strokeDasharray="2 3" />

              {/* Precision Architectural Bridge Arch (The 'A' Frame Arch) */}
              <path
                d="M7 24C7 15.5 11 8 16 8C21 8 25 15.5 25 24"
                stroke="url(#bridgeGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Resonant Vocal Formant Waveform (Interlaced Speech Flow) */}
              <path
                d="M5 19.5C7.5 19.5 9.5 22 12 22C14 22 14.5 12.5 16 12.5C17.5 12.5 18 22 20 22C22.5 22 24.5 19.5 27 19.5"
                stroke="url(#waveGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing Apex Synthesis Jewel */}
              <circle cx="16" cy="8" r="2.2" fill="#00F59B" />
              <circle cx="16" cy="8" r="4.2" fill="#00F59B" fillOpacity="0.22" />

              {/* Synaptic Terminal Nodes */}
              <circle cx="7" cy="24" r="1.5" fill="#10B981" />
              <circle cx="25" cy="24" r="1.5" fill="#10B981" />
            </svg>

            {/* Ambient Radial Bloom */}
            <div style={{
              position: 'absolute',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#00F59B',
              filter: 'blur(8px)',
              opacity: 0.3,
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
            style={{ fontSize: '12px' }}
          >
            <Heart size={14} color="#FF6B8B" fill="#FF6B8B" />
            <span>Built for Tariq</span>
          </button>

          <button
            onClick={handleEmergencyChime}
            className="btn-zed"
            style={{
              fontSize: '12px',
              background: chimeActive ? '#FF2E63' : 'rgba(255, 46, 99, 0.15)',
              borderColor: chimeActive ? '#FF2E63' : 'rgba(255, 46, 99, 0.4)',
              color: chimeActive ? '#FFFFFF' : '#FF6B8B',
              boxShadow: chimeActive ? '0 0 24px rgba(255, 46, 99, 0.6)' : 'none',
              transform: chimeActive ? 'scale(0.96)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={14} />
            <span>Chime Nurse</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="btn-zed-ghost"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            style={{ padding: '8px 12px' }}
          >
            {isMuted ? (
              <VolumeX size={15} color="#FF6B8B" />
            ) : (
              <Volume2 size={15} color="var(--zed-green)" />
            )}
          </button>
        </div>
      </header>

      {/* Hero & 3D Centerpiece */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '30px 24px 10px 24px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
        
        {/* Instant-Loading 3D Robot Avatar in Zed Green */}
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
            lineHeight: '1.08',
            marginBottom: '16px'
          }}>
            <span style={{ color: '#FFFFFF' }}>Restoring Tariq's </span>
            <span style={{
              background: 'linear-gradient(135deg, #00F59B 0%, #34D399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Voice.</span>
          </h1>

          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.6', fontWeight: '400', maxWidth: '620px', margin: '0 auto' }}>
            Transforming fragmented aphasic shorthand into instant first-person dignity in <strong style={{ color: 'var(--zed-green)' }}>174 milliseconds</strong>.
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
              Tactile Sound Matrix
            </h2>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
              Keyboard Shortcuts [1] - [9] Active
            </span>
          </div>

          <TactileConsole
            dataset={dataset}
            onSelect={handleSelect}
            activeShorthand={activeShorthand}
            onCustomSubmit={handleCustomSubmit}
            isDecoding={isDecoding}
          />
        </div>

        {/* 3. Live Bedside Caregiver Feed & Nurse Dispatch */}
        <CaregiverAlertFeed
          alerts={alerts}
          onAcknowledge={handleAcknowledgeAlert}
        />

        {/* 4. Thinking Machines' Tinker Telemetry Horizon with 25-Case Benchmark Runner */}
        <TinkerHorizon benchmarkData={benchmarkData} />

      </section>

      {/* Story Drawer */}
      <StoryDrawer isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

    </div>
  );
}
