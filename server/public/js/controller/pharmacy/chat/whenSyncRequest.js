import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { getOrderData } from "../../../view/pharmacy/orders.js";

function renderPrescription(url){
    const prescriptions = document.querySelector(".chats .prescription");
    if(!url) return;
    const img = document.createElement("img");
    img.classList.add("prescription-img");
    img.src = url;
    img.addEventListener('load' , ()=>{
        prescriptions.innerHTML = "";
        prescriptions.insertAdjacentElement('beforeend',img);
    })
}



export function whenSyncRequest(message){
    const {data} = ChatTemplates.decodeString(message);
    if(data.orderId){
        getOrderData(+data.orderId).then(data=>{
            const order = data.results[0];


            const cartBodySection = document.querySelector(".cart .body-section");
            renderPrescription(order.prescription || "/prescriptions/14-1765718920788.png");




            
        })
    }
}


console.log(ChatTemplates.syncConnection(1));