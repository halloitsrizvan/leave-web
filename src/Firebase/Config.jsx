import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDTT6qxw0I3QJ3GmK1GuljgfMYMzEYx2ik",
  authDomain: "student-leave-6c992.firebaseapp.com",
  projectId: "student-leave-6c992",
  storageBucket: "student-leave-6c992.firebasestorage.app",
  messagingSenderId: "1012421761747",
  appId: "1:1012421761747:web:2174b54013d7ae3d07d226",
  measurementId: "G-BD007JW9TW"
};

const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebase);
const db = getFirestore(Firebase)
export {Firebase,db }