// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-ecDrVVeqfXuxxY2x35HAUaVZ0KHTGTc",
    authDomain: "hacker-544e1.firebaseapp.com",
    projectId: "hacker-544e1",
    storageBucket: "hacker-544e1.appspot.com",
    messagingSenderId: "482929414044",
    appId: "1:482929414044:web:22f4d53cc7c971b0f5c259",
    measurementId: "G-1PQ2TX1T34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");