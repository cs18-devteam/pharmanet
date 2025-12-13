import Application  from "../../model/application/Application.js";
import { changeWindowTo } from "../../view/pharmacy/changeWindow.js";
import { removeIncomingMessage, showIncomingMessage } from "../../view/pharmacy/chatBoxView.js";
const incomingMessage = document.querySelector('.incoming_messege_box');
const chatbox = document.querySelector('.chats .chat-box');
const chatboxBody = chatbox.querySelector('.body-section');



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
    console.log(message);

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
                    id : Application.pharmacyId,
                    type :"pharmacy"
                })}`);
                removeIncomingMessage();
                changeWindowTo('chats');
            }else if(rejectButton){
                socket.send(`RES_CLIENT=${JSON.stringify({
                    accept: false,
                    customerId : reqObj.customerId,
                    id : Application.pharmacyId,
                    type:"pharmacy"
                })}`);
                removeIncomingMessage();
                
            }
        })




    }else if(message.startsWith("MSG=")){
        const msgObj = JSON.parse(message.replace("MSG=" , ''));
        Application.connectedWith = msgObj.id;


       

        chatboxBody.insertAdjacentHTML('beforeend',templateReply);
    }
})




const form = chatbox.querySelector('form');
form.addEventListener('submit' , (e)=>{
    e.preventDefault();

    const input = form.querySelector('input');
    const value = input.value;
    socket.send(`MSG=${JSON.stringify({
        message: value,
        type: 'pharmacy',
        to :"customer",
        id : Application.pharmacyId,
        toId : Application.connectedWith,
    })}`)
     const templateReply = `<div class="message reply"><span class="profile-pic"><img src="/users/1.jpg" alt="" width="40rem" height="40rem"></span>${value}</div>`;
    
    input.value = '';
    chatboxBody.insertAdjacentHTML('beforeend' , templateReply);



}) 