import Application  from "../../model/application/Application.js";
import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";
import { removeIncomingMessage, showIncomingMessage } from "../../view/pharmacy/chatBoxView.js";
const incomingMessage = document.querySelector('.incoming_messege_box');


/**
 * @type {WebSocket}
 */
const socket = new WebSocket('ws://localhost:3001');



function stablishConnection(){
    socket.send(`STABLISH=${JSON.stringify({
        type:'pharmacy',
        id : Application.pharmacyId,
    })}`)
}



socket.addEventListener('open' , ()=>{
    stablishConnection();
})


socket.addEventListener('message' , (msgEvent)=>{
    const message = msgEvent.data;

    if(message.startsWith("REQ_CLIENT=")){
        const reqObj = JSON.parse(message.replace("REQ_CLIENT=" , ''));

        showIncomingMessage(reqObj);


        incomingMessage.addEventListener('click' , (e)=>{
            const target = e.target;

            const acceptButton = target.closest('.accept');
            const rejectButton = target.closest('.reject');

            if(acceptButton){
                socket.send(`RES_CLIENT=${JSON.stringify({
                    accept: true,
                    customerId : reqObj.customerId,
                })}`);
                removeIncomingMessage();
                changeWindowTo('chats');
            }else if(rejectButton){
                socket.send(`RES_CLIENT=${JSON.stringify({
                    accept: false,
                    customerId : reqObj.customerId,
                })}`);
                removeIncomingMessage();
                
            }
        })




    }
})