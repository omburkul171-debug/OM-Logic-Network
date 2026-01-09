
import React from 'react';
import { motion } from 'framer-motion';

const Insights: React.FC = () => {
  const stats = [
    { label: 'Avg Depth', value: '4.2', desc: 'Layers of reasoning' },
    { label: 'Commonality', value: '72%', desc: 'Agreement with others' },
    { label: 'Consistency', value: '88/100', desc: 'Logical flow score' },
    { label: 'Nodes Created', value: '1,402', desc: 'Total contributions' },
  ];

  return (
    <div className="pb-20">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold text-[#1a2f23] mb-2">Network Insights</h1>
        <p className="text-sm opacity-60">Quantifying the depth of collective intelligence.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-[#1a2f2308] shadow-sm text-center"
          >
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-2">{s.label}</div>
            <div className="text-3xl font-serif font-bold text-[#1a2f23] mb-1">{s.value}</div>
            <div className="text-[10px] opacity-60 leading-tight">{s.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#1a2f23] text-cream rounded-[2rem] p-8 mb-8">
        <h3 className="font-serif text-xl italic mb-6">Cognitive Map Expansion</h3>
        <div className="h-48 flex items-end gap-3 px-4">
          {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
            <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-sage rounded-t-lg opacity-80"
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#1a2f2308]">
        <h3 className="font-serif text-xl italic mb-4">Trending Reasoning Topics</h3>
        <div className="flex flex-wrap gap-2">
            {['Algorithmic Governance', 'Neuro-Rights', 'Sustainable Fusion', 'Post-Scarcity Ethics', 'Longevity Policy'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-[#fefaf0] border border-[#1a2f2311] rounded-full text-xs font-medium text-[#1a2f23]">
                    #{tag}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
