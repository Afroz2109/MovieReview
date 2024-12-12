import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDFyxHYpBJKUkn27ZKwyCyVHwp8dicQeHQ",
    authDomain: "moviereview-52799.firebaseapp.com",
    projectId: "moviereview-52799",
    storageBucket: "moviereview-52799.firebasestorage.app",
    messagingSenderId: "912258477531",
    appId: "1:912258477531:web:26d2d7785421a595008bfe",
    measurementId: "G-KW1FS91C8W"
  };
  


  const app= initializeApp(firebaseConfig)

  export const auth= getAuth(app)

  export const db= getFirestore(app)