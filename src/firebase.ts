import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "banking-app-8c06c.firebaseapp.com",
  projectId: "banking-app-8c06c",
  storageBucket: "banking-app-8c06c.appspot.com",
  messagingSenderId: "682853843491",
  appId: "1:682853843491:web:2a3185ca55d0e56ee6a796",
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
