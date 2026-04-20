import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: 'input' | 'textarea';
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export function FormField({ 
  label, 
  required = false, 
  type = 'input',
  inputProps,
  textareaProps
}: FormFieldProps) {
  return (
    <div className="flex flex-col" style={{ gap: '4px' }}>
      <label 
        className="text-[#1A1A1A] uppercase tracking-wider"
        style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}
      >
        {label}
        {required && <span className="text-[#E24B4A] ml-0.5">*</span>}
      </label>
      {type === 'input' ? (
        <input
          {...inputProps}
          aria-required={required}
          className="bg-[#F5F5F5] border-none rounded-md text-[#1A1A1A] placeholder:text-[#888888] transition-default focus:outline-none focus:ring-2 focus:ring-[#FFDD00]"
          style={{ 
            fontSize: '12px',
            padding: '9px 10px',
            borderRadius: '6px'
          }}
        />
      ) : (
        <textarea
          {...textareaProps}
          aria-required={required}
          className="bg-[#F5F5F5] border-none rounded-md text-[#1A1A1A] placeholder:text-[#888888] transition-default focus:outline-none focus:ring-2 focus:ring-[#FFDD00] resize-none"
          style={{ 
            fontSize: '12px',
            padding: '9px 10px',
            borderRadius: '6px',
            lineHeight: 1.6
          }}
          rows={3}
        />
      )}
    </div>
  );
}
