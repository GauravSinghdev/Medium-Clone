// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7TO1vMcdDcz7VXgo5X6JZwokSp6degdA",
  authDomain: "project-01-b764a.firebaseapp.com",
  projectId: "project-01-b764a",
  storageBucket: "project-01-b764a.appspot.com",
  messagingSenderId: "579317118627",
  appId: "1:579317118627:web:6ee815a8d3a065f69df116",
  measurementId: "G-B6809CG19X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
