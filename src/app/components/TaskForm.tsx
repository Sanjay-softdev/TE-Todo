import { useState } from 'react';
import { StatusBar } from './StatusBar';
import { AppBar } from './AppBar';
import { FormField, TextInput, DateInput } from './FormField';
import { AssigneeChips } from './AssigneeChips';
import { VoiceRecorder } from './VoiceRecorder';
import { ScreenshotUpload } from './ScreenshotUpload';
import { SubmitButton } from './SubmitButton';

interface TaskFormProps {
  onSubmit: (task: any) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const assignees = ['Alice', 'Bob', 'Carol', 'Dave'];

  const handleScreenshotUpload = (file: File) => {
    setScreenshot(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onSubmit({
        title,
        description,
        assignee,
        startDate,
        dueDate,
        voiceTranscript,
        screenshot,
      });
      setLoading(false);
    }, 1500);
  };

  const isFormValid = title && description && assignee && dueDate;

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      <AppBar title="New Task" />

      <div className="px-4 py-4 flex flex-col gap-[14px]">
        <FormField label="Task Title" required>
          <TextInput
            value={title}
            onChange={setTitle}
            placeholder="Enter task title"
          />
        </FormField>

        <FormField label="Description" required>
          <TextInput
            value={description}
            onChange={setDescription}
            placeholder="Describe the task..."
            multiline
            rows={3}
          />
        </FormField>

        <FormField label="Assign To" required>
          <AssigneeChips
            assignees={assignees}
            selected={assignee}
            onSelect={setAssignee}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-[6px]">
          <FormField label="Start Date">
            <DateInput value={startDate} onChange={setStartDate} />
          </FormField>
          <FormField label="Due Date" required>
            <DateInput value={dueDate} onChange={setDueDate} />
          </FormField>
        </div>

        <FormField label="Attachments">
          <div className="flex gap-[6px]">
            <VoiceRecorder onTranscript={setVoiceTranscript} />
            <ScreenshotUpload
              onUpload={handleScreenshotUpload}
              preview={screenshotPreview}
              onRemove={handleRemoveScreenshot}
            />
          </div>
        </FormField>

        {voiceTranscript && (
          <FormField label="Voice Transcript">
            <TextInput
              value={voiceTranscript}
              onChange={setVoiceTranscript}
              multiline
              rows={3}
            />
          </FormField>
        )}

        <div className="mt-4">
          <SubmitButton
            onClick={handleSubmit}
            loading={loading}
            disabled={!isFormValid}
          >
            Submit Task
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}
