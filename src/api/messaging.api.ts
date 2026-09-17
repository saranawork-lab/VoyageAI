import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';
import type { ApiResponse } from '@/types/api.types';

// Replace with your VAPID key from Firebase Console -> Project Settings -> Cloud Messaging -> Web configuration
const VAPID_KEY = ''; 

export const requestNotificationPermission = async (): Promise<ApiResponse<{ token: string | null }>> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const msg = await messaging;
      if (!msg) {
        throw new Error('Messaging is not supported on this browser.');
      }
      const token = await getToken(msg, { vapidKey: VAPID_KEY || undefined });
      if (token) {
        console.log('FCM Token received:', token);
        // You can send this token to your backend/Firestore to save it for the user
        return { success: true, data: { token } };
      } else {
        return { success: true, data: { token: null }, message: 'No registration token available.' };
      }
    } else {
      throw new Error('Permission denied.');
    }
  } catch (error: any) {
    console.error('Error requesting permission:', error);
    throw error;
  }
};

export const listenForMessages = (callback: (payload: any) => void) => {
  messaging.then(msg => {
    if (msg) {
      onMessage(msg, (payload) => {
        console.log('Message received in foreground: ', payload);
        callback(payload);
      });
    }
  });
};
