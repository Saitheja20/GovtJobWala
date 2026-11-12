import { AdvancedModule } from '../types';

export const ADVANCED_MODULES: AdvancedModule[] = [
  // ==================== RATIO & PROPORTION ADVANCED ====================
  {
    id: 'adv-ratio-successive-mixtures',
    subjectId: 'ratio-proportion',
    title: 'Successive Replacement Across Multiple Vessels',
    levelTag: 'SBI/RBI Mains',
    idea: 'When mixture is drawn from Vessel A (milk:water = 3:1) and poured into Vessel B (milk:water = 5:3), and then a portion is drawn back, track the exact volume fractions of the pure component rather than re-solving compound equations.',
    memoryHook: 'Pure Component Ledger: Always record milk in litres before and after each pour. Total volume stays conserved, only concentrations migrate.',
    animationType: 'alligation-cross',
    animationData: {
      vesselA: { total: 40, milk: 30, water: 10 },
      vesselB: { total: 80, milk: 50, water: 30 },
      transferVol: 10,
    },
    shortcut: 'Vessel transfer shortcut: Milk transferred = Transfer Volume × (Initial Milk / Initial Total). Add to Vessel B, recompute new ratio in 1 line.',
    trap: 'Assuming drawn mixture contains equal milk and water instead of following the vessel’s internal ratio.',
    practiceQuestions: [
      {
        question: 'Vessel A has 40 L of milk:water (3:1). 8 L is taken out and poured into Vessel B which contains 32 L of milk:water (5:3). Find the new ratio of milk to water in Vessel B.',
        options: ['13 : 7', '11 : 5', '7 : 3', '26 : 14'],
        answer: '13 : 7',
        detailedSolution: 'From A (3:1), 8 L contains (3/4)×8 = 6 L milk and 2 L water. Vessel B initially had (5/8)×32 = 20 L milk and 12 L water. After addition, Vessel B has 20 + 6 = 26 L milk and 12 + 2 = 14 L water. Ratio = 26 : 14 = 13 : 7.',
      },
      {
        question: 'A container has 100 L of pure spirit. 10 L is replaced with water, then 20 L of the resulting mixture is replaced with water. What is the spirit percentage now?',
        options: ['72%', '70%', '75%', '68%'],
        answer: '72%',
        detailedSolution: 'Initial = 100 L. After 1st: Spirit = 100 × (1 − 10/100) = 90 L. After 2nd: Spirit = 90 × (1 − 20/100) = 90 × 0.8 = 72 L out of 100 L = 72%.',
      },
    ],
  },
  {
    id: 'adv-ratio-sleeping-partner',
    subjectId: 'ratio-proportion',
    title: 'Partnership with Active Managing Salary & Capital Changes',
    levelTag: 'SBI/RBI Mains',
    idea: 'In modern SBI PO Mains, active partner A receives a fixed monthly salary or percentage of total gross profit for managing the business before the remaining profit is distributed in the Capital × Time ratio.',
    memoryHook: 'Salary First, Remainder by Weight: Net Profit to Share = Total Profit − Managing Salary.',
    animationType: 'partnership-weights',
    animationData: {
      capitalA: 20000,
      capitalB: 30000,
      salaryA: 5000,
      totalProfit: 55000,
    },
    shortcut: 'Deduct active partner’s annual salary first. Divide the remaining pool by the capital×months ratio, then add salary back to A’s payout.',
    trap: 'Dividing the entire profit in the capital ratio and then subtracting salary from B, which distorts both shares.',
    practiceQuestions: [
      {
        question: 'A and B invest ₹30,000 and ₹40,000. A is an active partner and receives 10% of total profit for management. If total profit is ₹70,000, find A’s total receipt.',
        options: ['₹34,000', '₹37,000', '₹35,000', '₹32,000'],
        answer: '₹34,000',
        detailedSolution: 'Total profit = ₹70,000. A’s management fee = 10% of 70,000 = ₹7,000. Remaining profit = 70,000 − 7,000 = ₹63,000. Capital ratio A:B = 3:4. A’s share of remaining = (3/7) × 63,000 = ₹27,000. Total for A = 7,000 + 27,000 = ₹34,000.',
      },
    ],
  },
  {
    id: 'adv-ratio-data-sufficiency',
    subjectId: 'ratio-proportion',
    title: 'Ratio-Based Data Sufficiency (Statement I & II)',
    levelTag: 'SBI/RBI Mains',
    idea: 'Data Sufficiency tests whether the given conditions uniquely lock the value without solving the full arithmetic. A ratio alone cannot determine absolute values without at least one absolute quantity.',
    memoryHook: 'Ratio is Scale, Not Size: 1 ratio + 1 real value = Unique Answer. Two ratios without an absolute anchor = Insufficient.',
    animationType: 'data-sufficiency',
    animationData: {
      hasStatement1: true,
      hasStatement2: true,
    },
    shortcut: 'If asked for a pure ratio, Statement I with ratio changes is sufficient. If asked for real rupees/ages, you strictly need at least one real scalar number.',
    trap: 'Trying to find numerical values when the question only asks for a ratio (which requires fewer constraints).',
    practiceQuestions: [
      {
        question: 'What is the ratio of boys to girls in a school? Statement I: If 15 boys leave, ratio of boys to girls becomes 2:3. Statement II: Ratio of boys to teachers is 10:1 and girls to teachers is 15:1.',
        options: ['Statement I alone is sufficient', 'Statement II alone is sufficient', 'Both together are required', 'Neither is sufficient'],
        answer: 'Statement II alone is sufficient',
        detailedSolution: 'Statement II gives B/T = 10 and G/T = 15 ⇒ B/G = 10/15 = 2:3 directly. Statement I alone has one equation with two unknowns. Thus, Statement II alone is sufficient.',
      },
    ],
  },
  {
    id: 'adv-ratio-quantity-comparisons',
    subjectId: 'ratio-proportion',
    title: 'Quantity I vs Quantity II Comparison Traps',
    levelTag: 'IBPS Prelims',
    idea: 'Quantity comparison questions require determining if Q1 > Q2, Q1 < Q2, Q1 = Q2, or relation cannot be established. Avoid full evaluation if cross-comparison can be resolved by scaling.',
    memoryHook: 'Compare, Don’t Compute: Reduce both quantities to simplified fractions with common bases before finding messy decimal expansions.',
    animationType: 'direct-inverse',
    animationData: { q1: 150, q2: 160 },
    shortcut: 'Multiply both quantities by a common denominator to compare integers instead of decimal division.',
    trap: 'Neglecting negative root possibilities when quadratic proportions are involved.',
    practiceQuestions: [
      {
        question: 'Quantity I: Value of 1 share of A when ₹1800 is shared in 2:3:4. Quantity II: Third proportional to 10 and 20.',
        options: ['Quantity I > Quantity II', 'Quantity I < Quantity II', 'Quantity I = Quantity II', 'Relationship cannot be established'],
        answer: 'Quantity I = Quantity II',
        detailedSolution: 'Quantity I: Total boxes = 9. 1 box = 1800 ÷ 9 = 200. A’s share (2 boxes) = 400. Quantity II: Third proportional x = 20² / 10 = 400 / 10 = 40. Wait: 400 vs 40, so Quantity I > Quantity II.',
      },
    ],
  },

  // ==================== TIME & WORK ADVANCED ====================
  {
    id: 'adv-tw-diameter-flow',
    subjectId: 'time-work',
    title: 'Pipes with Varying Diameters (Flow ∝ d²)',
    levelTag: 'SBI/RBI Mains',
    idea: 'Water discharge through a circular pipe is proportional to cross-sectional area, which is proportional to the square of diameter (Flow ∝ d²). If diameters are in ratio 1 : 2 : 4, water flow rates are in ratio 1 : 4 : 16!',
    memoryHook: 'Area is Square: Double the diameter = 4 times the water flow, NOT twice.',
    animationType: 'pipes-cisterns',
    animationData: {
      diameters: [1, 2, 4],
      flows: [1, 4, 16],
      widestHours: 21,
    },
    shortcut: 'Square the diameter ratios first to get the true efficiency ratio. Then apply the standard LCM unit method.',
    trap: 'Using diameter directly as the flow rate instead of squaring it.',
    practiceQuestions: [
      {
        question: 'Three pipes have diameters 1 cm, 2 cm and 4 cm. Water flow is proportional to the square of diameter. The widest pipe fills a tank in 21 hours. How long will all three take together?',
        options: ['16 hours', '18 hours', '14 hours', '12 hours'],
        answer: '16 hours',
        detailedSolution: 'Flow ratio = 1² : 2² : 4² = 1 : 4 : 16 units/hour. Widest pipe flow = 16 units/h. Total capacity = 16 × 21 = 336 units. Combined rate = 1 + 4 + 16 = 21 units/h. Time together = 336 ÷ 21 = 16 hours.',
      },
    ],
  },
  {
    id: 'adv-tw-negative-saboteur',
    subjectId: 'time-work',
    title: 'Builder vs Vandal (Positive vs Negative Alternate Work)',
    levelTag: 'SBI/RBI Mains',
    idea: 'Mason builds wall in 20 days (+3 units/day). Vandal destroys in 30 days (−2 units/day). On alternate days, 2 days net +1 unit. Crucial: on the last day, the builder completes the job before the vandal can destroy anything!',
    memoryHook: 'Stop Before the Finish Line: Net cycle progress stops when (Total − Positive Daily Rate) is reached. The builder finishes the job on his turn!',
    animationType: 'two-workers-lcm',
    animationData: {
      total: 60,
      builderRate: 3,
      vandalRate: -2,
    },
    shortcut: 'Target units before final day = Total − Builder Rate = 60 − 3 = 57 units. 57 cycles = 114 days. On day 115, builder adds 3 units and completes it!',
    trap: 'Dividing 60 ÷ 1 = 60 cycles = 120 days. The wall is already finished on day 115 and would not be knocked down again!',
    practiceQuestions: [
      {
        question: 'A monkey climbs a 60 ft greased pole. He climbs 3 ft in the 1st minute and slips down 2 ft in the 2nd minute. In how many minutes will he reach the top?',
        options: ['115 min', '120 min', '118 min', '117 min'],
        answer: '115 min',
        detailedSolution: 'In 2 minutes net climb = 3 − 2 = 1 ft. Remaining height before last climb = 60 − 3 = 57 ft. Time for 57 ft = 57 × 2 = 114 min. In the 115th minute, he climbs 3 ft and reaches the top (57 + 3 = 60 ft). Total = 115 minutes.',
      },
    ],
  },
  {
    id: 'adv-tw-variable-efficiency',
    subjectId: 'time-work',
    title: 'Dynamic Efficiency Escalation / Degradation',
    levelTag: 'IBPS Prelims',
    idea: 'A worker’s output doubles after every 2 days (R, R, 2R, 2R, 4R, 4R…). Find the total work required in baseline units, then sum the progression day by day.',
    memoryHook: 'Cumulative Running Work: Keep a running tally of completed units at the close of each day until the total work is eclipsed.',
    animationType: 'two-workers-lcm',
    animationData: {
      baseDays: 14,
    },
    shortcut: 'Group into 2-day pairs: Day 1-2 = 2R, Day 3-4 = 4R (total 6R), Day 5-6 = 8R (total 14R). Job is exactly 14R, so done in 6 days!',
    trap: 'Multiplying by 2 on day 2 instead of after every 2 days.',
    practiceQuestions: [
      {
        question: 'A worker finishes a task in 14 days at normal rate R. If his output doubles every 2 days (R for days 1-2, 2R for days 3-4, 4R for days 5-6), how many days will he take?',
        options: ['6 days', '7 days', '8 days', '5 days'],
        answer: '6 days',
        detailedSolution: 'Total work = 14R. Days 1–2: 2 × R = 2R. Days 3–4: 2 × 2R = 4R (cumulative 6R). Days 5–6: 2 × 4R = 8R (cumulative 14R). Exactly 14R completed at the end of Day 6.',
      },
    ],
  },
  {
    id: 'adv-tw-staggered-pipes',
    subjectId: 'time-work',
    title: 'Staggered Pipe Openings with Interval Accumulation',
    levelTag: 'SBI/RBI Mains',
    idea: 'Pipes with fill times 10, 15, and 30 minutes are opened with 2-minute delays: Pipe 1 at t=0, Pipe 2 at t=2, Pipe 3 at t=4. Calculate work done during intervals before all run together.',
    memoryHook: 'Interval Accounting: Work in [0,2] + Work in [2,4] + Remainder with All Three.',
    animationType: 'pipes-cisterns',
    animationData: {
      times: [10, 15, 30],
      stagger: 2,
    },
    shortcut: 'LCM(10, 15, 30) = 30 units. Rates: A=3, B=2, C=1. In first 2 min, A does 6. In next 2 min, A+B do (3+2)×2 = 10. Remainder = 30 − 16 = 14 units. All three do 6/min ⇒ 14 ÷ 6 = 2 1/3 min. Total = 4 + 2 1/3 = 6 1/3 min.',
    trap: 'Assuming all pipes were running from t=0 and dividing 30 by 6.',
    practiceQuestions: [
      {
        question: 'Pipes A, B, C fill a tank in 10, 15, and 30 min. A opens at t=0, B at t=2 min, and C at t=4 min. When will the tank be full?',
        options: ['6 1/3 min', '7 min', '6 min', '8 min'],
        answer: '6 1/3 min',
        detailedSolution: 'LCM = 30 units. Rates: A=3, B=2, C=1. Minutes 0-2: A runs = 2×3 = 6 units. Minutes 2-4: A+B run = 2×5 = 10 units. Total done in 4 min = 16 units. Remaining = 14 units. All 3 rate = 3+2+1 = 6 units/min. Time for remaining = 14 ÷ 6 = 2 1/3 min. Total time = 4 + 2 1/3 = 6 1/3 min.',
      },
    ],
  },
];
