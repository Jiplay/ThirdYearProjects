import firebase from 'firebase/app';
import 'firebase/auth';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBn-EB0s3lM_O76Xqd9o6Gx56dXwn7559U",
    authDomain: "area-ae1d3.firebaseapp.com",
    projectId: "area-ae1d3",
    storageBucket: "area-ae1d3.appspot.com",
    messagingSenderId: "155321203764",
    appId: "1:155321203764:web:03156bc2edbde75e355e61",
    measurementId: "G-01CXN3P1KS"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
