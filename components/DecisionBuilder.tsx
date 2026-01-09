

import React, { useState } from 'react';
import { LogicNode, NodeType } from '../types';
import { motion } from 'framer-motion';
import LogicTreeVisualizer from './LogicTreeVisualizer';
import { gemini } from '../services/geminiService';

interface Props {
  onPublish: (conclusion: string, nodes: Record<string, LogicNode>) => void;
}

const DecisionBuilder: React.FC<Props> = ({ onPublish }) => {
  const [conclusion, setConclusion] = useState('');
  const [nodes, setNodes] = useState<Record<string, LogicNode>>({
    'root': { id: 'root', type: 'goal', content: '', children: [] }
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const addNode = (parentId: string, type: NodeType) => {
    const id = `n-${Date.now()}`;
    const newNode: LogicNode = { id, type, content: '', children: [], parentId };
    
    setNodes(prev => ({
      ...prev,
      [id]: newNode,
      [parentId]: { ...prev[parentId], children: [...prev[parentId].children, id] }
    }));
  };

  const updateNodeContent = (id: string, content: string) => {
    setNodes(prev => ({
      ...prev,
      [id]: { ...prev[id], content }
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await gemini.analyzeLogicTree(conclusion, nodes);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="pb-20">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold text-[#1a2f23] mb-2">Build Your Tree</h1>
        <p className="text-sm opacity-60">Structure your thoughts, find clarity.</p>
      </div>

      {/* Main Conclusion Input */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#1a2f2308] mb-8">
        <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">The Conclusion (Goal)</label>
        <textarea
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="What is your core conclusion?"
          className="w-full bg-transparent border-none focus:ring-0 text-xl font-serif font-bold italic resize-none h-20 placeholder-[#1a2f2322]"
        />
      </div>

      {/* Node Inputs */}
      <div className="space-y-4 mb-12">
        {/* Fix: Cast Object.values to LogicNode[] to prevent 'unknown' property access errors */}
        {(Object.values(nodes) as LogicNode[]).map(node => (
          <div key={node.id} className="bg-white rounded-2xl p-4 shadow-sm border-l-4" 
            style={{ 
                borderLeftColor: node.type === 'goal' ? '#1a2f23' : 
                                 node.type === 'logic' ? '#4a6741' : 
                                 node.type === 'counter' ? '#8c5e58' : '#c5a059'
            }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">{node.type}</span>
              {node.type !== 'evidence' && (
                <div className="flex gap-2">
                  <button onClick={() => addNode(node.id, 'logic')} className="text-[10px] font-bold text-sage">+ Logic</button>
                  <button onClick={() => addNode(node.id, 'counter')} className="text-[10px] font-bold text-[#8c5e58]">+ Counter</button>
                  <button onClick={() => addNode(node.id, 'evidence')} className="text-[10px] font-bold text-[#c5a059]">+ Evidence</button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={node.content}
              onChange={(e) => updateNodeContent(node.id, e.target.value)}
              placeholder={`Enter ${node.type}...`}
              className="w-full text-sm font-medium bg-transparent border-none focus:ring-0"
            />
          </div>
        ))}
      </div>

      {/* Preview Section */}
      {conclusion && (
        <div className="mb-12">
          <h3 className="text-center text-[10px] uppercase tracking-widest font-bold opacity-30 mb-6">Visual Preview</h3>
          <div className="bg-white rounded-3xl p-8 overflow-x-auto">
            <div className="min-w-fit flex justify-center">
              <LogicTreeVisualizer nodes={nodes} rootId="root" />
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis View */}
      {analysis && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1a2f23] text-cream rounded-3xl p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-serif text-xl italic">OM AI Reasoning Score</h4>
            <div className="text-4xl font-serif font-bold text-gold">{analysis.score}</div>
          </div>
          <p className="text-sm opacity-80 mb-6 italic">"{analysis.critique}"</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-sage mb-2">Strengths</div>
              {analysis.strengths?.map((s: string, i: number) => <div key={i} className="text-[11px] mb-1">• {s}</div>)}
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#8c5e58] mb-2">Refinements</div>
              {analysis.weaknesses?.map((w: string, i: number) => <div key={i} className="text-[11px] mb-1">• {w}</div>)}
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-4 sticky bottom-4">
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !conclusion}
          className="flex-1 bg-white border border-[#1a2f23] text-[#1a2f23] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#1a2f2311] transition-all disabled:opacity-30"
        >
          {isAnalyzing ? 'Analyzing...' : 'AI Logic Review'}
        </button>
        <button 
          onClick={() => onPublish(conclusion, nodes)}
          className="flex-1 bg-[#1a2f23] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-sage shadow-xl transition-all"
        >
          Publish Tree
        </button>
      </div>
    </div>
  );
};

export default DecisionBuilder;
