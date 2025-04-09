import React, { useState, useEffect } from 'react';
import AdminNavbar from '../ui/adminnavbar';
import { getCompletedInterviewForms } from '../../firebase/firestoreService';

function History() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the specialized function to get only completed forms
      const result = await getCompletedInterviewForms();
      
      if (!result.success) {
        setError(result.error || "Failed to fetch session history");
        return;
      }
      
      // Sort sessions by date (newest first)
      const sortedForms = result.forms.sort((a, b) => {
        const dateA = a.submissionDate ? new Date(a.submissionDate) : new Date(0);
        const dateB = b.submissionDate ? new Date(b.submissionDate) : new Date(0);
        return dateB - dateA;
      });
      
      setSessions(sortedForms);
      console.log("History sessions loaded:", sortedForms.length);
      
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to load session history: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const getFilteredSessions = () => {
    return sessions.filter(session => {
      // Filter by search term
      const matchesSearch = 
        (session.studentName && session.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (session.courseYearSection && session.courseYearSection.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (session.referredBy && session.referredBy.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by remarks instead of status
      const matchesStatus = filterStatus === 'All' || session.remarks === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  };

  const getSessionType = (session) => {
    if (session.isReferral === true) return "Referral";
    if (session.type) return session.type;
    return "Walk-in";
  };

  const getReferralSource = (session) => {
    if (session.referredBy) return session.referredBy;
    if (session.facultyName) return session.facultyName;
    return "Self";
  };

  const getYearLevel = (session) => {
    if (!session.courseYearSection) return "N/A";
    
    // Try to extract year from courseYearSection (assuming format like "CS 3A")
    const yearMatch = session.courseYearSection.match(/\d+/);
    if (yearMatch) {
      const year = yearMatch[0];
      switch(year) {
        case '1': return '1st';
        case '2': return '2nd';
        case '3': return '3rd';
        case '4': return '4th';
        default: return year + 'th';
      }
    }
    
    return "N/A";
  };

  const getCourse = (session) => {
    if (!session.courseYearSection) return "N/A";
    
    // Extract course code (letters before numbers)
    const courseMatch = session.courseYearSection.match(/^[A-Za-z]+/);
    if (courseMatch) {
      const courseCode = courseMatch[0];
      
      // Map course codes to full names (customize based on your institution)
      const courseMap = {
        'CS': 'Computer Science',
        'IT': 'Information Technology',
        'EN': 'Engineering',
        'BA': 'Business Administration',
        'PS': 'Psychology',
        // Add more mappings as needed
      };
      
      return courseMap[courseCode] || courseCode;
    }
    
    return session.courseYearSection;
  };

  const formatConcerns = (session) => {
    const concerns = {
      personal: [],
      interpersonal: [],
      academic: [],
      family: [],
      grief: []
    };
    
    // Handle faculty referral format
    if (session.concerns) {
      if (session.concerns.personal && Array.isArray(session.concerns.personal)) {
        concerns.personal = session.concerns.personal;
      }
      if (session.concerns.academic && Array.isArray(session.concerns.academic)) {
        concerns.academic = session.concerns.academic;
      }
    }
    
    // Handle student form format
    if (session.areasOfConcern) {
      if (session.areasOfConcern.personal && Array.isArray(session.areasOfConcern.personal)) {
        concerns.personal = session.areasOfConcern.personal;
      }
      if (session.areasOfConcern.interpersonal && Array.isArray(session.areasOfConcern.interpersonal)) {
        concerns.interpersonal = session.areasOfConcern.interpersonal;
      }
      if (session.areasOfConcern.academic && Array.isArray(session.areasOfConcern.academic)) {
        concerns.academic = session.areasOfConcern.academic;
      }
      if (session.areasOfConcern.family && Array.isArray(session.areasOfConcern.family)) {
        concerns.family = session.areasOfConcern.family;
      }
    }
    
    return concerns;
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Attended': return 'bg-green-100 text-green-800';
      case 'No Show': return 'bg-yellow-100 text-yellow-800';
      case 'No Response': return 'bg-orange-100 text-orange-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      case 'Follow up': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "N/A";
    }
  };

  // Updated status options to use remarks values
  const statusOptions = [
    'All',
    'Attended',
    'No Show',
    'No Response',
    'Terminated',
    'Follow up'
  ];

  const filteredSessions = getFilteredSessions();

  return (
    <div className="bg-white-100 min-h-screen">
      <AdminNavbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Session History</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name, course, or referrer..."
              className="w-full p-2 border rounded-lg pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-3 top-3 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          <div className="flex-shrink-0">
            <select
              className="p-2 border rounded-lg w-full md:w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <button
            className="bg-[#3B021F] text-white px-4 py-2 rounded-lg flex-shrink-0"
            onClick={fetchSessions}
          >
            Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="bg-white shadow-md rounded-lg p-8 flex justify-center">
            <p>Loading session history...</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchTerm || filterStatus !== 'All' ? 
                  "No sessions match your search criteria" : 
                  "No session history available"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Course</th>
                      <th className="text-left py-3 px-4">Year</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Referral</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.map((session) => (
                      <tr
                        key={session.id}
                        className="border-b cursor-pointer hover:bg-gray-200"
                        onClick={() => openModal(session)}
                      >
                        <td className="py-3 px-4">{session.studentName || "Unknown"}</td>
                        <td className="py-3 px-4">{getCourse(session)}</td>
                        <td className="py-3 px-4">{getYearLevel(session)}</td>
                        <td className="py-3 px-4">{getSessionType(session)}</td>
                        <td className="py-3 px-4">{getReferralSource(session)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(session.remarks || 'None')}`}>
                            {session.remarks || "None"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              X
            </button>
            <h1 className="text-2xl font-bold mb-4">Session Details</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p><strong>Mode of Counseling:</strong> {getSessionType(selectedStudent)}</p>
                <p><strong>Full name:</strong> {selectedStudent.studentName || "N/A"}</p>
                <p><strong>Email Address:</strong> {selectedStudent.email || "N/A"}</p>
                <p><strong>Course & Year:</strong> {selectedStudent.courseYearSection || "N/A"}</p>
                <p><strong>College Department:</strong> {
                  selectedStudent.department || 
                  (selectedStudent.courseYearSection ? 
                    selectedStudent.courseYearSection.substring(0, 2) === "12" ? "College of Arts and Humanities" :
                    selectedStudent.courseYearSection.substring(0, 2) === "13" ? "College of Management and Business Studies" :
                    selectedStudent.courseYearSection.substring(0, 2) === "14" ? "College of Computer Studies" :
                    selectedStudent.courseYearSection.substring(0, 2) === "15" ? "College of Architecture and Built Environment" :
                    "N/A"
                    : "N/A")
                }</p>
              </div>
              
              <div>
                <p><strong>ID:</strong> {selectedStudent.studentID || "N/A"}</p>
                <p><strong>Date of Birth:</strong> {formatDate(selectedStudent.dateOfBirth) || "N/A"}</p>
                <p><strong>Age/Sex:</strong> {selectedStudent.ageSex || "N/A"}</p>
                <p><strong>Contact No.:</strong> {selectedStudent.contactNo || "N/A"}</p>
                <p><strong>Present Address:</strong> {selectedStudent.presentAddress || "N/A"}</p>
                <p><strong>Emergency contact:</strong> {
                  selectedStudent.emergencyContactPerson ? 
                  `${selectedStudent.emergencyContactPerson} - ${selectedStudent.emergencyContactNo || "N/A"}` : 
                  "N/A"
                }</p>
                <p><strong>Date:</strong> {formatDate(selectedStudent.submissionDate || selectedStudent.dateTime)}</p>
                <p><strong>Time:</strong> {formatTime(selectedStudent.submissionDate || selectedStudent.dateTime)}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h2 className="text-xl font-bold mb-2">Areas of Concern</h2>
              
              {/* Format and display concerns */}
              {(() => {
                const concerns = formatConcerns(selectedStudent);
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mt-2">Personal</h3>
                      {concerns.personal.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {concerns.personal.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">None specified</p>
                      )}
                      
                      <h3 className="text-lg font-semibold mt-4">Interpersonal</h3>
                      {concerns.interpersonal.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {concerns.interpersonal.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">None specified</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mt-2">Academic</h3>
                      {concerns.academic.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {concerns.academic.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">None specified</p>
                      )}
                      
                      <h3 className="text-lg font-semibold mt-4">Family</h3>
                      {concerns.family.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {concerns.family.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">None specified</p>
                      )}
                    </div>
                  </div>
                );
              })()}
              
              {/* Additional details */}
              {selectedStudent.selfDescription && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Self Description</h3>
                  <p className="bg-gray-50 p-3 rounded">{selectedStudent.selfDescription}</p>
                </div>
              )}
              
              {selectedStudent.additionalComments && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Additional Comments</h3>
                  <p className="bg-gray-50 p-3 rounded">{selectedStudent.additionalComments}</p>
                </div>
              )}
              
              {selectedStudent.observations && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Observations</h3>
                  <p className="bg-gray-50 p-3 rounded">{selectedStudent.observations}</p>
                </div>
              )}
              
              {selectedStudent.otherConcerns && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Other Concerns</h3>
                  <p className="bg-gray-50 p-3 rounded">{selectedStudent.otherConcerns}</p>
                </div>
              )}
              
              <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Session Status</h3>
                <div className="flex items-center mt-2">
                  <strong className="mr-2">Status:</strong> 
                  <span className={`px-2 py-1 rounded-full ${getStatusClass(selectedStudent.remarks || 'None')}`}>
                    {selectedStudent.remarks || "None"}
                  </span>
                </div>
                <p className="mt-1"><strong>Last Updated:</strong> {selectedStudent.updatedAt ? formatDate(selectedStudent.updatedAt) + " at " + formatTime(selectedStudent.updatedAt) : "N/A"}</p>
                
                {selectedStudent.followUpDate && (
                  <p className="mt-2 text-purple-700">
                    <strong>Follow-up Date:</strong> {formatDate(selectedStudent.followUpDate)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;