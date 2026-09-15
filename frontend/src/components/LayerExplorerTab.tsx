import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layer, Company } from '../types';
import { Zap, Cpu, Server, Brain, AppWindow, CheckCircle2, AlertTriangle } from 'lucide-react';

interface LayerExplorerTabProps {
  layers: Layer[];
  companies: Company[];
  selectedLayerId?: number;
  onSelectLayerId?: (id: number) => void;
}

export const LayerExplorerTab: React.FC<LayerExplorerTabProps> = ({
  layers,
  companies,
  selectedLayerId = 1,
  onSelectLayerId,
}) => {
  const { layerId } = useParams<{ layerId?: string }>();

  const parsedId = layerId ? parseInt(layerId, 10) : undefined;
  const activeLayerId = (parsedId && !isNaN(parsedId) && parsedId >= 1 && parsedId <= 5)
    ? parsedId
    : (selectedLayerId || 1);

  const currentLayer = layers.find((l) => l.id === activeLayerId) || layers[0];
  const layerCompanies = companies.filter((c) => c.layer_id === activeLayerId);

  const getLayerIcon = (id: number) => {
    switch (id) {
      case 1: return <Zap className="w-4 h-4 text-amber-400" />;
      case 2: return <Cpu className="w-4 h-4 text-purple-400" />;
      case 3: return <Server className="w-4 h-4 text-blue-400" />;
      case 4: return <Brain className="w-4 h-4 text-pink-400" />;
      case 5: return <AppWindow className="w-4 h-4 text-indigo-400" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  if (!currentLayer) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p>Loading Layer Dossier...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-wrap gap-2">
        {layers.map((l) => (
          <Link
            key={l.id}
            to={`/layers/${l.id}`}
            onClick={() => onSelectLayerId?.(l.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
              activeLayerId === l.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                : 'glass-card text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {getLayerIcon(l.id)}
            <span>L{l.id}: {l.name.split(':')[1]?.split('&')[0]}</span>
          </Link>
        ))}
      </div>

      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase">
                Layer {currentLayer.id}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Moat: {currentLayer.moat_rating}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                CAGR: {currentLayer.cagr}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{currentLayer.name}</h2>
            <p className="text-xs text-slate-400 mt-1">{currentLayer.subtitle}</p>
          </div>

          <div className="text-left md:text-right font-mono shrink-0">
            <span className="text-[10px] text-slate-400 uppercase block">2030 Market Size</span>
            <span className="text-2xl font-bold text-white">{currentLayer.market_size_2030}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Core Investment Thesis
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {currentLayer.thesis}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Value Capture & Margin Drivers
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {currentLayer.value_capture_drivers.map((drv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span>{drv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="font-bold text-rose-400 text-xs uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <AlertTriangle className="w-3.5 h-3.5" /> Key Supply Chain & Execution Bottlenecks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            {currentLayer.key_bottlenecks.map((btn, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-200">
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Representative Assets & Valuation Profiles ({layerCompanies.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {layerCompanies.map((comp) => (
            <div key={comp.id} className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{comp.name}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">
                      {comp.ticker}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase font-bold ${
                      comp.type === 'public' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {comp.type}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  {comp.type === 'public' ? (
                    <div>
                      <span className="text-sm font-bold text-white">${comp.market_cap_billions}B</span>
                      <span className="text-[10px] text-slate-400 block">Mkt Cap</span>
                      {comp.bull_case_market_cap_billions && (
                        <span className="text-[10px] text-amber-400 block font-semibold">
                          Bull: ${comp.bull_case_market_cap_billions}B
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm font-bold text-purple-400">${comp.valuation_billions}B</span>
                      <span className="text-[10px] text-slate-400 block">Valuation</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                {comp.type === 'public' ? (
                  <>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">P/E Ratio</span>
                      <span className="font-bold text-white">{comp.pe_ratio != null ? `${comp.pe_ratio}x` : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">EV / Sales</span>
                      <span className="font-bold text-cyan-400">{comp.ev_sales}x</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Gross Margin</span>
                      <span className="font-bold text-emerald-400">{comp.gross_margin}%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Est. ARR</span>
                      <span className="font-bold text-white">${comp.estimated_arr_millions}M</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">ARR Multiple</span>
                      <span className="font-bold text-pink-400">{comp.arr_multiple}x</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Latest Round</span>
                      <span className="font-bold text-indigo-300 truncate block">{comp.latest_round?.split('(')[0]}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="text-xs space-y-1.5 pt-1">
                <p className="text-slate-300"><strong>Moat:</strong> {comp.moat}</p>
                <p className="text-rose-300/90"><strong>Risk:</strong> {comp.risk}</p>
                <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200 font-semibold text-[11px]">
                  💡 <strong>Verdict:</strong> {comp.investment_verdict}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
