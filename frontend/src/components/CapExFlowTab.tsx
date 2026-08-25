import React, { useState } from 'react';
import { CapExData } from '../types';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface CapExFlowTabProps {
  capexData: CapExData | null;
}

export const CapExFlowTab: React.FC<CapExFlowTabProps> = ({ capexData }) => {
  const [totalCapexBillions, setTotalCapexBillions] = useState<number>(330);

  const flows = capexData?.flows || [];

  const flowCalculations = flows.map((f) => {
    const allocated = (totalCapexBillions * f.percentage) / 100.0;
    return {
      ...f,
      calculated_billions: Math.round(allocated * 10) / 10,
    };
  });

  const chartData = flowCalculations.map((f) => ({
    target: f.to.split(':')[1]?.trim() || f.to,
    amount: f.calculated_billions,
    pct: f.percentage,
  }));

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      <div>
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-indigo-400" /> The $330B Hyperscaler CapEx Supercycle
        </h2>
        <p className="text-slate-400 text-sm mt-1">Simulating where Big Tech capital flows across the 6 layers and analyzing where sustainable ROI is realized</p>
      </div>

      {/* Interactive CapEx Slider Box */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
                Hyperscaler Annual AI CapEx Spend
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              ${totalCapexBillions} <span className="text-lg font-normal text-slate-400">Billion / Year</span>
            </div>
            <p className="text-xs text-slate-400">
              Aggregated AI capital expenditure across Microsoft, Alphabet, Amazon, and Meta Platforms.
            </p>
          </div>

          <div className="lg:w-80 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">CapEx Velocity:</span>
              <span className="text-indigo-400 font-bold">${totalCapexBillions}B / yr</span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              step="10"
              value={totalCapexBillions}
              onChange={(e) => setTotalCapexBillions(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$150B (2023)</span>
              <span>$330B (2026E)</span>
              <span>$600B (2028+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CapEx Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-card p-6 rounded-3xl border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Capital Absorption Across the 6-Layer Cake ($B)</h3>
              <p className="text-xs text-slate-400">Who collects the toll on hyperscaler AI spending?</p>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">Silicon = 44%</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="target" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="B" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} formatter={(val: number) => [`$${val}B`, 'Allocated CapEx']} />
                <Legend />
                <Bar dataKey="amount" name="Allocated Spend ($B)" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROI Dilemma Box */}
        <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" /> The $600B AI ROI Question
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            For Big Tech to justify $330B in annual CapEx, end-user software (Layer 6) must generate at least <strong>$600B in annual enterprise AI revenues</strong> at typical 50% gross margins.
          </p>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Current AI Software ARR:</span>
              <span className="text-emerald-400 font-bold">~$25B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Required 2028 Run-Rate:</span>
              <span className="text-cyan-400 font-bold">$600B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Implied Labor Replacement:</span>
              <span className="text-pink-400 font-bold">~12% White-Collar</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Investors must monitor whether Layer 6 (Agentic software) can scale fast enough to prevent a CapEx deceleration in Layer 2 & 3.
          </p>
        </div>
      </div>

      {/* Granular Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flowCalculations.map((f, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-indigo-400">{f.percentage}% of CapEx</span>
              <span className="text-lg font-mono font-bold text-white">${f.calculated_billions}B</span>
            </div>
            <h4 className="font-bold text-white text-base">{f.to}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
