function createCustomers(data, page) {
    const table = document.querySelector(".content__table tbody");
    table.innerHTML = "";

    data[page].forEach(item => {

        let row = document.createElement("tr");
        row.classList.add("content__table-row");

        let nameCustomer = document.createElement("td");
        nameCustomer.classList.add("content__customer-name");
        nameCustomer.textContent = item.name;

        let companyCustomer = document.createElement("td");
        companyCustomer.classList.add("content__company");
        companyCustomer.textContent = item.company;


        let phoneCustomer = document.createElement("td");
        phoneCustomer.classList.add("content__phone");
        phoneCustomer.textContent = item.phone;

        let emailCustomer = document.createElement("td");
        emailCustomer.classList.add("content__email");
        emailCustomer.textContent = item.email;

        let countryCustomer = document.createElement("td");
        countryCustomer.classList.add("content__country");
        countryCustomer.textContent = item.country;

        let statusCustomer = document.createElement("td");
        statusCustomer.classList.add("content__status");
        statusCustomer.textContent = item.status;

        if (item.status === "Active") {
            statusCustomer.classList.add("content__status--active");
        } else {
            statusCustomer.classList.add("content__status--inactive");
        }

        row.appendChild(nameCustomer);
        row.appendChild(companyCustomer);
        row.appendChild(phoneCustomer);
        row.appendChild(emailCustomer);
        row.appendChild(countryCustomer);
        row.appendChild(statusCustomer);

        table.appendChild(row);
    })
}

export { createCustomers };