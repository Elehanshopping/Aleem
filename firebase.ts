
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Note: In a production environment, these should be handled via environment variables
const firebaseConfig = {
  apiKey: "AIzaSy_dummy_key_for_demo", 
  authDomain: "bagerhat4-election.firebaseapp.com",
  projectId: "bagerhat4-election",
  storageBucket: "bagerhat4-election.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Singleton pattern for Firebase initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let dbInstance;
try {
  // We initialize the Firestore service using the standard SDK method
  dbInstance = getFirestore(app);
} catch (error) {
  console.error("Firestore initialization failed. Using a fallback.", error);
  dbInstance = null; 
}

export const db = dbInstance;
