import React from 'react';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="w-full bg-white pt-10 px-16 flex justify-between items-center"
           style={{ height: '72px' }}>
        <img src="/src/assets/img/cmslogo.png" alt="Logo" className="w-16 h-16" />
        <nav className="flex items-center gap-6">
          <div className="flex gap-6">
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Dashboard</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Reports</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Submissions</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Schedule</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">History</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Profile</a>
          </div>
          <button className="bg-[#3A0323] hover:bg-[#2a021a] text-white px-6 py-2 rounded-md transition-colors">
            Logout
          </button>
        </nav>
      </div>

      {/* Admin Dashboard Content */}
      <h1 className="text-2xl font-bold mt-16 px-16">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mt-6 px-16">
        {/* Statistics Cards */}
        {['Total Number of Students', 'New Requests', 'Completed Sessions', 'No-shows'].map((title, index) => (
          <div key={index} className="border p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-4xl font-bold">{[15, 6, 24, 3][index]}</p>
            <p className="text-gray-600 text-sm">{['This semester', '+1 since yesterday', 'This month', 'This week'][index]}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity and Notifications */}
      <div className="grid grid-cols-2 gap-6 mt-6 px-16">
        <div className="border p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <button className="text-[#3A0323] font-medium hover:text-[#2a021a] transition-colors">See all</button>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mt-4 border-b pb-2">
              <p className="font-semibold">New Referral: John Doe (CS101)</p>
              <p className="text-gray-600 text-sm">Referred by: Prof. Smith - <span className="font-bold">Reason:</span> Academic Performance</p>
            </div>
          ))}
        </div>

        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Notifications</h2>
        </div>
      </div>

     
      {/* <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Students per Colleges</h2>
         
        </div>
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Students per Colleges</h2>
         
        </div>
      </div> */}
    </div>
  );
}

export default AdminDashboard;