import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBHOncdILGH430FT55E7hcKe1ZUoMuQDJo",
    authDomain: "react-firebase-curd-01.firebaseapp.com",
    databaseURL: "https://react-firebase-curd-01-default-rtdb.firebaseio.com",
    projectId: "react-firebase-curd-01",
    storageBucket: "react-firebase-curd-01.appspot.com",
    messagingSenderId: "409739437286",
    appId: "1:409739437286:web:38b6b6bc0f9b5c77f3c727"
  };
  // Initialize Firebase
 const firebaseDB = firebase.initializeApp(firebaseConfig);
 export default firebaseDB.database().ref();