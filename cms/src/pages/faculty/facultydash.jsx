import React, { useState } from "react";  // 
import { useNavigate } from "react-router-dom";
import { useProfile } from "../ui/ProfileContext"; // 

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { openProfile } = useProfile(); // 
  const [showModal, setShowModal] = useState(false); // 

  const handleLogout = () => {
    navigate("/");
  };

  const handleHome = () => {
    navigate("/Dashboard");
  };

  const handleRequest = () => {
    navigate("/Request");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="w-full bg-white pt-10 px-16 flex justify-between items-center" style={{ height: '72px' }}>
        <img src="/src/assets/img/cmslogo.png" alt="Logo" className="w-16 h-16" />
        <nav className="flex items-center gap-6">
          <div className="flex gap-6">
            <a href="#" onClick={handleHome} className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Home</a>
            <a href="#" onClick={handleRequest} className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Request</a>
            <a href="#" onClick={openProfile} className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Profile</a> {/* ✅ Fix: Now opens modal */}
          </div>
          <button onClick={handleLogout} className="bg-[#3A0323] hover:bg-[#2a021a] text-white px-6 py-3 rounded-md transition-colors">
            Logout
          </button>
        </nav>
      </div>
      
      {/* Welcome Text */}
      <h1 className="text-2xl font-bold mt-16 px-16">Welcome Micah Espinosa</h1>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-6 mt-6 px-16">
        {/* Schedule Card */}
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Schedule</h2>
        </div>

        {/* Notifications Card */}
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Notifications</h2>
          <div className="flex items-start gap-3 mt-4">
            <div className="w-6 h-6 bg-[#340013] rounded-md"></div>
            <div>
              <p className="font-semibold">Rescheduled Session</p>
              <p className="text-gray-600 text-sm">
                Rescheduled for November 12, 2024 <br />
                Time: 3:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

