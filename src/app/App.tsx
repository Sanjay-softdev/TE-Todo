import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { Dashboard } from './components/Dashboard';
import { TaskDetail } from './components/TaskDetail';
import { ProfilePage } from './components/ProfilePage';
import { StatusBar } from './components/StatusBar';
import { TopBar } from './components/TopBar';
import { FormField } from './components/FormField';
import { AssigneeChips } from './components/AssigneeChips';
import { DateFields } from './components/DateFields';
import { AttachmentButtons } from './components/AttachmentButtons';
import { VoiceRecorder } from './components/VoiceRecorder';
import { ScreenshotPreview } from './components/ScreenshotPreview';
import { SubmitButton } from './components/SubmitButton';

interface Task {
  id: string;
  title: string;
  assignee: string;
  assignedTo?: string;
  assignedDate?: string;
  dueDate: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'done';
  isOverdue?: boolean;
  daysOverdue?: number;
  voiceTranscript?: string;
  screenshotUrl?: string;
}

type Screen = 'login' | 'dashboard' | 'form' | 'success' | 'task-detail' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [allTasks, setAllTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Fix authentication bug in login flow',
      assignee: 'Alice',
      assignedTo: 'Alice',
      assignedDate: '2026-04-15',
      dueDate: 'Apr 18, 2026',
      description: 'Users are experiencing timeout errors when logging in. Need to investigate session management.',
      status: 'in-progress',
      voiceTranscript: 'This is urgent. Multiple users reported they cannot log in after the latest deployment.',
    },
    {
      id: '2',
      title: 'Update dashboard analytics widget',
      assignee: 'Bob',
      assignedTo: 'Bob',
      assignedDate: '2026-04-16',
      dueDate: 'Apr 20, 2026',
      description: 'Add new metrics to the analytics dashboard based on stakeholder feedback.',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Review Q2 marketing campaign materials',
      assignee: 'Carol',
      assignedTo: 'Carol',
      assignedDate: '2026-04-10',
      dueDate: 'Apr 12, 2026',
      description: 'Final review of all marketing assets before campaign launch.',
      status: 'done',
      isOverdue: true,
      daysOverdue: 7,
    },
  ]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const assignees = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleSignOut = () => {
    setCurrentScreen('login');
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentScreen('task-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedTaskId(null);
  };

  const handleCreateTaskClick = () => {
    setCurrentScreen('form');
  };

  const handleTaskStatusChange = (newStatus: 'pending' | 'in-progress' | 'done') => {
    if (selectedTaskId) {
      setAllTasks(tasks =>
        tasks.map(task =>
          task.id === selectedTaskId ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  const handleProfileClick = () => {
    setCurrentScreen('profile');
  };

  const handleBackFromForm = () => {
    setCurrentScreen('dashboard');
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setTranscript('This is a mock transcription of your voice recording. You can edit this text as needed.');
    } else {
      setIsRecording(true);
    }
  };

  const handleScreenshotSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshot(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !assignee || !endDate) return;

    setIsLoading(true);
    setTimeout(() => {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        assignee,
        assignedTo: assignee,
        assignedDate: startDate,
        dueDate: new Date(endDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        description,
        status: 'pending',
        voiceTranscript: transcript || undefined,
        screenshotUrl: screenshot || undefined,
      };
      setAllTasks([newTask, ...allTasks]);
      setIsLoading(false);
      setCurrentScreen('success');
    }, 1500);
  };

  const handleNewTask = () => {
    setTitle('');
    setDescription('');
    setAssignee('');
    setStartDate('');
    setEndDate('');
    setIsRecording(false);
    setTranscript('');
    setScreenshot(null);
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentScreen === 'dashboard') {
    return (
      <Dashboard
        tasks={allTasks}
        onTaskClick={handleTaskClick}
        onCreateTask={handleCreateTaskClick}
        onSignOut={handleSignOut}
        onProfileClick={handleProfileClick}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfilePage
        onBack={handleBackToDashboard}
        onSignOut={handleSignOut}
        user={{
          name: 'Sanjay Ramasamy',
          initials: 'SR',
          role: 'Product Manager',
          department: 'Admin',
          team: 'Dev Team',
          email: 'sanjay@co.com',
          tasksCreated: 12,
          tasksAssigned: 8,
          tasksCompleted: 4,
          zohoHandle: '@sanjay',
        }}
      />
    );
  }

  if (currentScreen === 'task-detail' && selectedTaskId) {
    const task = allTasks.find(t => t.id === selectedTaskId);
    if (!task) {
      setCurrentScreen('dashboard');
      return null;
    }
    return (
      <TaskDetail
        task={{
          ...task,
          assignedTo: task.assignedTo || task.assignee,
          description: task.description || '',
        }}
        onBack={handleBackToDashboard}
        onStatusChange={handleTaskStatusChange}
      />
    );
  }

  if (currentScreen === 'success') {
    const recentTasksForSuccess = allTasks.slice(0, 3).map(t => ({
      title: t.title,
      assignee: t.assignee,
      dueDate: t.dueDate,
      status: t.status,
    }));
    return <SuccessScreen onNewTask={handleNewTask} recentTasks={recentTasksForSuccess} />;
  }

  const isFormValid = title && description && assignee && endDate;

  return (
    <div className="min-h-screen bg-white max-w-[420px] mx-auto">
      <StatusBar />
      <div className="bg-[#FFDD00] h-16 px-4 flex items-center gap-4">
        <button
          onClick={handleBackFromForm}
          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer hover:bg-[#2A2A2A] transition-default"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[#1A1A1A] flex-1" style={{ fontSize: '16px', fontWeight: 500 }}>
          New Task
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col" style={{ gap: '14px' }}>
        <FormField
          label="Task Title"
          required
          type="input"
          inputProps={{
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: 'Enter task title'
          }}
        />

        <FormField
          label="Description"
          required
          type="textarea"
          textareaProps={{
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: 'Describe the task...'
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

          {isRecording && (
            <VoiceRecorder
              isRecording={isRecording}
              onStartRecording={() => setIsRecording(true)}
              onStopRecording={handleVoiceClick}
              transcript={transcript}
              onTranscriptChange={setTranscript}
            />
          )}

          {transcript && !isRecording && (
            <VoiceRecorder
              isRecording={false}
              onStartRecording={() => setIsRecording(true)}
              onStopRecording={() => setIsRecording(false)}
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
        </div>

        <div className="mt-4">
          <SubmitButton
            isLoading={isLoading}
            disabled={!isFormValid}
          >
            Submit Task
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}