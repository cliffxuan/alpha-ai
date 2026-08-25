import React, { useState, useEffect } from 'react';
import { PortfolioResult, PresetTemplate } from '../types';
import { Calculator, Layers } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const PortfolioBuilderTab: React.FC = () => {
  const [layer1, setLayer1] = useState<number>(20);
  const [layer2, setLayer2] = useState<number>(30);
  const [layer3, setLayer3] = useState<number>(15);
  const [layer4, setLayer4] = useState<number>(10);
  const [layer5, setLayer5] = useState<number>(10);
  const [layer6, setLayer6] = useState<number>(15);
  const [capital, setCapital] = useState<number>(100000);

  const [simResult, setSimResult] = useState<PortfolioResult | null>(null);

  const fetchSimulation = async () => {
    try {
      const res = await fetch('/api/portfolio/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          layer_1_energy: layer1,
          layer_2_silicon: layer2,
          layer_3_cloud: layer3,
          layer_4_models: layer4,
          layer_5_tooling: layer5,
          layer_6_apps: layer6,
          total_capital_usd: capital,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSimResult(data);
      }
    } catch (e) {
      console.warn('Portfolio simulation fetch error', e);
    }
  };

  useEffect(() => {
    fetchSimulation();
  }, [layer1, layer2, layer3, layer4, layer5, layer6, capital]);

  const applyPreset = (preset: PresetTemplate) => {
    setLayer1(preset.weights.layer_1_energy);
    setLayer2(preset.weights.layer_2_silicon);
    setLayer3(preset.weights.layer_3_cloud);
    setLayer4(preset.weights.layer_4_models);
    setLayer5(preset.weights.layer_5_tooling);
    setLayer6(preset.weights.layer_6_apps);
  };

  const timelineData = simResult?.timeline || [];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      <div>
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Calculator className="w-8 h-8 text-indigo-400" /> 6-Layer Portfolio Allocator & Thesis Simulator
        </h2>
        <p className="text-slate-400 text-sm mt-1">Design customized institutional weighting across the 6 layers and model 5-year compounding returns</p>
      </div>

      {/* Preset Strategy Selector */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase text-slate-400 block font-bold">Institutional Strategy Presets:</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {simResult?.presets?.map((p) => (
            <div
              key={p.id}
              onClick={() => applyPreset(p)}
              className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer space-y-2 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-white text-sm mb-1">{p.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/15 px-2 py-1 rounded border border-indigo-500/25 block">
                {p.target_profile}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Sliders & Real-Time Output Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Deck */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" /> Layer Weighting (% Allocation)
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-amber-400 font-bold">L1: Energy & Grid</span>
                <span className="text-white font-bold">{layer1}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer1}
                onChange={(e) => setLayer1(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-purple-400 font-bold">L2: Silicon & Semis</span>
                <span className="text-white font-bold">{layer2}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer2}
                onChange={(e) => setLayer2(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-blue-400 font-bold">L3: Cloud & Network</span>
                <span className="text-white font-bold">{layer3}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer3}
                onChange={(e) => setLayer3(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-pink-400 font-bold">L4: Foundation Models</span>
                <span className="text-white font-bold">{layer4}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer4}
                onChange={(e) => setLayer4(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-pink-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-emerald-400 font-bold">L5: Tooling & MLOps</span>
                <span className="text-white font-bold">{layer5}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer5}
                onChange={(e) => setLayer5(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-indigo-400 font-bold">L6: Vertical Apps & Agents</span>
                <span className="text-white font-bold">{layer6}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer6}
                onChange={(e) => setLayer6(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Total Portfolio Capital:</span>
                <span className="text-emerald-400 font-bold">${capital.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Portfolio Metrics & Growth Simulation */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-white text-base">5-Year Capital Compounding Simulation ($ USD)</h3>
                <p className="text-xs text-slate-400">Base case, Bull scenario, and Bear multiple compression</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                {simResult?.summary.risk_rating}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} formatter={(val: number) => [`$${val.toLocaleString()}`, 'Portfolio Value']} />
                  <Legend />
                  <Line type="monotone" dataKey="bull_value" name="Bull (Accelerated AI ROI)" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="base_value" name="Base Case" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="bear_value" name="Bear (CapEx Slowdown)" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weighted Metric Badges */}
          {simResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center border-t border-slate-800/80 pt-4">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Weighted EV/Sales</span>
                <span className="text-lg font-bold text-cyan-400">{simResult.summary.weighted_ev_sales}x</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Weighted P/E</span>
                <span className="text-lg font-bold text-pink-400">{simResult.summary.weighted_pe_ratio}x</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Gross Margin</span>
                <span className="text-lg font-bold text-emerald-400">{simResult.summary.weighted_gross_margin_pct}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">3-Yr CAGR</span>
                <span className="text-lg font-bold text-amber-400">{simResult.summary.projected_3yr_cagr_pct}%</span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
