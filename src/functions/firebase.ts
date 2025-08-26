// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7DiE4S9_czjYd4xxaM0QcSDjO3ivYFf8",
  authDomain: "delivered-e3f8c.firebaseapp.com",
  projectId: "delivered-e3f8c",
  storageBucket: "delivered-e3f8c.firebasestorage.app",
  messagingSenderId: "59128711027",
  appId: "1:59128711027:web:01fc836e9de29186a9a706",
  measurementId: "G-T96XG5MWXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
