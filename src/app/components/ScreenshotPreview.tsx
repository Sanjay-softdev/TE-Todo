interface ScreenshotPreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export function ScreenshotPreview({ imageUrl, onRemove }: ScreenshotPreviewProps) {
  return (
    <div className="relative w-full">
      <img 
        src={imageUrl} 
        alt="Screenshot preview"
        className="w-full object-cover"
        style={{ 
          maxHeight: '120px',
          borderRadius: '6px'
        }}
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#1A1A1A] flex items-center justify-center cursor-pointer border-none"
        aria-label="Remove screenshot"
      >
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 16 16" 
          fill="none" 
          stroke="#FFDD00"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="4" x2="12" y2="12"/>
          <line x1="12" y1="4" x2="4" y2="12"/>
        </svg>
      </button>
    </div>
  );
}
