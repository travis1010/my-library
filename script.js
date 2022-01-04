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
  //first remove all child nodes, before adding them all
  const bookList = document.getElementById('books-container');
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild)
  }

  myLibrary.forEach((book, index) => {
    addBookToPage(book.title, book.author, book.pages, book.read, index)
  });
}

function openForm() {
  document.getElementById('pop-up-form').style.display = "flex";
}

function closeForm() {
  document.getElementById('pop-up-form').style.display = "none";
  //reset form data
  document.getElementById('form-container').reset();
}



function addBook(form) {
  let currentIndex = myLibrary.length;
  let title = form.title.value;
  let author = form.author.value;
  let pages = form.pages.value;
  let read = form.read.value;
  if (read === 'true') {
    read = true;
  } else if (read === 'false') {
    read = false;
  }
  addBookToLibrary(title, author, pages, read);
  closeForm();
  addBookToPage(title, author, pages, read, currentIndex);
  getBookStats();
}

function addBookToPage(bookTitle, bookAuthor, bookPages, bookRead, index) {
  const bookList = document.getElementById('books-container');
  let bookCard = document.createElement('div');
  bookCard.setAttribute('data-index', index)
  bookCard.classList.add('book-card');

  let statsList = document.createElement('ul');

  let title = document.createElement('li');
  title.textContent = bookTitle;
  title.id = 'title-li';
  title.classList.add('book-card-prop');
  statsList.appendChild(title);

  let author = document.createElement('li');
  author.textContent = bookAuthor;
  author.id = 'author-li'
  author.classList.add('book-card-prop');
  statsList.appendChild(author);

  let pages = document.createElement('li');
  pages.textContent = bookPages;
  pages.id = 'pages-li';
  statsList.appendChild(pages);
  bookCard.appendChild(statsList);
  

  //this is for the buttons at the bottom of each book card
  let titleBar = document.createElement('div');
  titleBar.classList.add('title-bar');
  
  
  let checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.classList.add('checkbox');
  let readCaption = document.createElement('p');
  readCaption.classList.add('read-caption');
  checkBox.setAttribute('onclick', `toggleRead(${index})`)
  
  if(bookRead) {
    checkBox.checked = true;
    readCaption.textContent = 'Read';
    bookCard.classList.add('read-book');
  } else {
    checkBox.checked = false;
    readCaption.textContent = 'Not Read';
    bookCard.classList.add('unread-book');
  }

  //del button at bottom right
  let deleteButton = document.createElement('button');
  deleteButton.textContent = '×';
  deleteButton.classList.add('delete-btn');
  deleteButton.setAttribute('onclick', `deleteBook(${index})`);
  
 
  

  let readSwitch = document.createElement('div');
  readSwitch.appendChild(readCaption);
  readSwitch.appendChild(checkBox);
  readSwitch.classList.add('read-switch');
  

  
  titleBar.appendChild(readSwitch)
  titleBar.appendChild(deleteButton);
  bookCard.appendChild(titleBar);

//-----------------------------------

  bookList.appendChild(bookCard);
}

function getBookStats() {
  document.getElementById('book-count').textContent = `Total Books: ${myLibrary.length}`;
  document.getElementById('author-count').textContent = `Unique Authors: ${countAuthors()}`;
  document.getElementById('read-count').textContent = `Books Read: ${countBooksRead()}`
}

function countAuthors() {
  let arrayOfAuthors = myLibrary.map((book) => book.author);
  return [...new Set(arrayOfAuthors)].length;
}

function countBooksRead() {
  count = 0;
  for(let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read) {
      count++;
    }
  }
  return count;
}

function toggleRead(index) {
  let bookCard = document.querySelector(`[data-index='${index}']`)
  myLibrary[index].read = !myLibrary[index].read;
  if (myLibrary[index].read) {
    bookCard.classList.add('read-book');
    bookCard.classList.remove('unread-book');
    bookCard.querySelector('p').textContent = 'Read';
  } else {
    bookCard.classList.add('unread-book');
    bookCard.classList.remove('read-book');
    bookCard.querySelector('p').textContent = 'Not Read';
  }
  getBookStats();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  listBooks();
  getBookStats();
}

function showAllReadBooks() {
  let bookCards = document.querySelectorAll('.book-card')

}



listBooks();
getBookStats();
