import React, { useState } from 'react';
import { Map, CheckCircle2, Play, ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { ROADMAP_PHASES, CHAPTERS } from '../../data/roadmap';
import { SubjectId } from '../../types';

interface RoadmapViewProps {
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  completedLessons,
  onSelectLesson,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('ratio-proportion');

  const phases = ROADMAP_PHASES[selectedSubject];
  const chapters = CHAPTERS.filter((c) => c.subjectId === selectedSubject);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
            <Map className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>STRUCTURED STUDY PLAN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Your 4-Phase Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Follow the exact handbook preparation timeline: Concepts → Applications → Practice → Test & Polish.
          </p>
        </div>

        {/* Subject Switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setSelectedSubject('ratio-proportion')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedSubject === 'ratio-proportion'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Ratio & Proportion
          </button>
          <button
            onClick={() => setSelectedSubject('time-work')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedSubject === 'time-work'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Time & Work
          </button>
        </div>
      </div>

      {/* 4 Phases Timeline Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {phases.map((ph) => (
          <div
            key={ph.phaseNum}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-mono font-bold text-xs flex items-center justify-center border border-teal-200 dark:border-teal-800">
                {ph.phaseNum}
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {ph.days}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {ph.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {ph.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              {ph.targetTopics.map((topic, i) => (
                <div key={i} className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chapters Breakdown per Subject */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
            Official Chapters & Interactive Filmstrips
          </h2>
          <span className="text-xs font-mono text-slate-500">
            {chapters.length} Chapters from Handbook
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {chapters.map((ch) => {
            const isCompleted = ch.lessonId ? completedLessons.includes(ch.lessonId) : false;

            return (
              <div
                key={ch.id}
                className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-slate-700 dark:text-slate-300 text-sm shrink-0">
                    {ch.chapterNum}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {ch.title}
                      </h3>
                      {ch.hasInteractiveLesson && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                          Animated Filmstrip
                        </span>
                      )}
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {ch.subtitle}
                    </p>
                  </div>
                </div>

                {ch.hasInteractiveLesson && ch.lessonId && (
                  <button
                    onClick={() => onSelectLesson(ch.lessonId!)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm transition-all whitespace-nowrap"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch Lesson</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
