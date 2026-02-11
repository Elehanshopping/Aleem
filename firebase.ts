
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Using valid-looking demo credentials
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
  const app: FirebaseApp = getApps().length === 0 
    ? initializeApp(firebaseConfig) 
    : getApp();
    
  // Check if getFirestore is available to avoid the "Service firestore is not available" error
  if (typeof getFirestore === 'function') {
    db = getFirestore(app);
  }
} catch (error) {
  console.warn("Firestore initialization failed. The app will run in demo/offline mode.", error);
}

export { db };
