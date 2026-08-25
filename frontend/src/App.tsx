import React, { useState, useEffect } from 'react';
import { TabId, Layer, Company, CapExData, Bottleneck } from './types';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { LayerExplorerTab } from './components/LayerExplorerTab';
import { ValuationRadarTab } from './components/ValuationRadarTab';
import { CapExFlowTab } from './components/CapExFlowTab';
import { BottlenecksTab } from './components/BottlenecksTab';
import { PortfolioBuilderTab } from './components/PortfolioBuilderTab';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabId>('overview');
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [capexData, setCapexData] = useState<CapExData | null>(null);
  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([]);

  useEffect(() => {
    // 1. Fetch 6 layers
    fetch('/api/layers')
      .then((res) => res.json())
      .then((data) => setLayers(data.layers || []))
      .catch((e) => console.warn('Layers fetch error', e));

    // 2. Fetch companies
    fetch('/api/companies')
      .then((res) => res.json())
      .then((data) => setCompanies(data.companies || []))
      .catch((e) => console.warn('Companies fetch error', e));

    // 3. Fetch capex flows
    fetch('/api/capex-flows')
      .then((res) => res.json())
      .then((data) => setCapexData(data))
      .catch((e) => console.warn('CapEx fetch error', e));

    // 4. Fetch bottlenecks
    fetch('/api/bottlenecks')
      .then((res) => res.json())
      .then((data) => setBottlenecks(data.bottlenecks || []))
      .catch((e) => console.warn('Bottlenecks fetch error', e));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#060810] text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Header currentTab={currentTab} onSelectTab={setCurrentTab} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {currentTab === 'overview' && (
          <OverviewTab
            layers={layers}
            onSelectTab={setCurrentTab}
            onSelectLayer={(id) => {
              setSelectedLayerId(id);
              setCurrentTab('layers');
            }}
          />
        )}
        {currentTab === 'layers' && (
          <LayerExplorerTab
            layers={layers}
            companies={companies}
            selectedLayerId={selectedLayerId}
            onSelectLayerId={setSelectedLayerId}
          />
        )}
        {currentTab === 'valuations' && (
          <ValuationRadarTab companies={companies} />
        )}
        {currentTab === 'capex' && (
          <CapExFlowTab capexData={capexData} />
        )}
        {currentTab === 'bottlenecks' && (
          <BottlenecksTab bottlenecks={bottlenecks} />
        )}
        {currentTab === 'portfolio' && (
          <PortfolioBuilderTab />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
