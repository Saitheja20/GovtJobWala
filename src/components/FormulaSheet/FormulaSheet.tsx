import React, { useState } from 'react';
import { Printer, Search, FileText, AlertTriangle, Check, BookOpen } from 'lucide-react';
import { FORMULAS, COMMON_TRAPS } from '../../data/formulas';
import { SubjectId } from '../../types';

export const FormulaSheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>('all');
  const [activeTab, setActiveTab] = useState<'formulas' | 'traps'>('formulas');

  const filteredFormulas = FORMULAS.filter((f) => {
    if (selectedSubject !== 'all' && f.subject !== selectedSubject) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      f.topic.toLowerCase().includes(query) ||
      f.subtopic.toLowerCase().includes(query) ||
      f.formula.toLowerCase().includes(query) ||
      f.explanation.toLowerCase().includes(query)
    );
  });

  const filteredTraps = COMMON_TRAPS.filter((t) => {
    if (selectedSubject !== 'all' && t.subject !== selectedSubject) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return t.trap.toLowerCase().includes(query) || t.fix.toLowerCase().includes(query);
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header and Print action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>OFFICIAL EXAM REVISION CHEAT SHEET</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Master Formula Sheet & Common Exam Traps
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tear-out reference from both handbooks. Printable on A4 paper or searchable on desktop & mobile.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print Formula Sheet</span>
        </button>
      </div>

      {/* Filter and Search Bar (no-print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2">
          {/* Sub-tabs: Formulas vs Traps */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'formulas'
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Master Formulas ({FORMULAS.length})
            </button>
            <button
              onClick={() => setActiveTab('traps')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'traps'
                  ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              The 10 Exam Traps ({COMMON_TRAPS.length})
            </button>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-1 text-xs">
            {['all', 'ratio-proportion', 'time-work'].map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj as any)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                  selectedSubject === subj
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-300 dark:border-teal-800'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {subj === 'all' ? 'All Subjects' : subj === 'ratio-proportion' ? 'Ratio' : 'Time & Work'}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search formulas or rules..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Formulas Content Grid */}
      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                    {item.subtopic}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {item.topic}
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.subject === 'ratio-proportion' ? 'Ratio' : 'Time & Work'}
                </span>
              </div>

              {/* Highlighted Formula Block */}
              <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono text-xs sm:text-sm font-bold text-teal-900 dark:text-teal-200">
                {item.formula}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.explanation}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <strong>Worked Proof:</strong> {item.example}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Traps Table Content */}
      {activeTab === 'traps' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-300">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 w-1/2">The Common Trap</th>
                  <th className="py-3 px-4">The Exact Fix & Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTraps.map((trap) => (
                  <tr key={trap.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-center font-mono font-bold text-red-500">
                      {trap.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-red-950 dark:text-red-200">
                      {trap.trap}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                      {trap.fix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
