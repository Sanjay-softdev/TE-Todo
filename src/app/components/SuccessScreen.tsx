interface Task {
  title: string;
  assignee: string;
  dueDate: string;
  status: string;
}

interface SuccessScreenProps {
  onNewTask: () => void;
  recentTasks: Task[];
}

export function SuccessScreen({ onNewTask, recentTasks }: SuccessScreenProps) {
  return (
    <div
      className="min-h-screen bg-white flex flex-col px-4 pt-12 animate-slide-up max-w-[420px] mx-auto"
    >
      <div className="w-11 h-11 rounded-full bg-[#FFDD00] flex items-center justify-center mb-6 mx-auto">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="text-[#1A1A1A] text-center mb-2" style={{ fontSize: '15px', fontWeight: 500 }}>
        Task submitted
      </h1>
      <p className="text-[#888888] text-center mb-8" style={{ fontSize: '10px', lineHeight: 1.5 }}>
        Your task has been successfully assigned and added to the workflow.
      </p>

      {recentTasks.length > 0 && (
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-[#1A1A1A] uppercase" style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.6px' }}>
            Recent Tasks
          </p>
          {recentTasks.map((task, index) => (
            <div key={index} className="bg-[#F5F5F5] rounded-lg p-3">
              <p className="text-[#1A1A1A] mb-2" style={{ fontSize: '11px', fontWeight: 500 }}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="bg-[#1A1A1A] text-[#FFDD00] px-2 py-0.5 rounded"
                  style={{ fontSize: '8px', fontWeight: 500 }}
                >
                  {task.assignee}
                </span>
                <span className="text-[#888888]" style={{ fontSize: '9px' }}>
                  {task.dueDate}
                </span>
                <span
                  className="bg-[#1A1A1A] text-[#FFDD00] px-2 py-0.5 rounded"
                  style={{ fontSize: '8px', fontWeight: 500 }}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto mb-8">
        <button
          onClick={onNewTask}
          className="w-full h-[42px] bg-[#FFDD00] text-[#1A1A1A] rounded-lg hover:opacity-90 transition-all duration-150"
          style={{ fontSize: '13px', fontWeight: 500 }}
        >
          New task
        </button>
      </div>
    </div>
  );
}
