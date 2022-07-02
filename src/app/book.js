module.exports = class Book {
    constructor(title, author, read) {
        this.title = title
        this.author = author
        this.read = read
        this.pages_total = null
        this.pages_read = null
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

    get getPages_total() {
        return this.pages_total
    }

    get getPages_read() {
        return this.pages_read
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

    set setPages_total(pages_total) {
        this.pages_total = pages_read
    }

    set setPages_read(pages_read) {
        this.pages_read = pages_read
    }

}
