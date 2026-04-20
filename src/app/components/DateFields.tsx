import { useState } from 'react';
import { format } from 'date-fns';

interface DateFieldsProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function DateFields({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: DateFieldsProps) {
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col" style={{ gap: '4px' }}>
      <label 
        className="text-[#1A1A1A] uppercase tracking-wider"
        style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}
      >
        DUE DATE<span className="text-[#E24B4A] ml-0.5">*</span>
      </label>
      <div className="grid grid-cols-2" style={{ gap: '6px' }}>
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            aria-required={true}
            className="w-full bg-[#F5F5F5] border-none rounded-md text-[#1A1A1A] transition-default focus:outline-none focus:ring-2 focus:ring-[#FFDD00]"
            style={{ 
              fontSize: '12px',
              padding: '9px 10px',
              borderRadius: '6px'
            }}
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            aria-required={true}
            className="w-full bg-[#F5F5F5] border-none rounded-md text-[#1A1A1A] transition-default focus:outline-none focus:ring-2 focus:ring-[#FFDD00]"
            style={{ 
              fontSize: '12px',
              padding: '9px 10px',
              borderRadius: '6px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
