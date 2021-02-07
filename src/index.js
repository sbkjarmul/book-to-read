import "../styles/style.css";

import {
  submitBtn,
  priorityEl,
  advancedBtn,
  filterSearch,
  filterOption,
  columnHeads,
  addCategoryBtn,
  newCategory,
  newCategoryBtn,
  closeCategoryBtn,
  changeBookBtn,
} from "./variables";

import {
  updatePriorityLvl,
  addBook,
  getLocal,
  toggleAdvanced,
  searchTable,
  sortTable,
  makeCategories,
  addNewCategory,
  editBook,
} from "./functions";

submitBtn.addEventListener("click", addBook);
document.addEventListener("DOMContentLoaded", getLocal);
document.addEventListener("DOMContentLoaded", makeCategories);
priorityEl.addEventListener("input", updatePriorityLvl);
advancedBtn.addEventListener("click", (e) => {
  toggleAdvanced(e);
});

filterOption.addEventListener("change", () => {
  filterSearch.value = "";
  searchTable("");
});

filterSearch.addEventListener("keyup", function () {
  const value = this.value;
  searchTable(value);
});

columnHeads.forEach((head) => {
  head.addEventListener("click", (e) => {
    const isAscending = head.classList.contains("sort-asc");
    sortTable(e, !isAscending);
  });
});

addCategoryBtn.addEventListener("click", () => {
  addNewCategory();
  newCategory.classList.remove("active");
});

closeCategoryBtn.addEventListener("click", () => {
  newCategory.classList.remove("active");
});

newCategoryBtn.addEventListener("click", () => {
  newCategory.classList.add("active");
});

changeBookBtn.addEventListener("click", (e) => {
  editBook(e);
  changeBookBtn.classList.remove("active");
});
