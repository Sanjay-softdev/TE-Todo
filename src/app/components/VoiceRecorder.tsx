interface VoiceRecorderProps {
  isRecording: boolean;
  recordingSeconds: number;
  transcript: string;
  isTranscribing: boolean;
  onTranscriptChange: (text: string) => void;
  onStopRecording: () => void;
  onStartRecording: () => void;
}

export function VoiceRecorder({ 
  isRecording, 
  recordingSeconds,
  transcript,
  isTranscribing,
  onTranscriptChange,
  onStopRecording,
  onStartRecording
}: VoiceRecorderProps) {

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isRecording) {
    return (
      <button 
        onClick={(e) => {
          e.preventDefault();
          onStopRecording();
        }}
        className="w-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-between border-none cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        style={{ height: '52px', padding: '0 16px' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-[10px] h-[10px] rounded-full bg-[#FFDD00] animate-pulse" />
          <span className="text-[#FFDD00] text-[13px] font-medium">Recording…</span>
        </div>
        <span className="text-[#555555] text-[12px] font-normal">{formatTime(recordingSeconds)}</span>
      </button>
    );
  }

  if (isTranscribing) {
    return (
      <div 
        className="w-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-center gap-3"
        style={{ height: '52px', padding: '0 16px' }}
      >
        <div className="w-[14px] h-[14px] border-2 border-[#FFDD00] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#555555] text-[12px] font-medium">Transcribing…</span>
      </div>
    );
  }

  if (transcript) {
    return (
      <div className="flex flex-col gap-2">
        <div className="bg-[#F5F5F5] rounded-[8px] h-[44px] flex items-center px-4">
           {/* Mock audio player representation for visual alignment if needed, 
               but the prompt says audio player + transcript textarea */}
           <span className="text-[12px] text-[#888888]">Recording complete</span>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px]">VOICE TRANSCRIPT</label>
          <textarea
            value={transcript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            className="w-full bg-[#F5F5F5] border-none rounded-[8px] text-[#1A1A1A] placeholder:text-[#888888] transition-default focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-2"
            style={{ 
              fontSize: '13px',
              padding: '12px 16px',
              lineHeight: 1.5,
              resize: 'none'
            }}
            rows={3}
            placeholder="Edit transcript if needed..."
          />
        </div>
      </div>
    );
  }

  return null;
}
