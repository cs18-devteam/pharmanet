import Application from "../../model/application/Application.js";
import html from "../../view/html.js";
import { openDrawer, openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";


import { swal } from "../../view/swal.js";
import orders__searchAndRenderMedicineCard from "./orders/orders__searchAndRenderMedicineCards.js";
import settings_init from "./pharamcy.dashboard.settings.controller.js";
import chats_init from "./pharmacy.dashboard.chats.controller.js";
import medicines_init from "./pharmacy.dashboard.medicines.controller.js";
import orders_init from "./pharmacy.dashboard.orders.controller.js";
import products_init from "./pharmacy.dashboard.products.controller.js";
import staff_init from "./pharmacy.dashboard.staff.controller.js";
import transactions_init from "./pharmacy.dashboard.transactions.controller.js";
// import { createTransactionsRow } from "/js/controller/pharmacy/transactions__searchAndRender.js";
const ordersSearchBar = document.querySelector(".orders .search-bar > input");
const setting_btn = document.getElementById("settings");
const navLink = document.querySelector(".nav_links");



ordersSearchBar?.addEventListener('input' , e=>{
    const input_search = e.target;
    const value = input_search.value;
    orders__searchAndRenderMedicineCard(value , 6);

    
    
})

// createTransactionsRow();



export function initialize(view){
     switch(view){
        case "chats":
            chats_init();
            break;
        case "medicines":
            medicines_init();
            break;
        case "transactions":
            transactions_init();
            break;
        case "settings":
            settings_init();
            break;
        case "products":
            products_init();
            break;
        case "orders":
            orders_init();
            break;
        case "staff":
            staff_init();
            break;
    }
}



//initiator of dashboard
navLink.addEventListener("click" , e=>{
    const target = e.target;
    const btn = target.closest("label");
    initialize(btn?.getAttribute('for'))
})


const navInputControlElements = document.querySelectorAll("body > input[type=radio][name=navigation]")
navInputControlElements.forEach(element=>{
    if(element.checked){
        const view = element.getAttribute('id');
        initialize(view);
    }
})

