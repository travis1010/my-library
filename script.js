let myLibrary = [];
let bookCounter = 0;
let editIndex = null;
let filterLib = null;

function Book(title, author, pages, read, numAdded, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.numAdded = numAdded;
  this.index = index;
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
  };
}

function addBookToLibrary(title, author, pages, read, currentIndex) {
  bookCounter++;
  myLibrary.push(new Book(title, author, pages, read, bookCounter, currentIndex));
}

function listBooks() {
  //first remove all child nodes, before adding them all
  const bookList = document.getElementById('books-container');
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild)
  }

  myLibrary.forEach((book, index) => {
    book.index = index;
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

function openEditForm(index) {
  editIndex = index;
  document.getElementById('edit-title').value = myLibrary[index].title;
  document.getElementById('edit-author').value = myLibrary[index].author;
  document.getElementById('edit-pages').value = myLibrary[index].pages;
  if(myLibrary[index].read) {
    document.getElementById('edit-read-yes').checked = true;
  } else {
    document.getElementById('edit-read-no').checked = true;
  }

  document.getElementById('pop-up-edit-form').style.display = "flex";
}

function closeEditForm() {
  document.getElementById('pop-up-edit-form').style.display = "none";
  //reset form data
  document.getElementById('edit-form-container').reset();
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
  addBookToLibrary(title, author, pages, read, currentIndex);
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

  //edit button at bottom right
  let editButton = document.createElement('button');
  let editIcon = document.createElement('i');
  editIcon.classList.add('fas', 'fa-pen');
  editButton.appendChild(editIcon);
  editButton.classList.add('delete-btn');
  editButton.setAttribute('onclick', `openEditForm(${index})`);

  //del button at bottom right
  let deleteButton = document.createElement('button');
  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash-alt');
  deleteButton.appendChild(deleteIcon);
  deleteButton.classList.add('delete-btn');
  deleteButton.setAttribute('onclick', `deleteBook(${index})`);
  
  let bottomRightButtons = document.createElement('div');
  bottomRightButtons.appendChild(editButton);
  bottomRightButtons.appendChild(deleteButton);

  let readSwitch = document.createElement('div');
  readSwitch.appendChild(readCaption);
  readSwitch.appendChild(checkBox);
  readSwitch.classList.add('read-switch');
  

  
  titleBar.appendChild(readSwitch)
  titleBar.appendChild(bottomRightButtons);
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


  
function editBook(form) {
  let read = form.read.value;
  if (read === 'true') {
    read = true;
  } else if (read === 'false') {
    read = false;
  }
  let index = editIndex;
  editIndex = null;
  myLibrary[index].title = form.title.value;
  myLibrary[index].author = form.author.value;
  myLibrary[index].pages = form.pages.value;
  myLibrary[index].read = read;
  closeEditForm();
  getBookStats();
  listBooks();
}

function sortBy(sortMethod) {
  
  switch(sortMethod) {
    case 'title-up':
      myLibrary.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      })
    break;
    case 'title-down':
      myLibrary.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        return 0;
      })
    break;
    case 'date-added-up':
      myLibrary.sort((a, b) => {
        if (a.numAdded > b.numAdded) return 1;
        if (a.numAdded < b.numAdded) return -1;
        return 0;
      })
    break;
    case 'date-added-down':
      myLibrary.sort((a, b) => {
        if (a.numAdded > b.numAdded) return -1;
        if (a.numAdded < b.numAdded) return 1;
        return 0;
      })
    break;
    case 'author-up':
      myLibrary.sort((a, b) => {
        aAuthor = a.author.toLowerCase().split(' ');
        aLastName = aAuthor[aAuthor.length-1];
        bAuthor = b.author.toLowerCase().split(' ');
        bLastName = bAuthor[bAuthor.length-1];
        console.log(aLastName)

        if (aLastName > bLastName) return 1;
        else if (aLastName < bLastName) return -1;
        else if (aLastName === bLastName) {
          if (a.author.toLowerCase() > b.author.toLowerCase()) return 1;
          if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
        }
        return 0;
      })
    break;
    case 'author-down':
      myLibrary.sort((a, b) => {
        aAuthor = a.author.toLowerCase().split(' ');
        aLastName = aAuthor[aAuthor.length-1];
        bAuthor = b.author.toLowerCase().split(' ');
        bLastName = bAuthor[bAuthor.length-1];
        console.log(aLastName)

        if (aLastName > bLastName) return -1;
        else if (aLastName < bLastName) return 1;
        else if (aLastName === bLastName) {
          if (a.author.toLowerCase() > b.author.toLowerCase()) return -1;
          if (a.author.toLowerCase() < b.author.toLowerCase()) return 1;
        }
        return 0;
      })
    break;
    case 'pages-up':
      myLibrary.sort((a, b) => {
        if (a.pages > b.pages) return 1;
        if (a.pages < b.pages) return -1;
        return 0;
      })
    break;
    case 'pages-down':
      myLibrary.sort((a, b) => {
        if (a.pages > b.pages) return -1;
        if (a.pages < b.pages) return 1;
        return 0;
      })
    break;
  }
 
  listBooks();
  
  
}




addBookToLibrary('Cat\'s Cradle', 'Kurt Vonnegut', 304, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('Slaughterhouse-Five', 'Kurt Vonnegut', 192, true);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('The Old Man and the Sea', 'Ernest Hemingway', 127, false);

listBooks();
getBookStats();
