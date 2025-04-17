// src/constants/notificationTemplates.js

export const NOTIFICATION_TYPES = {
    // Session Status Updates
    SESSION_CONFIRMED: 'SESSION_CONFIRMED',
    SESSION_RESCHEDULED: 'SESSION_RESCHEDULED',
    SESSION_CANCELLED: 'SESSION_CANCELLED',
    SESSION_REMINDER_24H: 'SESSION_REMINDER_24H',
    SESSION_REMINDER_1H: 'SESSION_REMINDER_1H',
    
    // New Submissions
    NEW_COUNSELING_REQUEST: 'NEW_COUNSELING_REQUEST',
    NEW_FACULTY_REFERRAL: 'NEW_FACULTY_REFERRAL',
    
    // Urgent Notifications
    HIGH_PRIORITY_CASE: 'HIGH_PRIORITY_CASE',
    NO_SHOW_FOLLOWUP: 'NO_SHOW_FOLLOWUP',
    
    // System Notifications
    SYSTEM_UPDATE: 'SYSTEM_UPDATE',
    MAINTENANCE_NOTIFICATION: 'MAINTENANCE_NOTIFICATION',
    
    // Test
    TEST_NOTIFICATION: 'TEST_NOTIFICATION'
  };
  
  export const getNotificationTemplate = (type, data = {}) => {
    const templates = {
      // Session Status Updates
      [NOTIFICATION_TYPES.SESSION_CONFIRMED]: {
        title: 'Session Confirmed',
        body: `Your counseling session on ${formatDate(data.date)} at ${formatTime(data.time)} has been confirmed.`,
        data: {
          type: NOTIFICATION_TYPES.SESSION_CONFIRMED,
          sessionId: data.sessionId,
          date: data.date,
          time: data.time,
          counselorName: data.counselorName
        }
      },
      
      [NOTIFICATION_TYPES.SESSION_RESCHEDULED]: {
        title: 'Session Rescheduled',
        body: `Your counseling session has been rescheduled to ${formatDate(data.newDate)} at ${formatTime(data.newTime)}.`,
        data: {
          type: NOTIFICATION_TYPES.SESSION_RESCHEDULED,
          sessionId: data.sessionId,
          oldDate: data.oldDate,
          oldTime: data.oldTime,
          newDate: data.newDate,
          newTime: data.newTime,
          counselorName: data.counselorName
        }
      },
      
      [NOTIFICATION_TYPES.SESSION_CANCELLED]: {
        title: 'Session Cancelled',
        body: `Your counseling session on ${formatDate(data.date)} at ${formatTime(data.time)} has been cancelled.`,
        data: {
          type: NOTIFICATION_TYPES.SESSION_CANCELLED,
          sessionId: data.sessionId,
          date: data.date,
          time: data.time,
          reason: data.reason
        }
      },
      
      [NOTIFICATION_TYPES.SESSION_REMINDER_24H]: {
        title: 'Upcoming Session Reminder',
        body: `Reminder: You have a counseling session tomorrow at ${formatTime(data.time)} with ${data.counselorName}.`,
        data: {
          type: NOTIFICATION_TYPES.SESSION_REMINDER_24H,
          sessionId: data.sessionId,
          date: data.date,
          time: data.time,
          counselorName: data.counselorName
        }
      },
      
      [NOTIFICATION_TYPES.SESSION_REMINDER_1H]: {
        title: 'Session Starting Soon',
        body: `Your counseling session with ${data.counselorName} starts in 1 hour.`,
        data: {
          type: NOTIFICATION_TYPES.SESSION_REMINDER_1H,
          sessionId: data.sessionId,
          date: data.date,
          time: data.time,
          counselorName: data.counselorName
        }
      },
      
      // New Submissions
      [NOTIFICATION_TYPES.NEW_COUNSELING_REQUEST]: {
        title: 'New Counseling Request',
        body: 'A new counseling request has been submitted and is awaiting review.',
        data: {
          type: NOTIFICATION_TYPES.NEW_COUNSELING_REQUEST,
          requestId: data.requestId,
          studentName: data.studentName,
          requestType: data.requestType
        }
      },
      
      [NOTIFICATION_TYPES.NEW_FACULTY_REFERRAL]: {
        title: 'New Faculty Referral',
        body: `You've been referred for counseling by ${data.facultyName}.`,
        data: {
          type: NOTIFICATION_TYPES.NEW_FACULTY_REFERRAL,
          referralId: data.referralId,
          facultyName: data.facultyName,
          reason: data.reason
        }
      },
      
      // Urgent Notifications
      [NOTIFICATION_TYPES.HIGH_PRIORITY_CASE]: {
        title: 'Urgent: Counseling Required',
        body: 'You have been flagged for priority counseling. Please schedule a session as soon as possible.',
        data: {
          type: NOTIFICATION_TYPES.HIGH_PRIORITY_CASE,
          reason: data.reason,
          contactPerson: data.contactPerson,
          contactNumber: data.contactNumber
        }
      },
      
      [NOTIFICATION_TYPES.NO_SHOW_FOLLOWUP]: {
        title: 'Missed Session Follow-up',
        body: `You missed your scheduled session on ${formatDate(data.date)}. Please reschedule at your earliest convenience.`,
        data: {
          type: NOTIFICATION_TYPES.NO_SHOW_FOLLOWUP,
          sessionId: data.sessionId,
          date: data.date,
          time: data.time,
          counselorName: data.counselorName
        }
      },
      
      // System Notifications
      [NOTIFICATION_TYPES.SYSTEM_UPDATE]: {
        title: 'System Update',
        body: `New features available: ${data.updateDetails}`,
        data: {
          type: NOTIFICATION_TYPES.SYSTEM_UPDATE,
          version: data.version,
          updateDetails: data.updateDetails
        }
      },
      
      [NOTIFICATION_TYPES.MAINTENANCE_NOTIFICATION]: {
        title: 'System Maintenance',
        body: `The system will be unavailable on ${formatDate(data.date)} from ${data.startTime} to ${data.endTime}.`,
        data: {
          type: NOTIFICATION_TYPES.MAINTENANCE_NOTIFICATION,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          reason: data.reason
        }
      },
      
      // Test Notification
      [NOTIFICATION_TYPES.TEST_NOTIFICATION]: {
        title: 'Test Notification',
        body: 'This is a test notification from the admin panel.',
        data: {
          type: NOTIFICATION_TYPES.TEST_NOTIFICATION,
          timestamp: new Date().toISOString()
        }
      }
    };
    
    return templates[type] || {
      title: 'New Notification',
      body: 'You have a new notification from the counseling system.',
      data: { type: 'GENERIC' }
    };
  };
  
  // Helper functions
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
  
  function formatTime(timeString) {
    if (!timeString) return 'N/A';
    return timeString;
  }