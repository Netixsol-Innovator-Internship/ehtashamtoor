// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCoA96xoLHCH-A0p7o00Gj6N1bsnxcpmw",
  authDomain: "todoapp-7bd98.firebaseapp.com",
  projectId: "todoapp-7bd98",
  storageBucket: "todoapp-7bd98.appspot.com",
  messagingSenderId: "102549281498",
  appId: "1:102549281498:web:13e1657a3266eb0ee9a3e3",
  measurementId: "G-61W7LTD811"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// const analytics = getAnalytics(app);