import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import admin from "firebase-admin";

/**
 * Path to the service account key JSON file.
 */
import serviceAccount from "../path/to/serviceAccountKey.json";

/**
 * Firebase configuration object.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDRUneXNUsHGyGHRyqYj6QSvwmbykmv1wY",
  authDomain: "edtract-c8c09.firebaseapp.com",
  projectId: "edtract-c8c09",
  storageBucket: "edtract-c8c09.appspot.com",
  messagingSenderId: "474034190100",
  appId: "1:474034190100:web:bcd5771dc9cdd99d05b401",
  measurementId: "G-MBMDW0PVF1",
};

/**
 * Initialize Firebase with the provided configuration.
 */
firebase.initializeApp(firebaseConfig);

/**
 * Initialize the Firebase Admin SDK with the service account credentials.
 */
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://support-vol-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "gs://support-vol.appspot.com",
});

/**
 * Auth module from Firebase Admin SDK.
 */
const auth = admin.auth(app);

/**
 * Firestore module from Firebase Admin SDK.
 */
const firestore = admin.firestore(app);

/**
 * Storage module from Firebase SDK.
 */
const storage = getStorage();

/**
 * Export necessary modules and functions.
 */
export {
  auth,
  firebase,
  app,
  admin,
  firestore,
  storage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
};
