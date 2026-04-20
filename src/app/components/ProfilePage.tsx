import { useState } from 'react';

interface ProfilePageProps {
  onBack: () => void;
  onSignOut: () => void;
  user: {
    name: string;
    initials: string;
    role: string;
    department: string;
    team: string;
    email: string;
    tasksCreated: number;
    tasksAssigned: number;
    tasksCompleted: number;
    zohoHandle: string;
  };
}

export function ProfilePage({ onBack, onSignOut, user }: ProfilePageProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-white max-w-[480px] mx-auto">
      {/* Status Bar */}
      <div className="h-6 bg-[#1A1A1A] px-4 flex items-center justify-between text-white" style={{ fontSize: '9px' }}>
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <div className="w-1 h-1 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Yellow Header */}
      <div className="bg-[#FFDD00] px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer hover:bg-[#2A2A2A] transition-default"
            aria-label="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[#1A1A1A] flex-1 ml-3" style={{ fontSize: '18px', fontWeight: 500 }}>
            Profile
          </h1>
          <button className="text-[#1A1A1A] bg-transparent border-none cursor-pointer" style={{ fontSize: '14px' }}>
            Edit
          </button>
        </div>

        {/* Avatar and Name */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-[72px] h-[72px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00]" style={{ fontSize: '28px', fontWeight: 500 }}>
              {user.initials}
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border-2 border-[#FFDD00] flex items-center justify-center cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>
          <h2 className="text-[#1A1A1A] mb-1" style={{ fontSize: '20px', fontWeight: 500 }}>
            {user.name}
          </h2>
          <p className="text-[#1A1A1A]" style={{ fontSize: '12px', opacity: 0.8 }}>
            {user.role} · {user.department} · {user.team}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#1A1A1A] px-4 py-5 flex justify-around">
        <div className="text-center">
          <div className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 500 }}>
            {user.tasksCreated}
          </div>
          <div className="text-[#888888]" style={{ fontSize: '11px' }}>
            Tasks created
          </div>
        </div>
        <div className="text-center">
          <div className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 500 }}>
            {user.tasksAssigned}
          </div>
          <div className="text-[#888888]" style={{ fontSize: '11px' }}>
            Assigned
          </div>
        </div>
        <div className="text-center">
          <div className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 500 }}>
            {user.tasksCompleted}
          </div>
          <div className="text-[#888888]" style={{ fontSize: '11px' }}>
            Completed
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-5 pb-20">
        {/* Personal Info */}
        <div className="mb-6">
          <h3 className="text-[#AAAAAA] uppercase mb-3" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px' }}>
            Personal Info
          </h3>

          <ProfileRow
            icon={<UserIcon />}
            label="Full name"
            value={user.name.split(' ')[0] + ' R.'}
          />
          <ProfileRow
            icon={<BriefcaseIcon />}
            label="Role"
            value={user.role}
          />
          <ProfileRow
            icon={<MailIcon />}
            label="Email"
            value={user.email}
          />
          <ProfileRow
            icon={<UsersIcon />}
            label="Team"
            value={user.team}
          />
        </div>

        {/* Activity */}
        <div className="mb-6">
          <h3 className="text-[#AAAAAA] uppercase mb-3" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px' }}>
            Activity
          </h3>

          <ProfileRow
            icon={<TaskIcon />}
            label="My tasks"
            value="12 total"
          />
          <ProfileRow
            icon={<ClockIcon />}
            label="Recent activity"
            value="Today"
          />
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h3 className="text-[#AAAAAA] uppercase mb-3" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px' }}>
            Preferences
          </h3>

          <ProfileRow
            icon={<ZohoIcon />}
            label="Zoho Cliq handle"
            value={user.zohoHandle}
          />
          <ProfileRowWithToggle
            icon={<BellIcon />}
            label="Notifications"
            enabled={notificationsEnabled}
            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <ProfileRow
            icon={<TeamIcon />}
            label="Default team"
            value={user.team}
          />
        </div>

        {/* Security */}
        <div className="mb-6">
          <h3 className="text-[#AAAAAA] uppercase mb-3" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px' }}>
            Security
          </h3>

          <ProfileRow
            icon={<LockIcon />}
            label="Reset password"
            value=""
            showChevron
          />
          <ProfileRowWithToggle
            icon={<ShieldIcon />}
            label="Two-factor auth"
            enabled={twoFactorEnabled}
            onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
          <ProfileRow
            icon={<InfoIcon />}
            label="Last login"
            value="Today 9:41"
            showChevron={false}
          />
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="w-full py-4 bg-[#FFEBEB] text-[#E24B4A] rounded-lg border-none cursor-pointer hover:bg-[#FFE0E0] transition-default"
          style={{ fontSize: '14px', fontWeight: 500 }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

// Helper Components
function ProfileRow({ icon, label, value, showChevron = true }: { icon: React.ReactNode; label: string; value: string; showChevron?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#F5F5F5]">
      <div className="w-9 h-9 rounded-full bg-[#FFDD00] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 500 }}>
          {label}
        </div>
        {value && (
          <div className="text-[#888888]" style={{ fontSize: '12px' }}>
            {value}
          </div>
        )}
      </div>
      {showChevron && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </div>
  );
}

function ProfileRowWithToggle({ icon, label, enabled, onToggle }: { icon: React.ReactNode; label: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#F5F5F5]">
      <div className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 500 }}>
        {label}
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-7 rounded-full border-none cursor-pointer transition-all duration-150 ${
          enabled ? 'bg-[#1A1A1A]' : 'bg-[#DDDDDD]'
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-[#FFDD00] transition-transform duration-150 ${
            enabled ? 'left-[26px]' : 'left-1'
          }`}
        ></div>
      </button>
    </div>
  );
}

// Icons
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TaskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ZohoIcon() {
  return (
    <div className="w-[18px] h-[18px] rounded bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00]" style={{ fontSize: '10px', fontWeight: 600 }}>
      Z
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
