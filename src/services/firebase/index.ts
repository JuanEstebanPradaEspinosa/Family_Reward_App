import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9L9onafPld-PTjCNfbA1y7AiJ4iP7fSY",
  authDomain: "family-rewards-89238.firebaseapp.com",
  projectId: "family-rewards-89238",
  storageBucket: "family-rewards-89238.firebasestorage.app",
  messagingSenderId: "547441958096",
  appId: "1:547441958096:web:8ec50866e1be09a12fd2d5",
  measurementId: "G-GKDL7SMJW2",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
