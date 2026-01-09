
import React from 'react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="bg-[#1a2f23] text-cream -mx-6 px-6 pt-12 pb-24 rounded-b-[4rem] text-center">
        <div className="relative inline-block mb-6">
          <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" className="w-32 h-32 rounded-full border-4 border-gold shadow-2xl" />
          <div className="absolute -bottom-2 -right-2 bg-gold text-[#1a2f23] p-3 rounded-2xl shadow-lg">
            <div className="text-[10px] uppercase font-bold tracking-tighter leading-none">OM Rank</div>
            <div className="text-lg font-serif font-bold">Zenith</div>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold mb-1 italic">Kaelen Vance</h1>
        <p className="text-sm opacity-60 mb-6">@kaelen_logic • Logic Architect</p>
        
        <div className="flex justify-center gap-10">
          <div>
            <div className="text-3xl font-serif font-bold text-gold">1,402</div>
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Trees Built</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-gold">9.4k</div>
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Reasoning Rep</div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a2f2344] mb-6">The OM Score Breakdown</h3>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                        <span>Clarity of Conclusion</span>
                        <span className="text-sage">94%</span>
                    </div>
                    <div className="h-1 bg-[#fefaf0] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} className="h-full bg-sage" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                        <span>Evidence Weight</span>
                        <span className="text-gold">82%</span>
                    </div>
                    <div className="h-1 bg-[#fefaf0] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} className="h-full bg-gold" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                        <span>Steel-Manning Counters</span>
                        <span className="text-[#8c5e58]">98%</span>
                    </div>
                    <div className="h-1 bg-[#fefaf0] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="h-full bg-[#8c5e58]" />
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#1a2f2308]">
            <h3 className="font-serif text-xl italic mb-6">Recent Reasoning Threads</h3>
            {[1, 2].map((i) => (
                <div key={i} className="mb-6 pb-6 border-b border-[#1a2f230a] last:border-0 last:mb-0 last:pb-0">
                    <p className="text-sm font-serif italic mb-2">"Decentralized power grids are more resilient than nuclear for small-island nations."</p>
                    <div className="flex justify-between items-center text-[10px] font-bold opacity-40 uppercase">
                        <span>3 days ago</span>
                        <span>42 nodes • 1.2k debates</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
