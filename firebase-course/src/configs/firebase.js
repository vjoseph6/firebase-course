// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import Add new provider with Google
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//Firestore Database
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApEICwUrje_nCTJnqeUbY5Z35CDocodg0",
  authDomain: "fir-course-17f4b.firebaseapp.com",
  projectId: "fir-course-17f4b",
  storageBucket: "fir-course-17f4b.appspot.com",
  messagingSenderId: "668745581293",
  appId: "1:668745581293:web:3e379162c9ce06183982e4",
  measurementId: "G-5TWG9SX63W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//export Add new provider with Google
export const googleProvider = new GoogleAuthProvider();

//Firestore Database
export const db = getFirestore(app);

export const storage = getStorage(app);