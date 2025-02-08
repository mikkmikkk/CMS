import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white p-6">
      
      <div className="flex justify-between items-center">
        <img src="/logo.png" alt="Logo" className="h-12" /> {/* Replace with actual logo */}
        <nav className="flex gap-6">
          <a href="#" className="text-gray-900 font-medium">Home</a>
          <a href="#" className="text-gray-900 font-medium">Request</a>
          <a href="#" className="text-gray-900 font-medium">Profile</a>
        </nav>
        <button className="bg-[#340013] text-white px-4 py-2 rounded-md text-sm font-semibold">
          Logout
        </button>
      </div>

      {/* Welcome Text */}
      <h1 className="text-2xl font-bold mt-6">Welcome Charles Leclerc</h1>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-6 mt-6">
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
