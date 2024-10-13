import "./content.css";
import { getData } from "../../services/requests";
import { paginate, numberPaginatePages, dataFooter, updateDataPag } from "../../services/pagination";
// import { createCustomers } from "../../services/customers";
import { dataStatistic } from "../../services/statistic";

const initContent = () => {
    let currentPage = 0;
    let totalPages = 0;
    let allData;

    const next = document.querySelector(".pagination__next");
    const last = document.querySelector(".pagination__prev");

    // const filterSelect = document.querySelector('.content__filter-select');

    // filterSelect.addEventListener('change', (event) => {
    // const selectedValue = event.target.value;
    // // Реалізуйте сортування на основі selectedValue
    // // Наприклад, сортування за датою або алфавітом
    // });

    next.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage += 1;
            updateDataPag(totalPages, currentPage, allData)
            dataFooter(currentPage, allData);
        }
    })

    last.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage -= 1;
            updateDataPag(totalPages, currentPage, allData);
            dataFooter(currentPage, allData);
        }
    })

    getData("http://localhost:3000/customers")
        .then(res => {
            allData = res;
            totalPages = paginate(res, 8)[1];
            updateDataPag(totalPages, currentPage, res);
            numberPaginatePages(totalPages, currentPage, allData);
            dataFooter(currentPage, allData);
            dataStatistic(allData, ".total-all", ".percent-all", "lastLogin");
            dataStatistic(allData, ".total-month", ".percent-month", "registrationDate");
            dataActives();
        })
        .catch(err => console.error("Error:", err));

    // function dataFooter(curPage, all) {
    //     const footerData = document.querySelector(".content__footer");
    //     const from = curPage * 8 + 1;
    //     const to = from + all.slice(curPage * 8, (curPage + 1) * 8).length - 1;
    //     footerData.textContent = `Showing data ${from} to ${to} of ${allData.length} entries`;
    // }

    function dataActives() {
        const totalActive = document.querySelector(".total-active");
        totalActive.textContent = allData.filter(item => item.status === "Active").length;
    }

    // function updateDataPag(num, curPage, data) {
    //     const paginated = paginate(data, 8);
    //     createCustomers(paginated[0], curPage);
    //     numberPaginatePages(num, curPage);
    // }

    // const numberPaginatePages = (number, current) => {
    //     const list = document.querySelector(".pagination__list");
    //     list.innerHTML = "";

    //     function addRow(pageNumber) {
    //         let row = document.createElement("li");
    //         row.textContent = pageNumber;
    //         row.classList.add("pagination__item");

    //         if (pageNumber - 1 === current) {
    //             row.classList.add("active");
    //         }

    //         list.appendChild(row);
    //     }

    //     if (number <= 5) {
    //         for (let i = 1; i <= number; i++) {
    //             addRow(i);
    //         }
    //     } else {
    //         addRow(1);

    //         // Якщо поточна сторінка більше 3, додаємо "..."
    //         if (current > 3) {
    //             let dots = document.createElement("li");
    //             dots.textContent = "...";
    //             dots.classList.add("pagination__dots");
    //             list.appendChild(dots);
    //         }

    //         // Додаємо сторінки навколо поточної (наприклад, 2 сторінки ліворуч і праворуч)
    //         let start = Math.max(2, current - 1);
    //         let end = Math.min(number - 1, current + 2);

    //         for (let i = start; i <= end; i++) {
    //             addRow(i);
    //         }

    //         // Якщо поточна сторінка менше number - 2, додаємо "..."
    //         if (current < number - 2) {
    //             let dots = document.createElement("li");
    //             dots.textContent = "...";
    //             dots.classList.add("pagination__dots");
    //             list.appendChild(dots);
    //         }

    //         addRow(number);
    //     }

    //     const pages = document.querySelectorAll(".pagination__item");
    //     pages.forEach(page => {
    //         page.addEventListener("click", () => {
    //             currentPage = parseInt(page.textContent, 10) - 1;
    //             updateDataPag(totalPages, currentPage, allData)
    //             dataFooter(currentPage, allData);
    //         });
    //     });
    // }
}

export default initContent;