'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Stethoscope,
  DollarSign,
  ChevronDown,
  Check,
  RotateCcw,
  X,
} from 'lucide-react';

interface Specialization {
  id: string;
  name: string;
}

interface DoctorFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedSpecialization: string;
  setSelectedSpecialization: (v: string) => void;
  maxFee: number;
  setMaxFee: (v: number) => void;
  specializations: Specialization[];
  defaultMaxFee?: number;
}

export function DoctorFilters({
  searchTerm,
  setSearchTerm,
  selectedSpecialization,
  setSelectedSpecialization,
  maxFee,
  setMaxFee,
  specializations,
  defaultMaxFee = 4000,
}: DoctorFiltersProps) {
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const specDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        specDropdownRef.current &&
        !specDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSpecOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedSpecObj = specializations.find(
    (s) => s.id === selectedSpecialization
  );

  const isFilterActive =
    searchTerm.trim() !== '' ||
    selectedSpecialization !== '' ||
    (maxFee > 0 && maxFee < defaultMaxFee);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSpecialization('');
    setMaxFee(0); // 0 or defaultMaxFee
  };

  // Calculate percentage for dynamic slider gradient background
  const sliderMin = 10;
  const sliderMax = defaultMaxFee;
  const currentFeeVal = maxFee > 0 ? maxFee : sliderMax;
  const sliderPercentage =
    ((currentFeeVal - sliderMin) / (sliderMax - sliderMin)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-5"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-slate-900 font-extrabold text-sm tracking-tight">
              Filter Practitioners
            </h3>
            <p className="text-[11px] font-semibold text-slate-400">
              Refine your doctor search in real-time
            </p>
          </div>
        </div>

        {/* Animated Reset Button */}
        <AnimatePresence>
          {isFilterActive && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 text-slate-600 text-xs font-bold rounded-xl transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* 1. Search Field */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Doctor Name / License
          </label>
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition" />
            <input
              type="text"
              placeholder="Search doctor or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50/80 border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Custom Animated Specialization Dropdown */}
        <div className="space-y-1.5" ref={specDropdownRef}>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Medical Field
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSpecOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between pl-3.5 pr-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                isSpecOpen
                  ? 'bg-white border-2 border-indigo-600 shadow-sm ring-2 ring-indigo-500/10'
                  : 'bg-slate-50/80 border border-slate-200/90 hover:bg-slate-100/80 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Stethoscope
                  className={`h-4 w-4 shrink-0 ${
                    selectedSpecialization ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">
                  {selectedSpecObj ? selectedSpecObj.name : 'All Specializations'}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isSpecOpen ? 'rotate-180 text-indigo-600' : ''
                }`}
              />
            </button>

            {/* Dropdown Floating Menu */}
            <AnimatePresence>
              {isSpecOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute z-50 mt-2 w-full bg-white border border-slate-200 shadow-xl rounded-2xl p-1.5 max-h-56 overflow-y-auto space-y-0.5 custom-scrollbar"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpecialization('');
                      setIsSpecOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                      selectedSpecialization === ''
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Specializations</span>
                    {selectedSpecialization === '' && (
                      <Check className="h-3.5 w-3.5 text-indigo-600" />
                    )}
                  </button>

                  {specializations.map((spec) => {
                    const isSelected = selectedSpecialization === spec.id;
                    return (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => {
                          setSelectedSpecialization(spec.id);
                          setIsSpecOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{spec.name}</span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Styled Consultation Fee Slider */}
        <div className="space-y-2 bg-slate-50/80 border border-slate-200/90 rounded-2xl p-2.5">
          <div className="flex justify-between items-center px-1">
            <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Max Fee
            </span>
            <div className="flex items-center gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentFeeVal}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.1 }}
                  className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100"
                >
                  ${currentFeeVal}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative px-1 pt-1">
            <input
              type="range"
              min={10}
              max={sliderMax}
              step="10"
              value={currentFeeVal}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%, #e2e8f0 100%)`,
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
            <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 mt-1">
              <span>${sliderMin}</span>
              <span>${sliderMax}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}