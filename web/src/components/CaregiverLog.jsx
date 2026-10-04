import React from 'react';
import { FileText, Download, Play, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function CaregiverLog({ logs, onPlayAudio }) {
  const exportLog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aphasiabridge_caregiver_log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="glass-panel p-6 border border-white/10 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Caregiver &amp; Clinical Communication Audit Log
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Timestamped medical record of patient communications for bedside nurses and SLP therapists.
          </p>
        </div>

        <button
          onClick={exportLog}
          disabled={logs.length === 0}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export JSON Audit
        </button>
      </div>

      {/* Log Feed */}
      {logs.length === 0 ? (
        <div className="p-8 text-center border border-white/5 rounded-xl bg-slate-900/50">
          <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400">
            No communications recorded in this session yet. Reconstruct sentences to populate the log.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-white/10 transition-all"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="font-mono text-slate-400">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                    log.urgency === 'critical' || log.urgency === 'high'
                      ? 'badge-urgent'
                      : 'badge-tinker'
                  }`}>
                    {log.urgency}
                  </span>
                  <span className="text-slate-400 font-medium">
                    &bull; {log.category}
                  </span>
                </div>
                
                <div className="text-sm font-semibold text-white">
                  "{log.reconstructed}"
                </div>

                <div className="text-xs font-mono text-amber-200/80">
                  Input: "{log.shorthand}" &bull; <span className="text-emerald-400">{log.latency_ms}ms</span>
                </div>
              </div>

              <button
                onClick={() => onPlayAudio(log.reconstructed, `log_${idx}`)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all self-end sm:self-center"
              >
                <Play className="w-3 h-3 fill-cyan-300" />
                <span>Replay</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
