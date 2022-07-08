import 'firebase/compat/auth';
import {
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
        } from 'firebase/auth'
import { auth } from './firebase.app.js'
import { watch_userBooks } from './firebase.data-base.js'

const provider = new GoogleAuthProvider();

// Elements
const login_buttom = document.getElementById('login_buttom')
const logout_buttom = document.getElementById('logout_buttom')
const username_container = document.getElementById('username')
const username_text = document.getElementById('username-text')
// Hide & Show a element
const hide_element = (element) => element.style.display = 'none';
const show_element = (element) => element.style.display = 'inline';

// Change the username
const change_username = (username) => username_text.innerHTML = username

// Change logout_buttom to login_buttom
function change_b_toLogin(){
  hide_element(logout_buttom)
  show_element(login_buttom)
}

// Change login_buttom to logout_buttom
function change_b_toLogout(){
  hide_element(login_buttom)
  show_element(logout_buttom)
}

// Update the UI
function updateUi(user) {
  if (user) {
    // LogIN
    change_b_toLogout()
    change_username(user.displayName)
    show_element(username_container)
  } else {
    // LogOUT
    change_b_toLogin()
    hide_element(username_container)
    change_username('Uknow')
    hide_element(username_container)
  } 
}

// Make Firebase Logout
const logOut = () => {
  signOut(auth)
}

// Make Firebase Login
const logIn = () => {
  signInWithPopup(auth, provider).then(result => {
    const credentials = GoogleAuthProvider.credential.FromResult(result);
    const token = credentials.accessToken;
    const user = result.user;
  }).catch(error => {
    const errorCode = error.code;
    const errorMensage = error.message;
    console.log(errorCode, errorMensage);
  });
}

// Change the UI when the login state change
onAuthStateChanged(auth, (user) => {
  updateUi(user)
  watch_userBooks()
});

// Buttoms fucntions
login_buttom.addEventListener('click', logIn)
logout_buttom.addEventListener('click', logOut)

