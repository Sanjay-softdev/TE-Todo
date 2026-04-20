import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Toaster } from 'sonner';

// Pages (we will create/refactor these)
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import TaskDetail from '../pages/TaskDetail';
import CreateTask from '../pages/CreateTask';
import Profile from '../pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white max-w-[420px] mx-auto relative shadow-xl">
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
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster position="top-center" expand={false} richColors />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}