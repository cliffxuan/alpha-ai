import React from 'react';
import { Link } from 'react-router-dom';
import { Layer, TabId } from '../types';
import { Zap, Cpu, Server, Brain, AppWindow, ArrowRight, ShieldCheck, TrendingUp, DollarSign, Layers as LayersIcon } from 'lucide-react';

interface OverviewTabProps {
  layers: Layer[];
  onSelectTab?: (tab: TabId) => void;
  onSelectLayer?: (layerId: number) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ layers, onSelectTab, onSelectLayer }) => {
  const getLayerIcon = (id: number) => {
    switch (id) {
      case 1: return <Zap className="w-5 h-5 text-amber-400" />;
      case 2: return <Cpu className="w-5 h-5 text-purple-400" />;
      case 3: return <Server className="w-5 h-5 text-blue-400" />;
      case 4: return <Brain className="w-5 h-5 text-pink-400" />;
      case 5: return <AppWindow className="w-5 h-5 text-indigo-400" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const getBorderColor = (id: number) => {
    switch (id) {
      case 1: return 'hover:border-amber-500/50';
      case 2: return 'hover:border-purple-500/50';
      case 3: return 'hover:border-blue-500/50';
      case 4: return 'hover:border-pink-500/50';
      case 5: return 'hover:border-indigo-500/50';
      default: return 'hover:border-slate-500/50';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NVIDIA 5-Layer AI Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The 5-Layer Cake <br className="hidden sm:inline" />
            <span className="gradient-text">AI Investment Map</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Capital in the AI supercycle flows systematically from <strong>base physical constraints (Energy & Chips)</strong> through <strong>AI Infrastructure & Foundation Models</strong> up to <strong>Vertical Applications & Agentic AI</strong>. Identify where durable moats live and where commoditization risk destroys margin.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/portfolio"
              onClick={() => onSelectTab?.('portfolio')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" /> Simulate 5-Layer Portfolio
            </Link>
            <Link
              to="/valuations"
              onClick={() => onSelectTab?.('valuations')}
              className="px-6 py-3 rounded-xl glass-card hover:bg-slate-800/80 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4 text-emerald-400" /> Valuation Radar & Comps
            </Link>
          </div>
        </div>
      </div>

      {/* Key Macro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">2026 Hyperscaler CapEx</span>
          <p className="text-3xl font-extrabold text-white">$730 <span className="text-sm font-normal text-slate-400">Billion</span></p>
          <p className="text-[11px] text-slate-400 mt-2">Big-4 2026E guidance midpoint (~$720–745B band); research snapshot.</p>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Chips Value Capture</span>
          <p className="text-3xl font-extrabold text-purple-400">44.0% <span className="text-sm font-normal text-slate-400">of CapEx</span></p>
          <p className="text-[11px] text-slate-400 mt-2">Absorbed directly by NVIDIA, TSMC, Broadcom, and HBM.</p>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Power Grid Lead Time</span>
          <p className="text-3xl font-extrabold text-amber-400">36 - 42 <span className="text-sm font-normal text-slate-400">Mo</span></p>
          <p className="text-[11px] text-slate-400 mt-2">Substation transformers & 5-year utility interconnect queues.</p>
        </div>

        <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Applications TAM (2030)</span>
          <p className="text-3xl font-extrabold text-indigo-400">$650 <span className="text-sm font-normal text-slate-400">Billion</span></p>
          <p className="text-[11px] text-slate-400 mt-2">Replacing high-cost human cognitive labor budgets.</p>
        </div>
      </div>

      {/* The 5-Layer Cake Interactive Stack */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayersIcon className="w-6 h-6 text-indigo-400" /> The 5-Layer Cake Architecture
            </h2>
            <p className="text-slate-400 text-xs">Click any layer to inspect deep-dive investment dossiers, comps, and moat dynamics</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Top-to-Bottom Value Stack</span>
        </div>

        <div className="space-y-3">
          {[...layers].reverse().map((layer) => (
            <Link
              key={layer.id}
              to={`/layers/${layer.id}`}
              onClick={() => {
                onSelectLayer?.(layer.id);
                onSelectTab?.('layers');
              }}
              className={`glass-card p-5 sm:p-6 rounded-2xl border border-slate-800/90 ${getBorderColor(layer.id)} transition cursor-pointer group flex flex-col md:flex-row justify-between md:items-center gap-4 block`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:scale-110 transition-transform">
                  {getLayerIcon(layer.id)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Layer {layer.id}</span>
                    <span className="text-xs font-bold text-white">• {layer.name.split(':')[1]}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                      Moat: {layer.moat_rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-2xl">{layer.tagline}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-xs shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">2030 TAM</span>
                  <span className="font-bold text-white text-sm">{layer.market_size_2030}</span>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">3-Yr CAGR</span>
                  <span className="font-bold text-emerald-400 text-sm">{layer.cagr}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};
