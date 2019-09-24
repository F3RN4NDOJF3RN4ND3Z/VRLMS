import firebase from "firebase";

/*const firebaseapp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});*/
const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyBpKrO8P5ykdOk6dI_jT6xPaKIIiF2dtPo",
    authDomain: "govrlms.firebaseapp.com",
    databaseURL: "https://govrlms.firebaseio.com",
    projectId: "govrlms",
    storageBucket: "govrlms.appspot.com",
    messagingSenderId: "892188446862",
    appId: "1:892188446862:web:549003380652f814"
});

export default firebaseapp;