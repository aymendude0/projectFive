import firebase from 'firebase/app';
import 'firebase/database';

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbVRio1ryyYG92w3nbhyUp_rFC_CEqE7Y",
    authDomain: "projectfive-8b8c7.firebaseapp.com",
    databaseURL: "https://projectfive-8b8c7.firebaseio.com",
    projectId: "projectfive-8b8c7",
    storageBucket: "projectfive-8b8c7.appspot.com",
    messagingSenderId: "558758889292",
    appId: "1:558758889292:web:6cc62127d2f532d116b1e9"
};
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

export default firebase;