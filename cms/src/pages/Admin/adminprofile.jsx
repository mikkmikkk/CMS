import React from 'react';

function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="w-full bg-white pt-10 px-16 flex justify-between items-center"
           style={{ height: '72px' }}>
        <img src="/src/assets/img/cmslogo.png" alt="Logo" className="w-16 h-16" />
        <nav className="flex items-center gap-6">
          <div className="flex gap-6">
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Home</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Request</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors">Profile</a>
          </div>
          <button className="bg-[#3A0323] hover:bg-[#2a021a] text-white px-6 py-3 rounded-md transition-colors">
            Logout
          </button>
        </nav>
      </div>

      {/* Profile Update Section */}
      <div className="flex justify-center items-center p-6 pt-44">
        <div className="w-[700px] bg-white border rounded-lg shadow-lg flex">
          {/* Left Section - Logo */}
          <div className="w-1/2 flex justify-center items-center p-6 border-r">
            <img src="/src/assets/img/cmslogo.png" alt="Logo" className="w-32 h-32" />
          </div>
          
          {/* Right Section - Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium">Name</label>
              <input type="text" className="border rounded-md p-2" />
              
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="border rounded-md p-2" />
              
              <label className="text-sm font-medium">Password</label>
              <input type="password" className="border rounded-md p-2" />
              
              <div className="flex justify-end gap-4 mt-4">
                <button className="text-gray-600">Cancel</button>
                <button className="bg-[#3A0323] hover:bg-[#2a021a] text-white px-4 py-2 rounded-md transition-colors">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfilePage;