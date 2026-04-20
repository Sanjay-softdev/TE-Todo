interface AppBarProps {
  title: string;
  userInitials?: string;
}

export function AppBar({ title, userInitials = "JD" }: AppBarProps) {
  return (
    <div className="bg-[#FFDD00] px-4 h-14 flex items-center justify-between">
      <h1 className="text-[#1A1A1A]" style={{ fontSize: '15px', fontWeight: 500 }}>
        {title}
      </h1>
      <div
        className="w-[26px] h-[26px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00]"
        style={{ fontSize: '9px', fontWeight: 500 }}
      >
        {userInitials}
      </div>
    </div>
  );
}
