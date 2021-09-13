let books = [];


const addBook = (title,author) =>{
    books.push({"title": title,"author":author});
    localStorage.setItem("books",books);
}


addBook("Nolan","Chris");
addBook("Omar","Chris");
console.log( "title" in books[1]);
