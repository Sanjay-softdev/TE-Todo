interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function SubmitButton({ 
  isLoading = false, 
  disabled = false, 
  children,
  onClick 
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full h-[46px] border-none transition-default cursor-pointer ${
        disabled 
          ? 'bg-[#F5F5F5] text-[#888888] cursor-not-allowed' 
          : 'bg-[#FFDD00] text-[#1A1A1A]'
      }`}
      style={{ 
        fontSize: '13px',
        fontWeight: 500,
        borderRadius: '8px'
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div 
            className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full"
            style={{
              animation: 'spin 0.8s linear infinite'
            }}
          ></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
