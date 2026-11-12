import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Droplets, AlertOctagon } from 'lucide-react';

interface PipesCisternsCanvasProps {
  step: number;
  inletA?: number;
  outletB?: number;
  capacity?: number;
  netRate?: number;
  timeToFill?: number;
}

export const PipesCisternsCanvas: React.FC<PipesCisternsCanvasProps> = ({
  step = 1,
  inletA = 10,
  outletB = 15,
  capacity = 30,
  netRate = 1,
  timeToFill = 30,
}) => {
  const isLeakMode = step >= 5;
  const [waterFillPercent, setWaterFillPercent] = useState<number>(0);

  useEffect(() => {
    if (step === 1) setWaterFillPercent(10);
    else if (step === 2) setWaterFillPercent(30);
    else if (step === 3) setWaterFillPercent(50);
    else if (step === 4) setWaterFillPercent(100);
    else if (step === 5) setWaterFillPercent(40);
    else if (step === 6) setWaterFillPercent(20);
  }, [step]);

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

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
            {isLeakMode ? 'Leak Scenario Mode' : 'Pipes & Cisterns (Inlet + Outlet)'}
          </span>
          <span className="text-sm font-semibold text-slate-300">
            {isLeakMode
              ? 'Tap (6h) with Bottom Leak (8h) ⇒ Leak Time'
              : 'Inlet A (+3/h) vs Outlet B (−2/h)'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-500 inline-block" />
            <span>Inlet Flow (+3 units/h)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
            <span>Outlet Drain (−2 units/h)</span>
          </span>
        </div>
      </div>

      {/* Main Cistern Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Interactive Cistern Tank */}
        <div className="md:col-span-7 flex flex-col items-center justify-center relative py-4">
          {/* Top Inlet Pipe */}
          <div className="flex flex-col items-center relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-teal-400 font-bold">
                {isLeakMode ? 'Tap: Fills in 6h (+4/h)' : 'Inlet Pipe A: 10h (+3/h)'}
              </span>
            </div>
            {/* Pipe tube */}
            <div className="w-10 h-12 bg-teal-600 rounded-t-lg relative border-x-2 border-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-teal-200"
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Glass Cistern Tank */}
          <div className="w-64 sm:w-72 h-64 border-4 border-slate-700 rounded-b-2xl rounded-t-sm relative bg-slate-950/70 overflow-hidden flex flex-col justify-end shadow-2xl backdrop-blur-sm">
            {/* Height tick marks */}
            <div className="absolute top-0 right-2 bottom-0 flex flex-col justify-between py-2 text-[10px] font-mono text-slate-500 pointer-events-none z-20">
              <span>30 u (Full)</span>
              <span>20 u</span>
              <span>10 u</span>
              <span>0 u (Empty)</span>
            </div>

            {/* Rising Water Body */}
            <motion.div
              animate={{ height: `${waterFillPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full bg-gradient-to-t from-teal-700/80 via-teal-500/70 to-cyan-400/60 relative border-t-2 border-cyan-300 shadow-inner"
            >
              {/* Surface water ripple wave effect */}
              <div className="absolute top-0 inset-x-0 h-2 bg-white/30 animate-pulse" />

              {/* Internal bubbles */}
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white drop-shadow">
                {waterFillPercent === 100
                  ? 'TANK FULL (30 Units)'
                  : `${Math.round((waterFillPercent / 100) * 30)} / 30 Units`}
              </div>
            </motion.div>

            {/* Bottom Drain / Leak Pipe on the right side */}
            <div className="absolute bottom-2 -right-1 flex items-center z-20">
              <div className="h-8 w-12 bg-rose-600 rounded-r-lg border-y-2 border-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <motion.div
                  animate={{ x: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-rose-200"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom drain label */}
          <div className="mt-2 text-xs font-mono text-rose-400 font-bold flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5" />
            <span>
              {isLeakMode
                ? 'Bottom Leak: Empties full tank in 24h'
                : 'Outlet Pipe B: 15h (−2 units/hour)'}
            </span>
          </div>
        </div>

        {/* Right: Real-time Rate Dashboard */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Fluid Dynamic Balance
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-sm">
              <span className="text-teal-400">Inlet Delivery Rate:</span>
              <span className="font-mono font-bold text-teal-300">
                {isLeakMode ? '+4 units / hr' : '+3 units / hr'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-sm">
              <span className="text-rose-400">Outlet Draining Rate:</span>
              <span className="font-mono font-bold text-rose-300">
                {isLeakMode ? '−1 unit / hr' : '−2 units / hr'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-base font-bold">
              <span className="text-white">Net Filling Rate:</span>
              <span className="font-mono text-emerald-400">
                {isLeakMode ? '+3 units / hr' : '+1 unit / hr'}
              </span>
            </div>
          </div>

          {/* Time to fill card */}
          <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30">
            <div className="text-xs text-teal-400 font-mono">
              {isLeakMode ? 'Leak Alone Emptying Time' : 'Time to Complete Fill'}
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {isLeakMode ? '24 Hours' : '30 Hours'}
            </div>
            <div className="text-xs text-slate-300 mt-1 font-mono">
              {isLeakMode
                ? 'Formula: (6 × 8) ÷ (8 − 6) = 48 ÷ 2 = 24 h'
                : '30 units ÷ (+1 unit/hr) = 30 hours'}
            </div>
          </div>

          {/* Exam Trap Warning Pill */}
          <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>
              <strong>Trap Alert:</strong> Leak time must ALWAYS be strictly larger than the tap’s
              own time (24h &gt; 6h). If you get a smaller number, subtraction was inverted!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
