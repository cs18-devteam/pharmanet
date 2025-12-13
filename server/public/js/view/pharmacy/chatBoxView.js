import cart from "../../controller/customer/customer.cart.controller.js";
import html from "../html.js";

const incomingMessage = document.querySelector('.incoming_messege_box');

export function showIncomingMessage(data){
    incomingMessage?.classList.add('open');
}
    
export function removeIncomingMessage(){
    incomingMessage?.classList.remove('open');

}



const chatBoxTemplate = html`
    <div class="chatbox-container">
        <div class="title-bar">
            amaya pharmacy center
        </div>

        <div class="chat-messages-container">

        </div>

        <div class="input-container">
            <div class="input-bar"></div>
        </div>

    </div>
`;

export function renderChatBox(){
    cart.setLeftSideContent()
}