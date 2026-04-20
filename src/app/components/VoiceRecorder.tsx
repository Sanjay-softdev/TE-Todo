import { useState, useEffect } from 'react';

interface VoiceRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  transcript: string;
  onTranscriptChange: (text: string) => void;
}

export function VoiceRecorder({ 
  isRecording, 
  onStartRecording, 
  onStopRecording,
  transcript,
  onTranscriptChange
}: VoiceRecorderProps) {
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isRecording) {
    return (
      <div 
        className="w-full bg-[#1A1A1A] rounded-md flex items-center justify-between"
        style={{ 
          padding: '9px 12px',
          borderRadius: '6px'
        }}
      >
        <div className="flex items-center" style={{ gap: '8px' }}>
          <div 
            className="w-2 h-2 rounded-full bg-[#FFDD00] pulse-recording"
          ></div>
          <span 
            className="text-[#FFDD00]"
            style={{ fontSize: '10px', fontWeight: 500 }}
          >
            Recording…
          </span>
        </div>
        <button
          onClick={onStopRecording}
          className="text-[#888888] cursor-pointer bg-transparent border-none"
          style={{ fontSize: '9px' }}
        >
          {formatTime(recordingTime)}
        </button>
      </div>
    );
  }

  if (transcript) {
    return (
      <div className="flex flex-col" style={{ gap: '4px' }}>
        <label 
          className="text-[#1A1A1A] uppercase tracking-wider"
          style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}
        >
          VOICE TRANSCRIPT
        </label>
        <textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          className="bg-[#F5F5F5] border-none rounded-md text-[#1A1A1A] placeholder:text-[#888888] transition-default focus:outline-none focus:ring-2 focus:ring-[#FFDD00] resize-none"
          style={{ 
            fontSize: '12px',
            padding: '9px 10px',
            borderRadius: '6px',
            lineHeight: 1.6
          }}
          rows={3}
        />
      </div>
    );
  }

  return null;
}
