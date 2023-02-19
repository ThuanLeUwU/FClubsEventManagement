// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA--k01WWxHMCKrQlS65mcaqSzfMhR90M",
  authDomain: "f-club-management.firebaseapp.com",
  databaseURL: "https://f-club-management-default-rtdb.firebaseio.com",
  projectId: "f-club-management",
  storageBucket: "f-club-management.appspot.com",
  messagingSenderId: "890412545511",
  appId: "1:890412545511:web:0840a38d2847b2e1d9b942",
  measurementId: "G-S2RPTHQR7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);