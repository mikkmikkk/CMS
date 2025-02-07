import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

export default function Login() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleCreateAccount = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const handleDashboard = () => {
    navigate("/dashboard"); // Navigate to the signup page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
        <p className="text-gray-600 text-sm mb-4">
          Choose your role and enter your credentials to access the system
        </p>

        {/* Role Selection */}
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 p-3 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
              role === "student" ? "bg-[#5D4037] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("student")}
          >
            🎓 Student
          </button>
          <button
            className={`flex-1 p-3 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
              role === "faculty" ? "bg-[#5D4037] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole("faculty")}
          >
            👤 Faculty
          </button>
        </div>

        {/* Email & Password Fields */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md mt-3"
        />
        <input
          type="password"
          placeholder="Password (8+ characters)"
          className="w-full p-2 border rounded-md mt-3"
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center mt-3">
          <input type="checkbox" id="rememberMe" className="mr-2" />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button className="w-full mt-4 bg-[#5D4037] text-white p-2 rounded-md text-sm font-medium" onClick={handleDashboard}>
          Login
        </button>

        {/* Forgot Password & Create Account Links */}
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="#" className="hover:underline">Forgot password?</a>
          <a href="#"
            className="text-[#5D4037] font-medium hover:underline"
            onClick={handleCreateAccount }// Trigger navigation to signup
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
