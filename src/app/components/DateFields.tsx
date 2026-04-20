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
  
  const inputStyles = "w-full bg-[#F5F5F5] border-none rounded-[6px] text-[#1A1A1A] transition-default focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-0";
  const inlineStyles = {
    padding: '9px 10px',
    fontSize: '12px',
    fontWeight: 400
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex flex-col gap-1">
           <label className="text-[#1A1A1A] font-medium uppercase tracking-[0.6px]" style={{ fontSize: '9px' }}>
            ASSIGNED DATE
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className={inputStyles}
            style={inlineStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
           <label className="text-[#1A1A1A] font-medium uppercase tracking-[0.6px]" style={{ fontSize: '9px' }}>
            DUE DATE<span className="text-[#E24B4A] ml-0.5">*</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className={inputStyles}
            style={inlineStyles}
          />
        </div>
      </div>
    </div>
  );
}
