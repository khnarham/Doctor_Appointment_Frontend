'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  id: string;
  name: string;
  description?: string;
}

interface CustomSelectProps {
  label?: string;
  icon?: React.ReactNode;
  options?: SelectOption[]; // Made optional to prevent undefined crashes
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  error?: string;
  required?: boolean;
  searchable?: boolean;
}

export function CustomSelect({
  label,
  icon,
  options = [], // Default to empty array
  value,
  onChange,
  placeholder = 'Select an option...',
  isLoading = false,
  error,
  required = false,
  searchable = true,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure options is always a valid array
  const safeOptions = Array.isArray(options) ? options : [];

  // Safe find operation
  const selectedOption = safeOptions.find((opt) => opt && opt.id === value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safe filter operation with null guards
  const filteredOptions = safeOptions.filter((opt) => {
    if (!opt || !opt.name) return false;
    return opt.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {label && (
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          {icon}
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-left font-medium transition-all flex items-center justify-between',
            'hover:bg-slate-100/50 focus:outline-none focus:ring-2 focus:bg-white',
            isOpen ? 'ring-2 ring-teal-500/20 border-teal-500 bg-white' : 'border-[var(--border-light)]',
            error ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' : 'focus:ring-teal-500/20 focus:border-teal-500',
            isLoading && 'opacity-60 cursor-not-allowed'
          )}
        >
          <span className={selectedOption ? 'text-slate-800 font-semibold' : 'text-slate-400'}>
            {selectedOption ? selectedOption.name : placeholder}
          </span>

          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400 shrink-0 ml-2" />
          ) : (
            <ChevronDown
              className={cn(
                'h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2',
                isOpen && 'rotate-180 text-teal-600'
              )}
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && !isLoading && (
          <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/5 py-1.5 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100">
            {/* Search Input inside Dropdown */}
            {searchable && safeOptions.length > 5 && (
              <div className="px-2.5 pb-2 pt-1 border-b border-slate-100">
                <div className="relative flex items-center">
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-56 overflow-y-auto px-1 py-1 space-y-0.5">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-xs text-center text-slate-400 font-medium">
                  No options found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  if (!opt) return null;
                  const isSelected = opt.id === value;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onChange(opt.id);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={cn(
                        'w-full px-3 py-2 text-xs rounded-xl flex items-center justify-between transition-colors text-left',
                        isSelected
                          ? 'bg-teal-50 text-teal-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 font-medium'
                      )}
                    >
                      <div>
                        <div>{opt.name}</div>
                        {opt.description && (
                          <div className="text-[10px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                            {opt.description}
                          </div>
                        )}
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-teal-600 shrink-0 ml-2" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-[11px] font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  );
}