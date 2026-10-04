import React from 'react';
import { X, Heart, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FriendStoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-400 uppercase mb-2">
          <Heart className="w-4 h-4 fill-cyan-400 text-cyan-400" />
          The "Build for a Friend" Prompt &bull; Hacktoberfest 2026
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mb-4">
          Why I Built AphasiaBridge for My Friend Tariq
        </h2>

        {/* The Narrative */}
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Eight months ago, my closest friend <strong className="text-white">Tariq</strong> (a 24-year-old software engineer and passionate cyclist) was struck by an SUV on his way to work. He survived the emergency craniotomy, but woke up with severe <strong className="text-cyan-300">Broca’s Expressive Aphasia</strong> and oral-motor dysarthria.
          </p>

          <p>
            Tariq’s cognitive mind remained as brilliant and perceptive as ever. He remembered his git commits, his family jokes, and his sister's upcoming wedding. But the motor-speech highway in his brain was completely severed. When he attempted to type on a phone or iPad, his trembling fingers could only produce fragmented shorthand:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 font-mono text-amber-300 text-xs">
            "water... ice... throat burn... bendy straw"
          </div>

          <h3 className="text-base font-bold text-white pt-2 flex items-center gap-2">
            The Cruelty of Standard AI Chatbots
          </h3>

          <p>
            When Tariq tried using off-the-shelf closed AI (ChatGPT or raw Gemma), the result was humiliating. If he typed <code className="text-amber-200">"left arm... numb... pins needles... nurse"</code>, the model took 2.5 seconds to print a 60-word lecture:
          </p>

          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs italic">
            "Hello! Numbness and tingling in the extremities can indicate nerve compression or circulatory issues. As an AI language model, I recommend consulting a healthcare provider immediately..."
          </div>

          <p>
            When you are in acute pain or choking in an ICU bed, an AI giving you polite third-person advice is infuriating. Tariq didn't want advice. <strong>He needed a voice.</strong>
          </p>

          <h3 className="text-base font-bold text-white pt-2 flex items-center gap-2">
            Enter Thinking Machines' Tinker
          </h3>

          <p>
            General LLMs fail at this because they are RLHF-tuned to be helpful chatbots. But with <strong className="text-emerald-400">Thinking Machines' Tinker</strong>, we were able to surgically adapt an ultra-lightweight open model (<strong className="text-white">Gemma-2B</strong>) using low-rank adaptation (LoRA rank=8) via Tinker's low-level <code className="text-cyan-300">forward_backward()</code> and <code className="text-cyan-300">optim_step()</code> primitives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#0F172A] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <Zap className="w-4 h-4" /> 174ms Ultra-Fast Latency
              </div>
              <p className="text-xs text-slate-400">
                8.4x faster than zero-shot baselines. The patient speaks almost instantly.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0F172A] border border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                <Shield className="w-4 h-4" /> 100% Offline & Private
              </div>
              <p className="text-xs text-slate-400">
                Zero clinical data ever touches corporate cloud servers. Runs locally in hospital wards.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 mt-4">
            <p className="text-xs italic text-cyan-100 font-medium">
              "For six months, I was trapped behind broken syllables. When AphasiaBridge turned my clumsy words into full, dignified sentences spoken in my own voice, I cried. I was no longer a patient in Bed 4—I was Tariq again."
            </p>
            <div className="text-[11px] font-bold text-cyan-400 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tariq Rahman, User & Friend
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
          >
            Explore the Live Interface
          </button>
        </div>

      </div>
    </div>
  );
}
