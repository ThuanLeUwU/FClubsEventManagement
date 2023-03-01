// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});