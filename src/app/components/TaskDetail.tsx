import { useState } from 'react';

interface TaskDetailProps {
  task: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    assignedDate?: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'done';
    voiceTranscript?: string;
    screenshotUrl?: string;
  };
  onBack: () => void;
  onStatusChange: (status: 'pending' | 'in-progress' | 'done') => void;
}

export function TaskDetail({ task, onBack, onStatusChange }: TaskDetailProps) {
  const [currentStatus, setCurrentStatus] = useState(task.status);

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'done') => {
    setCurrentStatus(newStatus);
    onStatusChange(newStatus);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white max-w-[480px] mx-auto">
      {/* App Bar */}
      <div className="bg-[#FFDD00] h-16 px-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer hover:bg-[#2A2A2A] transition-default"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[#1A1A1A] flex-1" style={{ fontSize: '16px', fontWeight: 500 }}>
          Task detail
        </h1>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
            TITLE
          </label>
          <div className="text-[#1A1A1A]" style={{ fontSize: '17px', fontWeight: 500 }}>
            {task.title}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div>
            <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
              DESCRIPTION
            </label>
            <div className="text-[#888888]" style={{ fontSize: '13px', lineHeight: 1.6 }}>
              {task.description}
            </div>
          </div>
        )}

        {/* Assigned To */}
        <div>
          <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
            ASSIGNED TO
          </label>
          <div className="bg-[#F5F5F5] rounded-[10px] p-[10px_12px] flex items-center gap-3">
            <div className="w-[26px] h-[26px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00]" style={{ fontSize: '11px', fontWeight: 500 }}>
              {getInitials(task.assignedTo)}
            </div>
            <div>
              <div className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 500 }}>
                {task.assignedTo}
              </div>
              <div className="text-[#888888]" style={{ fontSize: '11px' }}>
                Notified via Zoho Cliq
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
            DATES
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F5F5F5] rounded-[10px] p-[10px_12px]">
              <div className="text-[#888888] mb-1" style={{ fontSize: '9px', fontWeight: 500 }}>
                ASSIGNED
              </div>
              <div className="text-[#1A1A1A]" style={{ fontSize: '13px', fontWeight: 500 }}>
                {formatDate(task.assignedDate)}
              </div>
            </div>
            <div className="bg-[#F5F5F5] rounded-[10px] p-[10px_12px]">
              <div className="text-[#888888] mb-1" style={{ fontSize: '9px', fontWeight: 500 }}>
                DUE DATE
              </div>
              <div className="text-[#1A1A1A]" style={{ fontSize: '13px', fontWeight: 500 }}>
                {formatDate(task.dueDate)}
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
            STATUS
          </label>
          <div className="flex gap-2">
            {(['pending', 'in-progress', 'done'] as const).map((status) => {
              const isActive = currentStatus === status;
              const getStyle = () => {
                if (!isActive) return 'bg-[#F5F5F5] text-[#888888]';
                if (status === 'pending') return 'bg-[#FFDD00] text-[#1A1A1A]';
                if (status === 'in-progress') return 'bg-[#1A1A1A] text-[#FFDD00]';
                return 'bg-[#F5F5F5] text-[#888888]';
              };

              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`flex-1 py-2 rounded-lg border-none cursor-pointer transition-default ${getStyle()}`}
                  style={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {status === 'in-progress' ? 'In progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Voice Transcript */}
        {task.voiceTranscript && (
          <div>
            <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
              VOICE NOTE
            </label>
            <div className="bg-[#1A1A1A] rounded-[12px] p-[12px_14px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[10px] h-[10px] rounded-full bg-[#FFDD00]"></div>
                <span className="text-[#FFDD00]" style={{ fontSize: '11px', fontWeight: 500 }}>
                  Transcribed note
                </span>
              </div>
              <div className="text-[#777777]" style={{ fontSize: '11px', lineHeight: 1.5 }}>
                {task.voiceTranscript}
              </div>
            </div>
          </div>
        )}

        {/* Screenshot */}
        <div>
          <label className="text-[#888888] uppercase block mb-2" style={{ fontSize: '9px', letterSpacing: '0.5px', fontWeight: 500 }}>
            SCREENSHOT
          </label>
          {task.screenshotUrl ? (
            <img
              src={task.screenshotUrl}
              alt="Task screenshot"
              className="w-full max-h-[200px] object-cover rounded-[10px]"
            />
          ) : (
            <div className="bg-[#F5F5F5] rounded-[10px] h-[72px] flex items-center justify-center text-[#888888]" style={{ fontSize: '12px' }}>
              No screenshot
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
