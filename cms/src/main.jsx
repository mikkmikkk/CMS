import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/AccountManagement/signup/signup.jsx'
import Login from './pages//AccountManagement/login/login.jsx'
import Dashboard from './pages/Student/Dashboard.jsx'
import ProfilePage from './pages/Admin/adminprofile.jsx';
import AdminDashboard from './pages/Admin/Admindashboard.jsx'
import AdminProfilePage from './pages/Admin/adminprofile.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/Admindashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/adminprofile",
    element: <AdminProfilePage />,
  }
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)