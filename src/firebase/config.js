// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRUneXNUsHGyGHRyqYj6QSvwmbykmv1wY",
  authDomain: "edtract-c8c09.firebaseapp.com",
  projectId: "edtract-c8c09",
  storageBucket: "edtract-c8c09.appspot.com",
  messagingSenderId: "474034190100",
  appId: "1:474034190100:web:bcd5771dc9cdd99d05b401",
  measurementId: "G-MBMDW0PVF1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytic = getAnalytics(app);
export default analytic;
