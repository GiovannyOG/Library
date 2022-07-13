export default class Book {
  constructor(title, author, read) {
    this.title = title
    this.author = author
    this.read = read
  }

  get Title() {
    return this.title
  }

  get Author() {
    return this.author
  }

  get Read() {
    return this.read
  }

  set Title(title) {
    this.title = title
  }

  set Author(author) {
    this.author = author
  }

  set Read(read) {
    this.read = read
  }

  // CONVERTER
  static bookConverter = {
    toFirestore: (book) => {
      return {
        title: book.title,
        author: book.author,
        read: book.read
      }
    },
    fromFirestore: (snap, opt) => {
      const data = snap.data(opt)
      return new Book(
        data.title, 
        data.author, 
        data.read
      )
    }
  }
}
