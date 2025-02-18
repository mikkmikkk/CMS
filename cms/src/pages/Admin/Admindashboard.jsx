import React from 'react';
import AdminNavbar from '../ui/adminnavbar';

function AdminDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
       <AdminNavbar />

      {/* Dashboard Content */}
      <div className="max-w-8xl mx-auto mt-5 px-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-4 gap-7">
          {[
            { title: 'Total Number of Students', value: 15, subtitle: 'This semester' },
            { title: 'New Requests', value: 6, subtitle: '+1 since yesterday' },
            { title: 'Completed Sessions', value: 24, subtitle: 'This month' },
            { title: 'No-shows', value: 3, subtitle: 'This week' },
          ].map((item, index) => (
            <div key={index} className="bg-white border p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-4xl font-bold">{item.value}</p>
              <p className="text-gray-600 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity & Notifications */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {/* Recent Activity */}
          <div className="bg-white border p-6 rounded-lg shadow-md">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              <button className="text-[#3A0323] font-medium hover:text-[#2a021a] transition-colors">
                See all
              </button>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mt-4 border-b pb-2">
                <p className="font-semibold">New Referral: John Doe (CS101)</p>
                <p className="text-gray-600 text-sm">
                  Referred by: Prof. Smith - <span className="font-bold">Reason:</span> Academic Performance
                </p>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div className="bg-white border p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
