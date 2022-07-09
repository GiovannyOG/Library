import { app, auth, db } from './firebase.app.js'
import Book from './book.js'
import { getFirestore, 
  collection, 
  setDoc,
  doc,
  where,
  deleteDoc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot
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
function user_docReff () {
  console.log('UID: ' + auth.currentUser.uid)
  return doc(user_collection, auth.currentUser.uid)
}
//Get the book collection
function book_collection() {
  return collection(user_docReff(), 'Books')
}
// Get book document refference
function book_docReff (book_title) {
  return doc(book_collection(), book_title)
    .withConverter(Book.bookConverter)
}

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
   // querySnapshot.forEach( doc => {
   //    console.log(doc.data())
   //  })
    updateUI(querySnapshot)
  });
}


// Populate
const book1 = new Book('Fundamentos da Matemática Elementar: Volume 1', 
  "Gelson Iezzi", false)
const book2 = new Book('Livro do Dessasosego', 'Fernando Pessoa', true)
const book3 = new Book('Um bom livro pra popular', 
  'Author Zika P. Karai', false)
/*
const arrayDBooks = []
for (let i = 1; i <= 10; i++) 
  arrayDBooks.push(new Book('Livro Volume '+ i, 'Author '+ i, 
  (i%2 == 0) ? false : true))
*/


export function test() {
  save_book(book1)
  save_book(book2)
  save_book(book3)
}

//---------------------------------------------------------------------------//
//----------------------------------UI---------------------------------------//
//---------------------------------------------------------------------------//


/*
<div class="book_card">
    <div class="book_shadow"></div>
    <div class="book_marker"></div>
    <div class="book_main">
        <p class="book_title">Fundamentos da 
            Matematica Elementar: Volume 1</p>
        <p class="book_author">Gelson Iezzi</p>
    </div>
</div>

<div class="add_card">

    <div class="shadow_btn"></div>

    <div class="add_btn">
        <div></div>
        <div></div>
    </div>

</div>
*/

function create_addCard () {
  const add_card = document.createElement('div')
  add_card.classList.add('add_card')

  const shadow_btn = document.createElement('div') 
  shadow_btn.classList.add('shadow_btn')

  const add_btn = document.createElement('div') 
  add_btn.classList.add('add_btn')

  const div0 = document.createElement('div')
  const div1 = document.createElement('div')
  
  add_btn.append(div0, div1)
  add_card.append(shadow_btn, add_btn)

  return add_card
}

function create_bookCard (title, author, read) {
  const book_card = document.createElement('div')
  book_card.classList.add("book_card")

  const book_shadow = document.createElement('div')
  book_shadow.classList.add("book_shadow")

  const book_marker = document.createElement('div')
  book_marker.classList.add("book_marker", (read == true) ? "read" : "reading")
  
  const book_main = document.createElement('div')
  book_main.classList.add("book_main")

  const book_title = document.createElement('p')
  book_title.classList.add("book_title")
  book_title.append(title)

  const book_author = document.createElement('p')
  book_author.classList.add("book_author")
  book_author.append(author)

  book_main.append(book_title, book_author)
  book_card.append(book_shadow, book_marker, book_main)
  
  return book_card
}




function updateUI(books) {
  const main_body = document.querySelector(".main_body")
  const children_array = [] 
  books.forEach( book_doc => {
    const book = book_doc.data()
    children_array.push(
      create_bookCard(book.title, book.author, book.read)
    ) 
  })
  children_array.push(create_addCard())
  console.log(...children_array)
  //Replace with the new content
  main_body.replaceChildren(...children_array)
}

























































