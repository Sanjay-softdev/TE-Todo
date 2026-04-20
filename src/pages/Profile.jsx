import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { StatusBar } from '../app/components/StatusBar';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { tasks } = useTasks();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profile, setProfile] = useState({ role: 'Lead Administrator', team: 'Operations', full_name: '' });

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.email) return;
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .eq('email', user.email)
          .single();
        
        if (error) throw error;
        if (data) setProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    }
    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      toast.error('Sign out failed');
    }
  };

  const stats = {
    created: tasks.filter(t => t.created_by === user?.id).length,
    assigned: tasks.filter(t => t.assigned_to === (user?.email || 'Alice')).length, // Mock logic for assigned
    completed: tasks.filter(t => t.status === 'done' && (t.assigned_to === user?.email || t.created_by === user?.id)).length
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const toastId = toast.loading('Uploading avatar...');
    try {
      const ext = file.name.split('.').pop();
      const path = `avatars/${user.id}-${Date.now()}.${ext}`;
      
      const { error: uploadErr } = await supabase.storage
        .from('task-media')
        .upload(path, file, { contentType: file.type });
      
      if (uploadErr) throw uploadErr;
      
      const publicUrl = supabase.storage.from('task-media').getPublicUrl(path).data.publicUrl;
      
      // Update employee profile with new avatar URL
      const { error: updateErr } = await supabase
        .from('employees')
        .update({ avatar_url: publicUrl })
        .eq('email', user.email);
        
      if (updateErr) throw updateErr;
      
      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      toast.success('Avatar updated', { id: toastId });
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
      console.error(err);
    }
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'AD';
  const userName = user?.email?.split('@')[0].replace('.', ' ') || 'Administrator';

  return (
    <div className="min-h-screen bg-white">
      <StatusBar />
      
      {/* Yellow Header */}
      <div className="bg-[#FFDD00] px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center border-none cursor-pointer transition-default active:scale-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFDD00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[#1A1A1A] flex-1 ml-3" style={{ fontSize: '18px', fontWeight: 600 }}>
            Profile
          </h1>
          <button className="text-[#1A1A1A] bg-transparent border-none cursor-pointer font-medium" style={{ fontSize: '14px' }}>
            Edit
          </button>
        </div>

        {/* Avatar and Name */}
        <div className="flex flex-col items-center animate-slide-up">
          <div className="relative mb-4">
            <div className="w-[80px] h-[80px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FFDD00] overflow-hidden" style={{ fontSize: '32px', fontWeight: 600 }}>
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : userInitials}
            </div>
            <label className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border-2 border-[#FFDD00] flex items-center justify-center cursor-pointer shadow-sm active:scale-90 transition-transform">
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </label>
          </div>
          <h2 className="text-[#1A1A1A] mb-1 capitalize" style={{ fontSize: '20px', fontWeight: 600 }}>
            {profile.full_name || userName}
          </h2>
          <p className="text-[#1A1A1A] opacity-60" style={{ fontSize: '12px', fontWeight: 400 }}>
            {profile.role} · {profile.team}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#1A1A1A] px-4 py-6 flex justify-around">
        <div className="text-center">
          <div className="text-white mb-1 text-2xl font-semibold">{stats.created}</div>
          <div className="text-[#888888] text-[10px] uppercase tracking-wider font-medium">Tasks created</div>
        </div>
        <div className="text-center">
          <div className="text-white mb-1 text-2xl font-semibold">{stats.assigned}</div>
          <div className="text-[#888888] text-[10px] uppercase tracking-wider font-medium">Assigned</div>
        </div>
        <div className="text-center">
          <div className="text-white mb-1 text-2xl font-semibold">{stats.completed}</div>
          <div className="text-[#888888] text-[10px] uppercase tracking-wider font-medium">Completed</div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-5 pb-10 flex flex-col gap-8">
        {/* Personal Info */}
        <section>
          <h3 className="text-[#AAAAAA] uppercase mb-3 text-[10px] font-semibold tracking-widest">Personal Info</h3>
          <div className="flex flex-col">
            <ProfileRow icon={<UserIcon />} label="Full name" value={profile.full_name || userName} />
            <ProfileRow icon={<BriefcaseIcon />} label="Role" value={profile.role} />
            <ProfileRow icon={<MailIcon />} label="Email" value={user?.email || 'admin@co.com'} />
            <ProfileRow icon={<UsersIcon />} label="Team" value={profile.team} />
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-[#AAAAAA] uppercase mb-3 text-[10px] font-semibold tracking-widest">Preferences</h3>
          <div className="flex flex-col">
            <ProfileRowWithToggle
              icon={<BellIcon />}
              label="Notifications"
              enabled={notificationsEnabled}
              onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <ProfileRow icon={<TeamIcon />} label="Default team" value="Dev Team" />
          </div>
        </section>

        {/* Security */}
        <section>
          <h3 className="text-[#AAAAAA] uppercase mb-3 text-[10px] font-semibold tracking-widest">Security</h3>
          <div className="flex flex-col">
            <ProfileRow icon={<LockIcon />} label="Reset password" value="" showChevron />
            <ProfileRowWithToggle
              icon={<ShieldIcon />}
              label="Two-factor auth"
              enabled={twoFactorEnabled}
              onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
          </div>
        </section>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-4 bg-[#FCEBEB] text-[#E24B4A] rounded-xl border-none cursor-pointer transition-default font-semibold text-sm active:scale-[0.98]"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

// Helper Components
function ProfileRow({ icon, label, value, showChevron = false }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-[#F5F5F5] last:border-none">
      <div className="w-9 h-9 rounded-full bg-[#FFDD00] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[#1A1A1A] text-sm font-semibold">{label}</div>
        {value && <div className="text-[#888888] text-xs mt-0.5">{value}</div>}
      </div>
      {showChevron && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </div>
  );
}

function ProfileRowWithToggle({ icon, label, enabled, onToggle }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-[#F5F5F5] last:border-none">
      <div className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-[#1A1A1A] text-sm font-semibold">{label}</div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-all duration-200 ${
          enabled ? 'bg-[#1A1A1A]' : 'bg-[#DDDDDD]'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-[#FFDD00] transition-all duration-200 ${
            enabled ? 'left-[23px]' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

// Minimal Icons
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const TeamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
