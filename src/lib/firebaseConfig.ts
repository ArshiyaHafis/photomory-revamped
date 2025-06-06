import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8qvFx0G9zmkRkE6gJM7hRA9JBln1jATA",
  authDomain: "photomory-4f275.firebaseapp.com",
  projectId: "photomory-4f275",
  storageBucket: "photomory-4f275.firebasestorage.app",
  messagingSenderId: "909827112694",
  appId: "1:909827112694:web:c42897380301851cc1b6d7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
