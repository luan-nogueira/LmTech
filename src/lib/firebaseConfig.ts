import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkjeq-_tv0MUxVgDdE0qaQaLA7WnqkaQk",
  authDomain: "calorias-e60fe.firebaseapp.com",
  projectId: "calorias-e60fe",
  storageBucket: "calorias-e60fe.firebasestorage.app",
  messagingSenderId: "379885783319",
  appId: "1:379885783319:web:eea96b1a7a53a8072d4f52",
  measurementId: "G-92MZNM245V"
};

// Initialize Firebase (Singleton pattern para Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Inicializa o Analytics apenas do lado do cliente e se for suportado
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;
