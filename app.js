const tableEl = document.querySelector("table");
const submitBtn = document.querySelector("button");
const tableBodyEl = document.querySelector("tbody");
const counterEl = document.querySelector(".counter");
const priorityEl = document.querySelector(".priority");

const savedBooks = [];

//Event Listeners
submitBtn.addEventListener("click", addBook);
document.addEventListener("DOMContentLoaded", getLocal);
priorityEl.addEventListener("input", updatePriorityLvl);

function updatePriorityLvl() {
  const priorityLvl = document.querySelector(".priority-level");
  priorityLvl.innerText = priorityEl.value;
}

function addBook(e) {
  e.preventDefault();
  const tbodyEl = tableEl.children[1];
  //Create Table Elements
  const row = document.createElement("tr");
  const titleCol = document.createElement("td");
  const authorCol = document.createElement("td");
  const categoryCol = document.createElement("td");
  const priorityCol = document.createElement("td");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  //Load values from inputs into new row
  const inputTitle = document.querySelector(".title");
  const inputAuthor = document.querySelector(".author");
  const inputCategory = document.querySelector(".category");
  const inputPriority = document.querySelector(".priority");

  titleCol.innerText = inputTitle.value;
  authorCol.innerText = inputAuthor.value;
  categoryCol.innerText = inputCategory.value;
  priorityCol.innerText = inputPriority.value;

  //Generate Object
  let bookNr = savedBooks.length;
  const bookObj = {
    title: titleCol.innerText,
    author: authorCol.innerText,
    category: categoryCol.innerText,
    priority: priorityCol.innerText,
    nr: bookNr,
  };
  savedBooks.push(bookObj);
  console.log(`Saved Books: ${JSON.stringify(savedBooks)}`);
  row.appendChild(titleCol);
  row.appendChild(authorCol);
  row.appendChild(categoryCol);
  row.appendChild(priorityCol);
  priorityCol.appendChild(deleteBtn);
  tbodyEl.appendChild(row);

  //Clear forms
  inputTitle.value = "";
  inputAuthor.value = "";
  inputCategory.value = "Criminal";
  inputPriority.value = "";

  //Add Event Listeners
  deleteBtn.addEventListener("click", (e) => {
    deleteRow(e);
  });
  row.addEventListener("click", (e) => {
    activateRow(e);
  });

  //Update Counter
  counterEl.innerText = countRows();

  //Save to LocalStorage
  saveToLocal(bookObj);
}

function activateRow(e) {
  const row = e.target.parentElement;
  const deleteBtn = row.querySelector(".delete-btn");
  row.classList.toggle("active");
  deleteBtn.classList.toggle("active");
}

function deleteRow(e) {
  const priorityCol = e.target.parentElement;
  const row = priorityCol.parentElement;
  row.classList.remove("active");
  priorityCol.classList.remove("active");
  row.remove();
  counterEl.innerText = countRows();
  deleteObject(row);
}

function countRows() {
  const rows = tableBodyEl.querySelectorAll("tr");
  return rows.length;
}

function saveToLocal(bookObj) {
  let localBooks;
  if (localStorage.getItem("books") === null) {
    localBooks = [];
  } else {
    localBooks = JSON.parse(localStorage.getItem("books"));
  }
  localBooks.push(bookObj);
  localStorage.setItem("books", JSON.stringify(localBooks));
}

function getLocal() {
  let localBooks;
  if (localStorage.getItem("books") === null) {
    localBooks = [];
  } else {
    localBooks = JSON.parse(localStorage.getItem("books"));
    localBooks.forEach((book) => {
      const tbodyEl = tableEl.children[1];
      //Create Table Elements
      const row = document.createElement("tr");
      const titleCol = document.createElement("td");
      const authorCol = document.createElement("td");
      const categoryCol = document.createElement("td");
      const priorityCol = document.createElement("td");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

      titleCol.innerText = book.title;
      authorCol.innerText = book.author;
      categoryCol.innerText = book.category;
      priorityCol.innerText = book.priority;

      //Generate Object
      let bookNr = savedBooks.length;
      const bookObj = {
        title: titleCol.innerText,
        author: authorCol.innerText,
        category: categoryCol.innerText,
        priority: priorityCol.innerText,
        nr: bookNr,
      };
      savedBooks.push(bookObj);

      row.appendChild(titleCol);
      row.appendChild(authorCol);
      row.appendChild(categoryCol);
      row.appendChild(priorityCol);
      priorityCol.appendChild(deleteBtn);
      tbodyEl.appendChild(row);

      //Add Event Listeners
      deleteBtn.addEventListener("click", (e) => {
        deleteRow(e);
      });
      row.addEventListener("click", (e) => {
        activateRow(e);
      });

      //Update Counter
      counterEl.innerText = countRows();
    });
  }
  console.log(`Saved Books: ${JSON.stringify(savedBooks)}`);
}

function deleteObject(row) {
  const title = row.children[0].innerText;
  const author = row.children[1].innerText;
  const category = row.children[2].innerText;
  const priority = row.children[3].innerText;

  const newSavedBooks = savedBooks.filter((book, index) => {
    return !(
      book.title === title &&
      book.author === author &&
      book.category === category &&
      book.priority === priority
    );
  });

  savedBooks.length = 0;
  newSavedBooks.forEach((book) => {
    savedBooks.push(book);
  });
  newSavedBooks.length = 0;

  localStorage.setItem("books", JSON.stringify(savedBooks));
}

// getLocal();
