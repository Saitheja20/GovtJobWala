import React, { useState, useEffect } from 'react';
import {
  Dumbbell,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Trophy,
  Filter,
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../../data/questions';
import { PracticeQuestion, SubjectId, ErrorLogEntry } from '../../types';

interface PracticeArenaProps {
  onLogMistake: (entry: Omit<ErrorLogEntry, 'id' | 'timestamp'>) => void;
  onOpenGeminiWithContext: (topic: string, question: string) => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  onLogMistake,
  onOpenGeminiWithContext,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('ratio-proportion');
  const [selectedLevel, setSelectedLevel] = useState<string>('Foundation');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAnimationSteps, setShowAnimationSteps] = useState<boolean>(false);
  const [loggedQuestions, setLoggedQuestions] = useState<Record<number, boolean>>({});

  // Timed Test Mode State (25 minutes for Q86-Q100)
  const [isTimedMode, setIsTimedMode] = useState<boolean>(false);
  const [testTimeLeft, setTestTimeLeft] = useState<number>(25 * 60);
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);

  // Filter questions based on subject & level
  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    if (q.subjectId !== selectedSubject) return false;
    if (selectedLevel === 'All') return true;
    return q.level === selectedLevel;
  });

  const currentQ: PracticeQuestion | undefined = filteredQuestions[selectedQuestionIndex];

  // Reset index when filter changes
  useEffect(() => {
    setSelectedQuestionIndex(0);
    setShowAnimationSteps(false);
  }, [selectedSubject, selectedLevel]);

  // Timed test countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimedMode && !testSubmitted && testTimeLeft > 0) {
      timer = setInterval(() => {
        setTestTimeLeft((prev) => {
          if (prev <= 1) {
            setTestSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimedMode, testSubmitted, testTimeLeft]);

  const handleSelectAnswer = (qId: number, answerText: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: answerText }));
  };

  const handleLogWrong = (q: PracticeQuestion) => {
    onLogMistake({
      questionId: q.id,
      subjectId: q.subjectId,
      topic: `${q.subjectId === 'ratio-proportion' ? 'Ratio' : 'Time & Work'} - ${q.level}`,
      questionText: q.question,
      userAnswer: userAnswers[q.id] || 'Skipped / Unanswered',
      rightAnswer: q.answer,
      cause: q.trapTag ? 'trap' : 'slip',
      fixNote: q.quickSolution,
    });
    setLoggedQuestions((prev) => ({ ...prev, [q.id]: true }));
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timed test score calculation
  const timedQuestions = PRACTICE_QUESTIONS.filter(
    (q) => q.subjectId === selectedSubject && q.level === 'Timed Test'
  );
  const timedScore = timedQuestions.reduce((acc, q) => {
    return userAnswers[q.id] === q.answer ? acc + 1 : acc;
  }, 0);

  const getBenchmarkTier = (score: number) => {
    if (score >= 13) return { tier: 'Exam-ready', color: 'text-emerald-500', next: 'Move to mixed-topic papers' };
    if (score >= 10) return { tier: 'Strong', color: 'text-teal-500', next: 'Fix traps from your log' };
    if (score >= 7) return { tier: 'Developing', color: 'text-amber-500', next: 'Redo Chapters 4, 7, 8 and Q31–Q65' };
    return { tier: 'Rebuild', color: 'text-red-500', next: 'Re-read chapters 0–5 slowly, then retry' };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
            <Dumbbell className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>PRACTICE ARENA (100-QUESTION BANK)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Question Bank with Animated Step-by-Step Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Exact handbook questions with step-by-step visual calculations and 25-minute exam benchmark mode.
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

      {/* Level Filters & Timed Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['Foundation', 'Timed Test', 'All'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                if (lvl === 'Timed Test') {
                  setIsTimedMode(true);
                } else {
                  setIsTimedMode(false);
                }
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedLevel === lvl
                  ? 'bg-teal-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {lvl === 'Foundation' ? 'Foundation (Q1–Q30)' : lvl === 'Timed Test' ? 'Timed Test (Q86–Q100)' : 'All Questions'}
            </button>
          ))}
        </div>

        {/* Timed Test Countdown Display */}
        {isTimedMode && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30 font-mono text-sm font-bold">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{formatTimer(testTimeLeft)}</span>
            </div>
            {!testSubmitted ? (
              <button
                onClick={() => setTestSubmitted(true)}
                className="px-4 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 shadow-sm"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => {
                  setTestSubmitted(false);
                  setTestTimeLeft(25 * 60);
                  setUserAnswers({});
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Retake 25m Test
              </button>
            )}
          </div>
        )}
      </div>

      {/* Timed Test Score & Benchmarking Table if submitted */}
      {isTimedMode && testSubmitted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/40 text-white space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block">
                TIMED REVISION TEST SCORECARD
              </span>
              <h2 className="text-2xl font-bold font-display text-white mt-0.5">
                Score: {timedScore} / {timedQuestions.length}
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
              <div className="text-xs text-slate-400 font-mono">Performance Tier</div>
              <div className={`text-lg font-bold font-display ${getBenchmarkTier(timedScore).color}`}>
                {getBenchmarkTier(timedScore).tier}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300">
            <strong>Recommended Next Step:</strong> {getBenchmarkTier(timedScore).next}
          </div>

          {/* Benchmark Table (From PDF) */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-left">
                  <th className="py-2 px-3">Score / 15</th>
                  <th className="py-2 px-3">Level</th>
                  <th className="py-2 px-3">Next Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className={timedScore >= 13 ? 'bg-emerald-950/40 font-bold' : ''}>
                  <td className="py-2 px-3">13–15</td>
                  <td className="py-2 px-3 text-emerald-400">Exam-ready</td>
                  <td className="py-2 px-3">Move to mixed-topic papers</td>
                </tr>
                <tr className={timedScore >= 10 && timedScore <= 12 ? 'bg-teal-950/40 font-bold' : ''}>
                  <td className="py-2 px-3">10–12</td>
                  <td className="py-2 px-3 text-teal-400">Strong</td>
                  <td className="py-2 px-3">Fix traps from your log</td>
                </tr>
                <tr className={timedScore >= 7 && timedScore <= 9 ? 'bg-amber-950/40 font-bold' : ''}>
                  <td className="py-2 px-3">7–9</td>
                  <td className="py-2 px-3 text-amber-400">Developing</td>
                  <td className="py-2 px-3">Redo Chapters 4, 7, 8 and Q31–Q65</td>
                </tr>
                <tr className={timedScore < 7 ? 'bg-red-950/40 font-bold' : ''}>
                  <td className="py-2 px-3">0–6</td>
                  <td className="py-2 px-3 text-red-400">Rebuild</td>
                  <td className="py-2 px-3">Re-read chapters 0–5 slowly, then retry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Question Workspace */}
      {currentQ ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Card (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800">
                  Q{currentQ.id}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {currentQ.level}
                </span>
                {currentQ.trapTag && (
                  <span className="text-[11px] font-mono text-red-600 dark:text-red-400">
                    · {currentQ.trapTag}
                  </span>
                )}
              </div>

              {/* Gemini Explain CTA */}
              <button
                onClick={() => onOpenGeminiWithContext(currentQ.question, currentQ.quickSolution)}
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI to Explain</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt;
                const isChecked = userAnswers[currentQ.id] !== undefined;
                const isCorrect = opt === currentQ.answer;

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer(currentQ.id, opt)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30'
                          : 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100 ring-2 ring-red-500/30'
                        : isChecked && isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-teal-500 hover:bg-teal-50/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {isChecked && isSelected && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer & Feedback Ribbon if Answered */}
            {userAnswers[currentQ.id] && (
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                      OFFICIAL 1-LINE QUICK SOLUTION
                    </span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Answer: {currentQ.answer}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {currentQ.quickSolution}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setShowAnimationSteps(!showAnimationSteps)}
                    className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold hover:bg-teal-100 transition-colors"
                  >
                    {showAnimationSteps ? 'Hide Step Animation' : 'Show Step-by-Step Animation'}
                  </button>

                  <button
                    onClick={() => handleLogWrong(currentQ)}
                    disabled={loggedQuestions[currentQ.id]}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs font-semibold hover:bg-red-100 disabled:opacity-50 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{loggedQuestions[currentQ.id] ? 'Logged in Error Log' : 'I got this wrong'}</span>
                  </button>
                </div>

                {/* Step-by-step Solution Animation Canvas */}
                {showAnimationSteps && (
                  <div className="p-5 rounded-xl bg-slate-950 text-white border border-slate-800 space-y-3 animate-in fade-in">
                    <div className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                      Animated Step-by-Step Breakdown
                    </div>

                    <div className="space-y-3">
                      {currentQ.steps.map((st, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1"
                        >
                          <div className="text-xs font-bold font-mono text-teal-300">
                            Step {i + 1}: {st.title}
                          </div>
                          <div className="text-xs text-slate-300">{st.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Nav: Prev / Next */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedQuestionIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-slate-500">
                {selectedQuestionIndex + 1} of {filteredQuestions.length}
              </span>

              <button
                onClick={() =>
                  setSelectedQuestionIndex((prev) =>
                    Math.min(filteredQuestions.length - 1, prev + 1)
                  )
                }
                disabled={selectedQuestionIndex === filteredQuestions.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Navigator Palette (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Question Palette ({filteredQuestions.length})
              </h3>
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
                {Object.keys(userAnswers).length} Answered
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const isSelected = selectedQuestionIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = userAnswers[q.id] === q.answer;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestionIndex(idx);
                      setShowAnimationSteps(false);
                    }}
                    className={`h-9 rounded-lg text-xs font-mono font-semibold transition-all ${
                      isSelected
                        ? 'ring-2 ring-teal-500 bg-teal-600 text-white shadow-sm'
                        : isAnswered
                        ? isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
                <span>Correct Answer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" />
                <span>Incorrect Answer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-slate-300 dark:bg-slate-700 inline-block" />
                <span>Unattempted</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
          No questions found for the selected filter.
        </div>
      )}
    </div>
  );
};
