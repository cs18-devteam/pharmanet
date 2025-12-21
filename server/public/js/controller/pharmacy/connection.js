import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { activateOnSubmitMessageCallback, onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, renderMessage, renderReply, setOnSubmitMessageCallback, showIncomingMessage, spinner } from "../../view/chatbox.js";
import {renderToast} from "../../view/renderToast.js";
import Application from "../../model/application/Application.js";
import { getOrderData } from "../../view/pharmacy/orders.js";
import { whenConnected } from "./chat/whenConnected.js";
import { whenChatBoxRequest } from "./chat/whenChatboxRequest.js";
import { whenIncomingMessage } from "./chat/whenIncommingMessage.js";
import { whenStatPrescription } from "./chat/whenStatPescription.js";
import { whenSyncRequest } from "./chat/whenSyncRequest.js";
import { onSocketOpened } from "./chat/onSocketOpened.js";
import { startSocketListening } from "./chat/onIncommingMessage.js";
import { startListingOutgoingMessages } from "./chat/onOutgoingMessage.js";


export const chatBoxBtnsAttributes = {
    prescriptionRequestBtn : {
        clickable : true,
    }
}


/**
 * @type {WebSocket}
 */

let socket = new Promise((resolve , reject)=>{
    window.cookieStore.getAll().then(cookies=>{
        const ip = cookies.find(c=>c.name == "ip")?.value;

        if(ip){
            resolve(new WebSocket(`wss://${ip}:3001`));
        }else{
            reject(undefined);
        }
    });


    
})



socket.then(socket=>socket.addEventListener('open' , ()=>{
    onSocketOpened(socket);
    startSocketListening(socket);
    startListingOutgoingMessages();
}))

 







// function listener_prescriptionRequestBtn(socket){
//     // return ()=>{
//         requestPrescriptionBtn.textContent = ''
//         requestPrescriptionBtn.innerHTML = spinner(); 
//         Application.connection.send(ChatTemplates.requestPrescriptionFromClient());

        
//     // }
// }


/**
 * 
 * @param {WebSocket} socket 
 */
// function activateChatBoxButtons(){

//     const requestPrescriptionBtn = document.querySelector(".prescription .request-prescription-btn");

//     requestPrescriptionBtn?.addEventListener('click' , ()=>{

//         if(chatBoxBtnsAttributes.prescriptionRequestBtn.clickable){
//             requestPrescriptionBtn.textContent = ''
//             requestPrescriptionBtn.innerHTML = spinner(); 
//             Application.connection.send(ChatTemplates.requestPrescriptionFromClient());
//         }else{
//             console.log('please wait...');
//         }
//     });
    
// }


