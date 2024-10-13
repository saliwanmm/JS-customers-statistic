import { createCustomers } from "./customers";

const paginate = (items, countItemsOnPage) => {
    const totalPages = Math.ceil(items.length / countItemsOnPage);
    const paginatedItems = [];

    for (let i = 0; i < totalPages; i++) {
        const first = i * countItemsOnPage;
        const last = first + countItemsOnPage;

        paginatedItems.push(items.slice(first, last))
    }

    return [paginatedItems, totalPages];
}

function numberPaginatePages(number, current, allData) {
    const list = document.querySelector(".pagination__list");
    list.innerHTML = "";

    function addRow(pageNumber) {
        let row = document.createElement("li");
        row.textContent = pageNumber;
        row.classList.add("pagination__item");

        if (pageNumber - 1 === current) {
            row.classList.add("active");
        }

        list.appendChild(row);
    }

    if (number <= 5) {
        for (let i = 1; i <= number; i++) {
            addRow(i);
        }
    } else {
        addRow(1);

        // Якщо поточна сторінка більше 3, додаємо "..."
        if (current > 3) {
            let dots = document.createElement("li");
            dots.textContent = "...";
            dots.classList.add("pagination__dots");
            list.appendChild(dots);
        }

        // Додаємо сторінки навколо поточної (наприклад, 2 сторінки ліворуч і праворуч)
        let start = Math.max(2, current - 1);
        let end = Math.min(number - 1, current + 2);

        for (let i = start; i <= end; i++) {
            addRow(i);
        }

        // Якщо поточна сторінка менше number - 2, додаємо "..."
        if (current < number - 2) {
            let dots = document.createElement("li");
            dots.textContent = "...";
            dots.classList.add("pagination__dots");
            list.appendChild(dots);
        }

        addRow(number);
    }

    const pages = document.querySelectorAll(".pagination__item");
    pages.forEach(page => {
        page.addEventListener("click", () => {
            current = parseInt(page.textContent, 10) - 1;
            updateDataPag(number, current, allData)
            dataFooter(current, allData);
        });
    });
}

function updateDataPag(num, curPage, data) {
    const paginated = paginate(data, 8);
    createCustomers(paginated[0], curPage);
    numberPaginatePages(num, curPage, data);
}

function dataFooter(curPage, all) {
    const footerData = document.querySelector(".content__footer");
    const from = curPage * 8 + 1;
    const to = from + all.slice(curPage * 8, (curPage + 1) * 8).length - 1;
    footerData.textContent = `Showing data ${from} to ${to} of ${all.length} entries`;
}

export { paginate, numberPaginatePages, updateDataPag, dataFooter };