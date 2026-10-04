import React from 'react';
import { Volume2, VolumeX, Heart, Cpu, Bell, Activity, Layers, FileText } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenStory, isMuted, setIsMuted, onTriggerEmergency }) {
  return (
    <header className="border-b border-white/10 bg-[#0B101D]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Mission Tag */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center">
              <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight font-['Outfit'] text-white">
                Aphasia<span className="text-cyan-400">Bridge</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase badge-tinker">
                Tinker LoRA
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
                ElevenLabs Voice
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Zero-Leak Expressive Speech Restorer &bull; <button onClick={onOpenStory} className="text-cyan-400 hover:underline inline-flex items-center gap-1">Built for Tariq <Heart className="w-3 h-3 text-rose-400 inline fill-rose-400" /></button>
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#101827] p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('soundboard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'soundboard'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Assistive Soundboard
          </button>
          
          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'inspector'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Live Engine Inspector
          </button>

          <button
            onClick={() => setActiveTab('benchmark')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'benchmark'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/25 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Tinker Benchmarks
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Caregiver Log
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Emergency Nurse Chime */}
          <button
            onClick={onTriggerEmergency}
            className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:shadow-rose-500/20 active:scale-95"
            title="Immediate Caregiver Alert Chime"
          >
            <Bell className="w-4 h-4 animate-bounce text-rose-400" />
            <span className="hidden sm:inline">Nurse Chime</span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-xl bg-[#141E33] hover:bg-[#1C2B47] text-slate-300 border border-white/10 flex items-center justify-center transition-all"
            title={isMuted ? "Unmute Voice Audio" : "Mute Voice Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>

      </div>
    </header>
  );
}
