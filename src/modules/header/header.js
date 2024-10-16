import "./header.css"

function initHeader() {

    const menuToggle = document.querySelector(".menu-toggle");
    const dashboard = document.querySelector(".dashboard");

    menuToggle.addEventListener("click", () => {
        dashboard.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

}

export default initHeader;