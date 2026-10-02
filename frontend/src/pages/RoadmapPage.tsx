import React from 'react';
import { Check } from 'lucide-react';
import { UserAccount } from '../lib/authStore';

interface RoadmapNode {
  step: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'not-started';
  progressText?: string;
}

interface RoadmapPageProps {
  user?: UserAccount;
  onSelectStep?: (title: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ user, onSelectStep }) => {
  const solved = user?.problemsSolved || 0;

  const roadmapSteps: RoadmapNode[] = [
    {
      step: '1',
      title: '1. Programming Basics',
      subtitle: 'Variables, Data Types, Operators',
      status: solved >= 3 ? 'completed' : 'in-progress',
      progressText: solved >= 3 ? '100%' : `${Math.round((solved / 3) * 100)}%`
    },
    {
      step: '2',
      title: '2. Control Flow',
      subtitle: 'Conditionals, Loops, Functions',
      status: solved >= 6 ? 'completed' : solved >= 3 ? 'in-progress' : 'not-started',
      progressText: solved >= 6 ? '100%' : solved >= 3 ? `${Math.round(((solved - 3) / 3) * 100)}%` : '0%'
    },
    {
      step: '3',
      title: '3. Data Structures',
      subtitle: 'Arrays, Strings, Linked Lists, Stacks',
      status: solved >= 12 ? 'completed' : solved >= 6 ? 'in-progress' : 'not-started',
      progressText: solved >= 12 ? '100%' : solved >= 6 ? `${Math.round(((solved - 6) / 6) * 100)}%` : '0%'
    },
    {
      step: '4',
      title: '4. Algorithms',
      subtitle: 'Sorting, Searching, Two Pointers, Trees',
      status: solved >= 18 ? 'completed' : solved >= 12 ? 'in-progress' : 'not-started',
      progressText: solved >= 18 ? '100%' : solved >= 12 ? `${Math.round(((solved - 12) / 6) * 100)}%` : '0%'
    },
    {
      step: '5',
      title: '5. Advanced Topics',
      subtitle: 'Dynamic Programming, Graphs, System Design',
      status: solved >= 22 ? 'completed' : solved >= 18 ? 'in-progress' : 'not-started',
      progressText: solved >= 22 ? '100%' : solved >= 18 ? `${Math.round(((solved - 18) / 4) * 100)}%` : '0%'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-sm font-bold text-white mb-1">Developer Learning Roadmap</h2>
        <p className="text-xs text-slate-400">
          Master computer science foundations sequentially. Tracked for <span className="text-purple-300 font-semibold">@{user?.username || 'developer'}</span> ({solved} problems solved).
        </p>
      </div>

      {/* Vertical Timeline matching Collage Screen 9 */}
      <div className="relative pl-6 sm:pl-10 space-y-6 max-w-2xl">
        
        {/* Connecting Vertical Track Line */}
        <div className="absolute left-[38px] sm:left-[54px] top-6 bottom-6 w-0.5 bg-[#232f48]" />

        {roadmapSteps.map((step) => {
          return (
            <div
              key={step.step}
              onClick={() => onSelectStep && onSelectStep(step.title)}
              className="relative flex items-center gap-4 sm:gap-6 group cursor-pointer"
            >
              
              {/* Circular Node Status Badge matching collage */}
              <div className="relative z-10 shrink-0">
                {step.status === 'completed' && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {step.status === 'in-progress' && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1733] border-2 border-purple-500 text-purple-300 font-mono text-xs font-bold flex items-center justify-center shadow-lg shadow-purple-500/40">
                    {step.progressText}
                  </div>
                )}

                {step.status === 'not-started' && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#121724] border-2 border-[#232f48] text-slate-500 font-mono text-xs font-medium flex items-center justify-center">
                    {step.progressText}
                  </div>
                )}
              </div>

              {/* Step Card Content */}
              <div className="flex-1 bg-[#121724] border border-[#1c2438] hover:border-purple-500/40 rounded-2xl p-4 sm:p-5 transition shadow-lg flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {step.subtitle}
                  </p>
                </div>

                {/* Right Status Indicator */}
                <div className="shrink-0 pl-3">
                  {step.status === 'completed' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                  {step.status === 'in-progress' && (
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {step.progressText}
                    </span>
                  )}
                  {step.status === 'not-started' && (
                    <span className="text-xs font-mono text-slate-600">
                      0%
                    </span>
                  )}
                </div>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};
