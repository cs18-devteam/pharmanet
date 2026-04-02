import Application from "../../../model/application/Application.js";
import { getOrder } from "../../../model/pharmacy/orders.js";

export async function updateChatBoxReceipt(){
    try{
        const {status , data: order} = await getOrder(Application.remoteOrderId);
        console.log(order);

        const receipt = document.querySelector('.chats.container .recipe-details');

        if(!receipt) return;
        const orderId = receipt.querySelector('.remote-order-id');
        if(orderId) orderId.textContent = order.id;

   

        const discount = order?.items?.reduce((acc , c , i)=>{
            return acc - c.discount
        } , 0)
        const discountTag = receipt.querySelector(".discount")
        if(discountTag) discountTag.textContent = discount;


        const total = order.items?.reduce((acc, c , i)=>{
            return acc + c.price
        } , 0);

        const totalTag  = receipt.querySelector(".total");
        if(totalTag) totalTag.textContent = total;


        const final = receipt.querySelector(".final");
        if(final) final.textContent = total + discount;

        console.table({
            total,
            discount,
        });



    }catch(e){
        console.log(e);
    }
}   