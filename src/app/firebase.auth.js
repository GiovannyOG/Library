import 'firebase/compat/auth';
import {
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
        } from 'firebase/auth'
import { auth } from './firebase.app.js'
import { 
  // test,
  watch_userBooks } from './firebase.data-base.js'

import { login_buttom, logout_buttom, updateUi_onLoginChange } from "./ui-update.js"

const provider = new GoogleAuthProvider();

// Make Firebase Logout
const logOut = () => {
  signOut(auth)
}

// Make Firebase Login
const logIn = () => {
  signInWithPopup(auth, provider).then(result => {
    console.log('logIn: ' + result)
  }).catch(error => {
    const errorCode = error.code;
    const errorMensage = error.message;
    console.log(errorCode, errorMensage);
  });
}

// Change the UI when the login state change
onAuthStateChanged(auth, (user) => {
  updateUi_onLoginChange(user)
  watch_userBooks()
  //--test population--
  // test()
});

// Buttoms fucntions
login_buttom.addEventListener('click', logIn)
logout_buttom.addEventListener('click', logOut)

