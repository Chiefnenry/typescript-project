"use strict";
let num = 25;
const pageTitle = document.querySelector(".section-title h1");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".page-btn-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
let fetchedData = [];
const fetchData = () => {
    fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
        .then((res) => res.json())
        .then((data) => startPagination(data));
};
fetchData();
let currentPage = 1;
let pageSize = 10;
const startPagination = (data) => {
    let startNumber = (currentPage - 1) * pageSize;
    let endNumber = startNumber + pageSize;
    const newData = data.slice(startNumber, endNumber);
    let displayData = "";
    newData.forEach((nd) => {
        displayData += `<article class="card">
         <img src="${nd.avatar_url}" alt="person">
           <h4>${nd.login}</h4>
         <a href="" class="btn">view profile</a>
       </article>`;
    });
    container ? (container.innerHTML = displayData) : null;
    let buttons = "";
    for (let i = 1; i <= 10; i++) {
        buttons += `<button class="page-btn">${i}</button>`;
    }
    btnContainer ? (btnContainer.innerHTML = buttons) : null;
    const pageButton = document.querySelectorAll(".page-btn");
    pageButton.forEach((buttons) => {
        if (Number(buttons.innerText) === currentPage) {
            buttons.classList.add(".active-btn");
        }
        buttons.addEventListener("click", () => {
            currentPage = Number(buttons.innerText);
            startPagination(data);
        });
    });
};
const addPage = () => {
    currentPage = currentPage + 1;
    fetchData();
};
const minusPage = () => {
    currentPage = currentPage - 1;
    fetchData();
};
nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener("click", () => {
    addPage();
});
prevButton === null || prevButton === void 0 ? void 0 : prevButton.addEventListener("click", () => {
    minusPage();
});
const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
