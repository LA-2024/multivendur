// require("dotenv").config();
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.apiKey,
  // authDomain: process.env.authDomain,
  // projectId: process.env.projectId,
  // storageBucket: process.env.storageBucket,
  // messagingSenderId: process.env.messagingSenderId,
  // appId: process.env.appId
  apikey: "AIzaSyAPqr7P_Mg6DJAk1UrDLN5la9TVQKpZnA0",
  authDomain: "mern-real-estat.firebaseapp.com",
  projectId: "mern-real-estat",
  storageBucket: "mern-real-estat.appspot.com",
  messagingSenderId: "995177322752",
  appId: "1:995177322752:web:75177467abb3a896593be5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);