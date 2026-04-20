import { useRef, ChangeEvent } from 'react';

interface ScreenshotUploadProps {
  onUpload: (file: File) => void;
  preview: string | null;
  onRemove: () => void;
}

export function ScreenshotUpload({ onUpload, preview, onRemove }: ScreenshotUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2">
      <button
        onClick={() => inputRef.current?.click()}
        className="bg-[#F5F5F5] rounded-md p-3 flex flex-col items-center justify-center gap-2 transition-all duration-150 hover:bg-[#ECECEC]"
      >
        <div className="w-[18px] h-[18px] rounded-full bg-[#1A1A1A] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FFDD00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="2" width="8" height="6" rx="1" />
            <circle cx="5" cy="5" r="1.5" />
          </svg>
        </div>
        <span className="text-[#888888]" style={{ fontSize: '9px' }}>
          Screenshot
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Screenshot preview"
            className="w-full max-h-[120px] object-cover rounded-md"
          />
          <button
            onClick={onRemove}
            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00] hover:bg-[#2A2A2A]"
            style={{ fontSize: '10px' }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
