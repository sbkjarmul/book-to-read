import "../styles/style.css";

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
} from "./variables";

import {
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