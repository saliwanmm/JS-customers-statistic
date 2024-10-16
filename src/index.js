import "./style.css";

import initHeader from "./modules/header/header";
import initDashboard from "./modules/dashboard/dashboard";
import initContent from "./modules/content/content";

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initContent();
    initDashboard();
});
