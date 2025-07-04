import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEadu0fTkg9W7SIiPO7CZ2GKhqR2lHGsA",
  authDomain: "able-goods-454705-f9.firebaseapp.com",
  projectId: "able-goods-454705-f9",
  storageBucket: "able-goods-454705-f9.firebasestorage.app",
  messagingSenderId: "280948490760",
  appId: "1:280948490760:web:139022a03b8c759c2207bd",
  measurementId: "G-SFCW3905KZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);