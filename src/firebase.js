import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBx6lK1vLazXOwRYLG-aJ6JbgqFpr14Lsk",
    authDomain: "expensetracker-5198c.firebaseapp.com",
    projectId: "expensetracker-5198c",
    storageBucket: "expensetracker-5198c.appspot.com",
    messagingSenderId: "649364493803",
    appId: "1:649364493803:web:5f6ca71fb7e980836b35ae",
    measurementId: "G-JKRVE6NRGT"
  });

  const db=firebaseApp.firestore();
  
  export default db;