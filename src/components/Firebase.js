//add firebase - did yarn add firebase
import firebase from 'firebase/app'
import "firebase/auth"


const app = firebase.initializeApp({
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: proces.env.REACT_APP_FIREBASE_STORE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
 })


export const auth = app.auth();
export const firestore = firebase.firestore();
export default app;