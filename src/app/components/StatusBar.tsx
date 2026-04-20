export function StatusBar() {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-[#1A1A1A] text-white px-4 py-1 flex items-center justify-between" style={{ fontSize: '9px' }}>
      <span>{getCurrentTime()}</span>
      <div className="flex items-center gap-[3px]">
        <div className="w-1 h-1 rounded-full bg-white"></div>
        <div className="w-1 h-1 rounded-full bg-white"></div>
        <div className="w-1 h-1 rounded-full bg-white"></div>
        <div className="w-1 h-1 rounded-full bg-white"></div>
      </div>
    </div>
  );
}
