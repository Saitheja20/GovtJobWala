import React, { useState } from 'react';
import { Sparkles, Trophy, AlertTriangle, Zap, CheckCircle2, BookOpen, X, ArrowRight } from 'lucide-react';
import { ADVANCED_MODULES } from '../../data/advanced';
import { AdvancedModule, SubjectId } from '../../types';

export const AdvancedModules: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'IBPS Prelims' | 'SBI/RBI Mains'>('all');
  const [activeModule, setActiveModule] = useState<AdvancedModule | null>(null);

  const filtered = ADVANCED_MODULES.filter((m) => {
    if (selectedSubject !== 'all' && m.subjectId !== selectedSubject) return false;
    if (selectedLevel !== 'all' && m.levelTag !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>BANK PO/CLERK MAINS EXCLUSIVES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Advanced Bank-Exam Topics & Novel Patterns
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Original high-yield topics beyond standard textbooks: Data Sufficiency, Quantity I vs II, Saboteur Builders, and Multi-Vessel Transfers.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            {['all', 'IBPS Prelims', 'SBI/RBI Mains'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl as any)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {lvl === 'all' ? 'All Tiers' : lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Advanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModule(item)}
            className="cursor-pointer p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500/60 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    item.levelTag === 'SBI/RBI Mains'
                      ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                      : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
                  }`}
                >
                  {item.levelTag}
                </span>

                <span className="text-xs text-slate-400 font-mono">
                  {item.subjectId === 'ratio-proportion' ? 'Ratio' : 'Time & Work'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {item.idea}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-teal-600 dark:text-teal-400 font-semibold">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-purple-500" />
                <span>Memory Hook & Solutions</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Modal for Selected Advanced Topic */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-800">
                    {activeModule.levelTag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeModule.subjectId === 'ratio-proportion' ? 'Ratio & Proportion' : 'Time & Work'}
                  </span>
                </div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  {activeModule.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModule(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Idea */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
                The Mathematical Concept
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeModule.idea}
              </p>
            </div>

            {/* Memory Hook */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MEMORY HOOK</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-200">
                {activeModule.memoryHook}
              </p>
            </div>

            {/* Shortcut & Trap row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 space-y-1.5">
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Exam Shortcut</span>
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {activeModule.shortcut}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 space-y-1.5">
                <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Critical Trap</span>
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {activeModule.trap}
                </p>
              </div>
            </div>

            {/* Worked Practice Example with Solution */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
                Bank PO Mains Practice Challenge
              </span>

              {activeModule.practiceQuestions.map((pq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {pq.question}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {pq.options.map((opt) => (
                      <div
                        key={opt}
                        className={`p-2 rounded-lg text-xs font-mono text-center border ${
                          opt === pq.answer
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500 font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300">
                    <strong className="text-teal-600 dark:text-teal-400">Step-by-Step Solution:</strong>{' '}
                    {pq.detailedSolution}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModule(null)}
              className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              Close Deep Dive
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
