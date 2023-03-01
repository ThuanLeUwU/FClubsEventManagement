// import firebase from "firebase/app";
// import "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyCA--k01WWxHMCKrQlS65mcaqSzfMhR90M",
//   authDomain: "f-club-management.firebaseapp.com",
//   databaseURL: "https://f-club-management-default-rtdb.firebaseio.com",
//   projectId: "f-club-management",
//   storageBucket: "f-club-management.appspot.com",
//   messagingSenderId: "890412545511",
//   appId: "1:890412545511:web:0840a38d2847b2e1d9b942",
//   measurementId: "G-S2RPTHQR7P",
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// messaging
//   .getToken()
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log("Token:", currentToken);
//       // Gửi token về server của bạn để có thể gửi notification
//     } else {
//       console.log("No registration token available.");
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//   });
// messaging.onMessage((payload) => {
//   console.log("Message received. ", payload);
//   // Hiển thị notification
// });
