import Application from "../../../model/application/Application.js";
import { createOrder } from "../../../model/customer/orders.js";

export function getCartIds(){
    const carts = document.querySelectorAll('.carts_container > .cart_item .action-box .select input[type="checkbox"]');
    const cartsIds = new Set();
    Array.from(carts).forEach(el=>{
        if(el.checked){
            cartsIds.add(el.dataset.id);
        }
    });

    return Array.from(cartsIds)

}



export default async function getCartsIdsAndCreateOrder() {
    const data = await createOrder(getCartIds());
    Application.remoteOrderId = data.results.orderId; 
    return Application.requestPharmacyId;


}