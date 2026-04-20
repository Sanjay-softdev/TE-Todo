import { useEffect } from 'react';

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
      <div 
        onClick={onStopRecording}
        className="w-full bg-[#1A1A1A] rounded-xl flex items-center justify-between cursor-pointer animate-slide-up"
        style={{ padding: '12px 16px' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFDD00] animate-pulse" />
          <span className="text-[#FFDD00] text-[13px] font-semibold">Recording…</span>
        </div>
        <span className="text-[#555555] text-xs font-medium">{formatTime(recordingSeconds)}</span>
      </div>
    );
  }

  if (isTranscribing) {
    return (
      <div 
        className="w-full bg-[#1A1A1A] rounded-xl flex items-center justify-between animate-slide-up"
        style={{ padding: '12px 16px' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-[#FFDD00] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#FFDD00] text-[13px] font-semibold">Transcribing…</span>
        </div>
      </div>
    );
  }

  if (transcript) {
    return (
      <div className="flex flex-col gap-1 animate-slide-up">
        <label 
          className="text-[#888888] uppercase tracking-wider"
          style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.6px' }}
        >
          VOICE TRANSCRIPT
        </label>
        <textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          className="bg-[#F5F5F5] border-none rounded-xl text-[#1A1A1A] placeholder:text-[#888888] transition-default focus:outline-none focus:ring-2 focus:ring-[#FFDD00] resize-none"
          style={{ 
            fontSize: '13px',
            padding: '12px 16px',
            lineHeight: 1.6
          }}
          rows={3}
          placeholder="Edit transcript if needed..."
        />
      </div>
    );
  }

  return null;
}
