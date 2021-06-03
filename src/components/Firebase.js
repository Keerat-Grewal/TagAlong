//add firebase - did yarn add firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


// const app = firebase.initializeApp({
//    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//    storageBucket: process.env.REACT_APP_FIREBASE_STORE_BUCKET,
//    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//    appId: process.env.REACT_APP_FIREBASE_APP_ID
//  })

const app = firebase.initializeApp({
  apiKey: "AIzaSyAyGFKTLfcGK0Ks16MZYsnkNYyZ4eHmejM",
  authDomain: "auth-development-7fe87.firebaseapp.com",
  projectId: "auth-development-7fe87",
  storageBucket: "auth-development-7fe87.appspot.com",
  messagingSenderId: "484580128274",
  appId: "1:484580128274:web:ff76676cabe68069be0acb"
});

export const storage = firebase.storage();
export const auth = app.auth();
export const firestore = app.firestore();
export default app;
