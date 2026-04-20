import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../components/StatusBar';
import { format } from 'date-fns';

interface TaskData {
  taskName: string;
  assignee: string;
  startDate: string;
  endDate: string;
}

export default function SuccessScreen() {
  const navigate = useNavigate();
  const [lastTask, setLastTask] = useState<TaskData | null>(null);

  useEffect(() => {
    const taskDataStr = localStorage.getItem('lastTask');
    if (taskDataStr) {
      setLastTask(JSON.parse(taskDataStr));
    }
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d');
    } catch {
      return dateString;
    }
  };

  const handleNewTask = () => {
    navigate('/task');
  };

  const recentTasks = [
    {
      title: 'Design review meeting',
      assignee: 'Sarah',
      dueDate: 'Apr 20',
      status: 'In Progress'
    },
    {
      title: 'Update documentation',
      assignee: 'Mike',
      dueDate: 'Apr 22',
      status: 'Pending'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      
      <div className="w-full max-w-[420px] mx-auto px-4 py-12">
        <div className="slide-up">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-11 h-11 bg-[#FFDD00] rounded-full flex items-center justify-center"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3,8 6,11 13,4"/>
              </svg>
            </div>
          </div>

          {/* Title and subtitle */}
          <div className="text-center mb-8">
            <h1 
              className="text-[#1A1A1A] mb-2"
              style={{ fontSize: '15px', fontWeight: 500, margin: 0, marginBottom: '8px' }}
            >
              Task submitted
            </h1>
            <p 
              className="text-[#888888] m-0"
              style={{ fontSize: '10px', lineHeight: 1.5 }}
            >
              Your task has been assigned and team members have been notified
            </p>
          </div>

          {/* Last submitted task */}
          {lastTask && (
            <div className="mb-4">
              <div 
                className="bg-[#F5F5F5] rounded-lg"
                style={{ 
                  padding: '10px 12px',
                  borderRadius: '8px'
                }}
              >
                <div 
                  className="text-[#1A1A1A] mb-2"
                  style={{ fontSize: '11px', fontWeight: 500 }}
                >
                  {lastTask.taskName}
                </div>
                <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
                  <span 
                    className="bg-[#1A1A1A] text-[#FFDD00] px-2 py-0.5 rounded"
                    style={{ 
                      fontSize: '8px',
                      borderRadius: '3px',
                      fontWeight: 500
                    }}
                  >
                    {lastTask.assignee}
                  </span>
                  <span 
                    className="text-[#888888]"
                    style={{ fontSize: '9px' }}
                  >
                    Due: {formatDate(lastTask.endDate)}
                  </span>
                  <span 
                    className="bg-[#F5F5F5] text-[#1A1A1A] px-2 py-0.5 rounded border border-[#1A1A1A]"
                    style={{ 
                      fontSize: '8px',
                      borderRadius: '3px'
                    }}
                  >
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recent tasks */}
          <div className="mb-8">
            <div 
              className="text-[#1A1A1A] uppercase tracking-wider mb-3"
              style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}
            >
              RECENT TASKS
            </div>
            
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {recentTasks.map((task, index) => (
                <div 
                  key={index}
                  className="bg-[#F5F5F5] rounded-lg"
                  style={{ 
                    padding: '10px 12px',
                    borderRadius: '8px'
                  }}
                >
                  <div 
                    className="text-[#1A1A1A] mb-2"
                    style={{ fontSize: '11px', fontWeight: 500 }}
                  >
                    {task.title}
                  </div>
                  <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
                    <span 
                      className="bg-[#1A1A1A] text-[#FFDD00] px-2 py-0.5 rounded"
                      style={{ 
                        fontSize: '8px',
                        borderRadius: '3px',
                        fontWeight: 500
                      }}
                    >
                      {task.assignee}
                    </span>
                    <span 
                      className="text-[#888888]"
                      style={{ fontSize: '9px' }}
                    >
                      Due: {task.dueDate}
                    </span>
                    <span 
                      className="bg-[#F5F5F5] text-[#888888] px-2 py-0.5 rounded border border-[#888888]"
                      style={{ 
                        fontSize: '8px',
                        borderRadius: '3px'
                      }}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Task CTA */}
          <button
            onClick={handleNewTask}
            className="w-full h-[42px] bg-[#FFDD00] text-[#1A1A1A] border-none cursor-pointer transition-default"
            style={{ 
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '8px'
            }}
          >
            New task
          </button>
        </div>
      </div>
    </div>
  );
}
