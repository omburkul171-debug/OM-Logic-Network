
import React, { useState } from 'react';
import { AppView, LogicTree, LogicNode } from './types';
import { INITIAL_TREES, COLORS } from './constants';
import LogicCard from './components/LogicCard';
import DecisionBuilder from './components/DecisionBuilder';
import Insights from './components/Insights';
import Profile from './components/Profile';
import DebateMode from './components/DebateMode';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.EXPLORE);
  const [trees, setTrees] = useState<LogicTree[]>(INITIAL_TREES);
  const [selectedForDebate, setSelectedForDebate] = useState<LogicTree | null>(null);

  const handlePublish = (conclusion: string, nodes: Record<string, LogicNode>) => {
    const newTree: LogicTree = {
      id: `tree-${Date.now()}`,
      author: {
        name: 'Kaelen Vance',
        handle: '@kaelen_logic',
        avatar: 'https://picsum.photos/seed/user/100/100',
        omScore: 1402
      },
      conclusion,
      rootId: 'root',
      nodes,
      createdAt: new Date().toISOString(),
      likes: 0,
      debates: 0
    };
    setTrees([newTree, ...trees]);
    setActiveView(AppView.EXPLORE);
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.EXPLORE:
        return (
          <div className="space-y-6 pb-24">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-serif font-bold text-[#1a2f23] mb-1">Global Reasoning</h1>
                <p className="text-sm opacity-60">Insightful connections across the network.</p>
            </div>
            {trees.map(tree => (
              <LogicCard 
                key={tree.id} 
                tree={tree} 
                onDebate={(t) => setSelectedForDebate(t)} 
              />
            ))}
          </div>
        );
      case AppView.CREATE:
        return <DecisionBuilder onPublish={handlePublish} />;
      case AppView.INSIGHTS:
        return <Insights />;
      case AppView.MINDSET:
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-[#fefaf0] relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fefaf0ee] backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#1a2f2308]">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a2f23] rounded-xl flex items-center justify-center text-white font-serif italic font-bold">Ω</div>
            <span className="text-xl font-serif font-black tracking-tighter uppercase text-[#1a2f23]">OM</span>
        </div>
        <button className="p-2 hover:bg-[#1a2f2311] rounded-full">
            <svg className="w-5 h-5 text-[#1a2f23]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </header>

      {/* Main View Area */}
      <main className="px-6 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-8 px-6">
        <div className="bg-[#1a2f23] rounded-[2rem] px-8 py-4 flex items-center gap-10 shadow-2xl border border-sage border-opacity-30 backdrop-blur-xl">
          <NavItem icon="Explore" isActive={activeView === AppView.EXPLORE} onClick={() => setActiveView(AppView.EXPLORE)} />
          <NavItem icon="Insights" isActive={activeView === AppView.INSIGHTS} onClick={() => setActiveView(AppView.INSIGHTS)} />
          
          {/* OM Button (Create) */}
          <button 
            onClick={() => setActiveView(AppView.CREATE)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${activeView === AppView.CREATE ? 'bg-gold rotate-45' : 'bg-sage hover:scale-110'}`}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          </button>

          <NavItem icon="Mindset" isActive={activeView === AppView.MINDSET} onClick={() => setActiveView(AppView.MINDSET)} />
          <NavItem icon="Search" isActive={false} onClick={() => {}} />
        </div>
      </nav>

      {/* Modal - Debate Mode */}
      <AnimatePresence>
        {selectedForDebate && (
          <DebateMode 
            treeA={trees[0]} 
            treeB={selectedForDebate} 
            onClose={() => setSelectedForDebate(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem: React.FC<{ icon: string, isActive: boolean, onClick: () => void }> = ({ icon, isActive, onClick }) => {
  const icons: any = {
    Explore: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
    Insights: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    Mindset: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    Search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  };

  return (
    <button onClick={onClick} className={`flex flex-col items-center transition-all ${isActive ? 'text-gold scale-110' : 'text-cream opacity-50 hover:opacity-100'}`}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
    </button>
  );
};

export default App;
