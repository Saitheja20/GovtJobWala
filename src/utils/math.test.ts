import test from 'node:test';
import assert from 'node:assert/strict';
import {
  gcd,
  lcm,
  calculateUnitBoxSharing,
  calculateDifferenceShare,
  calculateTwoWorkersTogether,
  calculateMissingWorker,
  calculateThreeWorkersTogether,
  calculatePipesTime,
  calculateAlternateDays,
  calculateDilution,
  verifyLessonSelfCheck,
} from './math';

test('gcd and lcm calculations', () => {
  assert.equal(gcd(36, 48), 12);
  assert.equal(lcm(15, 10), 30);
  assert.equal(lcm(12, 15), 60);
});

test('Unit-box sharing: Rs 450 in 4:5 ratio gives 9 boxes of 50 -> Rs 200 and Rs 250', () => {
  const result = calculateUnitBoxSharing(450, [4, 5]);
  assert.equal(result.boxValue, 50);
  assert.equal(result.shares[0], 200);
  assert.equal(result.shares[1], 250);
});

test('Difference given: ratio 5:7 differing by 36 gives 1 box = 18 and smaller = 90', () => {
  const result = calculateDifferenceShare(36, 5, 7);
  assert.equal(result.boxValue, 18);
  assert.equal(result.shareA, 90);
  assert.equal(result.shareB, 126);
});

test('Two workers together: A 15 days, B 10 days finish in 6 days', () => {
  const days = calculateTwoWorkersTogether(15, 10);
  assert.equal(days, 6);
});

test('Missing worker: A and B together in 6 days, A alone in 10 days -> B alone in 15 days', () => {
  const bDays = calculateMissingWorker(10, 6);
  assert.equal(bDays, 15);
});

test('Three workers: 12, 15, 20 days -> together in 5 days', () => {
  const days = calculateThreeWorkersTogether(12, 15, 20);
  assert.equal(days, 5);
});

test('Pipes & cisterns: Inlet 10h (+3), Outlet 15h (-2) -> net +1, fills 30 units in 30 hours', () => {
  const result = calculatePipesTime([10], [15]);
  assert.equal(result.totalUnits, 30);
  assert.equal(result.netRate, 1);
  assert.equal(result.timeToFill, 30);
});

test('Pipes & cisterns Example 8.1: Inlets 10h & 12h, Outlet 15h -> net 7, time 60/7 = 8.5714', () => {
  const result = calculatePipesTime([10, 12], [15]);
  assert.equal(result.totalUnits, 60);
  assert.equal(result.netRate, 7);
  assert.equal(Math.round((result.timeToFill) * 100) / 100, Math.round((60 / 7) * 100) / 100);
});

test('Dilution replacement formula: 60 L milk, remove 6 L twice -> 48.6 L', () => {
  const left = calculateDilution(60, 6, 2);
  assert.equal(Math.round(left * 10) / 10, 48.6);
});

test('Hidden self-check verification logic passes with correct values', () => {
  const checkUnitBox = verifyLessonSelfCheck({
    type: 'unit-box',
    params: { total: 450, partA: 4, partB: 5 },
    expectedAnswer: 200,
  });
  assert.equal(checkUnitBox.passes, true);

  const checkTwoWorkers = verifyLessonSelfCheck({
    type: 'two-workers',
    params: { daysA: 15, daysB: 10 },
    expectedAnswer: 6,
  });
  assert.equal(checkTwoWorkers.passes, true);
});
