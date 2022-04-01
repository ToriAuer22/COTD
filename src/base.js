import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAR_09_UjzJEJxipiydTwvqJXdp81uFi7k",
    authDomain: "catch-of-the-day-tori-auer.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-tori-auer-default-rtdb.firebaseio.com",
  });

  const base = Rebase.createClass(firebaseApp.database());

  // This is a named export
  export {firebaseApp};

  // This is a default export
  export default base;