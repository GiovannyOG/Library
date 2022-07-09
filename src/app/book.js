export default class Book {
  constructor(title, author, read) {
    this.title = title
    this.author = author
    this.read = read
  }

  get getTitle() {
    return this.title
  }

  get getAuthor() {
    return this.author
  }

  get isRead() {
    return this.read
  }

  set setTitle(title) {
    this.title = title
  }

  set setAuthor(author) {
    this.author = author
  }

  set setRead(read) {
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
