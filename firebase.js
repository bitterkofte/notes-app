// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection
  } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlwraoWuCbNAYQO01ClqZc4ZVoEUR82Yc",
  authDomain: "notes-f87ce.firebaseapp.com",
  projectId: "notes-f87ce",
  storageBucket: "notes-f87ce.appspot.com",
  messagingSenderId: "232390921599",
  appId: "1:232390921599:web:36adf4148bea406b329e4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'notes')

export { db, colRef };