import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5 text-left w-full">
        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
          {label}
        </label>
        
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-zinc-400 pointer-events-none z-10">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            {...props}
            className={`w-full py-2.5 ${
              icon ? "pl-10" : "pl-3.5"
            } pr-3.5 text-sm rounded-xl border bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                : "border-zinc-200 focus:border-emerald-600 focus:ring-emerald-100"
            } ${className}`}
          />
        </div>

        {Boolean(error) && (
          <p className="text-xs font-semibold text-red-500 pl-1 mt-1 block">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";