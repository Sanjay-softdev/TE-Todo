import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    // You could return a full-screen spinner here as per master prompt
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 bg-[#FFDD00] rounded-full animate-pulse" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
