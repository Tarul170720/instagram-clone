//import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseApp = firebase.initializeApp({
  //...
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyBkG0i0P07kAArM0ONrz96ugilmk-FHV24",
  authDomain: "memoriable-place.firebaseapp.com",
  databaseURL: "https://memoriable-place-default-rtdb.firebaseio.com",
  projectId: "memoriable-place",
  storageBucket: "memoriable-place.appspot.com",
  messagingSenderId: "50651978566",
  appId: "1:50651978566:web:22fa9923aaa5112a5a2347",
  measurementId: "G-SZ2D2Q745G"

});




const db =firebaseApp.firestore();
const auth=firebase.auth();
const storage = firebase.storage();
export {db,auth,storage};