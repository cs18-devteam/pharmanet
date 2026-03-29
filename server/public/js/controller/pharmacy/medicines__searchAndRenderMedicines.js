import Application from "../../model/application/Application.js";
import { fetchMedicineData, fetchMedicineStockSummery } from "../../model/pharmacy/fetchMedicineData.js";
import { createStockMedicine, deleteMedicineFromStock, getMedicineByStockId, updateMedicineStock } from "../../model/pharmacy/manageStockData.js";
import { createStockAddEditForm } from "../../view/pharmacy/createStockAddEditForm.js";
import {  closeDrawer, closeSidebar, openDrawer, openSidebar, setDrawerContent, setSidebarContent } from "../../view/pharmacy/drawerView.js";
import { createMedicineViewerContent } from "../../view/pharmacy/medicineViewer.js";
import { createMedicineCards, renderMedicineCards } from "../../view/pharmacy/renderMedicineCards.js";
import { swal } from "../../view/swal.js";
import { extractFormData, stopPropagation } from "./helpers.js";


const medicineCardContainer = document.querySelector('.medicine_cards_container');


export default function searchAndRenderMedicineCard(value , limit = 6){
    fetchMedicineData(value , limit , Application.pharmacyId).then(data=>{
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
                setSidebarContent(createStockAddEditForm(selectedMedicine))
                stopPropagation();
                openSidebar();
                const formContainer = document.querySelector('.pharmacy_medicine_stock_content');

                formContainer?.addEventListener('click' , (e)=>{
                    const target = e.target;
                    const form = formContainer.querySelector('form');
                    if(target.closest('.btn_save')){



                        updateMedicineStock({
                            pharmacyId : Application.pharmacyId,
                            
                            stock : {...selectedMedicine , ...extractFormData(form) , stockId : selectedMedicine.stock.id},
                        }).then(data=>{
                            if(data.status == "success"){
                                Swal?.fire({
                                    title:"Stock Updated",
                                    icon:"success",
                                }).then(()=>{
                                    closeSidebar();
                                    closeDrawer();                                    
                                    getMedicineByStockId({
                                        pharmacyId : Application.pharmacyId , 
                                        stockId : selectedMedicine.stock.id,
                                    }).then((data)=>{
                                        console.log(data);
                                        
                                        setDrawerContent(createMedicineViewerContent(data.results));
                                        openDrawer();
                                        
                                    }).catch(e=>{
                                        console.log(e);
                                        
                                    })})
                            }else{
                                Swal?.fire({
                                    title:"Something went wrong",
                                    icon :"error",
                                })
                            }
                        })
                    }else if(target.closest('.delete button')){
                        Swal?.fire({
                            icon:"Question",
                            title:"are you sure ?",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "delete",
                        }).then(results=>{
                            if(results.isConfirmed){
                                deleteMedicineFromStock({
                                    pharmacyId : Application.pharmacyId,
                                    stockId : selectedMedicine.stock.id,
                                }).then(data=>{
                                    if(data.status == "success"){
                                        Swal?.fire({
                                            icon:"success",
                                            title:"stock deleted successfully",
                                        }).then(()=>{
                                            closeSidebar();
                                            closeDrawer();
                                            searchAndRenderMedicineCard();
                                        })
                                    }else{
                                        Swal?.fire({
                                            icon:"error",
                                            title:"something went wrong",
                                            text:"item not deleted !"
                                        })
                                    }
                                }).catch(e=>{
                                    console.log(e);
                                    Swal?.fire({
                                        icon:"error",
                                        title:"something went wrong",
                                    })
                                    
                                })
                            }
                        })
                    }
                })

                
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
                        const stockData = extractFormData(form);
                        
                        if(stockData.price == '' || stockData.stock == '' || stockData.publicStock == ''){
                            swal({
                                title: "missing some fields",
                                icon:'error'
                            })
                            return;

                        }


                        if(+stockData.price < 0 ){
                            swal({
                                title: "price must be grater than 0",
                                icon:'error'
                            })
                            return;
                        }

                        if(+stockData.publicStock < 0){
                            swal({
                                title:"public stock grater than to 0",
                                icon:"error"
                            })
                            return;

                        }
                        if(+stockData.stock < 0){
                            swal({
                                title:"public stock grater than to 0",
                                icon:"error"
                            })
                            return;

                        }

                        if(!(+stockData.publicStock <= +stockData.stock)){
                            swal({
                                title:"public stock must small than or equal to stock",
                                icon:"error"
                            })
                            return;
                        }

                        


                        createStockMedicine({
                            pharmacyId : Application.pharmacyId,
                            stock : {...selectedMedicine, ...stockData}
                        }).then(data=>{
                            if(data.status == "success"){
                                Swal?.fire({
                                    title:"Stock Created",
                                    icon:"success",
                                }).then(()=>{
                                    closeSidebar();
                                    closeDrawer();                                    
                                    getMedicineByStockId({
                                        pharmacyId : Application.pharmacyId , 
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
                            pharmacyId : Application.pharmacyId,
                            stock : {...selectedMedicine , ...extractFormData(form)},
                        }).then(data=>{
                            if(data.status == "success"){
                                Swal?.fire({
                                    title:"Stock Updated",
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
