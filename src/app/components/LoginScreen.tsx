import { useState } from 'react';
import { FormField } from './FormField';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-7 max-w-[480px] mx-auto">
      {/* Logo */}
      <div className="w-[52px] h-[52px] bg-[#FFDD00] rounded-[12px] flex flex-wrap gap-[6px] p-[6px] mb-7">
        <div className="w-[17px] h-[17px] bg-[#1A1A1A] rounded-[3px]"></div>
        <div className="w-[17px] h-[17px] bg-[#1A1A1A] rounded-[3px]"></div>
        <div className="w-[17px] h-[17px] bg-[#1A1A1A] rounded-[3px]"></div>
        <div className="w-[17px] h-[17px] bg-[#1A1A1A] rounded-[3px] opacity-25"></div>
      </div>

      <h1 className="text-[#1A1A1A] mb-[6px]" style={{ fontSize: '28px', fontWeight: 500 }}>
        Welcome back
      </h1>
      <p className="text-[#888888] mb-8" style={{ fontSize: '14px' }}>
        Sign in to your workspace
      </p>

      <div className="flex flex-col" style={{ gap: '16px' }}>
        <div>
          <label className="text-[#1A1A1A] uppercase block mb-1" style={{ fontSize: '10px', letterSpacing: '0.6px', fontWeight: 500 }}>
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@company.com"
            className="w-full bg-[#F5F5F5] border-none rounded-[10px] px-4 py-[14px] text-[#1A1A1A] placeholder:text-[#AAAAAA] focus:outline-none focus:shadow-[0_0_0_2px_#FFDD00] transition-default"
            style={{ fontSize: '14px' }}
          />
        </div>

        <div>
          <label className="text-[#1A1A1A] uppercase block mb-1" style={{ fontSize: '10px', letterSpacing: '0.6px', fontWeight: 500 }}>
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-[#F5F5F5] border-none rounded-[10px] px-4 py-[14px] text-[#1A1A1A] placeholder:text-[#AAAAAA] focus:outline-none focus:shadow-[0_0_0_2px_#FFDD00] transition-default"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full h-[52px] bg-[#1A1A1A] text-[#FFDD00] rounded-[12px] hover:bg-[#2A2A2A] transition-default border-none cursor-pointer"
          style={{ fontSize: '15px', fontWeight: 500 }}
        >
          Sign in
        </button>
        <button
          className="w-full text-[#888888] bg-transparent border-none cursor-pointer mt-4"
          style={{ fontSize: '12px' }}
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}
