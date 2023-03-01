// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

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

//  const messaging = firebase.messaging();

// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = REACT_APP_VAPID_KEY;

// export const getToken = async (setTokenFound) => {
//   let currentToken = "";

//   try {
//     currentToken = await messaging.getToken({ vapidKey: publicKey });
//     if (currentToken) {
//       setTokenFound(true);
//     } else {
//       setTokenFound(false);
//     }
//   } catch (error) {
//     console.log("An error occurred while retrieving token. ", error);
//   }

//   return currentToken;
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });

