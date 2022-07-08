import { app, auth, db } from './firebase.app.js'
import { getFirestore, 
  collection, 
  setDoc,
  doc,
  where,
  deleteDoc,
  getDoc,
  onSnapshot
} from "firebase/firestore"; 


/*

||-- Estrutura de dados --||

User:email -- collection
||-> book:titulo --document
|-> titulo
|-> author
|-> isRead
*/


 
// The User collection
const user_collection = collection(db, "Users")
// Get user document refference
function user_docReff () {return doc(user_collection, auth.currentUser.uid)}
// Get book document refference
function book_docReff (book_title) {return doc(user_docReff(), 'Books', book_title)}

// Create and Uptdade a book
function save_book (book) {
  setDoc(book_docReff(book.title), book).then(res => {
    console.log('Book saved: ', res)
  }).catch(err => {
      console.log('Error on save book: ', res)
    })
}

// Delete a Book 
function del_book (book_title) {
  deleteDoc(book_docReff(book_title)).then(res => {
    console.log('Book deleted: ', res)
  }).catch(err => {
      console.log('Error on delete book: ', err)  
    })
}

// Get a books
function get_book (book_title) {
  getDoc(book_docReff(book_title)).then(res => {
    console.log('Book recovered: ', res)
  }).catch(err => {
      console.log('Error on recover book: ', err)
    })
}


// initialize a empty whatcher let watcher = null
export function watch_userBooks () {
  // if our whatcher is already watching
  if (watcher) {
    // we close it
    watcher()
  }
  // and then, put him to what again / start to what
  // the new loged user
  watcher = onSnapshot(user_docReff(), doc => {
    console.log("Data: ", doc)
  });
}


