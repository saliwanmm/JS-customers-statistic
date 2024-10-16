import { updateDataPag, dataFooter } from "./pagination";
import { paginate } from "./pagination";

function sortData(sortBy, totalPages, currentPage, allData) {
    let sortedData;

    if (sortBy === "name-asc") {
        sortedData = [...allData].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
        sortedData = [...allData].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "newest") {
        sortedData = [...allData].sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
    } else if (sortBy === "oldest") {
        sortedData = [...allData].sort((a, b) => new Date(a.lastLogin) - new Date(b.lastLogin));
    }

    updateDataPag(totalPages, currentPage, sortedData);
    dataFooter(currentPage, sortedData);
}

function searchData(value, allData, searchedData, currentPage, totalPages) {
    searchedData = allData.filter(item => {
        return (
            item.name.toLowerCase().includes(value) || item.email.toLowerCase().includes(value) || item.country.toLowerCase().includes(value)
        );
    });

    currentPage = 0;
    totalPages = paginate(searchedData, 8)[1];

    if (searchedData.length === 0) {
        updateDataPag(totalPages, currentPage, []);
        return;
    } else {
        updateDataPag(totalPages, currentPage, searchedData);
    }

    dataFooter(currentPage, searchedData);
}

export { sortData, searchData };