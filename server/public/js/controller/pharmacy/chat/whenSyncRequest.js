import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { updateOrder } from "../../../model/pharmacy/orders.js";
import { updateChatBoxReceipt } from "../../../view/pharmacy/chat/updateChatBoxReceipt.js";
import { getOrderData } from "../../../view/pharmacy/orders.js";
import { refreshCartList } from "./refreshCartList.js";

function renderPrescription(url){
    const prescriptions = document.querySelector(".chats .prescription");
    console.log(prescriptions , url);
    if(!url) return;
    const img = document.createElement("img");
    img.classList.add("prescription-img");
    img.src = "/"+url;
    img.addEventListener('load' , ()=>{
        prescriptions.innerHTML = "";
        prescriptions.insertAdjacentElement('beforeend',img);
        debugger;
    })
}



export function whenSyncRequest(message){
    const {data} = ChatTemplates.decodeString(message);
    if(data.orderId){
        Application.remoteOrderId = +data.orderId;
        getOrderData(+data.orderId).then(data=>{
            const order = data.data;
            console.log(order);
            if(!order.pharmacyId){
                updateOrder({
                    id: order.id,
                    pharmacyId : Application.pharmacyId,
                    staffId : Application.staffId,
                })
            }
            document.querySelector(".remote-order-id").textContent = data.orderId;


            const cartBodySection = document.querySelector(".cart .body-section");
            renderPrescription(order.prescription);
            refreshCartList();

        })
    }
}

