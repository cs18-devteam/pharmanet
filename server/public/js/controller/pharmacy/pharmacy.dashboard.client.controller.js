import {  fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import html from "../../view/html.js";
import { openDrawer, openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { renderMedicineStockSummery } from "../../view/pharmacy/renderMedicineCards.js";
import medicines__searchAndRenderMedicineCard from "./medicines__searchAndRenderMedicines.js";
import orders__searchAndRenderMedicineCard from "./orders__searchAndRenderMedicineCards.js";
import { createTransactionsRow } from "/js/controller/pharmacy/transactions__searchAndRender.js";
const medicinesSearchBar = document.querySelector(".medicines .search-bar");
const ordersSearchBar = document.querySelector(".orders .search-bar > input");
const setting_btn = document.getElementById("settings");






medicines__searchAndRenderMedicineCard();


fetchMedicineStockSummery(1).then(data=>{
    try{
        renderMedicineStockSummery({
            count: data.results.count ,
            sufficient : data.results.sufficient,
            low: data.results.low,
            out : data.results.out,
        })
    }catch(e){
        console.log(e);
    }
})


medicinesSearchBar?.addEventListener('input' , e=>{
    try{


        const input_search = e.target;
        const value = input_search.value;
        medicines__searchAndRenderMedicineCard(value , 6);
    }catch(e){
        console.log(e);
    }
})




ordersSearchBar?.addEventListener('input' , e=>{
    const input_search = e.target;
    const value = input_search.value;
    orders__searchAndRenderMedicineCard(value , 6);

    
    
})

createTransactionsRow();


const signoutBtn = html`<button class="signout" id="signout">signout</button>`;


setting_btn?.addEventListener("click" , ()=>{
    setSidebarContent(signoutBtn);
    openSidebar();

    document.querySelector('.signout#signout').addEventListener('click' , ()=>{
    window.cookieStore.getAll().then((cookies)=>{
        cookies.forEach(c=>window.cookieStore.delete(c.name));
    })
    window.location.href = "http://localhost:3000";
})

})