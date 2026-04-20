import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { StatusBar } from '../app/components/StatusBar';
import { FormField } from '../app/components/FormField';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { session, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) throw error;
      
      toast.success('Logged in successfully');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex flex-col justify-center px-4 max-w-[420px] mx-auto w-full">
        <div className="mb-8">
          <div 
            className="w-9 h-9 bg-[#FFDD00] rounded-[8px] flex items-center justify-center mb-6"
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
            style={{ fontSize: '18px', fontWeight: 500 }}
          >
            Welcome back
          </h1>
          <p 
            className="text-[#888888]"
            style={{ fontSize: '11px' }}
          >
            Sign in to your workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-field">
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
              className={`w-full h-[46px] rounded-[8px] border-none font-medium text-[13px] transition-default ${
                isLoading ? 'opacity-70 bg-[#1A1A1A] text-[#FFDD00]' : 'bg-[#1A1A1A] text-[#FFDD00] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#FFDD00] border-t-transparent rounded-full animate-spin-fast" />
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
