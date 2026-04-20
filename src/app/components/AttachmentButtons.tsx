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
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onVoiceClick}
        className={`flex-1 flex flex-col items-center justify-center transition-default cursor-pointer border-none py-3.5 rounded-xl gap-1.5 ${
          isRecording ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5] hover:bg-[#EAEAEA]'
        }`}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isRecording ? 'bg-[#FFDD00]' : 'bg-[#1A1A1A]'}`}>
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={isRecording ? '#1A1A1A' : '#FFDD00'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>
        <span 
          className={isRecording ? 'text-[#FFDD00]' : 'text-[#888888]'}
          style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}
        >
          {isRecording ? 'Recording...' : 'Voice Note'}
        </span>
      </button>

      <button
        type="button"
        onClick={handleScreenshotClick}
        className="flex-1 bg-[#F5F5F5] hover:bg-[#EAEAEA] flex flex-col items-center justify-center transition-default cursor-pointer border-none py-3.5 rounded-xl gap-1.5"
      >
        <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center">
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFDD00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
        <span className="text-[#888888]" style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
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
