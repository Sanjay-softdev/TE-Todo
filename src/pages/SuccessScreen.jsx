import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../app/components/StatusBar';

export default function SuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 max-w-[420px] mx-auto w-full animate-slide-up">
      <StatusBar />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-[44px] h-[44px] bg-[#FFDD00] rounded-full flex items-center justify-center mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        
        <h1 className="text-[#1A1A1A] mb-2" style={{ fontSize: '15px', fontWeight: 500 }}>
          Task submitted
        </h1>
        <p className="text-[#888888] max-w-[200px]" style={{ fontSize: '10px', lineHeight: 1.5 }}>
          Your task has been successfully assigned and the recipient has been notified via Zoho Cliq.
        </p>

        <div className="mt-10 w-full">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full h-[42px] bg-[#FFDD00] text-[#1A1A1A] rounded-[8px] border-none font-medium text-[13px] active:scale-[0.98] transition-default"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
