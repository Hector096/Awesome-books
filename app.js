const books = JSON.parse(localStorage.getItem('books')) || [];

const booksContainer = document.getElementById('books');
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');

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

const setItems = () => {
  booksContainer.innerHTML = '';
  if (books.length !== 0) {
    books.forEach((book) => {
      const li = document.createElement('li');
      li.className = 'row';
      const h2 = document.createElement('h2');
      h2.textContent = book.title;
      h2.className = 'col';
      const h3 = document.createElement('h3');
      h3.textContent = book.author;
      h3.className = 'col';
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
      li.appendChild(h3);
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
  }
});

setItems();
