import { useState } from 'react';

interface AssigneeChipsProps {
  assignees: string[];
  value: string;
  onChange: (assignee: string) => void;
}

export function AssigneeChips({ assignees, value, onChange }: AssigneeChipsProps) {
  return (
    <div className="flex flex-col" style={{ gap: '4px' }}>
      <label 
        className="text-[#1A1A1A] uppercase tracking-wider"
        style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}
      >
        ASSIGNEE<span className="text-[#E24B4A] ml-0.5">*</span>
      </label>
      <div className="flex overflow-x-auto gap-1.5" style={{ gap: '6px' }}>
        {assignees.map((assignee) => (
          <button
            key={assignee}
            type="button"
            onClick={() => onChange(assignee)}
            className={`flex-1 min-w-[80px] h-7 rounded transition-default ${
              value === assignee 
                ? 'bg-[#1A1A1A] text-[#FFDD00]' 
                : 'bg-[#F5F5F5] text-[#1A1A1A]'
            }`}
            style={{ 
              fontSize: '10px', 
              fontWeight: 500,
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {assignee}
          </button>
        ))}
      </div>
    </div>
  );
}
