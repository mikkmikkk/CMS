import { useState } from 'react'
import React from "react";
import { useNavigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)
    const navigate = useNavigate();
  
    const handleSignUpClick = () => {
      console.log('Home button clicked');
      // Navigate to the Home page
      navigate('/SignUp');
    };

    const handleLoginUpClick = () => {
      console.log('Home button clicked');
      // Navigate to the Home page
      navigate('/login');
    };

  return (
    <>
     
     <div className="flex h-screen bg-white items-center justify-between px-16">
      {/* Left Side Content */}
      <div className="w-1/2">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-16 h-16 mb-4"
        />
        <h1 className="text-5xl font-bold text-[#3A0323] leading-tight">
          We Will Help <br /> You To Improve <br /> Your Mental Health
        </h1>
        <p className="text-gray-600 mt-4 max-w-lg">
          Eu sit proin amet quis malesuada vitae elit. Vel consectetur nibh
          quis ullamcorper quis. Quam enim tortor, id sed.
        </p>
      </div>

      {/* Right Side Image */}
      <div className="w-1/2 flex justify-end">
        <img 
          src="/doctor.png" 
          alt="Doctor" 
          className="w-[400px] h-auto"
        />
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-10 flex items-center space-x-6">
        <button className="text-gray-700 font-medium" onClick={handleLoginUpClick}>Login</button>
        <button className="bg-[#3A0323] text-white px-4 py-2 rounded-md" onClick={handleSignUpClick}>Signup</button>
      </div>
    </div>
    </>
  )
}

export default App
