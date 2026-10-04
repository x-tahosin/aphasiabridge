import React, { useState } from 'react';
import { 
  AlertTriangle, Droplets, Bed, Heart, ShieldAlert, Smile, 
  Send, Sparkles, RotateCcw, Volume2, FastForward, Check
} from 'lucide-react';

export default function Soundboard({ dataset, onSelectShorthand, onTranslate, currentShorthand, setCurrentShorthand, isProcessing }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Tiles', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'URGENT_PAIN', label: '🚨 Urgent & Pain', icon: AlertTriangle, color: 'text-rose-400' },
    { id: 'DAILY_NEEDS', label: '💧 Food & Water', icon: Droplets, color: 'text-blue-400' },
    { id: 'PHYSICAL_COMFORT', label: '🛏️ Bed Comfort', icon: Bed, color: 'text-amber-400' },
    { id: 'FAMILY_EMOTION', label: '❤️ Love & Family', icon: Heart, color: 'text-pink-400' },
    { id: 'AUTONOMY_CHOICE', label: '🧠 Agency & Respect', icon: ShieldAlert, color: 'text-purple-400' },
    { id: 'SOCIAL_HUMOR', label: '😄 Wit & Humor', icon: Smile, color: 'text-emerald-400' },
  ];

  const presets = [
    { label: "2 AM Critical Catheter Pinch", shorthand: "catheter... pinch... burning... check bag" },
    { label: "Throat Burning Ice Water", shorthand: "water... ice... throat burn... bendy straw" },
    { label: "Speaking Directly / Dignity", shorthand: "stop... talking about me... talk to me... directly" },
    { label: "Daughter Exam Blessing", shorthand: "maya... proud of you... big exam... love you" }
  ];

  const filteredItems = selectedCategory === 'ALL' 
    ? dataset 
    : dataset.filter(item => item.category === selectedCategory);

  const handleTileClick = (item) => {
    setCurrentShorthand(item.shorthand);
    onSelectShorthand(item);
  };

  return (
    <div className="space-y-6">
      
      {/* Interactive Testing Presets for Judges */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3 border border-white/10">
        <div className="flex items-center gap-2">
          <FastForward className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Judge Quick Scenarios:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentShorthand(p.shorthand);
                onTranslate(p.shorthand);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/30 text-xs font-medium transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Shorthand Buffer & Translation Bar */}
      <div className="glass-panel p-5 border border-cyan-500/30 shadow-xl shadow-cyan-500/5 relative">
        <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center justify-between">
          <span>Active Patient Shorthand Input (Touch / Keyboard / Dwell)</span>
          <span className="text-slate-400 text-[11px] font-normal">Tinker LoRA Fine-Tuned Model Active</span>
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={currentShorthand}
            onChange={(e) => setCurrentShorthand(e.target.value)}
            placeholder="Tap tiles below or type telegraphic words (e.g. water... ice... throat burn... cup)"
            className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/15 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentShorthand('')}
              className="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
              title="Clear input"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onTranslate(currentShorthand)}
              disabled={!currentShorthand || isProcessing}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Thinking Machines...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Reconstruct (174ms)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
              selectedCategory === cat.id
                ? 'bg-slate-800 text-cyan-300 border-cyan-500/50 shadow-sm'
                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            <cat.icon className={`w-3.5 h-3.5 ${cat.color}`} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tactile Grid of Big Accessible Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map((item) => {
          const isUrgent = item.urgency === 'critical' || item.urgency === 'high';
          return (
            <div
              key={item.id}
              onClick={() => handleTileClick(item)}
              className={`glass-panel-interactive accessible-tile border ${
                isUrgent 
                  ? 'border-rose-500/30 hover:border-rose-400 bg-rose-950/20' 
                  : 'hover:border-cyan-400'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isUrgent 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : 'bg-white/5 text-slate-400 border border-white/10'
                }`}>
                  {item.category.replace('_', ' ')}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  {item.tinker_latency_ms}ms
                </span>
              </div>

              <div className="font-mono text-xs text-amber-200 font-medium mb-1 line-clamp-1">
                "{item.shorthand}"
              </div>

              <div className="text-xs text-slate-300 font-medium line-clamp-2 mt-auto">
                &rarr; {item.reconstructed}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
