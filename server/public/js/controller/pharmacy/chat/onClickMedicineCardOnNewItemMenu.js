import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { fetchMedicineData } from "../../../model/pharmacy/fetchMedicineData.js";
import { addOrderItem } from "../../../model/pharmacy/orders.js";
import { closeSidebar } from "../../../view/pharmacy/drawerView.js";
import { swal } from "../../../view/swal.js";
import { refreshCartList } from "./refreshCartList.js";

export async function onClickMedicineCardOnNewItemMenu() {
    const body = document.body;
    

    body?.addEventListener('click', async (e) => {
        if(!(e.target.closest(".medicines_card_container"))) return;

        const target = e.target;

        /**
         * @type {HTMLElement} 
         */
        const medicineCard = target.closest(".medicine_card");
        const orderAddForm = target.closest(".order-add-form");
        const addBtn = target.closest(".add");

        if (medicineCard) {
            if (medicineCard.classList.contains("show-order-add-form" && !orderAddForm)) {
                medicineCard.classList.remove("show-order-add-form");

            } else {
                medicineCard.classList.add("show-order-add-form");
            }
        }

        if (addBtn) {
            const data = getOrderFormData(medicineCard);
            const { status, results } = await addOrderItem({
                productId: data.productId,
                medicineId: data.medicineId,
                quantity: data.units,
                discount: data.discounts,
                orderId: Application.remoteOrderId,
            });



            if (status == "success") {
                swal({
                    title: "item added to order",
                    icon: "success",
                }).then(() => {
                    closeSidebar()
                })
                refreshCartList();
                Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId));
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
    const type = medicineCard.dataset.type;


    if (!units) {
        swal({
            title: "medicines must have a number of units",
            text: "count of unit is necessary ",
        })
    }

    const returnObj = {
        units,
        days,
        discounts,
    }

    if (type == "medicine") {
        returnObj.medicineId = medicineCard.dataset.id;
    }
    if (type == "product") {
        returnObj.productId = medicineCard.dataset.id;
    }

    return returnObj;
}
