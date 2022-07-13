import { auth, db } from './firebase.app.js'
import Book from './book.js'
import {  
  collection, 
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  query
} from "firebase/firestore"; 
import { updateUi_onDataChange } from './ui-update.js';

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
function user_docReff () {
  return doc(user_collection, auth.currentUser.uid)
}

//Get the book collection
function book_collection() {
  return collection(user_docReff(), 'Books')
}

// Get book document refference
function book_docReff () {
  return doc(book_collection())
    .withConverter(Book.bookConverter)
}

// Create and Uptdade a book
function save_book (book, book_doc) {
  console.log(book)
  if (!book_doc) {
    setDoc(book_docReff(), book).then(res => {
      console.log('Book added: ', res)
    }).catch(err => {
        console.log('Error on add book: ', err)
      })
  } else {
    setDoc(book_doc, book).then(res => {
      console.log('Book edited: ', res)
    }).catch(err => {
        console.log('Error on edit book: ', err)
      })
  }
}

// Delete a Book 
function del_book (book_doc) {
  deleteDoc(book_doc).then(res => {
    console.log('Book deleted: ', res)
  }).catch(err => {
      console.log('Error on delete book: ', err)  
    })
}

// Get a books
function get_book (book_doc) {
  getDoc(book_doc).then(res => {
    console.log('Book recovered: ', res)
  }).catch(err => {
      console.log('Error on recover book: ', err)
    })
}


// initialize a empty whatcher 
let watcher = null
export function watch_userBooks () {
  // if our whatcher is already watching
  if (watcher) {
    // we close it
    watcher()
    watcher = null
  }
  const q = query(book_collection())
  // and then, put him to what again / start to what
  // the new loged user
  watcher = onSnapshot(q, querySnapshot => {
    updateUi_onDataChange(querySnapshot)
  });
}

//-----------------------------------------------------------------------------
//--TEST-&-POPULATION----------------------------------------------------------
//-----------------------------------------------------------------------------

// Populate
const book1 = new Book('Fundamentos da Matemática Elementar: Volume 1', 
  "Gelson Iezzi", false)
const book2 = new Book('Livro do Dessasosego', 'Fernando Pessoa', true)
const book3 = new Book('Um bom livro pra popular', 
  'Author Zika P. Karai', false)

const arrayDBooks = []
for (let i = 1; i <= 10; i++)
  arrayDBooks.push(new Book('Livro Volume '+ i, 'Author '+ i,
  (i%2 == 0) ? false : true))

function test() {
  save_book(book1)
  save_book(book2)
  save_book(book3)
}


export {
  test,
  save_book,
  del_book
}























































