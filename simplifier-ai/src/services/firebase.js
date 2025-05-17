// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgXl8tUtsyOxoIc3zGZWcIuAHSULrR8Ww",
  authDomain: "plain-talk.firebaseapp.com",
  projectId: "plain-talk",
  storageBucket: "plain-talk.firebasestorage.app",
  messagingSenderId: "509552979431",
  appId: "1:509552979431:web:de76f27ddbb32b5e67a142",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getFirestore(app);

export { auth, googleProvider, database };
