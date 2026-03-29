import Application from "../../model/application/Application.js";
import renderDocsList from "./docs/renderDocsList.helper.js";
import reports from "./docs/reports.js";


export default async function init() {
    const reportContainer = document.querySelector(".reports_container");
    renderDocsList(reportContainer ,  reports);  
}
