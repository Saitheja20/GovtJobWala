import React, { useState } from 'react';
import { Sparkles, X, Send, Globe, Brain, HelpCircle, Loader2 } from 'lucide-react';

interface AskGeminiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialContext?: string;
}

export const AskGeminiDrawer: React.FC<AskGeminiDrawerProps> = ({
  isOpen,
  onClose,
  initialTopic = 'Quantitative Aptitude',
  initialContext = '',
}) => {
  const [topic, setTopic] = useState<string>(initialTopic);
  const [context, setContext] = useState<string>(initialContext);
  const [userQuery, setUserQuery] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [mode, setMode] = useState<'simple' | 'shortcut' | 'visual'>('simple');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial props
  React.useEffect(() => {
    if (initialTopic) setTopic(initialTopic);
    if (initialContext) setContext(initialContext);
  }, [initialTopic, initialContext]);

  if (!isOpen) return null;

  const handleAsk = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setResponse(null);

    try {
      const res = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          context,
          question: userQuery || 'Explain this step simply and give me a memory hook.',
          language,
          mode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch explanation from tutor.');
      }
      setResponse(data.explanation);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Unable to connect to Gemini quantitative tutor. Please check settings.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white leading-tight">
                Ask Gemini Quant Tutor
              </h3>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                IBPS & SBI Aptitude Mentor
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Language Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 font-bold">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Explanation Language</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'hi', label: 'हिन्दी (Hindi)' },
                { id: 'te', label: 'తెలుగు (Telugu)' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as any)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    language === lang.id
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Style Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 font-bold">
              <Brain className="w-3.5 h-3.5 text-purple-600" />
              <span>Teaching Mode</span>
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'simple', label: 'Simple Terms' },
                { id: 'shortcut', label: '10s Shortcut' },
                { id: 'visual', label: 'Mental Model' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`py-1.5 px-2 rounded-lg border text-center transition-colors ${
                    mode === m.id
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Context Card */}
          {context && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
              <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase">
                Active Step Context
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-medium line-clamp-3">
                {context}
              </p>
            </div>
          )}

          {/* Custom Question input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1.5 font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Ask a Specific Question</span>
            </label>
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. Why did we multiply by 15 instead of 30? Or explain in simple Hindi."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleAsk}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm shadow-teal-600/30 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Consulting Gemini Tutor...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Explain Now</span>
              </>
            )}
          </button>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Response Box */}
          {response && (
            <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800 space-y-2 text-xs sm:text-sm animate-in fade-in leading-relaxed">
              <div className="flex items-center gap-1.5 text-teal-400 font-mono text-xs font-bold border-b border-slate-800 pb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TUTOR EXPLANATION</span>
              </div>
              <div className="whitespace-pre-line text-slate-200">{response}</div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400 text-center">
          Powered by Gemini 3.8 Flash · Server-Side Proxy
        </div>
      </div>
    </div>
  );
};
