/*--------------------*/
/*-------Styles-------*/
/*--------------------*/
import "./styles.css";



/*--------------------*/
/*-----FIREBASE-------*/
/*--------------------*/
//import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup 
        } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBI3zUaFz8l7Y68aAgVNb8UEHUt3RSAjng",
  authDomain: "library-cfd08.firebaseapp.com",
  projectId: "library-cfd08",
  storageBucket: "library-cfd08.appspot.com",
  messagingSenderId: "837470737044",
  appId: "1:837470737044:web:a18f941b234776bda19a81",
  measurementId: "G-4Z3YHPNSGX"
};

const app = firebase.initializeApp(firebaseConfig);
//const ui = new firebaseui.auth.AuthUI(firebase.auth());

//ui.start('#auth-firebase-container', {
//  signInOptions: [
//    firebase.auth.GoogleAuthProvider.PROVIDER_ID
//  ]
//});

// Recupera a autenticação do usuário
const auth = getAuth();
//Provedor de login Google
const provider = new GoogleAuthProvider();

//Observa o status de login
onAuthStateChanged(auth, (user) => {
  if(user) {
    //Usuário ta logado
    console.log(user);
  } else {
    //Usuário dislogou
  }
});

//Logar com google em uma popup
signInWithPopup(auth, provider).then(result => {
  //The token to acess google API
  const credentials = GoogleAuthProvider.credential.FromResult(result);
  const token = credentials.accessToken;
  //user info
  const user = result.user;
}).catch(error => {
  const errorCode = error.code;
  const errorMensage = error.message;
  // Email que tentou logar
  console.log(errorCode, errorMensage);
});

