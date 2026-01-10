import Application from "../../../model/application/Application.js";
import { createOrder } from "../../../model/customer/orders.js";

export default async function getCartsIdsAndCreateOrder() {
    const carts = document.querySelectorAll('.carts_container > .cart_item .action-box .select input[type="checkbox"]');
    const cartsIds = new Set();
    Array.from(carts).forEach(el=>{
        if(el.checked){
            cartsIds.add(el.dataset.id);
        }
    });

    const data = await createOrder(Array.from(cartsIds));


    Application.remoteOrderId = data.results.orderId; 

    
    return Application.requestPharmacyId;


}