import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import  { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCzxBWKhpvNfnbH5nBnFqlPJr_ITjmpOXg",
  authDomain: "myapp-6affc.firebaseapp.com",
  projectId: "myapp-6affc",
  storageBucket: "myapp-6affc.appspot.com",
  messagingSenderId: "987211343335",
  appId: "1:987211343335:web:67d5ee107e67ee012d8942",
  measurementId: "G-PEG74W0RJG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(firebaseApp)
export { firebaseApp, auth, db }