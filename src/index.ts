let num: number = 25;

// select html element
const pageTitle = document.querySelector(".section-title h1");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".btn-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
// const btnContainer = document.querySelector(".btn-container");

// fetch data
let fetchedData: any[] = [];

const fetchData = () => {
  fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
    .then((res) => res.json())
    .then((data) => startPagination(data));
  // .then(() => console.log(fetchedData.slice(0, 10)));
};
fetchData();

let currentPage: number = 1;
let pageSize: number = 10;
const startPagination = (data: any[]) => {
  let startNumber: number = (currentPage - 1) * pageSize;
  let endNumber: number = startNumber + pageSize;

  const newData = data.slice(startNumber, endNumber);

  // console.log(newData);

  let displayData: string = "";
  newData.forEach((nd) => {
    displayData += `<article class="card">
         <img src="${nd.avatar_url}" alt="person">
           <h4>${nd.login}</h4>
         <a href="" class="btn">view profile</a>
       </article>`;
  });

  container ? (container.innerHTML = displayData) : null;

  const allPage = data.length / pageSize;
  let buttons: string = "";
  for (let i = 1; i <= 10; i++) {
    buttons += `<button class="page-btn">${i}</button>`;
  }

  btnContainer
    ? (btnContainer.innerHTML =
        '<button class="prev-btn">prev</button>' +
        buttons +
        '<button class="next-btn">next</button>')
    : null;

  // prevButton?.addEventListener("click", () => {
  //   if (currentPage > 1) {
  //     currentPage--;
  //     startPagination(data);
  //   }
  // });

  // nextButton?.addEventListener("click", () => {
  //   if (currentPage < allPage) {
  //     currentPage++;
  //     startPagination(data);
  //   }
  // });
};

const addPage = () => {
  currentPage = currentPage + 1;
  fetchData();
};

const minusPage = () => {
  currentPage = currentPage - 1;
  fetchData();
};

// console.log(prevButton);

nextButton?.addEventListener("click", () => {
  addPage();
});

// filter data
const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(arrayTest.slice(0, 5));

// apply pagination
