let books = [];

let booksContainer = document.getElementById('books');
let addBtn = document.getElementById('add-btn');
let title = document.getElementById('title');
let author = document.getElementById('author');

if(JSON.parse(localStorage.getItem("books")).length != 0) {
  books = [...books, ...JSON.parse(localStorage.getItem("books"))]
}

addBtn.addEventListener('click', () => {
  books.push({
    title: title.value,
    author: author.value
  });
  localStorage.setItem("books", JSON.stringify(books));
  title.value = '';
  author.value = '';
  setItems();
});

const removeBook = (key, index) => {
  var newBooks = books.filter(books => books.title != key);
  books = [...newBooks]
  booksContainer.removeChild(booksContainer.childNodes[index]);
  localStorage.setItem("books", JSON.stringify(books));
}

setItems = () => {
  for (let i = 0; i < booksContainer.children.length; i++) {
    booksContainer.removeChild(booksContainer.children[i])
  }
  books.forEach((book, index) => {
    let li = document.createElement('li');
    let h2 = document.createElement('h2');
    h2.textContent = book.title
    let h3 = document.createElement('h3');
    h3.textContent = book.author
    let button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', () => removeBook(book.title, index));
    li.appendChild(h2);
    li.appendChild(h3);
    li.appendChild(button);
    return booksContainer.appendChild(li)
  })
}
setItems();