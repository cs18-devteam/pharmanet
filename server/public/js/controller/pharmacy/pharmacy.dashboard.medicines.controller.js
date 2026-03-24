import medicines__searchAndRenderMedicineCard from "./medicines__searchAndRenderMedicines.js";
import { renderMedicineStockSummery } from "../../view/pharmacy/renderMedicineCards.js";
import {  fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import Application from "../../model/application/Application.js";
const medicinesSearchBar = document.querySelector(".medicines .search-bar");



export default function init(){

    medicines__searchAndRenderMedicineCard();
    
    
    fetchMedicineStockSummery(Application.pharmacyId).then(data=>{
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
    
}