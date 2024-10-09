// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;

const firebaseConfig = {
  storageBucket: storageBucket
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Storage and export it
export const storage = getStorage(app);
