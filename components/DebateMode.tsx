
import React, { useState, useEffect } from 'react';
import { LogicTree } from '../types';
import LogicTreeVisualizer from './LogicTreeVisualizer';
import { gemini } from '../services/geminiService';
import { motion } from 'framer-motion';

interface Props {
  treeA: LogicTree;
  treeB: LogicTree;
  onClose: () => void;
}

const DebateMode: React.FC<Props> = ({ treeA, treeB, onClose }) => {
  const [commonGround, setCommonGround] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommonGround = async () => {
      setIsLoading(true);
      const result = await gemini.findCommonGround(treeA, treeB);
      setCommonGround(result);
      setIsLoading(false);
    };
    fetchCommonGround();
  }, [treeA, treeB]);

  return (
    <div className="fixed inset-0 bg-[#fefaf0] z-50 overflow-y-auto pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={onClose} className="p-2 hover:bg-[#1a2f2311] rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-2xl font-serif font-bold text-[#1a2f23]">Logic Comparison</h2>
          <div className="w-10"></div>
        </div>

        {/* Split Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Tree A */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <img src={treeA.author.avatar} className="w-8 h-8 rounded-full" alt="" />
                <span className="text-sm font-bold">{treeA.author.name}</span>
             </div>
             <p className="font-serif italic text-lg mb-8">"{treeA.conclusion}"</p>
             <div className="overflow-x-auto pb-4">
                <div className="min-w-fit">
                    <LogicTreeVisualizer nodes={treeA.nodes} rootId={treeA.rootId} />
                </div>
             </div>
          </div>

          {/* Tree B */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-sage">
             <div className="flex items-center gap-3 mb-4">
                <img src={treeB.author.avatar} className="w-8 h-8 rounded-full" alt="" />
                <span className="text-sm font-bold">{treeB.author.name}</span>
             </div>
             <p className="font-serif italic text-lg mb-8">"{treeB.conclusion}"</p>
             <div className="overflow-x-auto pb-4">
                <div className="min-w-fit">
                    <LogicTreeVisualizer nodes={treeB.nodes} rootId={treeB.rootId} />
                </div>
             </div>
          </div>
        </div>

        {/* Common Ground Panel */}
        <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#1a2f23] text-[#fefaf0] rounded-[2rem] p-10 shadow-2xl"
        >
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-sage rounded-full mb-4"></div>
                <p className="font-serif italic text-xl">Mining logic for Common Ground...</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-cream opacity-20"></div>
                <h3 className="font-serif text-3xl italic">The Common Ground</h3>
                <div className="h-[1px] flex-1 bg-cream opacity-20"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold mb-6">Shared Principles</h4>
                  <ul className="space-y-4">
                    {commonGround?.sharedPrinciples?.map((p: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span className="text-sage">✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-sage mb-6">AI Synthesis</h4>
                  <p className="text-lg font-serif italic leading-relaxed opacity-90">
                    {commonGround?.synthesis}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-gold text-[#1a2f23] px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl">
                  Accept Synthesis as New Node
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DebateMode;
