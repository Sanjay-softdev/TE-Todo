import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { StatusBar } from '../components/StatusBar';
import { TopBar } from '../components/TopBar';
import { FormField } from '../components/FormField';
import { AssigneeChips } from '../components/AssigneeChips';
import { DateFields } from '../components/DateFields';
import { AttachmentButtons } from '../components/AttachmentButtons';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { ScreenshotPreview } from '../components/ScreenshotPreview';
import { SubmitButton } from '../components/SubmitButton';

export default function TaskFormScreen() {
  const navigate = useNavigate();
  
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignees = ['John', 'Sarah', 'Mike', 'Emma'];

  const handleVoiceClick = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Simulate transcription
      setTranscript('This is a sample transcribed text from the voice recording. The user spoke about important task details.');
      toast.success('Voice note saved');
    } else {
      // Start recording
      setIsRecording(true);
      setTranscript(''); // Clear previous transcript
    }
  };

  const handleScreenshotSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setScreenshot(url);
    toast.success('Screenshot attached');
  };

  const handleRemoveScreenshot = () => {
    if (screenshot) {
      URL.revokeObjectURL(screenshot);
    }
    setScreenshot(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!taskName || !assignee || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store task data for success screen
      const taskData = {
        taskName,
        assignee,
        startDate,
        endDate,
      };
      localStorage.setItem('lastTask', JSON.stringify(taskData));
      
      navigate('/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      <TopBar title="New Task" userInitials="JD" />
      
      <div className="w-full max-w-[420px] mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '14px' }}>
          <FormField
            label="TASK NAME"
            required
            inputProps={{
              placeholder: 'Enter task name',
              value: taskName,
              onChange: (e) => setTaskName(e.target.value),
            }}
          />

          <FormField
            label="DESCRIPTION"
            type="textarea"
            textareaProps={{
              placeholder: 'Add details about the task...',
              value: description,
              onChange: (e) => setDescription(e.target.value),
            }}
          />

          <AssigneeChips
            assignees={assignees}
            value={assignee}
            onChange={setAssignee}
          />

          <DateFields
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <div className="flex flex-col" style={{ gap: '4px' }}>
            <label 
              className="text-[#1A1A1A] uppercase tracking-wider"
              style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}
            >
              ATTACHMENTS
            </label>
            <AttachmentButtons
              isRecording={isRecording}
              onVoiceClick={handleVoiceClick}
              onScreenshotSelect={handleScreenshotSelect}
            />
          </div>

          {isRecording && (
            <VoiceRecorder
              isRecording={isRecording}
              onStartRecording={() => setIsRecording(true)}
              onStopRecording={handleVoiceClick}
              transcript={transcript}
              onTranscriptChange={setTranscript}
            />
          )}

          {!isRecording && transcript && (
            <VoiceRecorder
              isRecording={false}
              onStartRecording={() => setIsRecording(true)}
              onStopRecording={handleVoiceClick}
              transcript={transcript}
              onTranscriptChange={setTranscript}
            />
          )}

          {screenshot && (
            <ScreenshotPreview
              imageUrl={screenshot}
              onRemove={handleRemoveScreenshot}
            />
          )}

          <div className="mt-4">
            <SubmitButton isLoading={isSubmitting}>
              Submit Task
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
