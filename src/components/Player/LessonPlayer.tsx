import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { Lesson, Scene } from '../../types';
import { UnitBoxCanvas } from './CanvasAnimations/UnitBoxCanvas';
import { TwoWorkersCanvas } from './CanvasAnimations/TwoWorkersCanvas';
import { PipesCisternsCanvas } from './CanvasAnimations/PipesCisternsCanvas';
import { verifyLessonSelfCheck } from '../../utils/math';
import confetti from 'canvas-confetti';

interface LessonPlayerProps {
  lesson: Lesson;
  onLessonComplete: (lessonId: string) => void;
  onOpenGeminiWithContext: (concept: string, stepText: string) => void;
  onBackToLessons: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  onLessonComplete,
  onOpenGeminiWithContext,
  onBackToLessons,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1);

  // Pause & Predict state
  const [predictAnswered, setPredictAnswered] = useState<boolean>(false);
  const [selectedPredictOption, setSelectedPredictOption] = useState<number | null>(null);
  const [showPredictModal, setShowPredictModal] = useState<boolean>(false);

  // Post-lesson quiz state
  const [showPostQuiz, setShowPostQuiz] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentScene: Scene = lesson.scenes[currentSceneIndex];
  const words = currentScene.narration.split(' ');

  // Hidden self-check verification
  const selfCheckResult = verifyLessonSelfCheck(lesson.selfCheck);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopNarration();
    };
  }, []);

  // When scene changes, stop current speech and reset highlight
  useEffect(() => {
    stopNarration();
    setHighlightedWordIndex(-1);
    setPredictAnswered(false);
    setSelectedPredictOption(null);

    // If scene has predict question, prompt user
    if (currentScene.predictQuestion) {
      setShowPredictModal(true);
    } else {
      setShowPredictModal(false);
    }
  }, [currentSceneIndex]);

  const stopNarration = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const playNarration = () => {
    stopNarration();
    setIsPlaying(true);

    if (isMuted || !synthRef.current) {
      // Simulate narration word by word with timer when muted
      let wordIdx = 0;
      const intervalMs = (400 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setHighlightedWordIndex(wordIdx);
        wordIdx++;
        if (wordIdx >= words.length) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsPlaying(false);
        }
      }, intervalMs);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentScene.narration);
    utterance.rate = playbackSpeed;

    // Pick a natural voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes('en-IN')) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    // Word boundary tracking
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        // Approximate word index
        const textUpToChar = currentScene.narration.substring(0, charIndex);
        const wIndex = textUpToChar.split(/\s+/).length - 1;
        setHighlightedWordIndex(Math.max(0, wIndex));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setHighlightedWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setHighlightedWordIndex(-1);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopNarration();
    } else {
      playNarration();
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex < lesson.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      // Reached end of scenes -> open Try-It Mini Quiz!
      setShowPostQuiz(true);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  const handleReplayScene = () => {
    stopNarration();
    setHighlightedWordIndex(-1);
    playNarration();
  };

  // Render the animation canvas based on lesson animationType
  const renderCanvas = () => {
    if (currentScene.animationType === 'unit-box') {
      return (
        <UnitBoxCanvas
          step={currentScene.animationData.step || 1}
          total={currentScene.animationData.total}
          partA={currentScene.animationData.partA}
          partB={currentScene.animationData.partB}
          boxValue={currentScene.animationData.boxValue}
          shareA={currentScene.animationData.shareA}
          shareB={currentScene.animationData.shareB}
          diff={currentScene.animationData.diff}
        />
      );
    }
    if (currentScene.animationType === 'two-workers-lcm') {
      return (
        <TwoWorkersCanvas
          step={currentScene.animationData.step || 1}
          daysA={currentScene.animationData.daysA}
          daysB={currentScene.animationData.daysB}
          totalUnits={currentScene.animationData.totalUnits}
          rateA={currentScene.animationData.rateA}
          rateB={currentScene.animationData.rateB}
          resultDays={currentScene.animationData.resultDays}
        />
      );
    }
    if (currentScene.animationType === 'pipes-cisterns') {
      return (
        <PipesCisternsCanvas
          step={currentScene.animationData.step || 1}
          inletA={currentScene.animationData.inletA}
          outletB={currentScene.animationData.outletB}
          capacity={currentScene.animationData.capacity}
          netRate={currentScene.animationData.netRate}
          timeToFill={currentScene.animationData.timeToFill}
        />
      );
    }
    return null;
  };

  // Submit mini quiz
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    let allCorrect = true;
    lesson.tryItQuestions.forEach((q) => {
      if (quizAnswers[q.id] !== q.answer) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onLessonComplete(lesson.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToLessons}
          className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
        >
          ← Back to All Lessons
        </button>

        <div className="flex items-center gap-2">
          {/* Hidden Self-Check Indicator */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${
              selfCheckResult.passes
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
            }`}
            title={`Mathematical Self-Check: Expected ${selfCheckResult.expected}, Computed ${selfCheckResult.computed}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {selfCheckResult.passes ? 'Math Engine: Verified' : 'Math Engine: Disagreement!'}
            </span>
          </div>

          <button
            onClick={() =>
              onOpenGeminiWithContext(lesson.title, `${currentScene.title}: ${currentScene.caption}`)
            }
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Explain This Step</span>
          </button>
        </div>
      </div>

      {/* Main Video-Player Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Lesson Title Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>Chapter {lesson.chapterNum}</span>
              <span>·</span>
              <span className="capitalize">{lesson.subjectId.replace('-', ' & ')}</span>
              <span>·</span>
              <span>Scene {currentSceneIndex + 1} of {lesson.scenes.length}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
              {currentScene.title}
            </h1>
          </div>

          <button
            onClick={() => setShowFormulaModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Show Formula</span>
          </button>
        </div>

        {/* Animated Canvas (Top Viewport) */}
        <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[380px]">
          {renderCanvas()}
        </div>

        {/* Caption Bar with Word-by-Word Narration Highlighting */}
        {showCaptions && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 min-h-[72px] flex items-center">
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`inline-block mr-1 transition-colors duration-150 rounded px-0.5 ${
                    idx === highlightedWordIndex
                      ? 'bg-teal-200 dark:bg-teal-900 text-teal-950 dark:text-teal-100 font-bold scale-105'
                      : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Remember Takeaway Banner */}
        <div className="px-6 py-2.5 bg-teal-50/70 dark:bg-teal-950/30 border-t border-teal-100 dark:border-teal-900/50 flex items-center gap-2 text-xs text-teal-800 dark:text-teal-200">
          <Zap className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>
            <strong>Remember:</strong> {currentScene.rememberTakeaway}
          </span>
        </div>

        {/* Video Scrubber & Controls */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          {/* Progress timeline / scrub markers */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Scene {currentSceneIndex + 1} / {lesson.scenes.length}</span>
              <span>{Math.round(((currentSceneIndex + 1) / lesson.scenes.length) * 100)}% Complete</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {lesson.scenes.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => setCurrentSceneIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSceneIndex
                      ? 'bg-teal-600 dark:bg-teal-400 ring-2 ring-teal-500/30'
                      : i < currentSceneIndex
                      ? 'bg-teal-300 dark:bg-teal-800'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  title={sc.title}
                />
              ))}
            </div>
          </div>

          {/* Primary Playback Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIndex === 0}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Previous Scene"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Play / Pause with narration */}
              <button
                onClick={togglePlayPause}
                className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm flex items-center gap-2 shadow-sm shadow-teal-600/30 transition-all active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
              </button>

              {/* Next */}
              <button
                onClick={handleNextScene}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Next Scene"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Replay */}
              <button
                onClick={handleReplayScene}
                className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Replay Current Scene"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Right side playback options */}
            <div className="flex items-center gap-3">
              {/* Speed selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-mono">
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackSpeed(speed);
                      if (isPlaying) {
                        playNarration();
                      }
                    }}
                    className={`px-2 py-1 rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Captions toggle */}
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  showCaptions
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
              >
                CC
              </button>

              {/* Mute */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isPlaying) {
                    stopNarration();
                  }
                }}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pause & Predict Modal / Overlay if Scene has challenge */}
      {showPredictModal && currentScene.predictQuestion && !predictAnswered && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/90 to-indigo-900/90 border border-purple-500/40 text-white shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
            <HelpCircle className="w-4 h-4" />
            <span>PAUSE & PREDICT CHALLENGE</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold">
            {currentScene.predictQuestion.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentScene.predictQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPredictOption(idx);
                  setPredictAnswered(true);
                }}
                className="p-3.5 rounded-xl border border-purple-400/30 bg-purple-950/50 hover:bg-purple-800/60 text-left font-medium text-sm transition-all hover:scale-[1.02]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Predict Answer Feedback Banner */}
      {predictAnswered && currentScene.predictQuestion && (
        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              {selectedPredictOption === currentScene.predictQuestion.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Spot on! That is the right exam approach.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Almost! Here is the exact intuition:</span>
                </>
              )}
            </span>
            <button
              onClick={() => setShowPredictModal(false)}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {currentScene.predictQuestion.explanation}
          </p>
        </div>
      )}

      {/* Post-Lesson Section: Try It Yourself Mini-Quiz */}
      {showPostQuiz && (
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                  STEP 2 OF 3: PRACTICE
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mt-1">
                  Try It Yourself — Mini Quiz (3 Exam Questions)
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              {lesson.tryItQuestions.map((q, idx) => {
                const userChoice = quizAnswers[q.id];
                const isCorrect = userChoice === q.answer;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      Q{idx + 1}. {q.question}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                            userChoice === opt
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-white dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-teal-500'
                          } ${
                            quizSubmitted && opt === q.answer
                              ? 'ring-2 ring-emerald-500 !bg-emerald-500 !text-white'
                              : ''
                          } ${
                            quizSubmitted && userChoice === opt && opt !== q.answer
                              ? 'ring-2 ring-red-500 !bg-red-500 !text-white'
                              : ''
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {quizSubmitted && (
                      <div
                        className={`p-3 rounded-lg text-xs font-mono ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                        }`}
                      >
                        <div className="font-bold mb-1">
                          {isCorrect ? '✓ Correct Answer!' : `✗ Incorrect (Correct: ${q.answer})`}
                        </div>
                        <div className="font-sans text-[11px] opacity-90">{q.solution}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-sm transition-all"
                >
                  Submit Mini-Quiz
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Retry Quiz
                </button>
              )}
            </div>
          </div>

          {/* Trap Alert Card (Red) */}
          <div className="p-6 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-slate-900 dark:text-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 font-bold">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>TRAP ALERT #{lesson.trapAlert.id}</span>
            </div>
            <h3 className="text-base font-bold text-red-900 dark:text-red-200">
              {lesson.trapAlert.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong>The Trap:</strong> {lesson.trapAlert.trap}
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 text-xs space-y-1">
              <div className="font-bold text-emerald-600 dark:text-emerald-400">
                Fix & Strategy:
              </div>
              <div className="text-slate-700 dark:text-slate-300">{lesson.trapAlert.fix}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800 font-mono">
                Worked Example: {lesson.trapAlert.example}
              </div>
            </div>
          </div>

          {/* Shortcut Card (Purple) */}
          <div className="p-6 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 text-slate-900 dark:text-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>SPEED SHORTCUT #{lesson.shortcutCard.id}</span>
            </div>
            <h3 className="text-base font-bold text-purple-900 dark:text-purple-200">
              {lesson.shortcutCard.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {lesson.shortcutCard.rule}
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-xs font-mono text-purple-700 dark:text-purple-300">
              Formula: {lesson.shortcutCard.formula}
            </div>
          </div>
        </div>
      )}

      {/* "Show me the formula" Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Formula & Mathematical Rule
                </h3>
              </div>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-sm font-bold text-teal-700 dark:text-teal-300">
              {currentScene.formula || lesson.shortcutCard.formula}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentScene.rememberTakeaway}
            </p>

            <button
              onClick={() => setShowFormulaModal(false)}
              className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              Back to Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
