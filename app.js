const books = JSON.parse(localStorage.getItem('books')) || [];

const booksContainer = document.getElementById('books');
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookNavBtn = document.getElementById('books-nav-btn');
const addNavBtn = document.getElementById('add-nav-btn');
const contactNavBtn = document.getElementById('contact-nav-btn');
const contactSection = document.getElementById('contact-section');
const formSection = document.getElementById('form-section');
const addBookAlert = document.getElementById('add-book-alert');
const dateSpan = document.getElementById('date-span');

setInterval(() => {
  const currentDate = new Date();
  dateSpan.textContent = currentDate.toUTCString();
}, 100);

class Book {
  constructor(title, author, uuid) {
    this.title = title;
    this.author = author;
    this.uuid = uuid;
  }

  addBook() {
    const book = new Book(this.title, this.author, this.uuid);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  removeBook() {
    const index = books.findIndex((book) => book.uuid === this.uuid);
    books.splice(index, 1);
  }
}

bookNavBtn.addEventListener('click', () => {
  contactSection.classList.add('d-none');
  contactSection.classList.remove('active');
  booksContainer.classList.remove('d-none');
  booksContainer.classList.add('active');
  formSection.classList.remove('active');
  formSection.classList.add('d-none');
});

addNavBtn.addEventListener('click', () => {
  contactSection.classList.add('d-none');
  contactSection.classList.remove('active');
  booksContainer.classList.add('d-none');
  booksContainer.classList.remove('active');
  formSection.classList.remove('d-none');
  formSection.classList.add('active');
});

contactNavBtn.addEventListener('click', () => {
  contactSection.classList.remove('d-none');
  contactSection.classList.add('active');
  booksContainer.classList.add('d-none');
  formSection.classList.add('d-none');
  formSection.classList.remove('active');
  booksContainer.classList.remove('active');
});

const setItems = () => {
  booksContainer.innerHTML = '';
  if (books.length !== 0) {
    books.forEach((book) => {
      const li = document.createElement('li');
      li.className = 'row';
      const h2 = document.createElement('h2');
      h2.textContent = `"${book.title}" by ${book.author}`;
      h2.className = 'col';
      const button = document.createElement('button');
      button.className = 'btn btn-danger m-3 col-2';
      button.textContent = 'Remove';
      button.addEventListener('click', () => {
        const bookToRemove = new Book(book.title, book.author);
        bookToRemove.removeBook();
        localStorage.setItem('books', JSON.stringify(books));
        setItems();
      });
      li.appendChild(h2);
      li.appendChild(button);
      return booksContainer.appendChild(li);
    });
  } else {
    const h5 = document.createElement('h5');
    h5.textContent = 'No Books Found';
    h5.className = 'text-center';
    return booksContainer.appendChild(h5);
  }
  return null;
};

const getUuid = () => new Date().getTime().toString() + Math.floor(Math.random() * 1000000);

addBtn.addEventListener('click', () => {
  if (title.value !== '' && author.value !== '') {
    const book = new Book(title.value, author.value, getUuid());
    book.addBook();
    title.value = '';
    author.value = '';
    setItems();
    addBookAlert.classList.remove('d-none');
    setTimeout(() => {
      addBookAlert.classList.add('d-none');
    }, 3000);
  }
});

setItems();
