import { useState, useEffect, useRef } from 'react';

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'done';
  isOverdue?: boolean;
  daysOverdue?: number;
}

interface DashboardProps {
  onTaskClick: (taskId: string) => void;
  onCreateTask: () => void;
  onSignOut: () => void;
  onProfileClick: () => void;
  tasks: Task[];
}

type FilterType = 'all' | 'pending' | 'in-progress' | 'done';

export function Dashboard({ onTaskClick, onCreateTask, onSignOut, onProfileClick, tasks }: DashboardProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const tasksToday = tasks.filter(task => {
    const today = new Date().toDateString();
    return new Date(task.dueDate).toDateString() === today;
  }).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(t => t.status === 'in-progress').length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#FFDD00]';
      case 'in-progress': return 'bg-[#1A1A1A]';
      case 'done': return 'bg-[#CCCCCC]';
      default: return 'bg-[#CCCCCC]';
    }
  };

  const getStatusPillStyle = (status: string, isOverdue: boolean) => {
    if (isOverdue) return 'bg-[#FCEBEB] text-[#A32D2D]';
    switch (status) {
      case 'pending': return 'bg-[#FFDD00] text-[#1A1A1A]';
      case 'in-progress': return 'bg-[#F5F5F5] text-[#888888]';
      case 'done': return 'bg-[#F5F5F5] text-[#888888]';
      default: return 'bg-[#F5F5F5] text-[#888888]';
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-[480px] mx-auto relative">
      {/* App Bar */}
      <div className="sticky top-0 z-10 bg-[#FFDD00] h-[72px] px-5 flex items-center justify-between">
        <div>
          <div className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: 500 }}>
            {getGreeting()}
          </div>
          <div className="text-[#7A6A00]" style={{ fontSize: '12px', fontWeight: 400 }}>
            {tasksToday} tasks due today
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00] border-none cursor-pointer"
            style={{ fontSize: '13px', fontWeight: 500 }}
          >
            JD
          </button>
          {showUserMenu && (
            <div className="absolute top-12 right-0 bg-white border border-[#ECECEC] rounded-lg shadow-lg overflow-hidden z-20 min-w-[140px]">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onProfileClick();
                }}
                className="w-full px-4 py-3 text-left text-[#1A1A1A] hover:bg-[#F5F5F5] border-none cursor-pointer"
                style={{ fontSize: '13px' }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onSignOut();
                }}
                className="w-full px-4 py-3 text-left text-[#1A1A1A] hover:bg-[#F5F5F5] border-none cursor-pointer"
                style={{ fontSize: '13px' }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Strip */}
      <div className="flex gap-2 px-5 py-[14px]">
        <div className="flex-1 bg-[#FFDD00] rounded-[10px] p-[10px]">
          <div className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: 500 }}>
            {totalTasks}
          </div>
          <div className="text-[#7A6A00]" style={{ fontSize: '10px' }}>
            Total
          </div>
        </div>
        <div className="flex-1 bg-[#F5F5F5] rounded-[10px] p-[10px]">
          <div className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: 500 }}>
            {activeTasks}
          </div>
          <div className="text-[#888888]" style={{ fontSize: '10px' }}>
            Active
          </div>
        </div>
        <div className="flex-1 bg-[#F5F5F5] rounded-[10px] p-[10px]">
          <div className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: 500 }}>
            {doneTasks}
          </div>
          <div className="text-[#888888]" style={{ fontSize: '10px' }}>
            Done
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-5 mt-3 overflow-x-auto no-scrollbar">
        {(['all', 'pending', 'in-progress', 'done'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-[14px] py-[6px] rounded-[20px] border-none cursor-pointer whitespace-nowrap transition-default ${
              filter === f
                ? 'bg-[#1A1A1A] text-[#FFDD00]'
                : 'bg-[#F5F5F5] text-[#888888]'
            }`}
            style={{ fontSize: '12px', fontWeight: 500 }}
          >
            {f === 'all' ? 'All' : f === 'in-progress' ? 'In progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Section Label */}
      <div className="px-5 pt-3 pb-1 text-[#888888]" style={{ fontSize: '11px', fontWeight: 500 }}>
        Tasks
      </div>

      {/* Task Cards */}
      <div className="px-5 pb-24 flex flex-col gap-[10px]">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-[60px] h-[60px] rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
            </div>
            <div className="text-[#1A1A1A] mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>
              No tasks yet
            </div>
            <div className="text-[#888888]" style={{ fontSize: '12px' }}>
              Tap + to create your first task
            </div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onTaskClick(task.id)}
              className={`bg-white border-[0.5px] border-[#ECECEC] rounded-[12px] p-[12px_14px] text-left cursor-pointer transition-default hover:shadow-sm ${
                task.isOverdue ? 'border-l-[2.5px] border-l-[#E24B4A] rounded-l-none' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1" style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A' }}>
                  {task.title}
                </div>
                <div className={`w-[10px] h-[10px] rounded-full flex-shrink-0 ${getStatusDotColor(task.status)}`}></div>
              </div>
              <div className="flex items-center gap-2 mt-[6px] flex-wrap">
                <span
                  className="bg-[#1A1A1A] text-[#FFDD00] px-2 py-0.5 rounded"
                  style={{ fontSize: '10px', fontWeight: 500 }}
                >
                  {task.assignee}
                </span>
                <span
                  className={`px-2 py-0.5 rounded ${getStatusPillStyle(task.status, task.isOverdue || false)}`}
                  style={{ fontSize: '10px', fontWeight: 500 }}
                >
                  {task.isOverdue ? 'Overdue' : task.status === 'in-progress' ? 'In progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <span className="text-[#BBBBBB] ml-auto" style={{ fontSize: '10px' }}>
                  {task.dueDate}
                </span>
              </div>
              {task.isOverdue && task.daysOverdue && (
                <div className="text-[#E24B4A] mt-1" style={{ fontSize: '10px', fontWeight: 500 }}>
                  {task.daysOverdue} days overdue
                </div>
              )}
            </button>
          ))
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="max-w-[480px] w-full relative">
          <button
            onClick={onCreateTask}
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer shadow-lg fab-entrance hover:scale-110 transition-transform duration-150 pointer-events-auto"
            aria-label="Create new task"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
