// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1df3vKc1c6a3MeuvhkjnYCvL2fvKi5Ng",
  authDomain: "aruna-d70f4.firebaseapp.com",
  projectId: "aruna-d70f4",
  storageBucket: "aruna-d70f4.appspot.com",
  messagingSenderId: "630556434295",
  appId: "1:630556434295:web:d756be29fd0aa65bebcb72",
  measurementId: "G-S2R9QYJVDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();

export default app;