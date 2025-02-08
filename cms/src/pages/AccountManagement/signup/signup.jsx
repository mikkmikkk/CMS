import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Signup() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate("/login"); // Navigate to the signup page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-900">Create an account</h2>
        <p className="text-gray-600 text-sm mb-4">Choose your role and enter your details to register</p>

        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 p-3 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
              role === "student" ? "bg-[#340013] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("student")}
          >
            🎓 Student
          </button>
          <button
            className={`flex-1 p-3 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
              role === "faculty" ? "bg-[#340013] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("faculty")}
          >
            👤 Faculty
          </button>
        </div>

        <div className="flex gap-2">
          <input type="text" placeholder="First Name" className="w-1/2 p-2 border rounded-md" />
          <input type="text" placeholder="Last Name" className="w-1/2 p-2 border rounded-md" />
        </div>
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md mt-3" />
        <input type="password" placeholder="Password (8+ characters)" className="w-full p-2 border rounded-md mt-3" />
        <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded-md mt-3" />

        <button className="w-full mt-4 bg-[#340013] text-white p-2 rounded-md text-sm font-medium">Create Account</button>

        <p className="text-sm text-gray-600 text-center mt-3">
          Already have an account?
          <a href="#"
            className="text-[#340013] font-medium hover:underline"
            onClick={handlelogin}// Trigger navigation to signup
          >Sign Up</a>
        </p>
      </div>
    </div>
  );
}