/**
 * Mathematical utilities and verified solvers for BankExam Visual Academy.
 * Strictly adheres to formulas from Ratio & Proportion and Time & Work handbooks.
 */

// Greatest Common Divisor (Euclidean algorithm)
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

// Least Common Multiple
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.round((a * b) / gcd(a, b)));
}

export function lcmArray(numbers: number[]): number {
  if (!numbers.length) return 0;
  return numbers.reduce((acc, curr) => lcm(acc, curr), numbers[0]);
}

/**
 * Ratio: Unit-Box Sharing
 * 1 box = Total ÷ (a + b + c)
 * Returns array of shares
 */
export function calculateUnitBoxSharing(total: number, ratio: number[]): { boxValue: number; shares: number[] } {
  const sumOfParts = ratio.reduce((acc, n) => acc + n, 0);
  if (sumOfParts === 0) return { boxValue: 0, shares: ratio.map(() => 0) };
  const boxValue = total / sumOfParts;
  const shares = ratio.map((part) => part * boxValue);
  return { boxValue, shares };
}

/**
 * Ratio: Difference given
 * 1 box = Difference ÷ (diff of parts)
 */
export function calculateDifferenceShare(difference: number, ratioPartA: number, ratioPartB: number): {
  boxValue: number;
  shareA: number;
  shareB: number;
} {
  const diffParts = Math.abs(ratioPartA - ratioPartB);
  if (diffParts === 0) return { boxValue: 0, shareA: 0, shareB: 0 };
  const boxValue = difference / diffParts;
  return {
    boxValue,
    shareA: ratioPartA * boxValue,
    shareB: ratioPartB * boxValue,
  };
}

/**
 * Time & Work: Two Workers Together
 * T = (a * b) / (a + b)
 */
export function calculateTwoWorkersTogether(daysA: number, daysB: number): number {
  if (daysA <= 0 || daysB <= 0) return 0;
  return (daysA * daysB) / (daysA + daysB);
}

/**
 * Time & Work: Missing Worker
 * B = (a * T) / (a - T)
 */
export function calculateMissingWorker(daysA: number, totalDays: number): number {
  if (daysA <= totalDays) throw new Error("A's individual days must be strictly greater than combined days T");
  return (daysA * totalDays) / (daysA - totalDays);
}

/**
 * Time & Work: Three Workers Together
 * 1/T = 1/a + 1/b + 1/c
 */
export function calculateThreeWorkersTogether(a: number, b: number, c: number): number {
  const totalUnits = lcmArray([a, b, c]);
  const rateA = totalUnits / a;
  const rateB = totalUnits / b;
  const rateC = totalUnits / c;
  const combinedRate = rateA + rateB + rateC;
  return totalUnits / combinedRate;
}

/**
 * Time & Work: Pipes & Cisterns
 * Net rate = sum(inlets) - sum(outlets)
 * in hours or minutes
 */
export function calculatePipesTime(inletTimes: number[], outletTimes: number[]): {
  totalUnits: number;
  inletRates: number[];
  outletRates: number[];
  netRate: number;
  timeToFill: number;
} {
  const allTimes = [...inletTimes, ...outletTimes];
  const totalUnits = lcmArray(allTimes);
  const inletRates = inletTimes.map((t) => totalUnits / t);
  const outletRates = outletTimes.map((t) => totalUnits / t);
  const totalInlet = inletRates.reduce((acc, r) => acc + r, 0);
  const totalOutlet = outletRates.reduce((acc, r) => acc + r, 0);
  const netRate = totalInlet - totalOutlet;
  const timeToFill = netRate > 0 ? totalUnits / netRate : Infinity;
  return {
    totalUnits,
    inletRates,
    outletRates,
    netRate,
    timeToFill,
  };
}

/**
 * Time & Work: Alternate-Day Work
 * 2 workers alternating 1 day each, A starts
 */
export function calculateAlternateDays(daysA: number, daysB: number): {
  totalUnits: number;
  rateA: number;
  rateB: number;
  cycleWork: number;
  fullCycles: number;
  remainingUnits: number;
  totalDays: number;
} {
  const totalUnits = lcm(daysA, daysB);
  const rateA = totalUnits / daysA;
  const rateB = totalUnits / daysB;
  const cycleWork = rateA + rateB;
  const fullCycles = Math.floor(totalUnits / cycleWork);
  let remainingUnits = totalUnits - fullCycles * cycleWork;
  let extraDays = 0;

  if (remainingUnits > 0) {
    if (remainingUnits <= rateA) {
      extraDays = remainingUnits / rateA;
    } else {
      extraDays = 1 + (remainingUnits - rateA) / rateB;
    }
  }

  const totalDays = fullCycles * 2 + extraDays;
  return {
    totalUnits,
    rateA,
    rateB,
    cycleWork,
    fullCycles,
    remainingUnits,
    totalDays,
  };
}

/**
 * Dilution / Replacement Formula
 * Quantity left after n replacements = Initial * (1 - x / T)^n
 */
export function calculateDilution(initial: number, removedPerStep: number, replacements: number): number {
  const fraction = 1 - removedPerStep / initial;
  return initial * Math.pow(fraction, replacements);
}

/**
 * Hidden self-check verification for lessons
 */
export function verifyLessonSelfCheck(selfCheck: {
  type: string;
  params: Record<string, number>;
  expectedAnswer: number | string;
}): { passes: boolean; computed: number | string; expected: number | string } {
  let computed: number | string = 0;

  if (selfCheck.type === 'unit-box') {
    const { total, partA, partB } = selfCheck.params;
    const { shares } = calculateUnitBoxSharing(total, [partA, partB]);
    computed = shares[0]; // Share of A
  } else if (selfCheck.type === 'two-workers') {
    const { daysA, daysB } = selfCheck.params;
    computed = calculateTwoWorkersTogether(daysA, daysB);
  } else if (selfCheck.type === 'missing-worker') {
    const { daysA, totalDays } = selfCheck.params;
    computed = calculateMissingWorker(daysA, totalDays);
  } else if (selfCheck.type === 'pipes-cisterns') {
    const { inletA, outletB } = selfCheck.params;
    const res = calculatePipesTime([inletA], [outletB]);
    computed = res.timeToFill;
  }

  const numericExpected = typeof selfCheck.expectedAnswer === 'number'
    ? selfCheck.expectedAnswer
    : parseFloat(String(selfCheck.expectedAnswer));
  
  const numericComputed = typeof computed === 'number' ? computed : parseFloat(String(computed));

  const passes = Math.abs(numericComputed - numericExpected) < 0.001;
  return {
    passes,
    computed: typeof computed === 'number' ? Math.round(computed * 100) / 100 : computed,
    expected: selfCheck.expectedAnswer,
  };
}
