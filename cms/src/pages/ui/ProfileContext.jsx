import React, { createContext, useContext, useState } from "react";
import ProfilePage from "./Profile"; // ✅ Fix import path if necessary

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  return (
    <ProfileContext.Provider value={{ isProfileOpen, openProfile, closeProfile }}>
      {children}
      {isProfileOpen && <ProfilePage onClose={closeProfile} />} {/* ✅ Pass close function */}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

