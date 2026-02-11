
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Note: In a production environment, these should be handled via environment variables
const firebaseConfig = {
  apiKey: "AIzaSy_dummy_key_for_demo", 
  authDomain: "bagerhat4-election.firebaseapp.com",
  projectId: "bagerhat4-election",
  storageBucket: "bagerhat4-election.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

let db: Firestore | null = null;

try {
  const app: FirebaseApp = !getApps().length 
    ? initializeApp(firebaseConfig) 
    : getApp();
    
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase/Firestore could not be initialized:", error);
}

export { db };
