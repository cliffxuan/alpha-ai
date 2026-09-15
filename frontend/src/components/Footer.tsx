import React from 'react';
import { Layers, ShieldCheck, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#04060b] py-12 px-4 sm:px-6 lg:px-8 mt-20 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white">ALPHA<span className="text-indigo-400">AI</span></span>
            <p className="text-[10px] text-slate-500">The 5-Layer Cake Framework for AI Investment Intelligence</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> SEC & Fundamental Comps Engine
          </span>
          <span>&bull;</span>
          <a href="/docs" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Scalar API Docs
          </a>
        </div>

        <div className="text-center md:text-right text-[10px] text-slate-500 font-mono">
          © 2026 AlphaAI. For institutional analysis & educational investment research.
        </div>
      </div>
    </footer>
  );
};
