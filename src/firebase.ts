import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyB1df3vKc1c6a3MeuvhkjnYCvL2fvKi5Ng",
  authDomain: "aruna-d70f4.firebaseapp.com",
  projectId: "aruna-d70f4",
  storageBucket: "aruna-d70f4.appspot.com",
  messagingSenderId: "630556434295",
  appId: "1:630556434295:web:d756be29fd0aa65bebcb72",
  measurementId: "G-S2R9QYJVDR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const emailAuthProvider = new EmailAuthProvider();
export default app;