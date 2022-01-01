let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function listBooks() {
  const bookList = document.getElementById('books-container');
  myLibrary.forEach((book) => {
    let bookCard = document.createElement('div');

    let statsList = document.createElement('ul');

    let title = document.createElement('li');
    title.textContent = `Title: ${book.title}`;
    statsList.appendChild(title);

    let author = document.createElement('li');
    author.textContent = `Author: ${book.author}`;
    statsList.appendChild(author);

    let pages = document.createElement('li');
    pages.textContent = `Pages: ${book.pages}`;
    statsList.appendChild(pages);

    let read = document.createElement('li');
    read.textContent = `Read: ${book.read ? 'Already read' : 'Not read yet'}`;
    statsList.appendChild(read);

    bookCard.appendChild(statsList);
    bookCard.classList.add('book-card');
    bookList.appendChild(bookCard);
  });
}

addBookToLibrary('The Hobbit !', 'JRR Tolkien', '295 pages', false);
addBookToLibrary('The Hobbit 2!', 'JRR Tolkien', '299 pages', false);
addBookToLibrary('The Hobbit 3!', 'JRR Tolkien', '595 pages', false);
addBookToLibrary('The Hobbit 4!', 'JRR Tolkien', '362 pages', false);


listBooks();




