importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD__R5L2n7oEpGLIwwt4j4lM58ImUuEznk",
  authDomain: "voyageai-8dfa9.firebaseapp.com",
  projectId: "voyageai-8dfa9",
  storageBucket: "voyageai-8dfa9.firebasestorage.app",
  messagingSenderId: "1057453901502",
  appId: "1:1057453901502:web:d826ce48dd71c7b3c000ef",
  measurementId: "G-9M7Z5ZGPZV"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'VoyageAI Notification';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
