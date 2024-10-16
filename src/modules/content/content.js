import "./content.css";
import { getData } from "../../services/requests";
import { paginate, numberPaginatePages, dataFooter, updateDataPag } from "../../services/pagination";
import { dataStatistic, dataActives } from "../../services/statistic";
import { sortData, searchData } from "../../services/sort";

const initContent = () => {
    let currentPage = 0;
    let totalPages = 0;
    let allData;
    let searchedData;

    const next = document.querySelector(".pagination__next");
    const last = document.querySelector(".pagination__prev");
    const filterSelect = document.querySelector(".content__filter-select");
    const filterSrarch = document.querySelector(".content__search-input");

    filterSrarch.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();
        searchData(value, allData, searchedData, currentPage, totalPages);
    });

    filterSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        sortData(value, totalPages, currentPage, allData);
    });

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
            console.log(res);
            totalPages = paginate(res, 8)[1];
            updateDataPag(totalPages, currentPage, res);
            numberPaginatePages(totalPages, currentPage, res);
            dataFooter(currentPage, res);
            dataStatistic(res, ".total-all", ".percent-all", "lastLogin");
            dataStatistic(res, ".total-month", ".percent-month", "registrationDate");
            dataActives(res);
        })
        .catch(err => console.error("Error:", err));
}

export default initContent;