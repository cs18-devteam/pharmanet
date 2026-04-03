import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { swal } from "../../../view/swal.js";

export function onClickPaymentRequest(){
    try{

        const paymentButton = document.querySelector(".chats .request-payment-btn");
        if(!paymentButton) return;

        paymentButton.addEventListener('click' , e=>{
            if(!Application.remoteOrderId){
                swal({
                    title:"some thing went wrong",
                    text:"cannot send payment request",
                    icon:"error",
                })
            }
            Application.connection.send(ChatTemplates.requestPayment(Application.remoteOrderId));

            swal({
                title:"Payment Requested",
                icon:"success",
            })
        })





    }catch(e){
        console.log(e);
    }
    
}