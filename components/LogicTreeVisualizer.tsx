
import React, { useState } from 'react';
import { LogicNode, NodeType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  nodes: Record<string, LogicNode>;
  rootId: string;
  depth?: number;
}

const nodeColors: Record<NodeType, string> = {
  goal: 'bg-[#1a2f23] text-[#fefaf0]',
  logic: 'bg-[#4a6741] text-[#fefaf0]',
  counter: 'bg-[#8c5e58] text-[#fefaf0]',
  evidence: 'bg-[#c5a059] text-[#1a2f23]'
};

const LogicTreeVisualizer: React.FC<Props> = ({ nodes, rootId, depth = 0 }) => {
  const node = nodes[rootId];
  const [isExpanded, setIsExpanded] = useState(true);

  if (!node) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative z-10 px-4 py-3 rounded-xl shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95 ${nodeColors[node.type]} border border-[#1a2f2311]`}
        style={{ maxWidth: '240px' }}
      >
        <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">{node.type}</div>
        <div className="text-sm font-medium leading-tight">{node.content}</div>
        {node.children.length > 0 && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fefaf0] border border-[#1a2f2333] rounded-full w-4 h-4 flex items-center justify-center">
            <span className="text-[10px] text-[#1a2f23] font-bold">{isExpanded ? '−' : '+'}</span>
          </div>
        )}
      </motion.div>

      {/* Children Container */}
      <AnimatePresence>
        {isExpanded && node.children.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center mt-6 w-full"
          >
            {/* Connection Line Container */}
            <div className="relative w-full flex justify-center h-4">
               {/* Vertical line from parent */}
               <div className="absolute top-[-24px] w-[1px] h-[24px] bg-[#1a2f2333]"></div>
               
               {/* Horizontal branch line */}
               {node.children.length > 1 && (
                 <div className="absolute top-0 h-[1px] bg-[#1a2f2333]" 
                    style={{ 
                      width: `calc(100% - ${100 / node.children.length}%)`,
                      left: `${50 / node.children.length}%`,
                      right: `${50 / node.children.length}%`
                    }}
                 ></div>
               )}
            </div>

            <div className="flex gap-4 w-full justify-center">
              {node.children.map((childId) => (
                <div key={childId} className="flex flex-col items-center pt-4 relative">
                  {/* Vertical line to child */}
                  <div className="absolute top-0 w-[1px] h-4 bg-[#1a2f2333]"></div>
                  <LogicTreeVisualizer nodes={nodes} rootId={childId} depth={depth + 1} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogicTreeVisualizer;
