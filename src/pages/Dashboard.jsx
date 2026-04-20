import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { formatDate } from '../utils/formatters';
import { StatusBar } from '../app/components/StatusBar';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { tasks, loading, updateTaskStatus } = useTasks();
  const [filter, setFilter] = useState('all');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date().toISOString().split('T')[0];
  const tasksDueToday = tasks.filter(t => t.due_date === today && t.status !== 'done').length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => t.status !== 'done').length,
    done: tasks.filter(t => t.status === 'done').length
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-[#FFDD00]';
      case 'in_progress': return 'bg-[#1A1A1A]';
      case 'done': return 'bg-[#CCCCCC]';
      default: return 'bg-[#CCCCCC]';
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      toast.error('Sign out failed');
    }
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'AD';

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      
      {/* App Bar */}
      <div className="sticky top-0 z-10 bg-[#FFDD00] h-[72px] px-5 flex items-center justify-between">
        <div className="animate-slide-up">
          <div className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: 600 }}>
            {getGreeting()}
          </div>
          <div className="text-[#7A6A00]" style={{ fontSize: '12px', fontWeight: 400 }}>
            {tasksDueToday} tasks due today
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00] border-none cursor-pointer transition-default active:scale-95"
            style={{ fontSize: '13px', fontWeight: 500 }}
          >
            {userInitials}
          </button>
          {showUserMenu && (
            <div className="absolute top-12 right-0 bg-white border border-[#ECECEC] rounded-lg shadow-lg overflow-hidden z-20 min-w-[140px] animate-slide-up">
              <button
                onClick={() => navigate('/profile')}
                className="w-full px-4 py-3 text-left text-[#1A1A1A] hover:bg-[#F5F5F5] border-none cursor-pointer"
                style={{ fontSize: '13px' }}
              >
                Profile
              </button>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-3 text-left text-[#1A1A1A] hover:bg-[#F5F5F5] border-none cursor-pointer"
                style={{ fontSize: '13px' }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        <div className="bg-[#FFDD00] rounded-[10px] p-3 text-center">
          <div className="text-[#1A1A1A] text-2xl font-semibold leading-none">{stats.total}</div>
          <div className="text-[#7A6A00] text-[10px] mt-1 uppercase tracking-wider font-medium">Total</div>
        </div>
        <div className="bg-[#F5F5F5] rounded-[10px] p-3 text-center">
          <div className="text-[#1A1A1A] text-2xl font-semibold leading-none">{stats.active}</div>
          <div className="text-[#888888] text-[10px] mt-1 uppercase tracking-wider font-medium">Active</div>
        </div>
        <div className="bg-[#F5F5F5] rounded-[10px] p-3 text-center">
          <div className="text-[#1A1A1A] text-2xl font-semibold leading-none">{stats.done}</div>
          <div className="text-[#888888] text-[10px] mt-1 uppercase tracking-wider font-medium">Done</div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-1.5 px-4 overflow-x-auto no-scrollbar py-2">
        {['all', 'pending', 'in_progress', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full border-none cursor-pointer whitespace-nowrap transition-default text-[12px] font-medium ${
              filter === f ? 'bg-[#1A1A1A] text-[#FFDD00]' : 'bg-[#F5F5F5] text-[#888888]'
            }`}
          >
            {f === 'all' ? 'All' : f.replace('_', ' ').charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="px-4 py-2 text-[#888888] text-[10px] font-semibold uppercase tracking-wider">
        Tasks
      </div>

      {/* Task List */}
      <div className="px-4 pb-28 flex flex-col gap-2.5">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-[#F5F5F5] rounded-xl animate-pulse" />
          ))
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 opacity-50">
             <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-3">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                 <path d="M20 6L9 17L4 12" />
               </svg>
             </div>
             <p className="text-[#1A1A1A] text-sm font-medium">No tasks here</p>
             <p className="text-[#888] text-xs">Tap + to create a task</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isOverdue = task.due_date && task.due_date < today && task.status !== 'done';
            return (
              <button
                key={task.id}
                onClick={() => navigate(`/task/${task.id}`)}
                className={`bg-white border-[0.5px] border-[#ECECEC] rounded-xl p-3 text-left transition-default hover:bg-[#FAFAFA] relative overflow-hidden ${
                  isOverdue ? 'border-l-[2.5px] border-l-[#E24B4A] rounded-l-none' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-[13px] font-medium text-[#1A1A1A] pr-4 line-clamp-1">{task.title}</div>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${getStatusDotColor(task.status)}`} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-[#1A1A1A] text-[#FFDD00] text-[9px] font-semibold px-1.5 py-0.5 rounded leading-none">
                    {task.assigned_to || 'UNASSIGNED'}
                  </span>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded leading-none ${
                    task.status === 'done' ? 'bg-[#EAF3DE] text-[#3B6D11]' : 
                    isOverdue ? 'bg-[#FCEBEB] text-[#E24B4A]' : 'bg-[#F5F5F5] text-[#888]'
                  }`}>
                    {isOverdue ? 'OVERDUE' : task.status.toUpperCase().replace('_', ' ')}
                  </span>
                  <span className="text-[#BBBBBB] text-[10px] ml-auto">{formatDate(task.due_date)}</span>
                </div>
                {isOverdue && (
                  <div className="text-[#E24B4A] text-[10px] font-medium mt-1">Overdue task</div>
                )}
              </button>
            )
          })
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/create')}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center shadow-lg transition-default active:scale-90 hover:scale-105 z-50 border-none cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="3" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
