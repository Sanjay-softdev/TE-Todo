import { useRef } from 'react';

interface AttachmentButtonsProps {
  isRecording: boolean;
  onVoiceClick: () => void;
  onScreenshotSelect: (file: File) => void;
}

export function AttachmentButtons({ 
  isRecording, 
  onVoiceClick,
  onScreenshotSelect
}: AttachmentButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScreenshotClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onScreenshotSelect(file);
    }
  };

  return (
    <div className="flex" style={{ gap: '6px' }}>
      <button
        type="button"
        onClick={onVoiceClick}
        className={`flex-1 flex flex-col items-center justify-center transition-default cursor-pointer border-none ${
          isRecording ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'
        }`}
        style={{ 
          padding: '14px',
          borderRadius: '6px',
          gap: '6px'
        }}
      >
        <div className="w-[18px] h-[18px] rounded-full bg-[#1A1A1A] flex items-center justify-center">
          <svg 
            width="10" 
            height="10" 
            viewBox="0 0 16 16" 
            fill="none" 
            stroke="#FFDD00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="2" width="4" height="8" rx="2"/>
            <path d="M4 9a4 4 0 0 0 8 0"/>
            <line x1="8" y1="13" x2="8" y2="14"/>
          </svg>
        </div>
        <span 
          className={`${isRecording ? 'text-[#888888]' : 'text-[#888888]'}`}
          style={{ fontSize: '9px' }}
        >
          Voice
        </span>
      </button>

      <button
        type="button"
        onClick={handleScreenshotClick}
        className="flex-1 bg-[#F5F5F5] flex flex-col items-center justify-center transition-default cursor-pointer border-none"
        style={{ 
          padding: '14px',
          borderRadius: '6px',
          gap: '6px'
        }}
      >
        <div className="w-[18px] h-[18px] rounded-full bg-[#1A1A1A] flex items-center justify-center">
          <svg 
            width="10" 
            height="10" 
            viewBox="0 0 16 16" 
            fill="none" 
            stroke="#FFDD00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="12" height="9" rx="1"/>
            <circle cx="8" cy="9" r="2"/>
            <path d="M6 4L7 2h2l1 2"/>
          </svg>
        </div>
        <span className="text-[#888888]" style={{ fontSize: '9px' }}>
          Screenshot
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
