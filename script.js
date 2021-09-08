let myLibrary = [];
const $title = document.getElementById("title");
const $author = document.getElementById("author");
const $pages = document.getElementById("pages");
const $status = document.getElementById("status");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

Book.prototype.toggleRead = function(){
    index = (this.parentElement.getAttribute("data-book-index")) 
    readVal = (myLibrary[index].read) ? false : true;
    myLibrary[index].read = readVal;
    this.textContent = readVal ? "Read" : "Not Read";
}

Book.prototype.toggleR = function(){
    this.read = this.read ? false : true ;
    display();
}

const container = document.getElementById("container");

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("Got", "mota", "1234", false);
addBookToLibrary("Hobbit", "jr tolkein", "420", true);
addBookToLibrary("Hobbit", "jr tolkein", "420", true);


function display() {
    document.querySelector("#container").innerHTML = "";
    for (let i in myLibrary) {
        createCard(i);
    };
}


function deleteCard(e) {
    index = e.target.parentElement.getAttribute("data-book-index");
    // e.target.parentElement.remove();
    myLibrary.splice(index,1);
    display();
}

function createCard(i) {
    book = myLibrary[i];
    let card = document.createElement("div");
    container.appendChild(card);
    card.setAttribute("data-book-index", i);

    createCardElement("h3", book.title, card);
    createCardElement("p", book.author, card);
    createCardElement("p", book.pages, card);
    let newElement = document.createElement("button");
    newElement.textContent = book.read ? "Read" : "Not Read";
    newElement.classList.add("button")
    newElement.onclick = ()=> { myLibrary[i].toggleR() } ;
    card.appendChild(newElement);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    card.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) => deleteCard(e))
}

function createCardElement(element, content, card) {
    let newElement = document.createElement(element);
    newElement.textContent = content;
    card.appendChild(newElement);
    
}

let coll = document.getElementsByClassName("collapsible");
let i;
console.log(coll.length)


coll[0].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
});

function getBook(){
    coll[0].classList.toggle("active");
    coll[0].nextElementSibling.style.display = "none";
    addBookToLibrary($title.value, $author.value, $pages.value, $status.checked);
    display();
    console.log(myLibrary);
}
 
display();