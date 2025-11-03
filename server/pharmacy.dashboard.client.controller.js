import { fetchMedicineData, fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import { closeDrawer } from "../../view/pharmacy/drawerView.js";
import { createMedicineCards, renderMedicineCards, renderMedicineStockSummery } from "../../view/pharmacy/renderMedicineCards.js";
const medicineCardContainer = document.querySelector('.medicine_cards_container');
const searchBar = document.getElementById("search-bar");
const drawerCloseBtn= document.querySelector('.drawer .close');


function searchAndRenderMedicineCard(value , limit){
    fetchMedicineData(value , limit).then(data=>{
        const medicineCards =  createMedicineCards(data.results);
        renderMedicineCards(medicineCardContainer , medicineCards.slice(0 , 6));
    });
    
    
}

searchAndRenderMedicineCard();


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


searchBar.addEventListener('input' , e=>{
    console.log(e);
    const input_search = e.target;
    const value = input_search.value;
    searchAndRenderMedicineCard(value , 6);
})

drawerCloseBtn?.addEventListener('click' , ()=>{
    closeDrawer();
});

