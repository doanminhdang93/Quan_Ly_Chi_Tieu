// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFMz1MoUcQ2LXrH-ith5nYj63TAQz7wDU",
  authDomain: "quanlychitieu-c60be.firebaseapp.com",
  projectId: "quanlychitieu-c60be",
  storageBucket: "quanlychitieu-c60be.appspot.com",
  messagingSenderId: "375280337889",
  appId: "1:375280337889:web:15fa8e6dcc961900b608a0",
  measurementId: "G-KC13XCMZ66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);