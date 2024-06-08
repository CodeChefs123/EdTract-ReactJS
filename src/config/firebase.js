import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "@firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRUneXNUsHGyGHRyqYj6QSvwmbykmv1wY",
  authDomain: "edtract-c8c09.firebaseapp.com",
  databaseURL:
    "https://support-vol-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "edtract-c8c09",
  storageBucket: "edtract-c8c09.appspot.com",
  messagingSenderId: "474034190100",
  appId: "1:474034190100:web:bcd5771dc9cdd99d05b401",
  measurementId: "G-MBMDW0PVF1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realtimeDb = getDatabase(
  app,
  "https://support-vol-default-rtdb.asia-southeast1.firebasedatabase.app"
);
const storage = getStorage();
const auth = getAuth(app);

export { db, realtimeDb, storage, auth };
