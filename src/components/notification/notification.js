// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import react, { useEffect, useState } from "react";

// const firebaseConfig = {
//   apiKey: "AIzaSyCA--k01WWxHMCKrQlS65mcaqSzfMhR90M",
//   authDomain: "f-club-management.firebaseapp.com",
//   databaseURL: "https://f-club-management-default-rtdb.firebaseio.com",
//   projectId: "f-club-management",
//   storageBucket: "f-club-management.appspot.com",
//   messagingSenderId: "890412545511",
//   appId: "1:890412545511:web:0840a38d2847b2e1d9b942",
//   measurementId: "G-S2RPTHQR7P"

// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

function Notification() {
  // const [user, setUser] = useState(null);
  // const [messagingToken, setMessagingToken] = useState(null);

  // useEffect(() => {
  //   // const auth = getAuth();
  //   // const provider = new GoogleAuthProvider();

  //   // // Đăng nhập bằng Google
  //   // signInWithGoogle(auth, provider).then((user) => {
  //   //   setUser(user);
  //   // });

  //   // Lấy thông tin token từ FCM
  //   getToken(messaging, { vapidKey: "BI4e_tB1ib0CgZzuCHLVZ9-o5umesEPq2_Xz3It-xws6kmjS0S_WGNSv6EfML4IWvtaFpj81PMmc_MvjLSoCEb8" }).then((token) => {
  //     setMessagingToken(token);
  //   });

  //   // Lắng nghe tin nhắn từ FCM
  //   onMessage(messaging, (payload) => {
  //     console.log("Received message: ", payload);
  //   });
  // }, []);

  // const signInWithGoogle = async (auth, provider) => {
  //   const result = await auth.signInWithPopup(provider);
  //   return result.user;
  // };

  return (
    <div>
      {/* {user && (
        <p>
          Xin chào, {user.displayName}! Token của bạn từ FCM là {messagingToken}.
        </p>
      )} */}
      Xin chào
    </div>
  );
}
export default Notification;

// import React, { useState } from "react";
// import axios from "axios";
// import { Button, FormControl, Input } from "@mui/material";
// import { Image } from "antd";



// function Notification() {
  
//   return (
//     <div>
//       Hello
//     </div>
//   );
// }

// export default Notification;
