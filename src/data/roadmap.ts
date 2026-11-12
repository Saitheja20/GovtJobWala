import { SubjectId } from '../types';

export interface RoadmapPhase {
  phaseNum: number;
  name: string;
  days: string;
  description: string;
  targetTopics: string[];
}

export interface RoadmapChapter {
  id: string;
  chapterNum: number;
  subjectId: SubjectId;
  title: string;
  subtitle: string;
  phase: number;
  hasInteractiveLesson: boolean;
  lessonId?: string;
}

export const ROADMAP_PHASES: Record<SubjectId, RoadmapPhase[]> = {
  'ratio-proportion': [
    {
      phaseNum: 1,
      name: 'Concepts',
      days: 'Days 1–4',
      description: 'Master foundational definitions, recipes, units, comparison rules, and the unit-box sharing method. Complete every Try-it box.',
      targetTopics: ['Chapters 0–7', 'Unit-Box Method', 'Proportion & k-trick', 'Direct & Inverse'],
    },
    {
      phaseNum: 2,
      name: 'Applications',
      days: 'Days 5–6',
      description: 'Apply ratios to standard exam word problems: equal gap trick, age timeline, income-expenditure-savings, partnership areas, and mixture alligations.',
      targetTopics: ['Chapters 8–13', 'Ages with Ratios', 'Partnership (Capital × Time)', 'Mixtures & Dilution'],
    },
    {
      phaseNum: 3,
      name: 'Practice',
      days: 'Days 7–10',
      description: 'Solve Q1–Q30 Foundation, then Q31–Q65 Standard, then Q66–Q85 Multistep & Advanced with answers closed.',
      targetTopics: ['Q1–Q30 Foundation', 'Q31–Q65 Standard', 'Q66–Q85 Multistep'],
    },
    {
      phaseNum: 4,
      name: 'Test & Polish',
      days: 'Days 11+',
      description: 'Timed test Q86–Q100 in 25 minutes, record mistakes into the Error Log, and execute the 20-minute pre-exam revision routine.',
      targetTopics: ['Timed Test Q86–Q100', 'Error Log Analysis', '20-Min Revision Routine'],
    },
  ],
  'time-work': [
    {
      phaseNum: 1,
      name: 'Concepts',
      days: 'Days 1–3',
      description: 'Understand work as one whole, reciprocal rates, two & three workers together via the LCM work-unit method, and efficiency inverse ratios.',
      targetTopics: ['Chapters 0–4', 'Work Rate as Fraction', 'Two & Three Workers', 'Efficiency Ratios'],
    },
    {
      phaseNum: 2,
      name: 'Applications',
      days: 'Days 4–6',
      description: 'Master workers leaving/joining midway, alternate-day cycle mechanics, MDH chain rule bank balance, pipes & cisterns, and wages.',
      targetTopics: ['Chapters 5–10', 'Leaving & Joining', 'Alternate Days', 'MDH Formula', 'Pipes & Cisterns'],
    },
    {
      phaseNum: 3,
      name: 'Practice',
      days: 'Days 7–10',
      description: 'Solve Q1–Q30 Foundation, then Q31–Q65 Standard, then Q66–Q85 Multistep & Advanced with answers closed.',
      targetTopics: ['Q1–Q30 Foundation', 'Q31–Q65 Standard', 'Q66–Q85 Multistep'],
    },
    {
      phaseNum: 4,
      name: 'Test & Polish',
      days: 'Days 11+',
      description: 'Timed test Q86–Q100 in 25 minutes, evaluate your benchmark tier, log slips, and master the 15 speed tricks.',
      targetTopics: ['Timed Test Q86–Q100', 'Benchmark Tiering', '20-Min Revision Routine'],
    },
  ],
};

export const CHAPTERS: RoadmapChapter[] = [
  // Ratio & Proportion Chapters (from PDF)
  {
    id: 'rp-ch0',
    chapterNum: 0,
    subjectId: 'ratio-proportion',
    title: 'What Is a Ratio, Really?',
    subtitle: 'Zero-to-ready bridge, recipe mental hook, and colon/fraction/words notation',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch1',
    chapterNum: 1,
    subjectId: 'ratio-proportion',
    title: 'Equivalent Ratios & Simplification',
    subtitle: 'Golden rule a:b = ka:kb, dividing by HCF, decimals and fraction ratios',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch2',
    chapterNum: 2,
    subjectId: 'ratio-proportion',
    title: 'Units & the Homogeneity Rule',
    subtitle: 'Never compare apples with oranges; always convert to smaller unit first',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch3',
    chapterNum: 3,
    subjectId: 'ratio-proportion',
    title: 'Comparing Ratios',
    subtitle: 'Cross-product rule, duplicate, sub-duplicate, triplicate, and inverse ratios',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch4',
    chapterNum: 4,
    subjectId: 'ratio-proportion',
    title: 'Sharing in a Ratio — The Unit-Box Method',
    subtitle: 'The single most useful idea: 1 box = Total ÷ (a + b + c)',
    phase: 1,
    hasInteractiveLesson: true,
    lessonId: 'ratio-unit-box',
  },
  {
    id: 'rp-ch5',
    chapterNum: 5,
    subjectId: 'ratio-proportion',
    title: 'Proportion: Means, Extremes & the k-Trick',
    subtitle: 'ad = bc master rule, mean/third/fourth proportional, and Componendo-Dividendo',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch6',
    chapterNum: 6,
    subjectId: 'ratio-proportion',
    title: 'Direct & Inverse Proportion',
    subtitle: 'More->More (straight line y/x=k) vs More->Less (hyperbola x*y=k)',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch7',
    chapterNum: 7,
    subjectId: 'ratio-proportion',
    title: 'Combining Ratios: Chaining & Compounding',
    subtitle: 'Chaining A:B and B:C to A:B:C by equalizing the link term with LCM',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch8',
    chapterNum: 8,
    subjectId: 'ratio-proportion',
    title: 'Changes in Ratios: Adding & Subtracting',
    subtitle: 'When both quantities change by same amount, the gap stays fixed',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch9',
    chapterNum: 9,
    subjectId: 'ratio-proportion',
    title: 'Age Problems with Ratios',
    subtitle: 'The one thing that never changes: the age difference between two people',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch10',
    chapterNum: 10,
    subjectId: 'ratio-proportion',
    title: 'Income, Expenditure & Savings',
    subtitle: 'Savings = Income − Expenditure; eliminate unknowns in one quick line',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch11',
    chapterNum: 11,
    subjectId: 'ratio-proportion',
    title: 'Partnership & Profit Sharing',
    subtitle: 'Profit follows Capital × Time; rectangular investment area model',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch12',
    chapterNum: 12,
    subjectId: 'ratio-proportion',
    title: 'Mixtures & Alligation',
    subtitle: 'The diagonal cross rule that solves in 5 seconds and repeated dilution formula',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'rp-ch13',
    chapterNum: 13,
    subjectId: 'ratio-proportion',
    title: 'Advanced Topics & Exam-Style Twists',
    subtitle: 'Coins (number vs value), (a+b):(b+c):(c+a) pair-sums, diamond break squares',
    phase: 2,
    hasInteractiveLesson: false,
  },

  // Time & Work Chapters (from PDF)
  {
    id: 'tw-ch0',
    chapterNum: 0,
    subjectId: 'time-work',
    title: 'What Does “Work” Mean in Maths?',
    subtitle: 'Treating the job as 1 whole; brick-wall painting intuition and rates addition',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch1',
    chapterNum: 1,
    subjectId: 'time-work',
    title: 'Work Rate as a Fraction',
    subtitle: 'The three lines: 1 day work = 1/n, done in t days = t/n, left = 1 − t/n',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch2',
    chapterNum: 2,
    subjectId: 'time-work',
    title: 'Two Workers Together',
    subtitle: 'Product over Sum: (a × b) / (a + b) and the LCM Work-Unit speed method',
    phase: 1,
    hasInteractiveLesson: true,
    lessonId: 'tw-two-workers-lcm',
  },
  {
    id: 'tw-ch3',
    chapterNum: 3,
    subjectId: 'time-work',
    title: 'Three Workers & Pair Problems',
    subtitle: 'Halve the sum of three pairs: (A+B+C) = 1/2 × [(A+B) + (B+C) + (C+A)]',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch4',
    chapterNum: 4,
    subjectId: 'time-work',
    title: 'Efficiency & Ratios',
    subtitle: 'More efficient -> fewer days; time ratio is the inverse of efficiency ratio',
    phase: 1,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch5',
    chapterNum: 5,
    subjectId: 'time-work',
    title: 'Workers Leaving & Joining Midway',
    subtitle: 'Phase-by-phase unit accounting and "leaves before completion" (T − x days)',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch6',
    chapterNum: 6,
    subjectId: 'time-work',
    title: 'Alternate-Day Work',
    subtitle: 'One cycle as building block, whole cycle count, and handling the leftover fraction',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch7',
    chapterNum: 7,
    subjectId: 'time-work',
    title: 'Men–Days–Hours & the Chain Rule',
    subtitle: 'MDH formula M1D1H1/W1 = M2D2H2/W2 and provisions ration bank balance',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch8',
    chapterNum: 8,
    subjectId: 'time-work',
    title: 'Pipes & Cisterns',
    subtitle: 'Inlets add (+), outlets subtract (−), and instant leak formula (T1·T2)/(T2−T1)',
    phase: 2,
    hasInteractiveLesson: true,
    lessonId: 'tw-pipes-cisterns',
  },
  {
    id: 'tw-ch9',
    chapterNum: 9,
    subjectId: 'time-work',
    title: 'Wages & Sharing Money',
    subtitle: 'Fair pay follows work actually done: Share ∝ Rate × Days worked',
    phase: 2,
    hasInteractiveLesson: false,
  },
  {
    id: 'tw-ch10',
    chapterNum: 10,
    subjectId: 'time-work',
    title: 'Advanced Exam Twists',
    subtitle: 'Contractor extra workers, 2-equation men & women, variable efficiency, builder vs vandal',
    phase: 2,
    hasInteractiveLesson: false,
  },
];
