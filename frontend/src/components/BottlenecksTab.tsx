import React from 'react';
import { Link } from 'react-router-dom';
import { Bottleneck } from '../types';
import { AlertOctagon, Clock } from 'lucide-react';

interface BottlenecksTabProps {
  bottlenecks: Bottleneck[];
}

export const BottlenecksTab: React.FC<BottlenecksTabProps> = ({ bottlenecks }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      <div>
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <AlertOctagon className="w-8 h-8 text-rose-400" /> Supply Chain Bottlenecks & Pricing Power Moats
        </h2>
        <p className="text-slate-400 text-sm mt-1">Identifying physical shortages, multi-year lead times, and the companies with monopolistic pricing power</p>
      </div>

      {/* Bottlenecks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bottlenecks.map((btn) => (
          <div key={btn.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                {(() => {
                  const match = btn.layer.match(/\bLayer\s*(\d+)\b/i);
                  const layerNum = match ? match[1] : null;
                  return layerNum ? (
                    <Link
                      to={`/layers/${layerNum}`}
                      className="text-xs font-mono font-bold text-slate-400 hover:text-indigo-400 hover:underline transition"
                    >
                      {btn.layer}
                    </Link>
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-400">{btn.layer}</span>
                  );
                })()}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  {btn.severity}
                </span>
              </div>
              <h3 className="font-bold text-white text-base mb-1">{btn.name}</h3>
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Lead Time: <strong>{btn.lead_time}</strong></span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{btn.impact}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">Direct Equity Beneficiaries:</span>
              <div className="flex flex-wrap gap-1.5">
                {btn.beneficiary_tickers.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
