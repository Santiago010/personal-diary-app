import "firebase/firestore";
import "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc1o25lStVscIqDPnwK_sV8t0fa12TA5A",
  authDomain: "journal-app-31d8f.firebaseapp.com",
  projectId: "journal-app-31d8f",
  storageBucket: "journal-app-31d8f.appspot.com",
  messagingSenderId: "268350855576",
  appId: "1:268350855576:web:892b69845d751e4d4f33ed",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
