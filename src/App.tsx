import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/Home/HomeView';
import { RoadmapView } from './components/Roadmap/RoadmapView';
import { LessonPlayer } from './components/Player/LessonPlayer';
import { ShortcutLab } from './components/ShortcutLab/ShortcutLab';
import { PracticeArena } from './components/PracticeArena/PracticeArena';
import { ErrorLog } from './components/ErrorLog/ErrorLog';
import { FormulaSheet } from './components/FormulaSheet/FormulaSheet';
import { AdvancedModules } from './components/AdvancedModules/AdvancedModules';
import { AskGeminiDrawer } from './components/AskGeminiDrawer';
import { LESSONS } from './data/lessons';
import { ErrorLogEntry } from './types';
import { Play, BookOpen, Clock, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Theme State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bankexam_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return localStorage.getItem('bankexam_muted') === 'true';
  });

  // Persistent User Progress
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bankexam_completed_lessons');
      return saved ? JSON.parse(saved) : ['ratio-unit-box']; // Seed with first completed for preview
    } catch {
      return ['ratio-unit-box'];
    }
  });

  const [errorLog, setErrorLog] = useState<ErrorLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bankexam_error_log');
      if (saved) return JSON.parse(saved);
      // Seed initial sample mistake from handbook for immediate analytics
      return [
        {
          id: 'seed-1',
          questionId: 2,
          subjectId: 'ratio-proportion',
          topic: 'Ratio - Foundation',
          questionText: 'Find the ratio of 80 cm to 2.4 m.',
          userAnswer: '300 : 1',
          rightAnswer: '1 : 3',
          cause: 'trap',
          trapNumber: 2,
          fixNote: 'Convert to smaller unit first: 2.4 m = 240 cm → 80 : 240 = 1 : 3.',
          timestamp: Date.now() - 3600000,
        },
      ];
    } catch {
      return [];
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('bankexam_streak');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Gemini Side Panel State
  const [isGeminiOpen, setIsGeminiOpen] = useState<boolean>(false);
  const [geminiContext, setGeminiContext] = useState<{ topic: string; context: string }>({
    topic: 'Quantitative Aptitude',
    context: '',
  });

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('bankexam_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bankexam_theme', 'light');
    }
  }, [isDark]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('bankexam_muted', String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('bankexam_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('bankexam_error_log', JSON.stringify(errorLog));
  }, [errorLog]);

  // Check query params for autostart
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setActiveTab('lessons');
      setActiveLessonId('ratio-unit-box');
    }
  }, []);

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const handleLogMistake = (entryData: Omit<ErrorLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: ErrorLogEntry = {
      ...entryData,
      id: `err-${Date.now()}`,
      timestamp: Date.now(),
    };
    setErrorLog((prev) => [newEntry, ...prev]);
  };

  const handleRemoveErrorEntry = (id: string) => {
    setErrorLog((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllErrors = () => {
    setErrorLog([]);
  };

  const handleOpenGeminiWithContext = (topic: string, context: string) => {
    setGeminiContext({ topic, context });
    setIsGeminiOpen(true);
  };

  // Find active lesson object
  const currentLesson = LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'lessons') {
            setActiveLessonId(null);
          }
        }}
        isDark={isDark}
        setIsDark={setIsDark}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenGemini={() => {
          setGeminiContext({
            topic: 'Quantitative Aptitude',
            context: 'General Bank Exam preparation doubt',
          });
          setIsGeminiOpen(true);
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <HomeView
            completedLessons={completedLessons}
            streakDays={streakDays}
            onSelectLesson={(lessonId) => {
              setActiveLessonId(lessonId);
              setActiveTab('lessons');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* TAB 2: LESSONS (Video-style Player) */}
        {activeTab === 'lessons' && (
          <div>
            {activeLessonId ? (
              <LessonPlayer
                lesson={currentLesson}
                onLessonComplete={handleLessonComplete}
                onOpenGeminiWithContext={handleOpenGeminiWithContext}
                onBackToLessons={() => setActiveLessonId(null)}
              />
            ) : (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                    <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>INTERACTIVE FILMSTRIP DIRECTORY</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    Select an Animated Lesson
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Each lesson plays like a narrated video with synced captions, dynamic visual physics, and Pause & Predict checkpoints.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {LESSONS.map((les) => {
                    const isDone = completedLessons.includes(les.id);
                    return (
                      <div
                        key={les.id}
                        onClick={() => setActiveLessonId(les.id)}
                        className="cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800">
                              Chapter {les.chapterNum}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {les.scenes.length} Scenes
                            </span>
                          </div>

                          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                            {les.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {les.subtitle}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-500">
                            ~{les.durationMin} mins
                          </span>

                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white font-semibold text-xs group-hover:bg-teal-500 shadow-sm transition-colors">
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>{isDone ? 'Replay' : 'Start'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ROADMAP */}
        {activeTab === 'roadmap' && (
          <RoadmapView
            completedLessons={completedLessons}
            onSelectLesson={(lessonId) => {
              setActiveLessonId(lessonId);
              setActiveTab('lessons');
            }}
          />
        )}

        {/* TAB 4: SHORTCUT LAB */}
        {activeTab === 'shortcuts' && <ShortcutLab />}

        {/* TAB 5: PRACTICE ARENA */}
        {activeTab === 'practice' && (
          <PracticeArena
            onLogMistake={handleLogMistake}
            onOpenGeminiWithContext={handleOpenGeminiWithContext}
          />
        )}

        {/* TAB 6: ERROR LOG */}
        {activeTab === 'error-log' && (
          <ErrorLog
            entries={errorLog}
            onRemoveEntry={handleRemoveErrorEntry}
            onClearAll={handleClearAllErrors}
            onNavigateToPractice={() => setActiveTab('practice')}
          />
        )}

        {/* TAB 7: FORMULA SHEET */}
        {activeTab === 'formulas' && <FormulaSheet />}

        {/* TAB 8: ADVANCED MODULES */}
        {activeTab === 'advanced' && <AdvancedModules />}
      </main>

      {/* Ask Gemini Tutor Side Panel */}
      <AskGeminiDrawer
        isOpen={isGeminiOpen}
        onClose={() => setIsGeminiOpen(false)}
        initialTopic={geminiContext.topic}
        initialContext={geminiContext.context}
      />
    </div>
  );
}
