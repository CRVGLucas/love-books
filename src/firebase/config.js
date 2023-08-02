// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvygWiYOWPh3DkackhZpN3V61A6kD-YmM",
  authDomain: "love-books-8e9f4.firebaseapp.com",
  projectId: "love-books-8e9f4",
  storageBucket: "love-books-8e9f4.appspot.com",
  messagingSenderId: "627911524809",
  appId: "1:627911524809:web:1c78c71ba9099cca822818",
  measurementId: "G-74NZZQ1WZS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);
export const analytics = getAnalytics(app);