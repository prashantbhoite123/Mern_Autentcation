// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ee817.firebaseapp.com",
  projectId: "mern-auth-ee817",
  storageBucket: "mern-auth-ee817.appspot.com",
  messagingSenderId: "697228129874",
  appId: "1:697228129874:web:44b15987c02737e7bcd18b",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
