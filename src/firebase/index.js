// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCgs-cNMPDD-dk0MYquEs5VsJTeX_uJYs",
  authDomain: "to-do-app-b3a0d.firebaseapp.com",
  projectId: "to-do-app-b3a0d",
  storageBucket: "to-do-app-b3a0d.appspot.com",
  messagingSenderId: "71677562862",
  appId: "1:71677562862:web:54222d963138be3d5588ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}