interface AssigneeChipsProps {
  assignees: string[];
  value: string;
  onChange: (value: string) => void;
}

export function AssigneeChips({ assignees, value, onChange }: AssigneeChipsProps) {
  return (
    <div className="flex flex-col gap-2">
      <label 
        className="text-[#1A1A1A] font-bold uppercase tracking-[1px] text-[10px]"
      >
        ASSIGN TO
      </label>
      <div className="flex flex-wrap gap-2 py-1">
        {assignees.map((assignee) => {
          const isActive = value === assignee;
          return (
            <button
              key={assignee}
              type="button"
              onClick={() => onChange(assignee)}
              className={`h-[32px] rounded-[8px] border-none text-[12px] font-semibold transition-all cursor-pointer whitespace-nowrap px-4 shadow-sm active:scale-95 ${
                isActive 
                  ? 'bg-[#1A1A1A] text-[#FFDD00] ring-2 ring-[#FFDD00] ring-offset-2' 
                  : 'bg-[#F5F5F5] text-[#1A1A1A] hover:bg-[#ECECEC]'
              }`}
            >
              {assignee}
            </button>
          );
        })}
      </div>
    </div>
  );
}
