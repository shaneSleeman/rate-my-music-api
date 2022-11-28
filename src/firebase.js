// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbrfL5-1caAnNmF4tXARv9_D2s7uBGoTk",
  authDomain: "rate-my-music-6b74b.firebaseapp.com",
  projectId: "rate-my-music-6b74b",
  storageBucket: "rate-my-music-6b74b.appspot.com",
  messagingSenderId: "388582869334",
  appId: "1:388582869334:web:775b3333528be58ceb6ef7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
