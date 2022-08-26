// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqGmxqOLV3DPLwe3qEaBbk1G-D4oeWmqY",
  authDomain: "react-todo-fb-parstroy.firebaseapp.com",
  projectId: "react-todo-fb-parstroy",
  storageBucket: "react-todo-fb-parstroy.appspot.com",
  messagingSenderId: "742138298466",
  appId: "1:742138298466:web:eaea99b89708a999e0913b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);