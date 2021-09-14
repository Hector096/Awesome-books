const books = JSON.parse(localStorage.getItem('books')) || [];

const booksContainer = document.getElementById('books');
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    const book = new Book(this.title, this.author);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  removeBook() {
    const index = books.findIndex((book) => book.title !== this.title);
    books.splice(index, 1);
  }
}

const setItems = () => {
  booksContainer.innerHTML = '';
  books.forEach((book) => {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    h2.textContent = book.title;
    const h3 = document.createElement('h3');
    h3.textContent = book.author;
    const button = document.createElement('button');
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
};

addBtn.addEventListener('click', () => {
  if (title.value && author.value !== null) {
    const book = new Book(title.value, author.value);
    book.addBook();
    title.value = '';
    author.value = '';
    setItems();
  }
});

setItems();