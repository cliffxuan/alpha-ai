import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../types';
import { DollarSign, ArrowUpDown, Filter } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis, Cell } from 'recharts';

interface ValuationRadarTabProps {
  companies: Company[];
}

export const ValuationRadarTab: React.FC<ValuationRadarTabProps> = ({ companies }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'public' | 'private'>('all');
  const [sortKey, setSortKey] = useState<string>('ev_sales');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const filtered = companies.filter((c) => {
    if (selectedType === 'all') return true;
    return c.type === selectedType;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = (a as any)[sortKey] ?? 0;
    const valB = (b as any)[sortKey] ?? 0;
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  // Scatter chart data for Public Multiples (X: YoY Growth, Y: EV/Sales, Z: Market Cap)
  const scatterData = companies
    .filter((c) => c.type === 'public' && c.revenue_growth_yoy && c.ev_sales)
    .map((c) => ({
      name: c.name,
      ticker: c.ticker,
      growth: c.revenue_growth_yoy,
      evSales: c.ev_sales,
      marketCap: c.market_cap_billions,
      pe: c.pe_ratio,
      layer: c.layer_name,
    }));

  const layerColors: Record<string, string> = {
    'Energy & Grid': '#f59e0b',
    'Chips & Semis': '#a855f7',
    'Cloud & Infrastructure': '#3b82f6',
    'Foundation Models': '#ec4899',
    'Applications & Agents': '#6366f1',
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <DollarSign className="w-8 h-8 text-emerald-400" /> Valuation Radar & Comparable Multiples
          </h2>
          <p className="text-slate-400 text-sm mt-1">Cross-sectional analysis of public equity multiples (EV/Sales, P/E) vs private unicorn funding rounds</p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedType === 'all' ? 'bg-indigo-600 text-white' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            All ({companies.length})
          </button>
          <button
            onClick={() => setSelectedType('public')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedType === 'public' ? 'bg-emerald-600 text-white' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            Public Equities
          </button>
          <button
            onClick={() => setSelectedType('private')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              selectedType === 'private' ? 'bg-purple-600 text-white' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            Private Unicorns
          </button>
        </div>
      </div>

      {/* Valuation Scatter Chart (Growth vs Multiple) */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-white text-base">Growth vs EV/Sales Multiple Matrix (Public Equities)</h3>
            <p className="text-xs text-slate-400">Bubble size proportional to market capitalization ($B)</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Rule of 40</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="growth" name="YoY Revenue Growth (%)" stroke="#64748b" tick={{ fontSize: 11 }} unit="%" />
              <YAxis dataKey="evSales" name="EV / Sales Multiple (x)" stroke="#64748b" tick={{ fontSize: 11 }} unit="x" />
              <ZAxis dataKey="marketCap" range={[60, 600]} name="Market Cap ($B)" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                formatter={(val: any, name: any) => [name === 'YoY Revenue Growth (%)' ? `${val}%` : `${val}x`, name]}
              />
              <Scatter name="Companies" data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={layerColors[entry.layer] || '#6366f1'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comprehensive Comps Table */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" /> Valuation Comps & Multiples Table
          </h3>
          <span className="text-xs text-slate-400 font-mono">Click headers to sort</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5">Company / Ticker</th>
                <th className="py-2.5">Layer</th>
                <th className="py-2.5 cursor-pointer hover:text-white" onClick={() => handleSort('market_cap_billions')}>
                  Valuation ($B) <ArrowUpDown className="w-3 h-3 inline" />
                </th>
                <th className="py-2.5 cursor-pointer hover:text-white" onClick={() => handleSort('ev_sales')}>
                  EV/Sales <ArrowUpDown className="w-3 h-3 inline" />
                </th>
                <th className="py-2.5 cursor-pointer hover:text-white" onClick={() => handleSort('pe_ratio')}>
                  P/E Ratio <ArrowUpDown className="w-3 h-3 inline" />
                </th>
                <th className="py-2.5 cursor-pointer hover:text-white" onClick={() => handleSort('revenue_growth_yoy')}>
                  YoY Growth <ArrowUpDown className="w-3 h-3 inline" />
                </th>
                <th className="py-2.5 cursor-pointer hover:text-white" onClick={() => handleSort('gross_margin')}>
                  Gross Margin <ArrowUpDown className="w-3 h-3 inline" />
                </th>
                <th className="py-2.5">Investment Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {sorted.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30">
                  <td className="py-3">
                    <span className="font-bold text-white block">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.ticker} • {c.type}</span>
                  </td>
                  <td className="py-3 font-semibold">
                    <Link
                      to={`/layers/${c.layer_id}`}
                      className="hover:underline transition hover:opacity-80"
                      style={{ color: layerColors[c.layer_name] || '#94a3b8' }}
                    >
                      {c.layer_name}
                    </Link>
                  </td>
                  <td className="py-3 font-bold text-white">
                    ${c.market_cap_billions ?? c.valuation_billions}B
                    {c.bull_case_market_cap_billions && (
                      <span className="block text-[10px] text-amber-400 font-normal">
                        Bull: ${c.bull_case_market_cap_billions}B
                      </span>
                    )}
                  </td>
                  <td className="py-3 font-bold text-cyan-400">
                    {c.ev_sales ? `${c.ev_sales}x` : c.arr_multiple ? `${c.arr_multiple}x (ARR)` : '—'}
                  </td>
                  <td className="py-3 font-semibold text-pink-400">
                    {c.pe_ratio ? `${c.pe_ratio}x` : 'Private'}
                  </td>
                  <td className="py-3 font-bold text-emerald-400">
                    {c.revenue_growth_yoy ? `+${c.revenue_growth_yoy}%` : 'N/A'}
                  </td>
                  <td className="py-3 text-amber-400">
                    {c.gross_margin ? `${c.gross_margin}%` : '—'}
                  </td>
                  <td className="py-3 text-[11px] text-slate-300 max-w-xs truncate">
                    {c.investment_verdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
