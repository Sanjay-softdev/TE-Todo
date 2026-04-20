import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useAuth } from '../hooks/useAuth';
import { StatusBar } from '../app/components/StatusBar';
import { FormField } from '../app/components/FormField';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Logged in successfully');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] mx-auto animate-slide-up">
          <div className="mb-8">
            <div 
              className="w-11 h-11 bg-[#FFDD00] rounded-lg flex items-center justify-center mb-6"
              style={{ borderRadius: '10px' }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="#1A1A1A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="4" height="4" rx="1"/>
                <rect x="10" y="2" width="4" height="4" rx="1"/>
                <rect x="2" y="10" width="4" height="4" rx="1"/>
                <rect x="10" y="10" width="4" height="4" rx="1" style={{ opacity: 0.3 }}/>
              </svg>
            </div>
            
            <h1 
              className="text-[#1A1A1A] mb-2"
              style={{ fontSize: '26px', fontWeight: 600, margin: 0, marginBottom: '6px' }}
            >
              Welcome back
            </h1>
            <p 
              className="text-[#888888] m-0"
              style={{ fontSize: '14px' }}
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
                placeholder: 'admin@company.com',
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

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-[#1A1A1A] text-[#FFDD00] border-none cursor-pointer transition-default active:scale-[0.98]"
                style={{ 
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: '12px'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div 
                      className="w-5 h-5 border-2 border-[#FFDD00] border-t-transparent rounded-full animate-spin"
                    ></div>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button 
                type="button"
                className="text-[#888888] bg-transparent border-none cursor-pointer hover:underline"
                style={{ fontSize: '12px' }}
                onClick={() => toast.info('Please contact your administrator')}
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
