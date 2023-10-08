// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi-JZ3P4HRxClubcVM9-0c0uckpHV1BFg",
  authDomain: "social-media-94a86.firebaseapp.com",
  projectId: "social-media-94a86",
  storageBucket: "social-media-94a86.appspot.com",
  messagingSenderId: "901721895723",
  appId: "1:901721895723:web:4ed92686436d5903edcb6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);