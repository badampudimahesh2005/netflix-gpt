// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS-P818NcKjw72e0hpgs4alrwvsQmEGOU",
  authDomain: "netflixgpt-de0a9.firebaseapp.com",
  projectId: "netflixgpt-de0a9",
  storageBucket: "netflixgpt-de0a9.appspot.com",
  messagingSenderId: "341378253074",
  appId: "1:341378253074:web:77b14c9b1d0132a94073cb",
  measurementId: "G-0R73NQ3E9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
