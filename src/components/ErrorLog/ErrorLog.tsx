import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Trash2,
  BookOpen,
  PieChart,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { ErrorLogEntry } from '../../types';

interface ErrorLogProps {
  entries: ErrorLogEntry[];
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
  onNavigateToPractice: () => void;
}

export const ErrorLog: React.FC<ErrorLogProps> = ({
  entries,
  onRemoveEntry,
  onClearAll,
  onNavigateToPractice,
}) => {
  const [filterCause, setFilterCause] = useState<string>('all');

  // 20-Minute Revision Routine Timer
  const [activeRoutineStage, setActiveRoutineStage] = useState<number>(0);
  const [routineTimerSec, setRoutineTimerSec] = useState<number>(20 * 60);
  const [isRoutineRunning, setIsRoutineRunning] = useState<boolean>(false);

  // 5 Routine Stages from PDF Page 21 & Page 18
  const routineStages = [
    {
      range: '0–4 min',
      title: 'Read Master Shortcut Sheet Aloud',
      desc: 'Read the 15 speed tricks aloud to activate auditory memory hooks and formula reflexes.',
      durationSec: 4 * 60,
    },
    {
      range: '4–8 min',
      title: 'Re-Read the 10 Traps & Self-Audit',
      desc: 'Re-read the 10 exam traps. Tick the ones you have personally fallen into during practice.',
      durationSec: 4 * 60,
    },
    {
      range: '8–14 min',
      title: 'Solve 4 Questions from Error-Log (No Notes!)',
      desc: 'Pick 4 logged mistake questions and solve them on paper with closed notes.',
      durationSec: 6 * 60,
    },
    {
      range: '14–18 min',
      title: 'Rewrite Master Formula Sheet from Memory',
      desc: 'Take a blank paper and write all core equations from scratch (Unit-box, ab/(a+b), MDH, Alligation).',
      durationSec: 4 * 60,
    },
    {
      range: '18–20 min',
      title: 'Deep Breath & Pick 1 Target Trap',
      desc: 'Take slow deep breaths. Choose exactly one trap to watch like a hawk during the upcoming exam.',
      durationSec: 2 * 60,
    },
  ];

  // Routine countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRoutineRunning && routineTimerSec > 0) {
      timer = setInterval(() => {
        setRoutineTimerSec((prev) => {
          if (prev <= 1) {
            setIsRoutineRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRoutineRunning, routineTimerSec]);

  // Pattern analytics
  const trapCount = entries.filter((e) => e.cause === 'trap').length;
  const slipCount = entries.filter((e) => e.cause === 'slip').length;
  const conceptCount = entries.filter((e) => e.cause === 'concept').length;

  const filteredEntries = entries.filter((e) => {
    if (filterCause === 'all') return true;
    return e.cause === filterCause;
  });

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>STUDENT ERROR-LOG TEMPLATE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Personal Mistake Log & Pattern Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            After every practice session, log each mistake — patterns appear fast. Turn slips into exam instincts.
          </p>
        </div>

        {entries.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      {/* Analytics Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Total Recorded Slips</div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {entries.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-red-500 font-mono">Exam Traps ({trapCount})</div>
          <div className="text-2xl font-bold font-display text-red-600 dark:text-red-400 mt-1">
            {entries.length > 0 ? `${Math.round((trapCount / entries.length) * 100)}%` : '0%'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Fell into trick wording</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-amber-500 font-mono">Calculation Slips ({slipCount})</div>
          <div className="text-2xl font-bold font-display text-amber-600 dark:text-amber-400 mt-1">
            {entries.length > 0 ? `${Math.round((slipCount / entries.length) * 100)}%` : '0%'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Speed/arithmetic mistakes</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs text-purple-500 font-mono">Concept Gaps ({conceptCount})</div>
          <div className="text-2xl font-bold font-display text-purple-600 dark:text-purple-400 mt-1">
            {entries.length > 0 ? `${Math.round((conceptCount / entries.length) * 100)}%` : '0%'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Need lesson review</div>
        </div>
      </div>

      {/* The 20-Minute Pre-Exam Revision Routine Interactive Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal-950/70 to-slate-900 border border-teal-500/40 text-white space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>HANDBOOK EXCLUSIVE PROTOCOL</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
              20-Minute Pre-Exam Revision Routine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Follow these exact 5 timed steps 24 hours before your actual IBPS/SBI exam to solidify retention.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 font-mono text-lg font-bold text-teal-300">
              {formatTimer(routineTimerSec)}
            </div>
            {!isRoutineRunning ? (
              <button
                onClick={() => setIsRoutineRunning(true)}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Routine</span>
              </button>
            ) : (
              <button
                onClick={() => setIsRoutineRunning(false)}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsRoutineRunning(false);
                setRoutineTimerSec(20 * 60);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Reset 20m timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {routineStages.map((stg, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                activeRoutineStage === idx
                  ? 'bg-teal-900/50 border-teal-400 text-white ring-2 ring-teal-500/30'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
              onClick={() => setActiveRoutineStage(idx)}
            >
              <span className="text-[11px] font-mono font-bold text-teal-400 block mb-1">
                {stg.range}
              </span>
              <div className="text-xs font-bold text-slate-200 leading-tight mb-1">
                {stg.title}
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                {stg.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logged Mistakes Table / Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Mistake Registry ({filteredEntries.length})
            </h2>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              {['all', 'trap', 'slip', 'concept'].map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterCause(c)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    filterCause === c
                      ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onNavigateToPractice}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>Practice More Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredEntries.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-teal-600 dark:text-teal-400">
                        Q#{entry.questionId}
                      </span>
                      <span>·</span>
                      <span className="text-slate-500">{entry.topic}</span>
                      <span>·</span>
                      <span
                        className={`capitalize font-bold ${
                          entry.cause === 'trap'
                            ? 'text-red-500'
                            : entry.cause === 'slip'
                            ? 'text-amber-500'
                            : 'text-purple-500'
                        }`}
                      >
                        Cause: {entry.cause}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                      {entry.questionText}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveEntry(entry.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Remove entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300">
                    <span className="font-bold block text-[10px] text-red-500">YOUR ANSWER:</span>
                    {entry.userAnswer}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold block text-[10px] text-emerald-500">RIGHT ANSWER:</span>
                    {entry.rightAnswer}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-teal-600 dark:text-teal-400 font-mono">Strategy Fix:</strong>{' '}
                  {entry.fixNote}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <div className="font-semibold text-slate-700 dark:text-slate-300">
              Your Error Log is Clean!
            </div>
            <p className="text-xs">
              When solving questions in the Practice Arena, tap &quot;I got this wrong&quot; to log traps and track patterns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
