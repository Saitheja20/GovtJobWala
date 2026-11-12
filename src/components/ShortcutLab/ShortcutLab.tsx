import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Clock, ArrowRight, Play, RotateCcw, CheckCircle2, Trophy, Flame } from 'lucide-react';
import { RATIO_SHORTCUTS, TIME_WORK_SHORTCUTS } from '../../data/shortcuts';
import { SpeedTrick, SubjectId } from '../../types';

export const ShortcutLab: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('ratio-proportion');
  const [activeTrickId, setActiveTrickId] = useState<number>(1);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Race Mode State
  const [isRacing, setIsRacing] = useState<boolean>(false);
  const [raceElapsedSec, setRaceElapsedSec] = useState<number>(0);
  const [raceWinner, setRaceWinner] = useState<'shortcut' | 'long' | null>(null);

  const shortcuts = selectedSubject === 'ratio-proportion' ? RATIO_SHORTCUTS : TIME_WORK_SHORTCUTS;
  const currentTrick = shortcuts.find((s) => s.id === activeTrickId) || shortcuts[0];

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Race simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRacing) {
      interval = setInterval(() => {
        setRaceElapsedSec((prev) => {
          const next = prev + 1;
          if (next >= currentTrick.shortcutWay.timeSeconds && !raceWinner) {
            setRaceWinner('shortcut');
          }
          if (next >= currentTrick.longWay.timeSeconds) {
            setIsRacing(false);
          }
          return next;
        });
      }, 300); // 3x speed for rapid engaging interactive demo
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRacing, currentTrick, raceWinner]);

  const startRace = () => {
    setRaceElapsedSec(0);
    setRaceWinner(null);
    setIsRacing(true);
  };

  const resetRace = () => {
    setIsRacing(false);
    setRaceElapsedSec(0);
    setRaceWinner(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>EXAM SPEED DRILLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Shortcut Lab — 15 Master Speed Tricks
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tear this out and stick it on your wall. Solve 45 seconds faster per question in IBPS & SBI Prelims.
          </p>
        </div>

        {/* Subject Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => {
              setSelectedSubject('ratio-proportion');
              setActiveTrickId(1);
              resetRace();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedSubject === 'ratio-proportion'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Ratio & Proportion (15 Tricks)
          </button>
          <button
            onClick={() => {
              setSelectedSubject('time-work');
              setActiveTrickId(101);
              resetRace();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedSubject === 'time-work'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Time & Work (15 Tricks)
          </button>
        </div>
      </div>

      {/* Featured Interactive 20-Second Race Mode Arena */}
      <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                Trick #{currentTrick.number}: {currentTrick.title}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Race Mode: Traditional Algebra vs. 10-Second Shortcut
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isRacing ? (
              <button
                onClick={startRace}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Race</span>
              </button>
            ) : (
              <button
                onClick={resetRace}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Problem Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sm">
          <span className="text-xs font-mono text-slate-400 block mb-1">CHALLENGE QUESTION</span>
          <p className="font-semibold text-slate-200">{currentTrick.exampleProblem}</p>
        </div>

        {/* Dual Lane Track: Left Traditional vs Right Shortcut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Lane 1: The Long Traditional Way */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-red-400 font-bold">
                  TRADITIONAL ALGEBRA WAY
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{currentTrick.longWay.timeSeconds} seconds
                </span>
              </div>

              {/* Steps list */}
              <div className="space-y-2 text-xs text-slate-300 font-mono">
                {currentTrick.longWay.steps.map((step, idx) => {
                  const isPassed = raceElapsedSec > (idx + 1) * (currentTrick.longWay.timeSeconds / currentTrick.longWay.steps.length);
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded transition-colors ${
                        isPassed ? 'bg-red-950/40 border border-red-500/30 text-red-200' : 'bg-slate-950 text-slate-500'
                      }`}
                    >
                      {idx + 1}. {step}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time progress bar */}
            <div className="space-y-1 pt-3 border-t border-slate-800">
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (raceElapsedSec / currentTrick.longWay.timeSeconds) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-[11px] font-mono text-slate-500 text-right">
                Pace: Slow & error-prone under time pressure
              </div>
            </div>
          </div>

          {/* Lane 2: The Academy Speed Trick */}
          <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-500/40 flex flex-col justify-between space-y-4 relative">
            {raceWinner === 'shortcut' && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1 animate-pulse">
                <Trophy className="w-3.5 h-3.5" />
                <span>SOLVED IN {currentTrick.shortcutWay.timeSeconds}s!</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                <span className="text-xs font-mono text-purple-300 font-bold">
                  ACADEMY 10-SECOND SHORTCUT
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{currentTrick.shortcutWay.timeSeconds} seconds
                </span>
              </div>

              {/* Steps list */}
              <div className="space-y-2 text-xs font-mono">
                {currentTrick.shortcutWay.steps.map((step, idx) => {
                  const isPassed = raceElapsedSec > (idx + 1) * (currentTrick.shortcutWay.timeSeconds / currentTrick.shortcutWay.steps.length);
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded transition-colors ${
                        isPassed ? 'bg-purple-900/60 border border-purple-400 text-white font-semibold' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      ✓ {step}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time progress bar */}
            <div className="space-y-1 pt-3 border-t border-purple-500/30">
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (raceElapsedSec / currentTrick.shortcutWay.timeSeconds) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-purple-300">
                <span>Time Saved: {currentTrick.longWay.timeSeconds - currentTrick.shortcutWay.timeSeconds} seconds (80% faster)</span>
                <span className="text-emerald-400 font-bold">Answer: {currentTrick.answer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All 15 Speed Tricks as 3D Interactive Flip Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
            All 15 Flip Cards (Tap Card to Reveal Formula)
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Click any card to inspect or test in Race Mode above
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortcuts.map((trick) => {
            const isFlipped = flippedCards[trick.id];
            const isSelected = activeTrickId === trick.id;

            return (
              <div
                key={trick.id}
                onClick={() => {
                  toggleFlip(trick.id);
                  setActiveTrickId(trick.id);
                  resetRace();
                }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 select-none ${
                  isSelected
                    ? 'ring-2 ring-purple-500 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {!isFlipped ? (
                  /* Front side */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                        Trick #{trick.number}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Tap to flip ↺</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {trick.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                      {trick.statement}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-semibold">
                      <span>When to use: {trick.whenToUse}</span>
                    </div>
                  </div>
                ) : (
                  /* Back side (Formula & Demo) */
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        Formula & Rule
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Tap to flip ↺</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 text-teal-300 font-mono text-xs font-bold">
                      {trick.formula}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <strong>Exam Demo:</strong> {trick.exampleProblem}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono">Answer: {trick.answer}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Save {trick.longWay.timeSeconds - trick.shortcutWay.timeSeconds}s
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
