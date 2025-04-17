// src/firebase/firestoreService.js

import { db } from './firebase-config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
/**
 * Submits a student interview form to Firestore.
 * @param {Object} formData - The form data to be submitted.
 * @returns {Object} - Success status and document ID or error message.
 */
export const submitStudentInterviewForm = async (formData) => {
  try {
    // Validate form data before submission
    if (!formData.studentName || !formData.courseYearSection || !formData.dateOfBirth) {
      throw new Error("Required fields are missing.");
    }

    // Enhance form data with additional metadata
    const enhancedFormData = {
      ...formData,
      email: localStorage.getItem('userEmail') || '',
      submissionDate: new Date().toISOString(),
      status: 'Pending', // Initial status
      type: 'Walk-in', // Default type
      referral: 'Self', // Default referral source
      remarks: '', // Empty initially
      isReferral: false, // Flag to identify if it's a referral
      userId: localStorage.getItem('userId') || null // Add userId for notifications
    };

    // Add document to Firestore collection
    const docRef = await addDoc(collection(db, "studentInterviews"), enhancedFormData);
    console.log("Document written with ID: ", docRef.id);
    
    // Send notification for new submission if userId exists
    if (enhancedFormData.userId) {
      await sendNotificationToUser(
        enhancedFormData.userId,
        'Counseling Request Received',
        'Your counseling request has been submitted successfully. We will review it shortly.',
        {
          type: 'NEW_REQUEST',
          formId: docRef.id
        }
      );
    }
    
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetches all student interview forms from Firestore.
 * @returns {Object} - Success status and forms or error message.
 */
export const getStudentInterviewForms = async () => {
  try {
    console.log("Checking admin status from localStorage");
    // Simple admin check based on localStorage
    const isAdmin = localStorage.getItem('userRole') === 'admin' && 
                   localStorage.getItem('userEmail') === 'admin@gmail.com';
    
    if (!isAdmin) {
      console.log("Not admin - access denied");
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can view all forms."
      };
    }

    console.log("Admin access confirmed, fetching forms...");
    
    try {
      // Direct fetch without authentication checks
      // Make sure this matches your actual collection name
      const querySnapshot = await getDocs(collection(db, "studentInterviews"));
      console.log("Raw query result count:", querySnapshot.size);
      
      const forms = [];
      querySnapshot.forEach((doc) => {
        forms.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log(`Successfully fetched ${forms.length} forms`);
      
      // Log status distribution for debugging
      const statusCounts = {};
      forms.forEach(form => {
        const status = form.status || 'Undefined';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      console.log("Status distribution:", statusCounts);
      
      return { success: true, forms };
    } catch (fetchError) {
      console.error("Error in Firestore fetch operation:", fetchError);
      return { 
        success: false, 
        error: `Firestore fetch error: ${fetchError.message}` 
      };
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Updates the status and remarks of a student interview form in Firestore.
 * @param {string} formId - The ID of the form to update.
 * @param {string} status - The new status (e.g., "Reviewed", "Rescheduled").
 * @param {string} remarks - Additional remarks for the update.
 * @param {Object} additionalData - Any additional fields to update in the document.
 * @returns {Object} - Success status or error message.
 */
export const updateFormStatus = async (formId, status, remarks, additionalData = {}) => {
  try {
    // Check if the user is an admin
    const isAdmin = localStorage.getItem('userRole') === 'admin' && 
                   localStorage.getItem('userEmail') === 'admin@gmail.com';
    
    if (!isAdmin) {
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can update forms."
      };
    }

    // Get the current form data to retrieve userId and compare status
    const formRef = doc(db, "studentInterviews", formId);
    const formDoc = await getDoc(formRef);
    
    if (!formDoc.exists()) {
      return { success: false, error: "Form not found" };
    }
    
    const formData = formDoc.data();
    const oldStatus = formData.status;
    const oldRemarks = formData.remarks;
    const userId = formData.userId;

    // Prepare update data
    const updateData = {
      updatedAt: new Date().toISOString(),
      previousStatus: oldStatus, // Store previous status for reference
      ...additionalData
    };

    // Add status if provided (moving to history)
    // If remarks are provided (except Follow up) and no status is provided, 
    // set status to 'Completed' to move to history
    if (status) {
      updateData.status = status;
    } else if (remarks && remarks !== 'Follow up' && remarks !== oldRemarks) {
      updateData.status = 'Completed';
    }

    // Add remarks if provided
    if (remarks) {
      updateData.remarks = remarks;
    }

    // Update the document in Firestore
    await updateDoc(formRef, updateData);

    // Send notification if status changed and userId exists
    if (status && status !== oldStatus && userId) {
      await notifyStatusChange(formId, status, userId, formData, additionalData);
    } 
    // Send notification for remarks change that moves to history
    else if (remarks && remarks !== oldRemarks && remarks !== 'Follow up' && userId) {
      await notifyStatusChange(formId, 'Completed', userId, {
        ...formData,
        remarksChange: remarks
      }, additionalData);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { success: false, error: error.message };
  }
};


/**
 * Updates a session's status
 * @param {string} sessionId - The ID of the session to update
 * @param {string} status - The new status
 * @returns {Object} - Success status or error message
 */
export const updateSessionStatus = async (sessionId, status) => {
  try {
    // Check if the user is an admin
    const isAdmin = localStorage.getItem('userRole') === 'admin' && 
                   localStorage.getItem('userEmail') === 'admin@gmail.com';
    
    if (!isAdmin) {
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can update sessions."
      };
    }

    // Get the current session data
    const sessionRef = doc(db, "studentInterviews", sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      return { success: false, error: "Session not found" };
    }
    
    const sessionData = sessionDoc.data();
    const oldStatus = sessionData.status;
    const userId = sessionData.userId;

    // Update the document in Firestore
    await updateDoc(sessionRef, {
      status,
      previousStatus: oldStatus,
      updatedAt: new Date().toISOString()
    });

    // Send notification if status changed and userId exists
    if (status !== oldStatus && userId) {
      await notifyStatusChange(sessionId, status, userId, sessionData);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating session status:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Gets forms for a specific student
 * @param {string} studentEmail - The email of the student
 * @returns {Object} - Success status and forms or error message
 */
export const getStudentForms = async (studentEmail) => {
  try {
    if (!studentEmail) {
      return { success: false, error: "Student email is required" };
    }
    
    const q = query(
      collection(db, "studentInterviews"),
      where("email", "==", studentEmail)
    );
    
    const querySnapshot = await getDocs(q);
    const forms = [];
    
    querySnapshot.forEach((doc) => {
      forms.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, forms };
  } catch (error) {
    console.error("Error getting student forms:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a notification to a specific user by creating a notification document in Firestore
 * @param {string} userId - The user ID to send notification to
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {Object} data - Additional data for the notification
 * @returns {Object} - Success status or error message
 */
export const sendNotificationToUser = async (userId, title, body, data = {}) => {
  try {
    if (!userId) {
      console.log("No userId provided for notification");
      return { success: false, error: "User ID is required for sending notifications" };
    }

    // Create a notification document in Firestore
    const notificationRef = await addDoc(collection(db, "notifications"), {
      userId: userId,
      title: title,
      body: body,
      data: data,
      sent: false,
      createdAt: new Date().toISOString(),
      createdAtTimestamp: Timestamp.now(), // Add a Firestore timestamp for queries
    });
    
    console.log('Notification created with ID:', notificationRef.id);
    return { success: true, notificationId: notificationRef.id };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Notifies a user about a status change
 * @param {string} formId - The form ID that was updated
 * @param {string} newStatus - The new status
 * @param {string} userId - The user ID to notify
 * @param {Object} formData - The current form data
 * @param {Object} additionalData - Any additional data from the update
 * @returns {Object} - Success status or error message
 */
export const notifyStatusChange = async (formId, newStatus, userId, formData, additionalData = {}) => {
  try {
    // Prepare notification content based on status or remarks
    let title, body;
    
    // If this is a remarks-based change, use the remarks value for notification
    if (formData.remarksChange) {
      switch(formData.remarksChange) {
        case 'Attended':
          title = 'Session Attended';
          body = 'Your counseling session has been marked as attended. Thank you for your participation.';
          break;
          
        case 'No Show':
          title = 'Missed Session';
          body = 'You were marked as absent for your counseling session. Please contact the office to reschedule.';
          break;
          
        case 'No Response':
          title = 'No Response Recorded';
          body = 'You did not respond to your counseling session confirmation. Please contact the office for assistance.';
          break;
          
        case 'Terminated':
          title = 'Session Terminated';
          body = 'Your counseling session has been terminated. Please contact the counseling office for more information.';
          break;
          
        default:
          title = 'Session Update';
          body = `Your counseling session status has been updated to ${formData.remarksChange}.`;
      }
    } else {
      // Original status-based notifications
      switch(newStatus) {
        case 'Confirmed':
          title = 'Session Confirmed';
          body = 'Your counseling session has been confirmed. Please check your schedule for details.';
          break;
          
        case 'Rescheduled':
          const date = additionalData.scheduledDate || formData.scheduledDate || 'the new date';
          const time = additionalData.scheduledTime || formData.scheduledTime || 'the scheduled time';
          title = 'Session Rescheduled';
          body = `Your counseling session has been rescheduled to ${date} at ${time}.`;
          break;
          
        case 'Cancelled':
          title = 'Session Cancelled';
          body = 'Your counseling session has been cancelled. Please contact the counseling office for more information.';
          break;
          
        case 'Completed':
          title = 'Session Completed';
          body = 'Your counseling session has been marked as completed. Thank you for attending.';
          break;
          
        case 'No-show':
        case 'No Show':
          title = 'Missed Session';
          body = 'You were marked as absent for your counseling session. Please contact the office to reschedule.';
          break;
          
        case 'Reviewed':
          title = 'Request Reviewed';
          body = 'Your counseling request has been reviewed. Please check your schedule for details.';
          break;
          
        case 'Pending':
          title = 'Request Pending';
          body = 'Your counseling request is pending review. We will notify you once it has been processed.';
          break;
          
        default:
          title = 'Session Update';
          body = `Your counseling session status has been updated to ${newStatus}.`;
      }
    }
    
    // Send the notification
    return await sendNotificationToUser(userId, title, body, {
      type: 'SESSION_UPDATE',
      formId: formId,
      status: newStatus,
      remarks: formData.remarksChange || formData.remarks
    });
    
  } catch (error) {
    console.error('Error in notifyStatusChange:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a reminder notification for an upcoming session
 * @param {string} formId - The form/session ID
 * @param {string} userId - The user ID to notify
 * @param {Date} sessionDate - The date of the session
 * @returns {Object} - Success status or error message
 */
export const sendSessionReminder = async (formId, userId, sessionDate) => {
  try {
    if (!userId || !sessionDate) {
      return { success: false, error: "User ID and session date are required" };
    }
    
    const formattedDate = new Date(sessionDate).toLocaleDateString();
    const formattedTime = new Date(sessionDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    return await sendNotificationToUser(
      userId,
      'Upcoming Counseling Session',
      `Reminder: You have a counseling session scheduled for ${formattedDate} at ${formattedTime}.`,
      {
        type: 'SESSION_REMINDER',
        formId: formId,
      }
    );
  } catch (error) {
    console.error('Error sending session reminder:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a direct message notification to a user
 * @param {string} userId - The user ID to notify
 * @param {string} message - The message to send
 * @param {string} senderName - Name of the sender (e.g., "Counselor Smith")
 * @returns {Object} - Success status or error message
 */
export const sendDirectMessage = async (userId, message, senderName = "Counseling Office") => {
  try {
    if (!userId || !message) {
      return { success: false, error: "User ID and message are required" };
    }
    
    return await sendNotificationToUser(
      userId,
      `Message from ${senderName}`,
      message,
      {
        type: 'DIRECT_MESSAGE',
        sender: senderName
      }
    );
  } catch (error) {
    console.error('Error sending direct message:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a general announcement to all users or specific user groups
 * @param {string} title - Announcement title
 * @param {string} message - Announcement message
 * @param {Array} userIds - Array of user IDs to send to (empty for all users)
 * @returns {Object} - Success status or error message
 */
export const sendAnnouncement = async (title, message, userIds = []) => {
  try {
    if (!title || !message) {
      return { success: false, error: "Title and message are required" };
    }
    
    // If userIds is empty, this is a placeholder for sending to all users
    // In a real implementation, you would query all users and send to each
    if (userIds.length === 0) {
      console.log('Would send announcement to all users:', { title, message });
      return { success: true, message: "Announcement would be sent to all users" };
    }
    
    // Send to specific users
    const results = [];
    for (const userId of userIds) {
      const result = await sendNotificationToUser(
        userId,
        title,
        message,
        {
          type: 'ANNOUNCEMENT'
        }
      );
      results.push({ userId, result });
    }
    
    return { 
      success: true, 
      results,
      successCount: results.filter(r => r.result.success).length,
      failureCount: results.filter(r => !r.result.success).length
    };
  } catch (error) {
    console.error('Error sending announcement:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Deletes old sent notifications to keep the database clean
 * Typically would be called periodically or by an admin action
 * @param {number} daysOld - Delete notifications older than this many days
 * @returns {Object} - Success status or error message
 */
// Fix the closing brace of cleanupOldNotifications and add sendTestNotification as a separate function
export const cleanupOldNotifications = async (daysOld = 30) => {
  try {
    // Check if the user is an admin
    const isAdmin = localStorage.getItem('userRole') === 'admin' && 
                   localStorage.getItem('userEmail') === 'admin@gmail.com';
    
    if (!isAdmin) {
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can cleanup notifications."
      };
    }
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const cutoffTimestamp = Timestamp.fromDate(cutoffDate);
    
    // Query for old, sent notifications
    const q = query(
      collection(db, "notifications"),
      where("sent", "==", true),
      where("createdAtTimestamp", "<", cutoffTimestamp),
      limit(500) // Process in batches for large collections
    );
    
    const querySnapshot = await getDocs(q);
    
    // Delete each notification
    let deleteCount = 0;
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, "notifications", document.id));
      deleteCount++;
    }
    
    return { 
      success: true, 
      message: `Deleted ${deleteCount} old notifications`,
      count: deleteCount
    };
  } catch (error) {
    console.error('Error cleaning up old notifications:', error);
    return { success: false, error: error.message };
  }
}; // This is the correct closing brace for cleanupOldNotifications

/**
 * Gets all student interview forms that are not explicitly marked as completed
 * @returns {Object} - Success status and forms data
 */
export const getActiveInterviewForms = async () => {
  try {
    console.log("Fetching all active interview forms without strict filtering...");
    
    // Get all forms from the studentInterviews collection
    const querySnapshot = await getDocs(collection(db, "studentInterviews"));
    console.log(`Found ${querySnapshot.size} total forms in studentInterviews collection`);
    
    const forms = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`Form ${doc.id}:`, data);
      
      // Only exclude forms that are explicitly marked as "Completed"
      // If status is undefined or anything other than "Completed", include it
      if (data.status !== 'Completed') {
        forms.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    console.log(`After filtering, ${forms.length} active forms remain`);
    return { success: true, forms };
  } catch (error) {
    console.error('Error getting active interview forms:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Gets only completed student interview forms (for history)
 * @returns {Object} - Success status and forms data
 */
export const getCompletedInterviewForms = async () => {
  try {
    console.log("Fetching completed interview forms...");
    
    // Check admin status
    const isAdmin = localStorage.getItem('userRole') === 'admin' && 
                   localStorage.getItem('userEmail') === 'admin@gmail.com';
    
    if (!isAdmin) {
      return { 
        success: false, 
        error: "Unauthorized access. Only administrators can view forms."
      };
    }
    
    // Get all forms
    const formsCollection = collection(db, "studentInterviews");
    const querySnapshot = await getDocs(formsCollection);
    
    const forms = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Only include forms that are completed
      if (data.status === 'Completed') {
        forms.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    console.log(`Successfully fetched ${forms.length} completed forms`);
    return { success: true, forms };
  } catch (error) {
    console.error('Error getting completed interview forms:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a test notification to a specific user
 * @param {string} userId - The user ID to send the notification to
 * @returns {Object} - Success status or error message
 */
export const sendTestNotification = async (userId) => {
  try {
    console.log(`Attempting to send test notification to user: ${userId}`);
    
    if (!userId) {
      console.error("No userId provided for test notification");
      return { success: false, error: "User ID is required" };
    }

    // Create a notification document in Firestore
    const notificationData = {
      userId: userId,
      title: 'Test Notification',
      body: 'This is a test notification from the admin panel.',
      data: {
        type: 'TEST',
        timestamp: new Date().toISOString()
      },
      sent: false,
      createdAt: new Date().toISOString()
    };
    
    // Use the same approach as in your working test page
    const docRef = await addDoc(collection(db, "notifications"), notificationData);
    console.log('Test notification created with ID:', docRef.id);
    
    return { success: true, notificationId: docRef.id };
  } catch (error) {
    console.error('Error sending test notification:', error);
    return { success: false, error: error.message };
  }

  
};