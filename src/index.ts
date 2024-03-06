let num: number = 25;

// select html element
const pageTitle = document.querySelector(".section-title h1");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".page-btn-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

// fetch data
let fetchedData: any[] = [];

const fetchData = () => {
  fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
    .then((res) => res.json())
    .then((data) => startPagination(data));
};
fetchData();

let currentPage: number = 1;
let pageSize: number = 10;
const startPagination = (data: any[]) => {
  let startNumber: number = (currentPage - 1) * pageSize;
  let endNumber: number = startNumber + pageSize;

  const newData = data.slice(startNumber, endNumber);

  let displayData: string = "";
  newData.forEach((nd) => {
    displayData += `<article class="card">
         <img src="${nd.avatar_url}" alt="person">
           <h4>${nd.login}</h4>
         <a href="" class="btn">view profile</a>
       </article>`;
  });

  container ? (container.innerHTML = displayData) : null;

  let buttons: string = "";
  for (let i = 1; i <= 10; i++) {
    buttons += `<button class="page-btn">${i}</button>`;
  }

  btnContainer ? (btnContainer.innerHTML = buttons) : null;

  const pageButton = document.querySelectorAll(".page-btn");
  pageButton.forEach((buttons: any) => {
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

nextButton?.addEventListener("click", () => {
  addPage();
});

prevButton?.addEventListener("click", () => {
  minusPage();
});

const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
