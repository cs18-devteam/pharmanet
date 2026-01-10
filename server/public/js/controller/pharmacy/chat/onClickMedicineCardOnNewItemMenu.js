import Application from "../../../model/application/Application.js";
import { fetchMedicineData } from "../../../model/pharmacy/fetchMedicineData.js";
import { addOrderItem } from "../../../model/pharmacy/orders.js";
import { closeSidebar } from "../../../view/pharmacy/drawerView.js";
import { swal } from "../../../view/swal.js";
import { refreshCartList } from "./refreshCartList.js";

export async function onClickMedicineCardOnNewItemMenu() {
    const medicineCardContainer = document.querySelector(".chats.medicines_card_container");
    medicineCardContainer?.addEventListener('click' , async (e)=>{
        const target = e.target;

        /**
         * @type {HTMLElement} 
         */
        const medicineCard = target.closest(".medicine_card");
        const orderAddForm = target.closest(".order-add-form");
        const addBtn = target.closest(".add");

        if(medicineCard){
            if(medicineCard.classList.contains("show-order-add-form" && !orderAddForm)){
                medicineCard.classList.remove("show-order-add-form");
                
            }else{
                medicineCard.classList.add("show-order-add-form");
            }
        }

        if(addBtn){
            const data = getOrderFormData(medicineCard);
            const {status , results} = await addOrderItem({
                productId : data.productId,
                medicineId : data.medicineId ,
                quantity : data.units,
                discount : data.discounts,
                orderId : Application.remoteOrderId,
            });

            if(status == "success"){
                swal({
                    title:"item added to order",
                    icon:"success",
                }).then(()=>{
                    closeSidebar()
                })
                refreshCartList();
            }
        }
        
    })
}


/**
 * 
 * @param {HTMLElement} medicineCard 
 */
export function getOrderFormData(medicineCard) {
    const orderForm = medicineCard.querySelector(".order-add-form");
    const units = medicineCard.querySelector("input[name='units']").value || 0;
    const days = medicineCard.querySelector("input[name='days']").value || 0;
    const discounts = medicineCard.querySelector("input[name='discounts']").value || 0;

    if(!units){
        swal({
            title:"medicines must have a number of units",
            text:"count of unit is necessary ",
        })
    }

    return {
        medicineId : medicineCard.dataset.id,
        units , 
        days , 
        discounts , 
    }
}