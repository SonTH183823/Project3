import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP9Y5SnE9WSBj-tWlL1tSxyPE6D_XgKQQ",
  authDomain: "app-chat-p3.firebaseapp.com",
  projectId: "app-chat-p3",
  storageBucket: "app-chat-p3.appspot.com",
  messagingSenderId: "871699376573",
  appId: "1:871699376573:web:280dabfc2f51e24cfe4ad4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});