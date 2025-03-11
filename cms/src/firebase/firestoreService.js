// src/firebase/firestoreService.js

import { db } from './firebase-config';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, getDoc } from 'firebase/firestore';

export const submitStudentInterviewForm = async (formData) => {
  try {
    // Add user email and submission date to the form data
    const enhancedFormData = {
      ...formData,
      email: localStorage.getItem('userEmail') || '',
      submissionDate: new Date().toISOString(),
      status: 'Pending', // Initial status
      type: 'Walk-in', // Default type
      referral: 'Self', // Default referral source
      remarks: '', // Empty initially
      isReferral: false // Flag to identify if it's a referral
    };
    
    const docRef = await addDoc(collection(db, "studentInterviews"), enhancedFormData);
    console.log("Document written with ID: ", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
};

export const getStudentInterviewForms = async () => {
  try {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can view all forms."
      };
    }
    
    const querySnapshot = await getDocs(collection(db, "studentInterviews"));
    const forms = [];
    
    querySnapshot.forEach((doc) => {
      forms.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, forms };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return { success: false, error: error.message };
  }
};

export const updateFormStatus = async (formId, status, remarks) => {
  try {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can update forms."
      };
    }
    
    const formRef = doc(db, "studentInterviews", formId);
    await updateDoc(formRef, {
      status,
      remarks,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { success: false, error: error.message };
  }
};