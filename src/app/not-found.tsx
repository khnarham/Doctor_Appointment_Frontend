'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export default function NotFound() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playHeartbeat = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Lub sound
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, now);
    osc1.frequency.exponentialRampToValueAtTime(28, now + 0.12);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // Dub sound
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(80, now + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(32, now + 0.3);
    gain2.gain.setValueAtTime(0.2, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 0.3);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (soundEnabled) {
      playHeartbeat();
      interval = setInterval(playHeartbeat, 2600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [soundEnabled]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
               <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-700 transition-all duration-200">
            <Stethoscope className="w-5 h-5" />
          </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Care<span className="text-emerald-400">Clinic</span>
          </span>
        </Link>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2.5 rounded-xl border border-emerald-500/20 backdrop-blur-md transition-all flex items-center gap-2 text-xs font-medium ${
            soundEnabled ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' : 'text-slate-300 hover:text-emerald-400'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
          </svg>
          <span>Pulse Sound: {soundEnabled ? 'On' : 'Off'}</span>
        </button>
      </header>

      {/* Main 404 Section */}
      <main className="relative z-10 my-auto px-6 py-12 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-600">
          4<span className="text-emerald-400">0</span>4
        </h1>

        <div className="space-y-3 mt-4 max-w-lg">
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center justify-center gap-2">
            <span>Appointment Link Not Found</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              CareClinic 404
            </span>
          </h2>
          <p className="text-slate-300/80 text-sm sm:text-base">
            The page or patient record you are looking for has been moved or doesn't exist in our clinic system.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all">
            Retrun Home
          </Link>
          <Link href="/patient/appointment" className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-emerald-500/20 text-slate-200 hover:text-white font-semibold text-sm hover:border-emerald-500/50 hover:bg-emerald-950/30 transition-all">
            Book New Appointment
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-emerald-950/60">
        &copy; {new Date().getFullYear()} CareClinic Medical Network. All rights reserved.
      </footer>
    </div>
  );
}