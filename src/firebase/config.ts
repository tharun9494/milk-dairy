// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm5lzjDlV_fW89gIPFd8q0xKvsT704q1Y",
  authDomain: "milk-product-10ebe.firebaseapp.com",
  projectId: "milk-product-10ebe",
  storageBucket: "milk-product-10ebe.firebasestorage.app",
  messagingSenderId: "495730763036",
  appId: "1:495730763036:web:94e692f5a799982c8586d9",
  measurementId: "G-9Z2FNEPBJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;