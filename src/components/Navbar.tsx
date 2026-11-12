import React from 'react';
import { BookOpen, Map, Zap, Dumbbell, AlertTriangle, FileText, Sparkles, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenGemini: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  isMuted,
  setIsMuted,
  onOpenGemini,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'shortcuts', label: 'Shortcut Lab', icon: Zap },
    { id: 'practice', label: 'Practice Arena', icon: Dumbbell },
    { id: 'error-log', label: 'Error Log', icon: AlertTriangle },
    { id: 'formulas', label: 'Formula Sheet', icon: FileText },
    { id: 'advanced', label: 'Advanced', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white whitespace-nowrap block leading-tight">
              BankExam Visual Academy
            </span>
            <span className="text-[11px] font-medium text-teal-600 dark:text-teal-400 block leading-none">
              IBPS · SBI · RBI Quant Handbook
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-600 dark:text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Audio mute toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute voice narration' : 'Mute voice narration'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Ask Gemini CTA */}
          <button
            onClick={onOpenGemini}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-lg shadow-sm shadow-teal-600/20 transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Tutor</span>
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800 gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white font-medium'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
