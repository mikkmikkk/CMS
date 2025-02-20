import React from 'react';
import AdminNavbar from '../UI/adminnavbar';

function SubmittedFormsManagement() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
     <AdminNavbar />

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Submitted Forms Management</h1>

        {/* Non-Referrals Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium mb-4">Non-Referrals</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">Computer Science</td>
                    <td className="px-6 py-4 whitespace-nowrap">3rd</td>
                    <td className="px-6 py-4 whitespace-nowrap">Walk-in</td>
                    <td className="px-6 py-4 whitespace-nowrap">Self</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-500">New</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Attended</option>
                        <option>Missed</option>
                        <option>Pending</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Sebastian Vincent</td>
                    <td className="px-6 py-4 whitespace-nowrap">Engineering</td>
                    <td className="px-6 py-4 whitespace-nowrap">2nd</td>
                    <td className="px-6 py-4 whitespace-nowrap">Online</td>
                    <td className="px-6 py-4 whitespace-nowrap">Self</td>
                    <td className="px-6 py-4 whitespace-nowrap">Reviewed</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Follow up</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium mb-4">Referrals</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Mike Stanford</td>
                    <td className="px-6 py-4 whitespace-nowrap">Engineering</td>
                    <td className="px-6 py-4 whitespace-nowrap">4th</td>
                    <td className="px-6 py-4 whitespace-nowrap">Call-in</td>
                    <td className="px-6 py-4 whitespace-nowrap">Dean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-500">New</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Follow up</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap">Physiology</td>
                    <td className="px-6 py-4 whitespace-nowrap">1st</td>
                    <td className="px-6 py-4 whitespace-nowrap">Online</td>
                    <td className="px-6 py-4 whitespace-nowrap">Professor</td>
                    <td className="px-6 py-4 whitespace-nowrap">Reviewed</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>No Show</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedFormsManagement;
