import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { sendCliqAlert } from '../services/cliqService';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { useTranscription } from '../hooks/useTranscription';
import { FormField } from '../app/components/FormField';
import { AssigneeChips } from '../app/components/AssigneeChips';
import { DateFields } from '../app/components/DateFields';
import { AttachmentButtons } from '../app/components/AttachmentButtons';
import { VoiceRecorder as VoiceRecorderUI } from '../app/components/VoiceRecorder';
import { ScreenshotPreview } from '../app/components/ScreenshotPreview';
import { useTasks } from '../hooks/useTasks';
import { toast } from 'sonner';

export default function CreateTask() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedDate, setAssignedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isRecording, audioBlob, audioUrl, recordingSeconds, liveTranscript, startRecording, stopRecording } = useVoiceRecorder();
  const { transcribe, isTranscribing, transcript, setTranscript } = useTranscription();

  const [assignees, setAssignees] = useState(['Dev Team', 'Alice', 'Bob', 'Carol', 'Marketing', 'Operations']);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('full_name, team')
          .order('full_name');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const names = data.map(e => e.full_name);
          const teams = Array.from(new Set(data.map(e => e.team)));
          const combined = Array.from(new Set([...teams, ...names]));
          setAssignees(combined);
          
          // Only auto-select if nothing is selected yet
          setAssignedTo(prev => prev || combined[0]);
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    }
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (liveTranscript) setTranscript(liveTranscript);
  }, [liveTranscript, setTranscript]);

  useEffect(() => {
    if (audioBlob && !isRecording && !transcript) transcribe(audioBlob);
  }, [audioBlob, isRecording, transcribe, transcript]);

  const handleScreenshotSelect = (file) => {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshotFile(file);
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
  };

  const handleRemoveScreenshot = () => {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshotPreview(null);
    setScreenshotFile(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      let screenshotUrl = null;
      if (screenshotFile) {
        const path = `attachments/${Date.now()}-${screenshotFile.name}`;
        const { error: uploadErr } = await supabase.storage
          .from('task-media')
          .upload(path, screenshotFile, { contentType: screenshotFile.type });
        
        if (uploadErr) throw uploadErr;
        screenshotUrl = supabase.storage.from('task-media').getPublicUrl(path).data.publicUrl;
      }

      let audioUrl = null;
      if (audioBlob) {
        const ext = audioBlob.type.includes('mp4') ? 'mp4' : 'webm';
        const path = `audio/${Date.now()}.${ext}`;
        const { error: audioErr } = await supabase.storage
          .from('task-media')
          .upload(path, audioBlob, { 
            contentType: audioBlob.type,
            cacheControl: '3600'
          });
        
        if (audioErr) throw audioErr;
        audioUrl = supabase.storage.from('task-media').getPublicUrl(path).data.publicUrl;
      }

      const { data: { user } } = await supabase.auth.getUser();
      const { data: task, error } = await supabase
        .from('tasks')
        .insert([{
          title: title.trim(),
          description: description.trim(),
          assigned_to: assignedTo,
          assigned_date: assignedDate,
          due_date: dueDate,
          voice_transcript: transcript,
          audio_url: audioUrl,
          screenshot_url: screenshotUrl,
          status: 'pending',
          created_by: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Fire-and-forget notification
      sendCliqAlert(task).catch(() => {});
      
      toast.success('Task successfully created');
      navigate('/success');
    } catch (err) {
      toast.error(err.message || 'Failed to submit task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white w-full">
      
      {/* Yellow Header */}
      <div className="bg-[#FFDD00] h-[64px] px-5 flex items-center justify-between sticky top-0 z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-8 h-8 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center border-none cursor-pointer transition-all active:scale-90"
          >
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[#1A1A1A] font-semibold text-[16px]">Create Task</h1>
        </div>
        
        <button
          onClick={() => navigate('/dashboard')}
          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer transition-all active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 flex flex-col gap-8 pb-32 animate-slide-up">
        
        <div className="flex flex-col gap-6">
          <FormField
            label="TASK TITLE"
            required
            inputProps={{
              placeholder: 'e.g., Update dashboard layouts',
              value: title,
              onChange: (e) => setTitle(e.target.value),
              autoFocus: true
            }}
          />

          <FormField
            label="DESCRIPTION"
            type="textarea"
            textareaProps={{
              placeholder: 'Provide detailed context for the team...',
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 3
            }}
          />
        </div>

        <div className="h-[1px] bg-[#F5F5F5] w-full" />

        <div className="flex flex-col gap-6">
          <AssigneeChips
            assignees={assignees}
            value={assignedTo}
            onChange={setAssignedTo}
          />

          <DateFields
            startDate={assignedDate}
            endDate={dueDate}
            onStartDateChange={setAssignedDate}
            onEndDateChange={setDueDate}
          />
        </div>

        <div className="h-[1px] bg-[#F5F5F5] w-full" />

        <div className="flex flex-col gap-4">
          <label className="text-[#1A1A1A] font-bold uppercase tracking-[1px] text-[10px]">Context & Media</label>
          <AttachmentButtons
            isRecording={isRecording}
            onVoiceClick={isRecording ? stopRecording : startRecording}
            onScreenshotSelect={handleScreenshotSelect}
          />
          
          {(isRecording || transcript || isTranscribing) && (
            <div className="mt-2">
              <VoiceRecorderUI
                isRecording={isRecording}
                recordingSeconds={recordingSeconds}
                transcript={transcript}
                isTranscribing={isTranscribing}
                onTranscriptChange={setTranscript}
                onStopRecording={stopRecording}
                onStartRecording={startRecording}
              />
            </div>
          )}

          {screenshotPreview && (
          <div className="mt-2 border-2 border-[#F5F5F5] rounded-2xl overflow-hidden p-1">
            <ScreenshotPreview
              imageUrl={screenshotPreview}
              onRemove={handleRemoveScreenshot}
            />
          </div>
        )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6 border-t border-[#F5F5F5] z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <button
          onClick={handleSubmit}
          disabled={!title.trim() || isSubmitting}
          className={`w-full h-[52px] rounded-2xl border-none font-bold text-[14px] transition-all shadow-lg ${
            !title.trim() || isSubmitting 
              ? 'bg-[#F5F5F5] text-[#888888] cursor-not-allowed shadow-none' 
              : 'bg-[#FFDD00] text-[#1A1A1A] cursor-pointer active:scale-[0.97] hover:brightness-105 shadow-[#FFDD00]/20'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-3 border-[#1A1A1A] border-t-transparent rounded-full animate-spin-fast" />
              <span>SAVING...</span>
            </div>
          ) : (
            'CONFIRM SUBMISSION'
          )}
        </button>
      </div>
    </div>
  );
}
