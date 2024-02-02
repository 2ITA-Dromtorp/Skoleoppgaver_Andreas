import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD7e-lgAVWmuO7YCsW0DHenYDLbXR8uBfc",
  authDomain: "reactapp-e6f6e.firebaseapp.com",
  databaseURL: "https://reactapp-e6f6e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactapp-e6f6e",
  storageBucket: "reactapp-e6f6e.appspot.com",
  messagingSenderId: "936263434185",
  appId: "1:936263434185:web:7c7db903755dd18d843218"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
