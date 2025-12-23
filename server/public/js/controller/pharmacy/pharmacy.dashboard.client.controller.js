import Application from "../../model/application/Application.js";
import {  fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import html from "../../view/html.js";
import { openDrawer, openSidebar, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { renderMedicineStockSummery } from "../../view/pharmacy/renderMedicineCards.js";
import { swal } from "../../view/swal.js";
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


const templateSettings = html`
    <div class="pharmacy-profile-settings">
        <div class="profile-info">
            <img src="{profile}" class="pharmacy-user-profile" />
            <div>{role}</div>
        </div>
        
        <div class="signout-btn-container">
            <button class="signout" id="signout">signout</button>
        </div>
        
    </div>
`;


// setSidebarContent(
//     templateSettings
//         .replace("{role}" , Application.user.role || "standard")
//         .replace("{profile}" , Application.user.profile)

// );
// openSidebar();

setting_btn?.addEventListener("click" , ()=>{

    setSidebarContent(templateSettings
        .replace("{role}" , Application.user.role || "standard")
        .replace("{profile}" , Application.user.profile));
    openSidebar();

    document.querySelector('.signout#signout').addEventListener('click' , ()=>{
    window.cookieStore.getAll().then((cookies)=>{
        cookies.forEach(c=>window.cookieStore.delete(c.name));
    })


    swal({
        title: "do you want to signout ?",
        icon: 'question',
        showCancelButton: true,
        dangerMode :true,
        confirmButtonText : "signout"
    }).then((value)=>{
        if(value.isConfirmed){
            window.location.href = "/login";

        }
    })
})

})