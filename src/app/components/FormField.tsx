import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'textarea';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export function FormField({ 
  label, 
  required, 
  type = 'text',
  inputProps,
  textareaProps 
}: FormFieldProps) {
  const commonStyles = "w-full bg-[#F5F5F5] border-none rounded-input text-[#1A1A1A] placeholder:text-[#888888] transition-default focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-0";
  const inlineStyles = {
    padding: '9px 10px',
    fontSize: '12px',
    fontWeight: 400
  };

  return (
    <div className="flex flex-col gap-1">
      <label 
        className="text-[#1A1A1A] font-medium uppercase tracking-[0.6px]"
        style={{ fontSize: '9px' }}
      >
        {label}
        {required && <span className="text-[#E24B4A] ml-0.5">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          {...textareaProps}
          className={commonStyles}
          style={{ ...inlineStyles, lineHeight: '1.6', minHeight: '80px' }}
        />
      ) : (
        <input
          {...inputProps}
          type={type}
          className={commonStyles}
          style={inlineStyles}
        />
      )}
    </div>
  );
}
