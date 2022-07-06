import 'firebase/compat/auth';
import { getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
        } from 'firebase/auth'

const auth = getAuth();
const provider = new GoogleAuthProvider();

const login_buttom = document.getElementById('login_buttom')
const logout_buttom = document.getElementById('logout_buttom')

const hide_element = (element) => element.style.display = 'none';
const show_element = (element) => element.style.display = 'inline';

function change_b_toLogin(){
  hide_element(logout_buttom)
  show_element(login_buttom)
}

function change_b_toLogout(){
  hide_element(login_buttom)
  show_element(logout_buttom)
}

function updateUi(user) {
  if (user) {
    change_b_toLogout()
  } else {
    change_b_toLogin()
  } 
}

const logOut = () => {
  signOut(auth)
}


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


onAuthStateChanged(auth, (user) => {
  console.log('logIn state change!')
  updateUi(user)
});

login_buttom.addEventListener('click', logIn)
logout_buttom.addEventListener('click', logOut)

