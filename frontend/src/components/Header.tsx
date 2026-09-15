import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TabId } from '../types';
import { Layers, Menu, X, TrendingUp, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentTab?: TabId;
  onSelectTab?: (tab: TabId) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabId; path: string; label: string; badge?: string }[] = [
    { id: 'overview', path: '/', label: '5-Layer Cake' },
    { id: 'layers', path: '/layers', label: 'Layer Dossiers' },
    { id: 'valuations', path: '/valuations', label: 'Valuation Radar', badge: 'Comps' },
    { id: 'capex', path: '/capex', label: '~$730B CapEx Flows' },
    { id: 'bottlenecks', path: '/bottlenecks', label: 'Supply Moats' },
    { id: 'portfolio', path: '/portfolio', label: 'Portfolio Allocator', badge: 'Sim' },
  ];

  const handleNavClick = (id: TabId) => {
    onSelectTab?.(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-slate-800/80 bg-[#060810]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full gap-4">
          
          {/* Brand Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
            onClick={() => handleNavClick('overview')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base text-white tracking-tight">ALPHA<span className="text-indigo-400">AI</span></span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  5-Layer Cake
                </span>
              </div>
              <p className="text-[9.5px] text-slate-400 tracking-wider uppercase font-medium">AI Investment Intelligence</p>
            </div>
          </Link>

          {/* Centered Navigation Tabs */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                onClick={() => handleNavClick(item.id)}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`
                }
              >
                {item.label}
                {item.badge && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 shrink-0">
            <a
              href="/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> API Docs
            </a>
            <Link
              to="/portfolio"
              onClick={() => handleNavClick('portfolio')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Build Thesis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2 text-2xl focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              onClick={() => handleNavClick(item.id)}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-between ${
                  isActive
                    ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/20'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`
              }
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
          <a
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 flex items-center gap-2 pt-2 border-t border-slate-800"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" /> Open Scalar API Reference
          </a>
        </div>
      )}
    </nav>
  );
};
