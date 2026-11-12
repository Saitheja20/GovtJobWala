export interface FormulaItem {
  id: string;
  topic: string;
  subtopic: string;
  formula: string;
  explanation: string;
  example: string;
  subject: 'ratio-proportion' | 'time-work';
}

export interface TrapItem {
  id: number;
  trap: string;
  fix: string;
  subject: 'ratio-proportion' | 'time-work';
}

export const FORMULAS: FormulaItem[] = [
  // Ratio & Proportion Formulas
  {
    id: 'f-equiv',
    topic: 'Equivalent Ratio',
    subtopic: 'Simplification',
    formula: 'a : b = ka : kb = (a ÷ m) : (b ÷ m)',
    explanation: 'Multiplying or dividing both terms by the same non-zero number leaves the ratio unchanged.',
    example: '84 : 108 ÷ 12 = 7 : 9',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-unit-box',
    topic: 'Unit-Box Method',
    subtopic: 'Sharing in a Ratio',
    formula: '1 box = Total ÷ Σ(parts); Share A = a × (1 box)',
    explanation: 'Total divided by sum of parts yields the value of 1 box. Multiply by individual parts.',
    example: '₹450 in 4:5 → 9 boxes of ₹50 → ₹200 and ₹250',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-proportion',
    topic: 'Proportion Master Rule',
    subtopic: 'Means & Extremes',
    formula: 'a : b :: c : d ⟺ a × d = b × c',
    explanation: 'Product of outer extremes equals product of inner means.',
    example: '12 : x :: x : 27 ⇒ x² = 324 ⇒ x = 18',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-mean-prop',
    topic: 'Special Proportionals',
    subtopic: 'Mean, Third, Fourth',
    formula: 'Mean = √(a·b) ; Third = b² / a ; Fourth = (b·c) / a',
    explanation: 'Fundamental building blocks for all bank proportion problems.',
    example: 'Mean of 9 & 64 = √576 = 24. Third of 16 & 24 = 24²/16 = 36.',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-comp-div',
    topic: 'Componendo & Dividendo',
    subtopic: 'Algebra Speed-Lifter',
    formula: 'If a/b = c/d then (a + b)/(a − b) = (c + d)/(c − d)',
    explanation: 'Instantly solves symmetric sum and difference fractional equations.',
    example: '(3a + 5b)/(3a − 5b) = 5/1 ⇒ 6a/10b = 6/4 ⇒ a/b = 5/2',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-direct-inverse',
    topic: 'Direct vs Inverse',
    subtopic: 'Variation',
    formula: 'Direct: y/x = k ; Inverse: x · y = k',
    explanation: 'Direct (more pens → more cost). Inverse (more workers → fewer days).',
    example: '12 workers × 15 days = 180 worker-days. 20 workers take 180 ÷ 20 = 9 days.',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-compound',
    topic: 'Compound Ratio',
    subtopic: 'Multiple Ratios',
    formula: 'Compound of a:b and c:d = (a · c) : (b · d)',
    explanation: 'Multiply all numerators together and all denominators together.',
    example: '2:3 and 6:7 and 14:15 → (2×6×14)/(3×7×15) = 8 : 15',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-partnership',
    topic: 'Partnership Rule',
    subtopic: 'Profit Sharing',
    formula: 'Profit Ratio = (C₁ × T₁) : (C₂ × T₂) : …',
    explanation: 'Profit follows the investment weight: Capital multiplied by Active Time.',
    example: '₹5000 for 8m vs ₹6000 for 5m = 40000 : 30000 = 4 : 3',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-alligation',
    topic: 'Alligation Cross',
    subtopic: 'Mixtures',
    formula: 'Cheaper : Dearer = (Dearer − Mean) : (Mean − Cheaper)',
    explanation: 'Diagonal subtraction yields the ratio of quantities (not prices).',
    example: 'Rice ₹40 and ₹60 to get ₹52 → (60−52) : (52−40) = 8 : 12 = 2 : 3',
    subject: 'ratio-proportion',
  },
  {
    id: 'f-replacement',
    topic: 'Dilution Formula',
    subtopic: 'Repeated Replacement',
    formula: 'Left = Initial × (1 − x / T)ⁿ',
    explanation: 'Amount of initial pure liquid remaining after n replacements of volume x in total tank T.',
    example: '60 L milk, remove 6 L twice: 60 × (1 − 6/60)² = 60 × 0.81 = 48.6 L',
    subject: 'ratio-proportion',
  },

  // Time & Work Formulas
  {
    id: 'f-work-fraction',
    topic: 'Work Rate as Fraction',
    subtopic: 'Core Work Principle',
    formula: '1 day work = 1 / n ; Work in t days = t / n ; Work left = 1 − t / n',
    explanation: 'Treat entire job as 1 whole. Invert time to get daily rate; flip rate to get days.',
    example: 'Ravi does 3/8 in 9 days → whole job takes 9 × 8/3 = 24 days',
    subject: 'time-work',
  },
  {
    id: 'f-two-workers',
    topic: 'Two Workers Together',
    subtopic: 'Product over Sum',
    formula: 'T = (a × b) ÷ (a + b)',
    explanation: 'Combined time of two independent workers.',
    example: 'A takes 15d, B takes 10d → (15 × 10) ÷ 25 = 6 days',
    subject: 'time-work',
  },
  {
    id: 'f-missing-partner',
    topic: 'Missing Worker Formula',
    subtopic: 'Product over Difference',
    formula: 'T₂ = (a × T) ÷ (a − T)',
    explanation: 'Finds individual worker time when one worker and combined time are known.',
    example: 'A and B together in 6d, A alone in 10d → (10 × 6) ÷ 4 = 15 days',
    subject: 'time-work',
  },
  {
    id: 'f-three-workers',
    topic: 'Three Workers & Pairs',
    subtopic: 'Cyclic Pairs',
    formula: '(A+B+C) = 1/2 × [(A+B) + (B+C) + (C+A)]',
    explanation: 'Pairs count each worker twice. Halve the sum of pair rates to get total rate.',
    example: 'Pairs 6 + 5 + 4 = 15/day → together 7.5/day. For A alone: 7.5 − (B+C=5) = 2.5/day',
    subject: 'time-work',
  },
  {
    id: 'f-efficiency-time',
    topic: 'Efficiency & Ratios',
    subtopic: 'Inverse Relation',
    formula: 'Efficiency ∝ 1 / Time ; A = d / (k − 1), B = kd / (k − 1)',
    explanation: 'If A is k times as fast as B and finishes d days earlier.',
    example: 'A thrice as fast as B, finishes 20 days earlier: A = 20/2 = 10d, B = 30d',
    subject: 'time-work',
  },
  {
    id: 'f-mdh',
    topic: 'Chain Rule (MDH)',
    subtopic: 'Man-Days-Hours',
    formula: '(M₁ × D₁ × H₁) / W₁ = (M₂ × D₂ × H₂) / W₂',
    explanation: 'Men, days, and daily hours multiply in the numerator; work done sits in the denominator.',
    example: '15 men, 8 h/d, 12 days → 18 men, 10 h/d take (15×8×12)/(18×10) = 8 days',
    subject: 'time-work',
  },
  {
    id: 'f-pipes-net',
    topic: 'Pipes & Cisterns',
    subtopic: 'Net Rate',
    formula: 'Net Rate = Σ(inlets) − Σ(outlets) ; Time = Capacity / Net Rate',
    explanation: 'Inlet adds capacity (+); Outlet or leak destroys capacity (−).',
    example: 'Inlet 10h (+3/h), Outlet 15h (−2/h) in 30-unit tank → net +1/h → 30 hours',
    subject: 'time-work',
  },
  {
    id: 'f-leak-formula',
    topic: 'The Leak Formula',
    subtopic: 'Instant Drain Solver',
    formula: 'Leak Time = (T₁ × T₂) ÷ (T₂ − T₁)',
    explanation: 'Direct product over difference for tap fill time T₁ and combined time with leak T₂.',
    example: 'Tap in 6h, with leak in 8h → (6 × 8) ÷ (8 − 6) = 24 hours',
    subject: 'time-work',
  },
  {
    id: 'f-wages',
    topic: 'Wages Allocation',
    subtopic: 'Fair Pay',
    formula: 'Share of Money ∝ Work Done = Rate × Days Worked',
    explanation: 'Wages follow work actually delivered, not days spent on site.',
    example: 'A did 12 units, B did 12 units, C did 36 units → pay ratio 1 : 1 : 3',
    subject: 'time-work',
  },
];

export const COMMON_TRAPS: TrapItem[] = [
  // Ratio Traps (from PDF Page 20)
  { id: 1, trap: 'Wrong order: "Ratio of boys to girls" written as girls to boys.', fix: 'Underline "of ... to ..." in every question. Order matters.', subject: 'ratio-proportion' },
  { id: 2, trap: 'Mixed units: calculating 750 g : 2.5 kg as 300 : 1.', fix: 'Convert to the smaller unit first (2.5 kg = 2500 g).', subject: 'ratio-proportion' },
  { id: 3, trap: 'Dividing by the sum, not the total: using sum of parts when given a difference.', fix: 'If difference is given, 1 box = difference ÷ (difference of ratio parts).', subject: 'ratio-proportion' },
  { id: 4, trap: '“2/5 of the others” interpreted as A : Total = 2 : 5.', fix: 'A : (B+C) = 2 : 5 implies total is 2 + 5 = 7 boxes, not 5.', subject: 'ratio-proportion' },
  { id: 5, trap: 'Adding to one term only when given a common increase.', fix: 'Add the same x to both terms: (a+x)/(b+x).', subject: 'ratio-proportion' },
  { id: 6, trap: 'Inverse treated as direct proportion (e.g. more workers taking more days).', fix: 'Ask "More → More?" (direct, divide) or "More → Less?" (inverse, multiply).', subject: 'ratio-proportion' },
  { id: 7, trap: 'Forgetting time in partnership profit distribution.', fix: 'Always multiply Capital × Time. Equal time is the only exception.', subject: 'ratio-proportion' },
  { id: 8, trap: 'Ratio of number vs ratio of value in coin problems.', fix: 'Value = Number of coins × Face value of each coin.', subject: 'ratio-proportion' },
  { id: 9, trap: 'Treating alligation cross output as prices instead of quantities.', fix: 'The numbers resulting on the right of the cross are quantities/weights.', subject: 'ratio-proportion' },
  { id: 10, trap: 'Not checking if shares add up to total or if ratios simplify.', fix: 'Always verify shares sum to initial total and ages satisfy all timeline conditions.', subject: 'ratio-proportion' },

  // Time & Work Traps (from PDF Page 17)
  { id: 101, trap: 'Adding times: thinking 15 days + 10 days = 25 days or 12.5 days.', fix: 'Times NEVER add! Add rates (1/a + 1/b), then flip to get combined days.', subject: 'time-work' },
  { id: 102, trap: 'Writing rate = n instead of 1/n (e.g. writing 10 instead of 1/10).', fix: 'A 10-day worker does 1/10 of the job per day.', subject: 'time-work' },
  { id: 103, trap: '“25% more efficient” flipped incorrectly as 4 : 5.', fix: 'Efficiency is 125 : 100 = 5 : 4. Time ratio is the flipped 4 : 5 (20% less time).', subject: 'time-work' },
  { id: 104, trap: '“Leaves before completion” confused with working for that many days.', fix: 'If worker leaves 2 days before the end, he worked (T − 2) days where T is total.', subject: 'time-work' },
  { id: 105, trap: 'Wrong cycle count in alternate-day work by premature rounding.', fix: 'Fit whole cycles first, then manually step through remaining units day by day.', subject: 'time-work' },
  { id: 106, trap: 'Direct vs inverse mix-up in MDH problems.', fix: 'More men → fewer days (inverse). More work → more days (direct).', subject: 'time-work' },
  { id: 107, trap: 'Forgetting hours per day when days are given.', fix: 'Total man-hours = Men × Days × Hours/day.', subject: 'time-work' },
  { id: 108, trap: 'Subtracting in the wrong order for leaks and getting negative time.', fix: 'Leak time is always longer than tap time: 1/Tap − 1/WithLeak.', subject: 'time-work' },
  { id: 109, trap: 'Wages split by days worked instead of actual work completed.', fix: 'Wages follow work units completed = Rate × Days worked.', subject: 'time-work' },
  { id: 110, trap: 'Not converting to one worker type in Men/Women equivalence.', fix: 'Convert all participants into equivalent women or equivalent men first.', subject: 'time-work' },
];
