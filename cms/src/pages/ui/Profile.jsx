import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase-config"; // Firebase config
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firebase Firestore functions

export default function ProfilePage({ onClose }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get the user role from localStorage or Firebase
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [role, setRole] = useState(userRole);

  useEffect(() => {
    const fetchUserData = async () => {
      if (role && userEmail) {
        try {
          let userDoc;
          if (role === "student") {
            userDoc = await getDoc(doc(db, "students", userEmail));
          } else if (role === "faculty") {
            userDoc = await getDoc(doc(db, "faculty", userEmail));
          }
          
          if (userDoc.exists()) {
            setUserData({
              name: userDoc.data().name,
              email: userDoc.data().email,
              password: "", // Don't display password
            });
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [role, userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Assuming user has already been authenticated and their role is set
      const userRef = doc(db, role === "student" ? "students" : "faculty", userEmail);
      await setDoc(userRef, { ...userData }, { merge: true });

      alert("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="w-[700px] bg-white border rounded-lg shadow-lg flex relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        {/* Left Section - Logo */}
        <div className="w-1/2 flex justify-center items-center p-6 border-r">
          <img src="/src/assets/img/cmslogo.png" alt="Logo" className="w-32 h-32" />
        </div>

        {/* Right Section - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-bold mb-4">Update Profile</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="border rounded-md p-2"
              />

              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border rounded-md p-2"
                disabled
              />

              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="border rounded-md p-2"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button onClick={onClose} className="text-gray-600">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#3A0323] hover:bg-[#2a021a] text-white px-4 py-2 rounded-md transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
