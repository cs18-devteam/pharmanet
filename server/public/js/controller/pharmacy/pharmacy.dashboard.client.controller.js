import Application from "../../model/application/Application.js";
import html from "../../view/html.js";
import { openDrawer, openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";

import { swal } from "../../view/swal.js";
import orders__searchAndRenderMedicineCard from "./orders__searchAndRenderMedicineCards.js";
import settings_init from "./pharamcy.dashboard.settings.controller.js";
import chats_init from "./pharmacy.dashboard.chats.controller.js";
import transactions_init from "./pharmacy.dashboard.medicines.controller.js";
import medicines_init from "./pharmacy.dashboard.medicines.controller.js";
import { createTransactionsRow } from "/js/controller/pharmacy/transactions__searchAndRender.js";
const ordersSearchBar = document.querySelector(".orders .search-bar > input");
const setting_btn = document.getElementById("settings");
const navLink = document.querySelector(".nav_links");



ordersSearchBar?.addEventListener('input' , e=>{
    const input_search = e.target;
    const value = input_search.value;
    orders__searchAndRenderMedicineCard(value , 6);

    
    
})

createTransactionsRow();


//initiator of dashboard
navLink.addEventListener("click" , e=>{
    const target = e.target;
    const btn = target.closest("label");

    switch(btn?.getAttribute('for')){
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
            
    }






})