// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMwsdZb4u0JvJ8xjo0VlJ5OJhwc1rrdS4",
  authDomain: "shoppingapp-d03a2.firebaseapp.com",
  projectId: "shoppingapp-d03a2",
  storageBucket: "shoppingapp-d03a2.appspot.com",
  messagingSenderId: "953086501834",
  appId: "1:953086501834:web:b5dcbc1b4437e671272533",
  measurementId: "G-1Z2V84JBC3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)
const db = getFirestore(app)
export { auth, db,firestore};