export type SubjectId = 'ratio-proportion' | 'time-work';

export interface PredictQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Scene {
  id: string;
  title: string;
  narration: string;
  caption: string;
  animationType:
    | 'unit-box'
    | 'two-workers-lcm'
    | 'pipes-cisterns'
    | 'alternate-days'
    | 'chaining'
    | 'gap-trick'
    | 'direct-inverse';
  animationData: Record<string, any>;
  formula?: string;
  predictQuestion?: PredictQuestion;
  rememberTakeaway: string;
}

export interface TryItQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  solution: string;
}

export interface TrapAlert {
  id: number;
  title: string;
  trap: string;
  fix: string;
  example: string;
}

export interface ShortcutCard {
  id: number;
  title: string;
  rule: string;
  formula: string;
  whenToUse: string;
}

export interface LessonSelfCheck {
  type: 'unit-box' | 'two-workers' | 'missing-worker' | 'pipes-cisterns';
  params: Record<string, number>;
  expectedAnswer: number | string;
}

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  chapterNum: number;
  title: string;
  subtitle: string;
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
  durationMin: number;
  scenes: Scene[];
  selfCheck: LessonSelfCheck;
  tryItQuestions: TryItQuestion[];
  trapAlert: TrapAlert;
  shortcutCard: ShortcutCard;
}

export interface PracticeQuestion {
  id: number;
  subjectId: SubjectId;
  question: string;
  options: string[];
  answer: string;
  quickSolution: string;
  steps: {
    title: string;
    detail: string;
    calc?: string;
  }[];
  level: 'Foundation' | 'Standard' | 'Multistep' | 'Timed Test';
  trapTag?: string;
  shortcutTag?: string;
}

export interface SpeedTrick {
  id: number;
  subjectId: SubjectId;
  number: number;
  title: string;
  statement: string;
  whenToUse: string;
  exampleProblem: string;
  longWay: {
    steps: string[];
    timeSeconds: number;
  };
  shortcutWay: {
    steps: string[];
    timeSeconds: number;
  };
  formula: string;
  answer: string;
}

export interface ErrorLogEntry {
  id: string;
  questionId: number;
  subjectId: SubjectId;
  topic: string;
  questionText: string;
  userAnswer: string;
  rightAnswer: string;
  cause: 'trap' | 'slip' | 'concept';
  trapNumber?: number;
  fixNote: string;
  timestamp: number;
}

export interface AdvancedModule {
  id: string;
  subjectId: SubjectId;
  title: string;
  levelTag: 'IBPS Prelims' | 'SBI/RBI Mains';
  idea: string;
  memoryHook: string;
  animationType: string;
  animationData: Record<string, any>;
  shortcut: string;
  trap: string;
  practiceQuestions: {
    question: string;
    options: string[];
    answer: string;
    detailedSolution: string;
  }[];
}

export interface UserProgress {
  completedLessons: string[];
  completedQuestions: Record<number, { correct: boolean; answered: string; timestamp: number }>;
  streakDays: number;
  lastActiveDate: string;
  errorLog: ErrorLogEntry[];
  voiceSettings: {
    rate: number;
    muted: boolean;
    voiceName?: string;
  };
}
