import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

// Import components
import SignUp from './pages/AccountManagement/signup/signup.jsx';
import Login from './pages//AccountManagement/login/login.jsx';
import Dashboard from './pages/Student/Dashboard.jsx';
import ProfilePage from './pages/Admin/adminprofile.jsx';
import AdminDashboard from './pages/Admin/Admindashboard.jsx';
import AdminProfilePage from './pages/Admin/adminprofile.jsx';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('userEmail');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Route Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['student', 'faculty']}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={['student', 'faculty']}>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Admindashboard",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminprofile",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="bg-[#340013] text-white px-4 py-2 rounded-md hover:bg-[#2a0010]"
        >
          Return to Login
        </button>
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="bg-[#340013] text-white px-4 py-2 rounded-md hover:bg-[#2a0010]"
        >
          Return to Login
        </button>
      </div>
    ),
  },
]);

// Root Render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);