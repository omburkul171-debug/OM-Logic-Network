
import React from 'react';
import { LogicTree, AppView } from '../types';
import LogicTreeVisualizer from './LogicTreeVisualizer';
import { motion } from 'framer-motion';

interface Props {
  tree: LogicTree;
  onDebate: (tree: LogicTree) => void;
}

const LogicCard: React.FC<Props> = ({ tree, onDebate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-[#1a2f2308] mb-6 overflow-hidden"
    >
      {/* Author Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={tree.author.avatar} alt={tree.author.name} className="w-10 h-10 rounded-full bg-cream p-1" />
          <div>
            <div className="font-bold text-sm">{tree.author.name}</div>
            <div className="text-xs opacity-60">{tree.author.handle}</div>
          </div>
        </div>
        <div className="bg-[#1a2f2311] px-3 py-1 rounded-full flex flex-col items-end">
          <span className="text-[10px] uppercase font-bold tracking-tighter opacity-50">OM Score</span>
          <span className="text-sm font-serif font-bold text-[#1a2f23]">{tree.author.omScore}</span>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mb-8">
        <h2 className="text-xl font-serif font-bold text-[#1a2f23] leading-tight italic">
          "{tree.conclusion}"
        </h2>
      </div>

      {/* Tree Visualizer */}
      <div className="py-8 bg-[#fefaf044] rounded-2xl overflow-x-auto">
        <div className="min-w-fit px-8">
          <LogicTreeVisualizer nodes={tree.nodes} rootId={tree.rootId} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t border-[#1a2f230a] flex items-center justify-between">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-xs font-bold text-[#1a2f2388] hover:text-[#1a2f23]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {tree.likes}
          </button>
          <button className="flex items-center gap-2 text-xs font-bold text-[#1a2f2388] hover:text-[#1a2f23]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            {tree.debates}
          </button>
        </div>
        <button 
          onClick={() => onDebate(tree)}
          className="bg-[#1a2f23] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-sage transition-colors"
        >
          Enter Debate
        </button>
      </div>
    </motion.div>
  );
};

export default LogicCard;
