import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useTasks } from '../hooks/useTasks';
import { formatDate, getRelativeTime } from '../utils/formatters';
import { StatusBar } from '../app/components/StatusBar';
import { toast } from 'sonner';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTaskStatus } = useTasks();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setTask(data);
      } catch (err) {
        console.error('Error fetching task:', err);
        toast.error('Task not found');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    if (task.status === newStatus || updatingStatus) return;
    
    setUpdatingStatus(true);
    try {
      await updateTaskStatus(task.id, newStatus);
      setTask(prev => ({ ...prev, status: newStatus }));
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 bg-[#FFDD00] rounded-full animate-pulse" />
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="min-h-screen bg-white pb-10">
      <StatusBar />
      
      {/* App Bar */}
      <div className="h-16 bg-[#FFDD00] px-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer transition-default active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-[#1A1A1A] text-base font-semibold">Task Detail</h1>
      </div>

      <div className="px-5 py-6 flex flex-col gap-6 animate-slide-up">
        {/* Title Section */}
        <div>
          <p className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider mb-1">Title</p>
          <h2 className="text-[#1A1A1A] text-lg font-semibold leading-tight">{task.title}</h2>
        </div>

        {/* Description Section */}
        {task.description && (
          <div>
            <p className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider mb-1">Description</p>
            <p className="text-[#888888] text-[13px] leading-relaxed">{task.description}</p>
          </div>
        )}

        {/* Assigned Section */}
        <div className="bg-[#F5F5F5] rounded-xl p-3.5 flex items-center gap-3.5">
          <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-[#FFDD00] text-sm font-semibold">
             {(task.assigned_to || 'AD').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-[#1A1A1A] text-[13px] font-semibold leading-none mb-1">{task.assigned_to || 'Unassigned'}</p>
            <p className="text-[#888888] text-[11px] leading-none">Notified via Zoho Cliq</p>
          </div>
        </div>

        {/* Dates Section */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#F5F5F5] rounded-lg p-3">
            <p className="text-[#AAAAAA] text-[9px] font-semibold uppercase tracking-wider mb-1">Assigned</p>
            <p className="text-[#1A1A1A] text-[13px] font-semibold">{formatDate(task.assigned_date)}</p>
          </div>
          <div className="bg-[#F5F5F5] rounded-lg p-3">
            <p className="text-[#AAAAAA] text-[9px] font-semibold uppercase tracking-wider mb-1">Due Date</p>
            <p className="text-[#1A1A1A] text-[13px] font-semibold">{formatDate(task.due_date)}</p>
          </div>
        </div>

        {/* Status Picker Section */}
        <div>
          <p className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider mb-2">Status</p>
          <div className="flex gap-1.5 h-11">
            {['pending', 'in_progress', 'done'].map((s) => {
              const isActive = task.status === s;
              let style = 'bg-[#F5F5F5] text-[#888888]';
              if (isActive) {
                if (s === 'pending') style = 'bg-[#FFDD00] text-[#1A1A1A]';
                if (s === 'in_progress') style = 'bg-[#1A1A1A] text-[#FFDD00]';
                if (s === 'done') style = 'bg-[#EAF3DE] text-[#3B6D11]';
              }
              return (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={updatingStatus}
                  className={`flex-1 rounded-lg border-none cursor-pointer transition-default font-medium text-xs ${style} ${updatingStatus ? 'opacity-50' : 'active:scale-95'}`}
                >
                  {s.replace('_', ' ').charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transcript Section */}
        {task.voice_transcript && (
          <div>
            <p className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider mb-2">Voice Transcript</p>
            <div className="bg-[#1A1A1A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#FFDD00]" />
                <span className="text-[#FFDD00] text-[11px] font-medium">Transcribed note</span>
              </div>
              <p className="text-[#777777] text-[12px] leading-relaxed">{task.voice_transcript}</p>
            </div>
          </div>
        )}

        {/* Audio Player */}
        {task.audio_url && (
          <div>
            <p className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider mb-2">Voice Note</p>
            <audio controls src={task.audio_url} className="w-full h-10 bg-[#F5F5F5] rounded-lg border-none outline-none" />
          </div>
        )}

        {/* Screenshot Section */}
        {task.screenshot_url && (
          <div>
            <p className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider mb-2">Screenshot</p>
            <img src={task.screenshot_url} alt="Task screenshot" className="w-full rounded-xl border-[0.5px] border-[#ECECEC] object-cover max-h-[300px]" loading="lazy" />
          </div>
        )}

        {/* Metadata */}
        <div className="text-center py-4">
           <p className="text-[#AAAAAA] text-[11px]">Created {getRelativeTime(task.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
