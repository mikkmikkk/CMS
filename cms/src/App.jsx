import { useState } from 'react';
import React from "react";
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  
  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  const handleLoginUpClick = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="w-full bg-white pt-10  px-16 flex justify-between items-center "
           style={{ height: 'var(--nav-height, 72px)' }}> {/* Measured height */}
        <img 
          src="src/assets/img/cmslogo.png"
          alt="Logo" 
          className="w-16 h-16"
        />
        <div className="flex gap-6">
          <button className="text-gray-700 font-medium hover:text-[#3A0323] transition-colors" 
                  onClick={handleLoginUpClick}>
            Login
          </button>
          <button className="bg-[#3A0323] hover:bg-[#2a021a] text-white px-6 py-3 rounded-md transition-colors" 
                  onClick={handleSignUpClick}>
            Signup
          </button>
        </div>
      </div>

      {/* Main Content - Scroll Prevention */}
      <div className="flex h-[calc(100vh_-_var(--nav-height,72px))] bg-white items-center justify-between px-40 overflow-hidden">
        {/* Left Content */}
        <div className="w-1/2 pr-12">
          <h1 className="text-7xl font-bold text-[#3A0323] leading-tight mb-8">
            We Will Help <br /> You To Improve <br /> Your Mental Health
          </h1>
          <p className="text-gray-600 text-2xl leading-relaxed">
            Eu sit proin amet quis malesuada vitae elit. Vel consectetur nibh
            quis ullamcorper quis.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-1/2 flex justify-end h-full items-center">
          <img 
            src="/doctor.png" 
            alt="Doctor" 
            className="w-[500px] h-[85vh] object-contain object-right"
          />
        </div>
      </div>

      {/* CSS Custom Property Injection */}
      <style>{`
        :root {
          --nav-height: 76px; /* Update using DevTools measurement */
        }
      `}</style>
    </>
  );
}

export default App;