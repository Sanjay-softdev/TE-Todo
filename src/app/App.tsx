import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Toaster } from 'sonner';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import TaskDetail from '../pages/TaskDetail';
import CreateTask from '../pages/CreateTask';
import Profile from '../pages/Profile';
import SuccessScreen from '../pages/SuccessScreen';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Desktop Wrapper: subtle background for screens > 420px */}
        <div className="min-h-screen bg-[#F8F9FA] flex justify-center font-sans">
          
          {/* Main Container - Responsive Width */}
          <div className="w-full max-w-[420px] md:max-w-none bg-white relative shadow-[0_0_50px_rgba(0,0,0,0.04)] min-h-screen flex flex-col">
            
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/task/:id" 
                element={
                  <ProtectedRoute>
                    <TaskDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreateTask />
                  </ProtectedRoute>
                } 
              />
               <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/success" 
                element={
                  <ProtectedRoute>
                    <SuccessScreen />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            
            <Toaster 
              position="top-center" 
              expand={false} 
              richColors 
              toastOptions={{
                style: {
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}