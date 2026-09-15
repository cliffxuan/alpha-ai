import React, { useState, useEffect } from 'react';
import { CapExData } from '../types';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface CapExFlowTabProps {
  capexData: CapExData | null;
}

export const CapExFlowTab: React.FC\u003cCapExFlowTabProps\u003e = ({ capexData }) =\u003e {
  const snapshotTotal = capexData?.total_hyperscaler_capex_2026_billions ?? 730;
  const [totalCapexBillions, setTotalCapexBillions] = useState\u003cnumber\u003e(730);

  useEffect(() =\u003e {
    if (capexData?.total_hyperscaler_capex_2026_billions) {
      setTotalCapexBillions(capexData.total_hyperscaler_capex_2026_billions);
    }
  }, [capexData?.total_hyperscaler_capex_2026_billions]);

  const flows = capexData?.flows || [];

  const flowCalculations = flows.map((f) =\u003e {
    const allocated = (totalCapexBillions * f.percentage) / 100.0;
    return {
      ...f,
      calculated_billions: Math.round(allocated * 10) / 10,
    };
  });

  const chartData = flowCalculations.map((f) =\u003e ({
    target: f.to.split(':')[1]?.trim() || f.to,
    amount: f.calculated_billions,
    pct: f.percentage,
  }));

  return (
    \u003cdiv className="space-y-12 animate-in fade-in duration-300"\u003e
      
      \u003cdiv\u003e
        \u003ch2 className="text-3xl font-extrabold text-white flex items-center gap-2"\u003e
          \u003cTrendingUp className="w-8 h-8 text-indigo-400" /\u003e The {`~$\${snapshotTotal}B`} Hyperscaler CapEx Supercycle
        \u003c/h2\u003e
        \u003cp className="text-slate-400 text-sm mt-1"\u003e
          Research snapshot of where Big Tech capital flows across the 5 layers (Big-4 2026E guidance band ~$720\u2013745B)
        \u003c/p\u003e
      \u003c/div\u003e

      \u003cdiv className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950"\u003e
        \u003cdiv className="flex flex-col lg:flex-row justify-between lg:items-center gap-6"\u003e
          \u003cdiv className="space-y-2"\u003e
            \u003cdiv className="flex items-center gap-2"\u003e
              \u003cspan className="w-2.5 h-2.5 rounded-full bg-slate-400"\u003e\u003c/span\u003e
              \u003cspan className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider"\u003e
                Hyperscaler Annual CapEx Snapshot (Big-4)
              \u003c/span\u003e
            \u003c/div\u003e
            \u003cdiv className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight"\u003e
              ${\${totalCapexBillions}} \u003cspan className="text-lg font-normal text-slate-400"\u003eBillion / Year\u003c/span\u003e
            \u003c/div\u003e
            \u003cp className="text-xs text-slate-400"\u003e
              Aggregated guided CapEx across Microsoft, Alphabet, Amazon, and Meta Platforms (static research snapshot \u2014 not a live feed).
            \u003c/p\u003e
          \u003c/div\u003e

          \u003cdiv className="lg:w-80 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"\u003e
            \u003cdiv className="flex justify-between text-xs font-mono"\u003e
              \u003cspan className="text-slate-400"\u003eCapEx Scenario:\u003c/span\u003e
              \u003cspan className="text-indigo-400 font-bold"\u003e${\${totalCapexBillions}}B / yr\u003c/span\u003e
            \u003c/div\u003e
            \u003cinput
              type="range"
              min="200"
              max="1200"
              step="10"
              value={totalCapexBillions}
              onChange={(e) =\u003e setTotalCapexBillions(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-indigo-500"
            /\u003e
            \u003cdiv className="flex justify-between text-[10px] text-slate-500 font-mono"\u003e
              \u003cspan\u003e$200B\u003c/span\u003e
              \u003cspan\u003e{`$\${snapshotTotal}B (2026E)`}\u003c/span\u003e
              \u003cspan\u003e$1.2T\u003c/span\u003e
            \u003c/div\u003e
          \u003c/div\u003e
        \u003c/div\u003e
      \u003c/div\u003e

      \u003cdiv className="grid grid-cols-1 lg:grid-cols-12 gap-8"\u003e
        \u003cdiv className="lg:col-span-8 glass-card p-6 rounded-3xl border border-slate-800"\u003e
          \u003cdiv className="flex justify-between items-center mb-4"\u003e
            \u003cdiv\u003e
              \u003ch3 className="font-bold text-white text-base"\u003eCapital Absorption Across the 5-Layer Cake ($B)\u003c/h3\u003e
              \u003cp className="text-xs text-slate-400"\u003eWho collects the toll on hyperscaler AI spending?\u003c/p\u003e
            \u003c/div\u003e
            \u003cspan className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20"\u003eChips = 44%\u003c/span\u003e
          \u003c/div\u003e

          \u003cdiv className="h-72 w-full"\u003e
            \u003cResponsiveContainer width="100%" height="100%"\u003e
              \u003cBarChart data={chartData}\u003e
                \u003cXAxis dataKey="target" stroke="#64748b" tick={{ fontSize: 11 }} /\u003e
                \u003cYAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="B" /\u003e
                \u003cTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} formatter={(val: number) =\u003e [`$\${val}B`, 'Allocated CapEx']} /\u003e
                \u003cLegend /\u003e
                \u003cBar dataKey="amount" name="Allocated Spend ($B)" fill="#8b5cf6" radius={[8, 8, 0, 0]} /\u003e
              \u003c/BarChart\u003e
            \u003c/ResponsiveContainer\u003e
          \u003c/div\u003e
        \u003c/div\u003e

        \u003cdiv className="lg:col-span-4 glass-card p-6 rounded-3xl border border-slate-800 space-y-4"\u003e
          \u003ch3 className="font-bold text-white text-base flex items-center gap-2"\u003e
            \u003cShieldCheck className="w-5 h-5 text-indigo-400" /\u003e The AI ROI Question
          \u003c/h3\u003e
          \u003cp className="text-xs text-slate-300 leading-relaxed"\u003e
            For Big Tech to justify {`~$\${snapshotTotal}B`} in annual CapEx, end-user software (Layer 5) must generate multi-hundred-billion dollars in enterprise AI revenues at typical software gross margins.
          \u003c/p\u003e
          \u003cdiv className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs font-mono"\u003e
            \u003cdiv className="flex justify-between"\u003e
              \u003cspan className="text-slate-400"\u003eCurrent AI Software ARR:\u003c/span\u003e
              \u003cspan className="text-emerald-400 font-bold"\u003e~$80B+\u003c/span\u003e
            \u003c/div\u003e
            \u003cdiv className="flex justify-between"\u003e
              \u003cspan className="text-slate-400"\u003eRequired 2028+ Run-Rate:\u003c/span\u003e
              \u003cspan className="text-cyan-400 font-bold"\u003e$800B+\u003c/span\u003e
            \u003c/div\u003e
            \u003cdiv className="flex justify-between"\u003e
              \u003cspan className="text-slate-400"\u003eImplied Labor Replacement:\u003c/span\u003e
              \u003cspan className="text-pink-400 font-bold"\u003e~12% White-Collar\u003c/span\u003e
            \u003c/div\u003e
          \u003c/div\u003e
          \u003cp className="text-[11px] text-slate-400"\u003e
            Investors must monitor whether Layer 5 (Agentic software) can scale fast enough to prevent a CapEx deceleration in Layer 2 \u0026 3.
          \u003c/p\u003e
        \u003c/div\u003e
      \u003c/div\u003e

      \u003cdiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"\u003e
        {flowCalculations.map((f, idx) =\u003e (
          \u003cdiv key={idx} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3"\u003e
            \u003cdiv className="flex justify-between items-start"\u003e
              \u003cspan className="text-xs font-mono font-bold text-indigo-400"\u003e{f.percentage}% of CapEx\u003c/span\u003e
              \u003cspan className="text-lg font-mono font-bold text-white"\u003e${\${f.calculated_billions}}B\u003c/span\u003e
            \u003c/div\u003e
            \u003ch4 className="font-bold text-white text-base"\u003e{f.to}\u003c/h4\u003e
            \u003cp className="text-xs text-slate-400 leading-relaxed"\u003e{f.description}\u003c/p\u003e
          \u003c/div\u003e
        ))}
      \u003c/div\u003e

    \u003c/div\u003e
  );
};
