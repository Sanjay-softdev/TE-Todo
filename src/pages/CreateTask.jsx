import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { sendCliqAlert } from '../services/cliqService';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { useTranscription } from '../hooks/useTranscription';
import { StatusBar } from '../app/components/StatusBar';
import { FormField } from '../app/components/FormField';
import { AssigneeChips } from '../app/components/AssigneeChips';
import { DateFields } from '../app/components/DateFields';
import { AttachmentButtons } from '../app/components/AttachmentButtons';
import { VoiceRecorder as VoiceRecorderUI } from '../app/components/VoiceRecorder';
import { ScreenshotPreview } from '../app/components/ScreenshotPreview';
import { toast } from 'sonner';

export default function CreateTask() {
  const navigate = useNavigate();
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedDate, setAssignedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { isRecording, audioBlob, audioUrl, recordingSeconds, startRecording, stopRecording, clearRecording } = useVoiceRecorder();
  const { transcribe, isTranscribing, transcript, setTranscript } = useTranscription();

  const assignees = ['Dev Team', 'Alice', 'Bob', 'Carol', 'Marketing', 'Operations'];

  // Handle Voice Stop -> Trigger Transcription
  useEffect(() => {
    if (audioBlob && !isRecording) {
      transcribe(audioBlob);
    }
  }, [audioBlob, isRecording, transcribe]);

  const handleScreenshotSelect = (file) => {
    setScreenshotFile(file);
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
    toast.success('Screenshot attached');
  };

  const handleRemoveScreenshot = () => {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshotFile(null);
    setScreenshotPreview(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload Screenshot
      let screenshotPublicUrl = null;
      if (screenshotFile) {
        const ext = screenshotFile.name.split('.').pop();
        const path = `screenshots/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const { error: upErr } = await supabase.storage.from('task-screenshots').upload(path, screenshotFile);
        if (upErr) throw upErr;
        screenshotPublicUrl = supabase.storage.from('task-screenshots').getPublicUrl(path).data.publicUrl;
      }

      // 2. Upload Audio
      let audioPublicUrl = null;
      if (audioBlob) {
        const ext = audioBlob.type.includes('mp4') ? 'mp4' : 'webm';
        const path = `audio/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const { error: audErr } = await supabase.storage.from('task-audio').upload(path, audioBlob);
        if (audErr) throw audErr;
        audioPublicUrl = supabase.storage.from('task-audio').getPublicUrl(path).data.publicUrl;
      }

      // 3. Get User
      const { data: { user } } = await supabase.auth.getUser();

      // 4. Insert Task
      const { data: task, error: insErr } = await supabase
        .from('tasks')
        .insert([{
          title: title.trim(),
          description: description.trim() || null,
          assigned_to: assignedTo || null,
          assigned_date: assignedDate || null,
          due_date: dueDate || null,
          voice_transcript: transcript.trim() || null,
          audio_url: audioPublicUrl,
          screenshot_url: screenshotPublicUrl,
          status: 'pending',
          created_by: user?.id ?? null
        }])
        .select()
        .single();

      if (insErr) throw insErr;

      // 5. Notification (Fire & Forget)
      sendCliqAlert(task).catch(err => console.error('Notification failed', err));

      toast.success('Task submitted successfully');
      
      // Delay navigation to show toast
      setTimeout(() => navigate('/dashboard'), 1000);

    } catch (err) {
      console.error('Submission error:', err);
      toast.error(err.message || 'Failed to submit task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim().length > 0;

  return (
    <div className="min-h-screen bg-white pb-20">
      <StatusBar />
      
      {/* App Bar */}
      <div className="h-16 bg-[#FFDD00] px-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-[#1A1A1A] text-base font-semibold">New Task</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer transition-default active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3.5 animate-slide-up">
        <FormField
          label="Title"
          required
          inputProps={{
            placeholder: 'What needs to be done?',
            value: title,
            onChange: (e) => setTitle(e.target.value),
            autoFocus: true
          }}
        />

        <FormField
          label="Description"
          type="textarea"
          textareaProps={{
            placeholder: 'Add more context...',
            value: description,
            onChange: (e) => setDescription(e.target.value),
            rows: 3
          }}
        />

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

        <div className="flex flex-col gap-1">
          <label className="text-[#888888] text-[10px] font-semibold uppercase tracking-wider">Attachments</label>
          <AttachmentButtons
            isRecording={isRecording}
            onVoiceClick={isRecording ? stopRecording : startRecording}
            onScreenshotSelect={handleScreenshotSelect}
          />
        </div>

        {(isRecording || audioUrl || transcript || isTranscribing) && (
          <VoiceRecorderUI
            isRecording={isRecording}
            recordingSeconds={recordingSeconds}
            transcript={transcript}
            isTranscribing={isTranscribing}
            onTranscriptChange={setTranscript}
            onStopRecording={stopRecording}
            onStartRecording={startRecording}
          />
        )}

        {screenshotPreview && (
          <ScreenshotPreview
            imageUrl={screenshotPreview}
            onRemove={handleRemoveScreenshot}
          />
        )}
      </div>

      {/* Sticky Bottom Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ECECEC] p-4 max-w-[420px] mx-auto z-10">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`w-full h-[52px] rounded-xl flex items-center justify-center border-none transition-default font-semibold text-sm ${
            !isFormValid || isSubmitting 
              ? 'bg-[#F5F5F5] text-[#888888] cursor-not-allowed' 
              : 'bg-[#FFDD00] text-[#1A1A1A] cursor-pointer active:scale-[0.98] hover:opacity-90'
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
          ) : (
            'Submit task'
          )}
        </button>
      </div>
    </div>
  );
}
