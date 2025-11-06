import { fetchMedicineData, fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import { attachDrawer, closeDrawer, openDrawer, openSidebar, setDrawerContent } from "../../view/pharmacy/drawerView.js";
import { createMedicineViewerContent } from "../../view/pharmacy/medicineViewer.js";
import { createMedicineCards, renderMedicineCards, renderMedicineStockSummery } from "../../view/pharmacy/renderMedicineCards.js";
const medicineCardContainer = document.querySelector('.medicine_cards_container');
const searchBar = document.getElementById("search-bar");




function searchAndRenderMedicineCard(value , limit){
    fetchMedicineData(value , limit).then(data=>{
        const medicines = data.results;
        const medicineCards =  createMedicineCards(medicines);
        renderMedicineCards(medicineCardContainer , medicineCards.slice(0 , 6));
        Array.from(medicineCardContainer.children).forEach(el=>el.addEventListener('click' , ()=>{
            const medicineId = el.dataset.id;
            if(!medicineId) return;
            const selectedMedicine = medicines.find(m=>m.id == medicineId);
            setDrawerContent(createMedicineViewerContent(selectedMedicine));
            openDrawer(); 
            const closeBtn = document.querySelector('.drawer .close');
            const editBtn = document.querySelector('.drawer .edit');
            closeBtn?.addEventListener('click' , closeDrawer);
            editBtn?.addEventListener('click' , ()=>{
                openSidebar();
                const form = document.querySelector('.medicine-edit-form');
                console.log(selectedMedicine);
                form.addEventListener('submit' , e=>{
                    e.preventDefault();

                    const formData = new FormData(form);
                    const closeBtn = e.target.closest('.btn_cancel');
                    const saveBtn = e.target.closest('.btn_save')
                    const addToStockBtn = e.target.closest('.btn_add_to_stock')
                    console.log(formData);
                })
            });
            

        }))

    })
    
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


searchBar?.addEventListener('input' , e=>{
    try{
        const input_search = e.target;
        const value = input_search.value;
        searchAndRenderMedicineCard(value , 6);
    }catch(e){
        console.log(e);
    }
})




