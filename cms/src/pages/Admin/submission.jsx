import React from 'react';
import AdminNavbar from '../UI/adminnavbar';

function History() {
  return (
    <div className="bg-white-100 min-h-screen">
      <AdminNavbar />

      {/* History Table Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Session History</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Year</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Referral</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">Computer Science</td>
                <td className="py-3 px-4">3rd</td>
                <td className="py-3 px-4">Walk-in</td>
                <td className="py-3 px-4">Self</td>
                <td className="py-3 px-4">Reviewed</td>
                <td className="py-3 px-4">Terminated</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Sebastian Vincent</td>
                <td className="py-3 px-4">Engineering</td>
                <td className="py-3 px-4">2nd</td>
                <td className="py-3 px-4">Online</td>
                <td className="py-3 px-4">Self</td>
                <td className="py-3 px-4">Reviewed</td>
                <td className="py-3 px-4">Terminated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
