import React from 'react';
import {
  Play,
  Flame,
  Award,
  Zap,
  Dumbbell,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { LESSONS } from '../../data/lessons';
import { SubjectId } from '../../types';

interface HomeViewProps {
  completedLessons: string[];
  streakDays: number;
  onSelectLesson: (lessonId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  completedLessons,
  streakDays,
  onSelectLesson,
  onNavigateTab,
}) => {
  const totalLessonsCount = LESSONS.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessonsCount) * 100);

  // Default continue lesson
  const nextLesson = LESSONS.find((l) => !completedLessons.includes(l.id)) || LESSONS[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-8 sm:p-10 text-white overflow-hidden border border-slate-800 shadow-2xl">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #2dd4bf 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>IBPS PO/Clerk · SBI PO · RBI Grade B</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-tight text-white">
            Master Quantitative Aptitude with Animated Filmstrips
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Convert static handbook pages into narrated video-style lessons. Watch the money bar split, brick walls fill unit-by-unit, and water cisterns balance net flow in real time.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue: {nextLesson.title.split('—')[0]}</span>
            </button>

            <button
              onClick={() => onNavigateTab('shortcuts')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span>15 Speed Tricks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Daily Streak KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Progress Ring Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
              Core Mastery
            </span>
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
              {completedCount} of {totalLessonsCount} Lessons
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {progressPercent}% foundational video modules cleared
            </p>
          </div>

          {/* Circular Progress Ring */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-teal-600 dark:text-teal-400 transition-all duration-1000"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold text-slate-900 dark:text-white">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-bold">
              Active Exam Streak
            </span>
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
              {streakDays} Days In A Row
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Consistency is key for SBI & IBPS prelims
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center text-amber-500 shrink-0">
            <Flame className="w-7 h-7 fill-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Continue Where You Left Off */}
        <div
          onClick={() => onSelectLesson(nextLesson.id)}
          className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-slate-900 border border-teal-200 dark:border-teal-900/50 shadow-sm flex items-center justify-between group hover:border-teal-400 transition-colors"
        >
          <div>
            <span className="text-xs font-mono text-teal-700 dark:text-teal-400 font-bold uppercase">
              Continue Learning
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 line-clamp-1 group-hover:text-teal-600 transition-colors">
              {nextLesson.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
              {nextLesson.subtitle}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-teal-600 group-hover:bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <Play className="w-4 h-4 fill-white" />
          </div>
        </div>
      </div>

      {/* Featured Subject Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
            Available Handbook Modules
          </h2>
          <span className="text-xs font-mono text-slate-500">
            2 Handbooks Attached · Interactive Video Lessons
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject 1: Ratio & Proportion */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  HANDBOOK 1
                </span>
                <span className="text-xs font-mono text-slate-500">
                  15 Chapters · 100 Questions
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Ratio & Proportion
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Beginner-friendly recipe hooks, the Unit-Box money sharing method, constant age gap invariant, partnership rectangular weights, and mixture alligations.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-mono text-slate-500">Core Signature Filmstrip:</div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Chapter 4: The Unit-Box Method
                    </div>
                    <div className="text-[11px] text-slate-500">₹450 in 4:5 → 9 boxes of ₹50</div>
                  </div>
                  <button
                    onClick={() => onSelectLesson('ratio-unit-box')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onNavigateTab('practice')}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>Practice 100 Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subject 2: Time & Work */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  HANDBOOK 2
                </span>
                <span className="text-xs font-mono text-slate-500">
                  12 Chapters · 100 Questions
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Time & Work
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The 30-brick wall painting picture, the LCM work-unit speed trick, cyclic alternate days, pipes & cisterns flow rates, and the 10-second leak formula.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-mono text-slate-500">Featured Signature Filmstrips:</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Ch 2: Two Workers & LCM
                      </div>
                      <div className="text-[11px] text-slate-500">A (15d) + B (10d) = 6 days</div>
                    </div>
                    <button
                      onClick={() => onSelectLesson('tw-two-workers-lcm')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Ch 8: Pipes & Cisterns
                      </div>
                      <div className="text-[11px] text-slate-500">Inlets (+), Outlets (−), Leaks</div>
                    </div>
                    <button
                      onClick={() => onSelectLesson('tw-pipes-cisterns')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onNavigateTab('practice')}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>Practice 100 Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigateTab('shortcuts')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 hover:shadow-md transition-all text-left space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
            Shortcut Lab
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All 15 speed tricks with interactive race mode.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('practice')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 hover:shadow-md transition-all text-left space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
            <Dumbbell className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
            Practice Arena
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Q1–Q30 Foundation & 25m Timed Revision Tests.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('error-log')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-400 hover:shadow-md transition-all text-left space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
            Error Log
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Trap pattern analytics & 20-min pre-exam routine.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('formulas')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:shadow-md transition-all text-left space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
            Formula Sheet
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Printable cheat sheet with all rules & 10 traps.
          </p>
        </button>
      </div>
    </div>
  );
};
