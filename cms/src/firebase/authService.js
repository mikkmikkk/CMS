import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";

/**
 * User Registration Function
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - User role (student/faculty)
 * @param {string} firstName - User first name
 * @param {string} lastName - User last name
 * @returns {Object} Registration result
 */
export const signUp = async (email, password, role, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, role, user.uid), {
      firstName,
      lastName,
      email,
      role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });

    return { 
      success: true, 
      user,
      message: "Registration successful" 
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      message: error.message || "Registration failed" 
    };
  }
};

/**
 * Enhanced Login Function with Admin Support
 * @param {string} email - User email or admin username
 * @param {string} password - User/admin password
 * @returns {Object} Login result
 */
export const login = async (email, password) => {
  try {
    // Check for admin login
    if (email === "admin") {
      const adminDoc = doc(db, "Admin", "ID");
      const adminSnapshot = await getDoc(adminDoc);
      
      if (adminSnapshot.exists()) {
        const adminData = adminSnapshot.data();
        if (adminData.email === "admin" && adminData.password === password) {
          // Admin login successful
          return { 
            success: true, 
            isAdmin: true,
            user: {
              role: 'admin',
              email: 'admin'
            },
            message: "Admin login successful"
          };
        }
      }
      return { 
        success: false, 
        message: "Invalid admin credentials" 
      };
    }

    // Regular user login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "User", userCredential.user.uid));
    const userData = userDoc.data();

    // Update last login
    await setDoc(doc(db, "User", userCredential.user.uid), {
      ...userData,
      lastLogin: new Date().toISOString()
    }, { merge: true });

    return { 
      success: true, 
      isAdmin: false,
      user: userCredential.user,
      userData: userData,
      message: "Login successful"
    };

  } catch (error) {
    console.error("Login error:", error);
    return { 
      success: false, 
      message: error.message || "Login failed" 
    };
  }
};

/**
 * Session Management Helper
 * @param {Object} user - User object
 * @param {boolean} isAdmin - Admin status
 */
const handleSession = (user, isAdmin) => {
  localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('lastLogin', new Date().toISOString());
};

/**
 * Error Handler
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
const handleError = (error) => {
  const errorMessages = {
    'auth/user-not-found': 'No user found with this email',
    'auth/wrong-password': 'Invalid password',
    'auth/email-already-in-use': 'Email already registered',
    'auth/invalid-email': 'Invalid email format',
    'auth/weak-password': 'Password should be at least 6 characters'
  };

  return errorMessages[error.code] || error.message;
};

export const logout = async () => {
  try {
    await auth.signOut();
    localStorage.clear();
    return { success: true, message: "Logout successful" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};