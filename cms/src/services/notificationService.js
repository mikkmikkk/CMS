// src/services/notificationService.js

import { db } from '../firebase/firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getNotificationTemplate, NOTIFICATION_TYPES } from '../constants/notificationTemplates';

/**
 * Sends a notification to a specific user
 * @param {string} userId - The user ID to send the notification to
 * @param {string} type - The notification type from NOTIFICATION_TYPES
 * @param {Object} data - Data to populate the notification template
 * @returns {Promise<Object>} - Success status and notification ID
 */
export const sendNotification = async (userId, type, data = {}) => {
  try {
    console.log(`Sending ${type} notification to user: ${userId}`);
    
    if (!userId) {
      console.error("No userId provided for notification");
      return { success: false, error: "User ID is required" };
    }

    // Get notification template
    const template = getNotificationTemplate(type, data);
    
    // Create notification document
    const notificationData = {
      userId: userId,
      title: template.title,
      body: template.body,
      data: template.data,
      sent: false,
      createdAt: new Date().toISOString(),
      createdAtTimestamp: Timestamp.now()
    };
    
    console.log("Creating notification with data:", notificationData);
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, "notifications"), notificationData);
    console.log(`${type} notification created with ID:`, docRef.id);
    
    return { 
      success: true, 
      notificationId: docRef.id,
      type: type
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a session confirmation notification
 */
export const sendSessionConfirmation = async (userId, sessionData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.SESSION_CONFIRMED, sessionData);
};

/**
 * Sends a session rescheduled notification
 */
export const sendSessionRescheduled = async (userId, sessionData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.SESSION_RESCHEDULED, sessionData);
};

/**
 * Sends a session cancelled notification
 */
export const sendSessionCancelled = async (userId, sessionData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.SESSION_CANCELLED, sessionData);
};

/**
 * Sends a 24-hour session reminder
 */
export const sendSessionReminder24h = async (userId, sessionData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.SESSION_REMINDER_24H, sessionData);
};

/**
 * Sends a 1-hour session reminder
 */
export const sendSessionReminder1h = async (userId, sessionData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.SESSION_REMINDER_1H, sessionData);
};

/**
 * Sends a new counseling request notification (to admin)
 */
export const sendNewCounselingRequest = async (adminId, requestData) => {
  return sendNotification(adminId, NOTIFICATION_TYPES.NEW_COUNSELING_REQUEST, requestData);
};

/**
 * Sends a faculty referral notification (to student)
 */
export const sendFacultyReferral = async (studentId, referralData) => {
  return sendNotification(studentId, NOTIFICATION_TYPES.NEW_FACULTY_REFERRAL, referralData);
};

/**
 * Sends a high priority case notification
 */
export const sendHighPriorityCase = async (userId, caseData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.HIGH_PRIORITY_CASE, caseData);
};

/**
 * Sends a no-show follow-up notification
 */
export const sendNoShowFollowup = async (userId, sessionData) => {
  return sendNotification(userId, NOTIFICATION_TYPES.NO_SHOW_FOLLOWUP, sessionData);
};

/**
 * Sends a system update notification (can be sent to multiple users)
 */
export const sendSystemUpdate = async (userIds, updateData) => {
  const results = [];
  for (const userId of userIds) {
    const result = await sendNotification(userId, NOTIFICATION_TYPES.SYSTEM_UPDATE, updateData);
    results.push(result);
  }
  return results;
};

/**
 * Sends a maintenance notification (can be sent to multiple users)
 */
export const sendMaintenanceNotification = async (userIds, maintenanceData) => {
  const results = [];
  for (const userId of userIds) {
    const result = await sendNotification(userId, NOTIFICATION_TYPES.MAINTENANCE_NOTIFICATION, maintenanceData);
    results.push(result);
  }
  return results;
};

/**
 * Sends a test notification
 */
export const sendTestNotification = async (userId) => {
  return sendNotification(userId, NOTIFICATION_TYPES.TEST_NOTIFICATION);
};