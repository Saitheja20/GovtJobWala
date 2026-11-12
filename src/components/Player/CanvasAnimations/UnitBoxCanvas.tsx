import React from 'react';
import { motion } from 'motion/react';

interface UnitBoxCanvasProps {
  step: number;
  total?: number;
  partA?: number;
  partB?: number;
  boxValue?: number;
  shareA?: number;
  shareB?: number;
  diff?: number;
  isPredictMode?: boolean;
}

export const UnitBoxCanvas: React.FC<UnitBoxCanvasProps> = ({
  step = 1,
  total = 450,
  partA = 4,
  partB = 5,
  boxValue = 50,
  shareA = 200,
  shareB = 250,
  diff = 0,
}) => {
  const isDiffMode = step >= 5;
  const currentPartA = isDiffMode ? 5 : partA;
  const currentPartB = isDiffMode ? 7 : partB;
  const totalBoxes = currentPartA + currentPartB;
  const currentBoxVal = isDiffMode ? 18 : boxValue;

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header bar within canvas */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
            {isDiffMode ? 'Difference Mode (5 : 7)' : 'Sharing Mode (4 : 5)'}
          </span>
          <span className="text-sm font-semibold text-slate-300">
            {isDiffMode ? 'Two numbers differ by 36' : 'Divide ₹450 in 4 : 5'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-500 inline-block" />
            <span className="text-slate-400">Part A ({currentPartA} boxes)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 inline-block" />
            <span className="text-slate-400">Part B ({currentPartB} boxes)</span>
          </span>
        </div>
      </div>

      {/* Main visualization area */}
      <div className="space-y-6 relative z-10">
        {/* Frame 1: Initial whole money bar */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <div className="text-xs font-mono text-slate-400">WHOLE UNTOUCHED POOL</div>
            <div className="h-16 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center font-display font-bold text-2xl shadow-lg shadow-teal-500/20">
              ₹450
            </div>
            <p className="text-xs text-slate-400 text-center">
              A recipe of 4 parts A and 5 parts B. We must split this single pool into equal boxes.
            </p>
          </motion.div>
        )}

        {/* Frame 2 & 3 & 4: Boxes strip */}
        {step >= 2 && step <= 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>TOTAL 9 EQUAL BOXES (4 + 5 = 9)</span>
              <span>1 BOX = ₹450 ÷ 9 = ₹50</span>
            </div>

            {/* Boxes grid */}
            <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
              {Array.from({ length: totalBoxes }).map((_, i) => {
                const isPartA = i < currentPartA;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className={`h-20 sm:h-24 rounded-lg flex flex-col items-center justify-between p-2 font-mono text-xs border ${
                      isPartA
                        ? 'bg-teal-500/20 border-teal-500/60 text-teal-300'
                        : 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                    }`}
                  >
                    <span className="text-[10px] opacity-75">
                      {isPartA ? `A${i + 1}` : `B${i - currentPartA + 1}`}
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: step >= 3 ? 1 : 0 }}
                      className="font-bold text-sm sm:text-base text-white"
                    >
                      ₹{boxValue}
                    </motion.span>
                    <span className="text-[9px] opacity-60">Box #{i + 1}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary calculation card */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800"
              >
                <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-teal-400 font-mono">Person A (4 boxes)</div>
                    <div className="text-lg font-bold text-white">4 × ₹50 = ₹200</div>
                  </div>
                  <div className="text-2xl font-bold font-mono text-teal-400">₹{shareA}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-mono">Person B (5 boxes)</div>
                    <div className="text-lg font-bold text-white">5 × ₹50 = ₹250</div>
                  </div>
                  <div className="text-2xl font-bold font-mono text-amber-400">₹{shareB}</div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Frame 5 & 6: Difference variant */}
        {isDiffMode && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>RATIO 5 : 7 (A = 5 boxes, B = 7 boxes)</span>
              <span className="text-red-400">GAP = 7 − 5 = 2 BOXES = 36</span>
            </div>

            {/* Comparison stacked bars */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-mono text-teal-400">A (5):</span>
                <div className="flex gap-1.5 flex-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={`da-${i}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="h-10 flex-1 rounded bg-teal-500/30 border border-teal-500/70 flex items-center justify-center font-mono text-xs text-white"
                    >
                      {step >= 6 ? '18' : 'box'}
                    </motion.div>
                  ))}
                  <div className="flex-1 opacity-0" />
                  <div className="flex-1 opacity-0" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 text-xs font-mono text-amber-400">B (7):</span>
                <div className="flex gap-1.5 flex-1">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const isExtra = i >= 5;
                    return (
                      <motion.div
                        key={`db-${i}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`h-10 flex-1 rounded flex items-center justify-center font-mono text-xs text-white ${
                          isExtra
                            ? 'bg-red-500/30 border border-red-500/80 animate-pulse'
                            : 'bg-amber-500/30 border border-amber-500/70'
                        }`}
                      >
                        {step >= 6 ? '18' : 'box'}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {step >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-4 mt-4"
              >
                <div>
                  <div className="text-xs text-slate-400 font-mono">1 Box Value</div>
                  <div className="text-lg font-bold text-white">36 ÷ 2 = 18</div>
                </div>
                <div>
                  <div className="text-xs text-teal-400 font-mono">Smaller Number (5 boxes)</div>
                  <div className="text-lg font-bold text-teal-300">5 × 18 = 90</div>
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-mono">Larger Number (7 boxes)</div>
                  <div className="text-lg font-bold text-amber-300">7 × 18 = 126</div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
