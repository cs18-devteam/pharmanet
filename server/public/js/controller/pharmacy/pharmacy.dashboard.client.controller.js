import { fetchMedicineData, fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import { createStockMedicine, getMedicineByStockId, updateMedicineStock } from "../../model/pharmacy/manageStockData.js";
import { createStockAddEditForm } from "../../view/pharmacy/createStockAddEditForm.js";
import { attachDrawer, closeDrawer, closeSidebar, openDrawer, openSidebar, setDrawerContent, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { createMedicineViewerContent } from "../../view/pharmacy/medicineViewer.js";
import { createMedicineCards, renderMedicineCards, renderMedicineStockSummery } from "../../view/pharmacy/renderMedicineCards.js";
const medicineCardContainer = document.querySelector('.medicine_cards_container');
const searchBar = document.getElementById("search-bar");


function extractFormData(form){
    const formData = new FormData(form);

    const data = {};
    for(const [key , value] of formData.entries()){
        data[key] = value;
    }
    return data;
}   

function stopPropagation(){
    const form = document.querySelector('.medicine-edit-form');
    form.addEventListener('submit' , e=>{
        e.preventDefault();
    })
}



function searchAndRenderMedicineCard(value , limit = 6){
    fetchMedicineData(value , limit).then(data=>{
        const medicines = data.results;
        const medicineCards =  createMedicineCards(medicines);
        renderMedicineCards(medicineCardContainer , medicineCards?.slice(0 , 6));
        Array.from(medicineCardContainer.children).forEach(el=>el.addEventListener('click' , ()=>{
            const medicineId = el.dataset.id;
            if(!medicineId) return;
            const selectedMedicine = medicines.find(m=>m.id == medicineId);
            setDrawerContent(createMedicineViewerContent(selectedMedicine));
            openDrawer(); 
            const addToStockBtn = document.querySelector('.drawer button.add_to_stock');
            const closeBtn = document.querySelector('.drawer .close');
            const editBtn = document.querySelector('.drawer .edit');
            closeBtn?.addEventListener('click' , closeDrawer);
            
            editBtn?.addEventListener('click' , ()=>{
                openSidebar();
                
            });

            addToStockBtn?.addEventListener('click' , ()=>{
                setSidebarContent(createStockAddEditForm(selectedMedicine));
                openSidebar();

                stopPropagation();
                const formContainer = document.querySelector('.pharmacy_medicine_stock_content');
                formContainer?.addEventListener('click' , (e)=>{
                    const target = e.target;
                    const form = formContainer.querySelector('form');
                    if(target.closest('.btn_add_to_stock')){
                        createStockMedicine({
                            pharmacyId : 1,
                            stock : {...selectedMedicine,...extractFormData(form)}
                        }).then(data=>{
                            if(data.status == "success"){
                                Swal?.fire({
                                    title:"Stock Created",
                                    icon:"success",
                                }).then(()=>{
                                    closeSidebar();
                                    closeDrawer();                                    
                                    getMedicineByStockId({
                                        pharmacyId : 1 , 
                                        stockId : data.stock.id
                                    }).then((data)=>{
                                        console.log(data);
                                        
                                        setDrawerContent(createMedicineViewerContent(data.results));
                                        openDrawer();
                                        
                                    }).catch(e=>{
                                        console.log(e);
                                        
                                    })
                                    // setDrawerContent(createMedicineViewerContent())
                                })
                            }else{
                                Swal?.fire({
                                    title:"Something went wrong",
                                    icon :"error",
                                })
                            }
                        })
                    }else if(target.closest('btn_save')){
                        updateMedicineStock({
                            pharmacyId : 1,
                            stock : {...selectedMedicine , ...extractFormData(form)},
                        }).then(data=>{
                            if(data.status == "success"){
                                Swal?.fire({
                                    title:"Stock Created",
                                    icon:"success",
                                })
                            }else{
                                Swal?.fire({
                                    title:"Something went wrong",
                                    icon :"error",
                                })
                            }
                        })
                    }
                })
            })
            
            

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




