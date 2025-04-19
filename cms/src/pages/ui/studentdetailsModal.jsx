import React, { useState } from 'react';

function StudentDetailsModal({ 
  student, 
  onClose, 
  handleRemarkChange, 
  updatingId,
  dropdownValue
}) {
  const [sessionNotes, setSessionNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // Helper function for status color
  const getStatusClass = (status) => {
    switch(status) {
      case 'Attended': return 'bg-green-100 text-green-800';
      case 'No Show': return 'bg-yellow-100 text-yellow-800';
      case 'No Response': return 'bg-orange-100 text-orange-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      case 'Follow up': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800'; // Default
    }
  };

  // Handle the Accept button click
  const handleAccept = () => {
    console.log("Follow-up date at accept:", followUpDate); // Add this logging
    
    // For Follow up, make sure there's a date selected
    if (dropdownValue === 'Follow up' && !followUpDate) {
      alert('Please select a follow-up date');
      return;
    }
    
    // Call the handleRemarkChange function with the student ID, remark, and follow-up date
    handleRemarkChange(student.id, dropdownValue, followUpDate, sessionNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-2xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4">View History Details</h2>
        
        {/* Student details sections remain the same */}
        <div>
          <p><strong>Mode of Counseling:</strong> {student.details.mode}</p>
          <p><strong>Full name:</strong> {student.details.fullName}</p>
          <p><strong>UIC Email Address:</strong> {student.details.email}</p>
          <p><strong>Course & Year:</strong> {student.details.courseYear}</p>
          <p><strong>College Department:</strong> {student.details.department}</p>
          <p><strong>UIC ID:</strong> {student.details.id}</p>
          <p><strong>Date of Birth:</strong> {student.details.dob}</p>
          <p><strong>Age/Sex:</strong> {student.details.ageSex}</p>
          <p><strong>Contact No.:</strong> {student.details.contact}</p>
          <p><strong>Present Address:</strong> {student.details.address}</p>
          <p><strong>Emergency contact person and no.:</strong> {student.details.emergencyContact}</p>
          <p><strong>Date:</strong> {student.details.date}</p>
          <p><strong>Time:</strong> {student.details.time}</p>
          {student.remarks && (
            <p><strong>Current Remarks:</strong> <span className={`px-2 py-1 rounded-full ${getStatusClass(student.remarks)}`}>
              {student.remarks}
            </span></p>
          )}

          <h3 className="text-lg font-bold mt-4">Personal</h3>
          <ul>
            {student.details.personal.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-4">Interpersonal</h3>
          <ul>
            {student.details.interpersonal.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-4">Grief/Bereavement</h3>
          <ul>
            {student.details.grief.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-4">Academics</h3>
          <ul>
            {student.details.academics.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-4">Family</h3>
          <ul>
            {student.details.family.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Session Notes</h3>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Enter session notes..."
          />
        </div>

        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Update Session Status</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={dropdownValue}
                onChange={(e) => {
                  if (e.target.value) {
                    handleRemarkChange(student.id, e.target.value, null, null, true); // true indicates this is just a dropdown change
                  }
                }}
                disabled={updatingId === student.id}
              >
                <option value="">Select Remarks</option>
                <option value="Attended">Attended</option>
                <option value="No Show">No Show</option>
                <option value="No Response">No Response</option>
                <option value="Terminated">Terminated</option>
                <option value="Follow up">Follow-up</option>
              </select>
            </div>
            
            {/* Only show follow-up date field when Follow-up is selected */}
            {dropdownValue === 'Follow up' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  min={new Date().toISOString().split('T')[0]}
                  value={followUpDate}
                  onChange={(e) => {
                    console.log("Date selected:", e.target.value); // Add this logging
                    setFollowUpDate(e.target.value);
                  }}
                  required={dropdownValue === 'Follow up'}
                />
              </div>
            )}
          </div>
        
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              disabled={updatingId === student.id || !dropdownValue || (dropdownValue === 'Follow up' && !followUpDate)}
            >
              Accept
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
                
                export default StudentDetailsModal;