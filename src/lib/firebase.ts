import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD__R5L2n7oEpGLIwwt4j4lM58ImUuEznk",
  authDomain: "voyageai-8dfa9.firebaseapp.com",
  projectId: "voyageai-8dfa9",
  storageBucket: "voyageai-8dfa9.firebasestorage.app",
  messagingSenderId: "1057453901502",
  appId: "1:1057453901502:web:d826ce48dd71c7b3c000ef",
  measurementId: "G-9M7Z5ZGPZV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Auth & Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Messaging conditionally (some browsers like Safari might not support it)
export const messaging = typeof window !== 'undefined' 
  ? isSupported().then(supported => supported ? getMessaging(app) : null)
  : Promise.resolve(null);
