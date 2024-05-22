// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_Fmv9j9BSOzI-jaqKlGwgEV0jHYhSbi4",
  authDomain: "fir-59046.firebaseapp.com",
  projectId: "fir-59046",
  storageBucket: "fir-59046.appspot.com",
  messagingSenderId: "77844322182",
  appId: "1:77844322182:web:1ffadb84c4761fd87c3e07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider

export default app