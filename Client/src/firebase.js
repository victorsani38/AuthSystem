// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-auth-system-eeed1.firebaseapp.com",
  projectId: "my-auth-system-eeed1",
  storageBucket: "my-auth-system-eeed1.firebasestorage.app",
  messagingSenderId: "934473434643",
  appId: "1:934473434643:web:8141ef11e0fd978cc561e6",
  measurementId: "G-2Y8L92NC62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);