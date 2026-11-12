import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TwoWorkersCanvasProps {
  step: number;
  daysA?: number;
  daysB?: number;
  totalUnits?: number;
  rateA?: number;
  rateB?: number;
  resultDays?: number;
}

export const TwoWorkersCanvas: React.FC<TwoWorkersCanvasProps> = ({
  step = 1,
  daysA = 15,
  daysB = 10,
  totalUnits = 30,
  rateA = 2,
  rateB = 3,
  resultDays = 6,
}) => {
  const [activeHour, setActiveHour] = useState<number>(step === 4 ? 6 : step === 3 ? 1 : 0);
  const isMissingMode = step >= 5;

  // For 30 bricks: 3 rows of 10
  const bricksCount = totalUnits;
  const paintedByA = isMissingMode ? 3 * 6 : (rateA * (step === 4 ? 6 : step === 3 ? 1 : 0));
  const paintedByB = isMissingMode ? 2 * 6 : (rateB * (step === 4 ? 6 : step === 3 ? 1 : 0));

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top status */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
            {isMissingMode ? 'Missing Partner Mode' : 'LCM Work-Unit Mode'}
          </span>
          <span className="text-sm font-semibold text-slate-300">
            {isMissingMode
              ? 'A (10d) & Together (6d) ⇒ Find B alone'
              : 'A (15 days) + B (10 days) ⇒ Painting 30 Bricks'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-500 inline-block" />
            <span>Worker A ({isMissingMode ? '3/day' : '2/day'})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
            <span>Worker B ({isMissingMode ? '2/day' : '3/day'})</span>
          </span>
        </div>
      </div>

      {/* Canvas Body */}
      <div className="space-y-6 relative z-10">
        {/* The 30-brick architectural wall */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>THE 30-BRICK WALL (LCM of 15 and 10 = 30 UNITS)</span>
            <span className="text-emerald-400 font-bold">
              {step === 4 ? '30 / 30 BRICKS PAINTED (100%)' : step === 3 ? '5 / 30 BRICKS (DAY 1)' : '0 / 30 BRICKS UNPAINTED'}
            </span>
          </div>

          {/* Wall bricks container */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            {Array.from({ length: 3 }).map((_, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-10 gap-1.5">
                {Array.from({ length: 10 }).map((_, colIdx) => {
                  const brickIndex = rowIdx * 10 + colIdx;
                  const isPaintedA = brickIndex < paintedByA;
                  const isPaintedB = brickIndex >= paintedByA && brickIndex < paintedByA + paintedByB;
                  const isUnpainted = !isPaintedA && !isPaintedB;

                  return (
                    <motion.div
                      key={brickIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: brickIndex * 0.015 }}
                      className={`h-7 sm:h-9 rounded flex items-center justify-center font-mono text-[10px] transition-all ${
                        isPaintedA
                          ? 'bg-teal-600 text-white font-bold shadow-sm shadow-teal-500/30'
                          : isPaintedB
                          ? 'bg-amber-600 text-white font-bold shadow-sm shadow-amber-500/30'
                          : 'bg-slate-800/80 text-slate-600 border border-slate-700/50'
                      }`}
                    >
                      {isPaintedA ? 'A' : isPaintedB ? 'B' : `#${brickIndex + 1}`}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Rate tally cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30">
            <div className="text-xs text-teal-400 font-mono">Worker A Speed</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">
              {isMissingMode ? '30 ÷ 10 = 3 units/d' : '30 ÷ 15 = 2 units/d'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Total in 6 days = 12 units</div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <div className="text-xs text-amber-400 font-mono">Worker B Speed</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">
              {isMissingMode ? '5 − 3 = 2 units/d' : '30 ÷ 10 = 3 units/d'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Total in 6 days = 18 units</div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="text-xs text-emerald-400 font-mono">Combined Completion</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">
              {isMissingMode ? '30 ÷ 2 = 15 days' : '30 ÷ 5 = 6 days'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {isMissingMode ? 'Product/Diff: 10×6/4 = 15d' : 'Product/Sum: 15×10/25 = 6d'}
            </div>
          </div>
        </div>

        {/* Missing worker formula explanation if in step 5 or 6 */}
        {isMissingMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <span className="text-xs font-mono text-slate-400 block">MISSING PARTNER RULE</span>
              <span className="font-mono text-sm text-teal-300 font-semibold">
                T₂ = (a × T) ÷ (a − T) = (10 × 6) ÷ (10 − 6) = 60 ÷ 4 = 15 days
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs border border-teal-500/40">
              ✓ Verified: B alone takes 15 days
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
