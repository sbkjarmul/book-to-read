import {
  tableEl,
  submitBtn,
  tableBodyEl,
  counterEl,
  priorityEl,
  savedBooks,
  advancedBtn,
  advancedEl,
  containerEl,
  priorityLvl,
  filterSearch,
  filterOption,
  columnHeads,
  changeBookBtn,
} from "./variables";

export {
  updatePriorityLvl,
  addBook,
  activateRow,
  deleteRow,
  countRows,
  saveToLocal,
  getLocal,
  deleteObject,
  toggleAdvanced,
  searchTable,
  sortTable,
  countCategory,
  makeCategories,
  addNewCategory,
  saveCategory,
  editBook,
};

function updatePriorityLvl() {
  const priorityLvl = document.querySelector(".priority-level");
  priorityLvl.innerText = priorityEl.value;
}

function addBook(e) {
  e.preventDefault();
  const tbodyEl = tableEl.children[1];

  const row = document.createElement("tr");
  const titleCol = document.createElement("td");
  const authorCol = document.createElement("td");
  const categoryCol = document.createElement("td");
  const priorityCol = document.createElement("td");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  const inputTitle = document.querySelector(".title");
  const inputAuthor = document.querySelector(".author");
  const inputCategory = document.querySelector(".category");
  const inputPriority = document.querySelector(".priority");

  titleCol.innerText = inputTitle.value;
  authorCol.innerText = inputAuthor.value;
  categoryCol.innerText = inputCategory.value;
  priorityCol.innerText = inputPriority.value;

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

  inputTitle.value = "";
  inputAuthor.value = "";
  inputCategory.value = "Criminal";
  inputPriority.value = "";
  priorityLvl.innerText = "3";

  deleteBtn.addEventListener("click", (e) => {
    deleteRow(e);
  });
  row.addEventListener("click", (e) => {
    activateRow(e);
  });

  counterEl.innerText = countRows();

  saveToLocal(bookObj);
  makeCategories();
}

function activateRow(e) {
  if (e.target.parentElement.localName === "tr") {
    tableBodyEl.querySelectorAll("tr").forEach((row) => {
      if (row != e.target.parentElement) {
        row.classList.remove("active");
      }
    });

    tableBodyEl.querySelectorAll(".delete-btn").forEach((btn) => {
      if (btn.parentElement.parentElement != e.target.parentElement) {
        btn.classList.remove("active");
      }
    });

    const row = e.target.parentElement;
    const deleteBtn = row.querySelector(".delete-btn");
    row.classList.toggle("active");
    deleteBtn.classList.toggle("active");
    if (row.classList.contains("active")) {
      changeBookBtn.classList.add("active");
    } else {
      changeBookBtn.classList.remove("active");
    }

    const inputTitle = document.querySelector(".title");
    const inputAuthor = document.querySelector(".author");
    const inputCategory = document.querySelector(".category");
    const inputPriority = document.querySelector(".priority");

    if (row.classList.contains("active")) {
      inputTitle.value = row.children[0].innerText;
      inputAuthor.value = row.children[1].innerText;
      inputCategory.value = row.children[2].innerText;
      inputPriority.value = row.children[3].innerText;
      updatePriorityLvl();
    } else {
      inputTitle.value = "";
      inputAuthor.value = "";
      inputCategory.value = "";
      inputPriority.value = "3";
      updatePriorityLvl();
    }
  }
}

function deleteRow(e) {
  const priorityCol = e.target.parentElement;
  const row = priorityCol.parentElement;
  row.classList.remove("active");
  priorityCol.classList.remove("active");
  row.remove();
  counterEl.innerText = countRows();
  deleteObject(row);
  makeCategories();
  if (row.classList.contains("active")) {
    changeBookBtn.classList.add("active");
  } else {
    changeBookBtn.classList.remove("active");
  }
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
  let localCategories;

  if (localStorage.getItem("books") === null) {
    localBooks = [];
  } else {
    localBooks = JSON.parse(localStorage.getItem("books"));
    localBooks.forEach((book) => {
      const tbodyEl = tableEl.children[1];
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

      deleteBtn.addEventListener("click", (e) => {
        deleteRow(e);
      });
      row.addEventListener("click", (e) => {
        activateRow(e);
      });

      counterEl.innerText = countRows();
    });
  }
  if (localStorage.getItem("categories") === null) {
    localCategories = [];
  } else {
    localCategories = JSON.parse(localStorage.getItem("categories"));
    localCategories.forEach((cat) => {
      const category = document.querySelector("#category");
      const option = document.createElement("option");

      option.value = cat;
      option.innerText = cat;
      category.appendChild(option);
    });
  }
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

function toggleAdvanced(e) {
  advancedEl.classList.toggle("active");
  containerEl.classList.toggle("advance");
  if (advancedEl.classList.contains("active")) {
    advancedBtn.innerHTML = `<i class="fas fa-chevron-up"></i>`;
  } else {
    advancedBtn.innerHTML = `<i class="fas fa-chevron-down"></i>`;
  }
}

function searchTable(value) {
  const rows = tableBodyEl.querySelectorAll("tr");
  const filterOption = document.querySelector(".filter-option").value;
  rows.forEach((row) => {
    if (filterOption === "title") {
      const col = row.children[0].innerText.toLowerCase();
      value = value.toLowerCase();
      if (!col.includes(value)) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    }
    if (filterOption === "author") {
      const col = row.children[1].innerText.toLowerCase();
      value = value.toLowerCase();
      if (!col.includes(value)) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    }
    if (filterOption === "category") {
      const col = row.children[2].innerText.toLowerCase();
      value = value.toLowerCase();
      if (!col.includes(value)) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    }
    if (filterOption === "priority") {
      const col = row.children[3].innerText.toLowerCase();
      value = value.toLowerCase();
      if (!col.includes(value)) {
        row.style.display = "none";
      } else {
        row.style.display = "table-row";
      }
    }
  });
}

function sortTable(e, asc = true) {
  const ascToNumber = asc ? 1 : -1;
  const column = e.target.textContent;
  let sortedTable = [];
  switch (column) {
    case "Title":
      sortedTable = savedBooks.sort((a, b) => {
        const colA = a.title.trim();
        const colB = b.title.trim();

        return colA > colB ? 1 * ascToNumber : -1 * ascToNumber;
      });
      break;
    case "Author":
      sortedTable = savedBooks.sort((a, b) => {
        const colA = a.author.trim();
        const colB = b.author.trim();

        return colA > colB ? 1 * ascToNumber : -1 * ascToNumber;
      });
      break;
    case "Category":
      sortedTable = savedBooks.sort((a, b) => {
        const colA = a.category.trim();
        const colB = b.category.trim();

        return colA > colB ? 1 * ascToNumber : -1 * ascToNumber;
      });
      break;
    case "Priority":
      sortedTable = savedBooks.sort((a, b) => {
        const colA = a.priority.trim();
        const colB = b.priority.trim();

        return colA > colB ? 1 * ascToNumber : -1 * ascToNumber;
      });
      break;
  }

  while (tableBodyEl.firstChild) {
    tableBodyEl.removeChild(tableBodyEl.firstChild);
  }

  sortedTable.forEach((book) => {
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

    row.appendChild(titleCol);
    row.appendChild(authorCol);
    row.appendChild(categoryCol);
    row.appendChild(priorityCol);
    priorityCol.appendChild(deleteBtn);
    tableBodyEl.appendChild(row);

    deleteBtn.addEventListener("click", (e) => {
      deleteRow(e);
    });
    row.addEventListener("click", (e) => {
      activateRow(e);
    });
  });

  const columnHead = e.target;
  columnHeads.forEach((head) => {
    head.classList.remove("sort-asc", "sort-desc");
  });
  e.target.classList.toggle("sort-asc", asc);
  e.target.classList.toggle("sort-desc", !asc);

  if (
    e.target.classList.contains("sort-asc") ||
    e.target.classList.contains("sort-desc")
  ) {
    changeBookBtn.classList.add("active");
  } else {
    changeBookBtn.classList.remove("active");
  }
}

function makeCategories() {
  const categories = document.querySelectorAll(".category option");
  const statistics = document.querySelector(".statistics");

  while (statistics.firstChild) {
    statistics.removeChild(statistics.firstChild);
  }

  categories.forEach((cat) => {
    const category = document.createElement("div");
    category.classList.add("stats");
    const name = document.createElement("span");
    const count = document.createElement("span");
    category.appendChild(name);
    category.appendChild(count);
    statistics.appendChild(category);
    name.innerText = cat.value;
    count.innerText = countCategory(name.innerText);
  });
}

function countCategory(name) {
  const rows = tableBodyEl.querySelectorAll("tr");
  let count = 0;
  rows.forEach((row) => {
    count = name === row.children[2].innerText ? count + 1 : count;
  });
  return count;
}

function addNewCategory() {
  const category = document.querySelector("#category");
  const option = document.createElement("option");
  const input = document.querySelector("#new-category");

  option.value = input.value;
  option.innerText = input.value;
  category.appendChild(option);

  saveCategory(input.value);
  input.value = "";
}

function saveCategory(category) {
  let localCategories;

  if (localStorage.getItem("categories") === null) {
    localCategories = [];
  } else {
    localCategories = JSON.parse(localStorage.getItem("categories"));
  }

  localCategories.push(category);
  localStorage.setItem("categories", JSON.stringify(localCategories));
}

function editBook(e) {
  e.preventDefault();

  const inputTitle = document.querySelector(".title");
  const inputAuthor = document.querySelector(".author");
  const inputCategory = document.querySelector(".category");
  const inputPriority = document.querySelector(".priority");
  const row = document.querySelector("tr.active");

  if (row) {
    const bookIndex = savedBooks.findIndex((book, index) => {
      return (
        book.title === row.children[0].innerText &&
        book.author === row.children[1].innerText &&
        book.category === row.children[2].innerText &&
        book.priority === row.children[3].innerText
      );
    });

    savedBooks[bookIndex].title = inputTitle.value;
    savedBooks[bookIndex].author = inputAuthor.value;
    savedBooks[bookIndex].category = inputCategory.value;
    savedBooks[bookIndex].priority = inputPriority.value;

    row.children[0].innerText = inputTitle.value;
    row.children[1].innerText = inputAuthor.value;
    row.children[2].innerText = inputCategory.value;
    row.children[3].innerHTML = `${inputPriority.value}
    <button class="delete-btn active">
      <i class="fas fa-times"></i>
    </button>
    `;
    const deleteBtn = document.querySelector(".delete-btn.active");
    deleteBtn.classList.remove("active");
    row.classList.remove("active");
  }

  localStorage.setItem("books", JSON.stringify(savedBooks));

  console.log(JSON.stringify(savedBooks));
}
