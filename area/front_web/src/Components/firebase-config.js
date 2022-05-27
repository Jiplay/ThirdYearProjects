import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBn-EB0s3lM_O76Xqd9o6Gx56dXwn7559U",
  authDomain: "area-ae1d3.firebaseapp.com",
  projectId: "area-ae1d3",
  storageBucket: "area-ae1d3.appspot.com",
  messagingSenderId: "155321203764",
  appId: "1:155321203764:web:03156bc2edbde75e355e61",
  measurementId: "G-01CXN3P1KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
