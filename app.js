let books = [];

const booksContainer = document.getElementById('books');
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');

if (JSON.parse(localStorage.getItem('books')).length !== 0) {
  books = [...books, ...JSON.parse(localStorage.getItem('books'))];
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
    button.textContent = 'X';
    button.addEventListener('click', () => {
      const newBooks = books.filter((books) => books.title !== book.title);
      books = [...newBooks];
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
  books.push({
    title: title.value,
    author: author.value,
  });
  localStorage.setItem('books', JSON.stringify(books));
  title.value = '';
  author.value = '';
  setItems();
});

setItems();