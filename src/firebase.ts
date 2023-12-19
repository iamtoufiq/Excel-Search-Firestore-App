import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXCpCwpdlegPil_habktJ3ve00CrmSKu0",
  authDomain: "bank-master-c8112.firebaseapp.com",
  projectId: "bank-master-c8112",
  storageBucket: "bank-master-c8112.appspot.com",
  messagingSenderId: "875175643508",
  appId: "1:875175643508:web:e0d26b3075eca2dce48421",
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
