import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { StatusBar } from '../app/components/StatusBar';
import TaskCard from '../app/components/TaskCard';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { tasks, loading, refetch } = useTasks();
  const [filter, setFilter] = useState('all');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const tasksDueTodayCount = tasks.filter(t => {
    if (t.status === 'done') return false;
    if (!t.due_date) return false;
    const today = new Date().toISOString().split('T')[0];
    return t.due_date === today;
  }).length;

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => ['pending', 'in_progress'].includes(t.status)).length,
    done: tasks.filter(t => t.status === 'done').length
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
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
      <StatusBar />
      
      {/* App Bar (Sticky Top) - Section 05 */}
      <div className="bg-[#FFDD00] h-[72px] px-4 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-[#1A1A1A] font-semibold text-[16px] leading-tight">{getGreeting()}</h1>
          <p className="text-[#7A6A00] text-[12px] font-normal">{tasksDueTodayCount} tasks due today</p>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-[38px] h-[38px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00] border-none cursor-pointer transition-all active:scale-[0.92]"
          >
            <span className="text-[13px] font-medium">{userInitials}</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-[#ECECEC] rounded-[8px] shadow-lg overflow-hidden z-[60] min-w-[120px] animate-slide-up">
              <button
                onClick={handleSignOut}
                className="w-full px-[14px] py-[10px] text-left text-[#1A1A1A] hover:bg-[#F5F5F5] border-none cursor-pointer text-[12px] font-normal"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Row - Section 05 */}
      <div className="grid grid-cols-3 gap-2 px-4 py-4 shrink-0">
        <div className="bg-[#FFDD00] rounded-[10px] p-[14px_10px] flex flex-col items-center">
          <span className="text-[24px] font-semibold text-[#1A1A1A] leading-none">{stats.total}</span>
          <span className="text-[10px] font-normal text-[#7A6A00] mt-1">Total</span>
        </div>
        <div className="bg-[#F5F5F5] rounded-[10px] p-[14px_10px] flex flex-col items-center">
          <span className="text-[24px] font-semibold text-[#1A1A1A] leading-none">{stats.active}</span>
          <span className="text-[10px] font-normal text-[#888888] mt-1">Active</span>
        </div>
        <div className="bg-[#F5F5F5] rounded-[10px] p-[14px_10px] flex flex-col items-center">
          <span className="text-[24px] font-semibold text-[#1A1A1A] leading-none">{stats.done}</span>
          <span className="text-[10px] font-normal text-[#888888] mt-1">Done</span>
        </div>
      </div>

      {/* Filter Chips - Section 05 */}
      <div className="px-4 flex gap-[6px] overflow-x-auto no-scrollbar shrink-0 mb-3">
        {['all', 'pending', 'in_progress', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`h-[34px] rounded-[20px] px-[16px] text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap border-none active:scale-[0.97] ${
              filter === f 
                ? 'bg-[#1A1A1A] text-[#FFDD00]' 
                : 'bg-[#F5F5F5] text-[#888888]'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Section Label */}
      <p className="text-[11px] font-medium text-[#888888] uppercase tracking-[0.6px] px-4 py-3">Tasks</p>

      {/* Task List Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} className="h-[80px] w-full bg-[#F5F5F5] rounded-xl animate-pulse" />
            ))
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-[14px] font-medium text-[#1A1A1A]">No tasks here</p>
              <p className="text-[12px] font-normal text-[#888888] mt-1">Tap + to create your first task</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={(id) => navigate(`/task/${id}`)} 
              />
            ))
          )}
        </div>
      </div>

      {/* FAB - Section 05 */}
      <button
        onClick={() => navigate('/create')}
        className="fixed bottom-[24px] right-[20px] md:right-[40px] w-[56px] h-[56px] rounded-full bg-[#1A1A1A] flex items-center justify-center transition-all active:scale-[0.92] z-[100] border-none cursor-pointer group shadow-2xl"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFDD00" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
