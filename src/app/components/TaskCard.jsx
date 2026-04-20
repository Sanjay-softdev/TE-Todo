import React from 'react';

const TaskCard = ({ task, onClick }) => {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';
  
  const getDaysOverdue = (date) => {
    const diff = new Date() - new Date(date);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFDD00';
      case 'in_progress': return '#1A1A1A';
      case 'done': return '#CCCCCC';
      default: return '#FFDD00';
    }
  };

  const getStatusPillStyles = (status) => {
    switch (status) {
      case 'pending': return 'bg-[#FFDD00] text-[#1A1A1A]';
      case 'in_progress': return 'bg-[#F5F5F5] text-[#888888]';
      case 'done': return 'bg-[#EAF3DE] text-[#3B6D11]';
      default: return 'bg-[#F5F5F5] text-[#888888]';
    }
  };

  return (
    <button
      onClick={() => onClick(task.id)}
      className={`relative bg-white border border-[#ECECEC] p-3 text-left transition-all active:scale-[0.98] group flex flex-col gap-2 ${
        isOverdue ? 'border-l-[2.5px] border-l-[#E24B4A] rounded-r-xl rounded-l-none' : 'rounded-xl'
      }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[13px] font-medium text-[#1A1A1A] truncate pr-4">
          {task.title}
        </h3>
        <div 
          className="w-[10px] h-[10px] rounded-full shrink-0" 
          style={{ backgroundColor: getStatusColor(task.status) }}
        />
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <span className="bg-[#1A1A1A] text-[#FFDD00] rounded-[4px] px-2 py-[2px] text-[10px] font-medium">
          {task.assigned_to || 'UNASSIGNED'}
        </span>
        <span className={`rounded-[4px] px-2 py-[2px] text-[10px] font-medium ${getStatusPillStyles(task.status)}`}>
          {task.status.replace('_', ' ').toUpperCase()}
        </span>
        <span className="text-[#BBBBBB] text-[10px] font-normal ml-auto">
          {new Date(task.due_date || task.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {isOverdue && (
        <p className="text-[10px] font-medium text-[#E24B4A] mt-1">
          {getDaysOverdue(task.due_date)} days overdue
        </p>
      )}
    </button>
  );
};

export default React.memo(TaskCard);
