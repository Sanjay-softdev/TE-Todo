import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { StatusBar } from '../app/components/StatusBar';
import { formatDate, getRelativeTime } from '../utils/formatters';
import { toast } from 'sonner';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setTask(data);
      } catch (err) {
        toast.error('Task not found');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id, navigate]);

  const handleStatusUpdate = async (newStatus) => {
    if (task.status === newStatus) return;
    
    setUpdating(true);
    const oldStatus = task.status;
    setTask({ ...task, status: newStatus }); // Optimistic update

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
    } catch (err) {
      toast.error('Failed to update status');
      setTask({ ...task, status: oldStatus }); // Revert on error
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 bg-[#FFDD00] rounded-full animate-pulse" />
      </div>
    );
  }

  const userInitials = task.assigned_to?.substring(0, 2).toUpperCase() || 'NA';

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-[420px] mx-auto w-full animate-slide-up">
      <StatusBar />
      
      {/* App Bar */}
      <div className="bg-[#FFDD00] h-[64px] px-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-[34px] h-[34px] bg-[#1A1A1A] rounded-full flex items-center justify-center border-none cursor-pointer active:scale-90 transition-default"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-[#1A1A1A] font-semibold text-[15px]">Task detail</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 flex flex-col gap-6 pb-12">
        
        {/* Title Section */}
        <div className="flex flex-col">
          <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-1">TITLE</p>
          <h2 className="text-[16px] font-semibold text-[#1A1A1A] leading-[1.3]">{task.title}</h2>
        </div>

        {/* Description Section */}
        {task.description && (
          <div className="flex flex-col">
            <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-1">DESCRIPTION</p>
            <p className="text-[13px] text-[#888888] leading-[1.6]">{task.description}</p>
          </div>
        )}

        {/* Assigned To Section */}
        <div className="flex flex-col">
          <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-2">ASSIGNED TO</p>
          <div className="bg-[#F5F5F5] rounded-[10px] p-[11px] flex items-center gap-3">
            <div className="w-[34px] h-[34px] bg-[#1A1A1A] rounded-full flex items-center justify-center text-[#FFDD00] text-[12px] font-medium">
              {userInitials}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-[#1A1A1A]">{task.assigned_to || 'Unassigned'}</span>
              <span className="text-[11px] text-[#888888]">Notified via Zoho Cliq</span>
            </div>
          </div>
        </div>

        {/* Dates Grid */}
        <div className="flex flex-col">
          <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-2">DATES</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F5F5F5] rounded-[8px] p-[10px]">
              <p className="text-[9px] font-medium uppercase text-[#AAAAAA] mb-[3px]">ASSIGNED</p>
              <p className={`text-[13px] font-semibold ${task.assigned_date ? 'text-[#1A1A1A]' : 'text-[#888888]'}`}>
                {task.assigned_date ? formatDate(task.assigned_date) : 'Not set'}
              </p>
            </div>
            <div className="bg-[#F5F5F5] rounded-[8px] p-[10px]">
              <p className="text-[9px] font-medium uppercase text-[#AAAAAA] mb-[3px]">DUE DATE</p>
              <p className={`text-[13px] font-semibold ${task.due_date ? 'text-[#1A1A1A]' : 'text-[#888888]'}`}>
                {task.due_date ? formatDate(task.due_date) : 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Status Update Section */}
        <div className="flex flex-col">
          <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-2">STATUS</p>
          <div className="flex gap-[6px] w-full">
            {[
              { id: 'pending', label: 'Pending', activeClass: 'bg-[#FFDD00] text-[#1A1A1A]' },
              { id: 'in_progress', label: 'In Progress', activeClass: 'bg-[#1A1A1A] text-[#FFDD00]' },
              { id: 'done', label: 'Done', activeClass: 'bg-[#EAF3DE] text-[#3B6D11]' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => handleStatusUpdate(s.id)}
                disabled={updating}
                className={`flex-1 h-[44px] rounded-[8px] text-[12px] font-medium transition-all border-none cursor-pointer flex items-center justify-center ${
                  task.status === s.id ? s.activeClass : 'bg-[#F5F5F5] text-[#888888]'
                } ${updating ? 'opacity-60 cursor-wait' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Section */}
        {task.voice_transcript && (
          <div className="flex flex-col">
            <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-2">VOICE TRANSCRIPT</p>
            <div className="bg-[#1A1A1A] rounded-[10px] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-[8px] h-[8px] bg-[#FFDD00] rounded-full" />
                <span className="text-[11px] font-medium text-[#FFDD00]">Transcribed note</span>
              </div>
              <p className="text-[12px] text-[#777777] leading-[1.5] font-normal">{task.voice_transcript}</p>
            </div>
          </div>
        )}

        {/* Audio Section */}
        {task.audio_url && (
          <div className="flex flex-col">
            <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-2">VOICE NOTE</p>
            <audio controls src={task.audio_url} className="w-full h-[44px] bg-[#F5F5F5] rounded-[8px]" />
          </div>
        )}

        {/* Screenshot Section */}
        {task.screenshot_url && (
          <div className="flex flex-col">
            <p className="text-[#888888] font-medium uppercase tracking-[0.6px] text-[10px] mb-2">SCREENSHOT</p>
            <a 
              href={task.screenshot_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full overflow-hidden rounded-[10px] border-[0.5px] border-[#ECECEC] active:scale-[0.98] transition-all"
            >
              <img 
                src={task.screenshot_url} 
                alt="Task screenshot" 
                className="w-full max-h-[200px] object-cover block hover:brightness-95 transition-all cursor-zoom-in" 
              />
            </a>
          </div>
        )}

        {/* Metadata */}
        <div className="mt-4 pt-4 border-t border-[#F5F5F5]">
          <p className="text-[11px] font-normal text-[#AAAAAA]">
            Created {getRelativeTime(task.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
