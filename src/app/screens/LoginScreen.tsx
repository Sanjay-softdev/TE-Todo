import { useState } from 'react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../components/StatusBar';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/task');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="mb-8">
            <div 
              className="w-9 h-9 bg-[#FFDD00] rounded-lg flex items-center justify-center mb-6"
              style={{ borderRadius: '8px' }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="4" height="4"/>
                <rect x="10" y="2" width="4" height="4"/>
                <rect x="2" y="10" width="4" height="4"/>
                <rect x="10" y="10" width="4" height="4"/>
              </svg>
            </div>
            
            <h1 
              className="text-[#1A1A1A] mb-2"
              style={{ fontSize: '18px', fontWeight: 500, margin: 0, marginBottom: '8px' }}
            >
              Welcome back
            </h1>
            <p 
              className="text-[#888888] m-0"
              style={{ fontSize: '11px' }}
            >
              Sign in to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '14px' }}>
            <FormField
              label="EMAIL"
              required
              inputProps={{
                type: 'email',
                placeholder: 'you@company.com',
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />

            <FormField
              label="PASSWORD"
              required
              inputProps={{
                type: 'password',
                placeholder: 'Enter your password',
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />

            <div className="mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[46px] bg-[#1A1A1A] text-[#FFDD00] border-none cursor-pointer transition-default"
                style={{ 
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '8px'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div 
                      className="w-4 h-4 border-2 border-[#FFDD00] border-t-transparent rounded-full"
                      style={{
                        animation: 'spin 0.8s linear infinite'
                      }}
                    ></div>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
