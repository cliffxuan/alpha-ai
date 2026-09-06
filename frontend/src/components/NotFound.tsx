import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-6 text-rose-400">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
        404
      </h1>
      <h2 className="text-xl font-bold text-slate-200 mb-2">
        Layer Not Found
      </h2>
      <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
        The architectural layer or route you requested does not exist in the AlphaAI framework.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to 6-Layer Cake
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2.5 rounded-xl glass-card hover:bg-slate-800/80 text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    </div>
  );
};
