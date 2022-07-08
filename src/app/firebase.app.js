import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore'

console.log('-----------')
const firebaseConfig = {
  apiKey: "AIzaSyBI3zUaFz8l7Y68aAgVNb8UEHUt3RSAjng",
  authDomain: "library-cfd08.firebaseapp.com",
  projectId: "library-cfd08",
  storageBucket: "library-cfd08.appspot.com",
  messagingSenderId: "837470737044",
  appId: "1:837470737044:web:a18f941b234776bda19a81",
  measurementId: "G-4Z3YHPNSGX"
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();

