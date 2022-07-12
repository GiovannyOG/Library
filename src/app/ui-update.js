import Book from "./book.js"

// Elements
export const login_buttom = document.getElementById('login_buttom')
export const logout_buttom = document.getElementById('logout_buttom')
const username_container = document.getElementById('username')
const username_text = document.getElementById('username-text')
const main_body = document.querySelector(".main_body")
// Hide & Show a element
const hide_element = (element) => element.style.display = 'none';
const show_element = (element) => element.style.display = 'block';

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

// create a add card element
function create_addCard () {
  const add_card = document.createElement('div')
  add_card.classList.add('add_card')
  add_card.onclick = onClick_addCard

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

// create a book card element
function create_bookCard (book) {
  const book_card = document.createElement('div')
  book_card.classList.add("book_card")
  book_card.onclick = () => onClick_bookCard(book)

  const book_shadow = document.createElement('div')
  book_shadow.classList.add("book_shadow")

  const book_marker = document.createElement('div')
  book_marker.classList.add("book_marker", (book.read == true) ? "bm-read" : "bm-reading")
  
  const book_main = document.createElement('div')
  book_main.classList.add("book_main")

  const book_title = document.createElement('p')
  book_title.classList.add("book_title")
  book_title.append(book.title)

  const book_author = document.createElement('p')
  book_author.classList.add("book_author")
  book_author.append(book.author)

  book_main.append(book_title, book_author)
  book_card.append(book_shadow, book_marker, book_main)
  
  return book_card
}

function qsnap_to_elements(book_qSnap) {
  const children_array = []
  book_qSnap.forEach( book_doc => {
    const book = book_doc.data()
    children_array.push(
      create_bookCard(book)
    )
  });
  return children_array
}

 function update_mainBodyContent(elements_array) {
  // put the add card on the list
  elements_array.push(create_addCard())
  //Replace the content with the new one
  main_body.replaceChildren(...elements_array)
}

// Update the UI, is caled every time that 
// login state changes
export function updateUi_onLoginChange(user) {
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

// Update the book list UI, is caled every time that
// the data changes
export function updateUi_onDataChange(book_qSnap) {
  const cardElements_array = qsnap_to_elements(book_qSnap)
  update_mainBodyContent(cardElements_array)
}

const onClick_bookCard = book => {
  show_editPopup()  
  updateEditPopup(book)
}

const onClick_addCard = () => {
  show_editPopup()
  updateEditPopup()

}

//----------------------------------------------------------------------------- 
//--POPUP---------------------------------------------------------------------- 
//----------------------------------------------------------------------------- 

// Elements
const overlay = document.querySelector(".overlay")
const delete_popup = document.querySelector(".popup-delete")
const edit_popup = document.querySelector(".popup-edit")

// PopUp Functions
function show_editPopup() {
  show_element(overlay)
  show_element(edit_popup)
}

function hide_editPopup() {
  hide_element(overlay)
  hide_element(edit_popup)
}

function show_deletePopup() {
  show_element(delete_popup)
}

function hide_deletePopup() {
  hide_element(delete_popup)
}

const e_close_buttom = document.querySelector(".popup-edit .close")
const d_close_buttom = document.querySelector(".popup-delete .close")
e_close_buttom.addEventListener("click", hide_editPopup)
d_close_buttom.addEventListener("click", hide_deletePopup)

const e_title_input = document.querySelector(".popup-edit .title")
const e_author_input = document.querySelector(".popup-edit .author")
const e_delete_btn = document.querySelector(".popup-edit .bottom svg")
export const e_save_btn = document.querySelector(".popup-edit btn")
export const d_delete_btn = document.querySelector(".popup-delete btn")

//Check Boxes Elements
const e_checkboxes_labels = document.querySelectorAll(".lcb")
const e_read = document.querySelector("#read")
const e_reading = document.querySelector("#reading")
e_checkboxes_labels.forEach(
  lcb => lcb.addEventListener("click", e => select(e.target))
)

const DEFAULT_TITLE = "The book's title..."
const DEFAULT_AUTHOR = "Te book's author..."
const DEFAULT_READ = true

// Check Boxes Functions
function uncheckAll() {
  e_read.checked = false
  e_reading.checked = false
}

function select(cb) {
  uncheckAll()
  cb.checked=true
}

function updateEditPopup(book) {
  if (!book){
    e_title_input.value = DEFAULT_TITLE
    e_author_input.value= DEFAULT_AUTHOR
    select((DEFAULT_READ == true) ? e_read : e_reading)

  } else {
  e_title_input.value = book.title
  e_author_input.value = book.author
  select((book.read == true) ? e_read : e_reading)
  }
}

export function recoverEditPopupData() {
  return book = new Book(
    e_title_input.value, 
    e_author_input.value, 
    e_read.checked
  )
}



