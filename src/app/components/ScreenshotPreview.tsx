interface ScreenshotPreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export function ScreenshotPreview({ imageUrl, onRemove }: ScreenshotPreviewProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[10px] animate-slide-up border-[0.5px] border-[#ECECEC]">
      <img 
        src={imageUrl} 
        alt="Screenshot preview"
        className="w-full object-cover block"
        style={{ 
          maxHeight: '160px',
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="absolute top-2 right-2 w-[24px] h-[24px] rounded-full bg-[#1A1A1A] flex items-center justify-center cursor-pointer border-none shadow-lg active:scale-90 transition-all z-10"
        aria-label="Remove screenshot"
      >
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFDD00"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
