import cart from "../../controller/customer/customer.cart.controller.js";
import Application from "../../model/application/Application.js";
import html from "../html.js";


const chatBoxTemplate = html`
<div class="chat-box">                    
    <div class="header-section">
        <div class="customer-name">Chathura Priyashan</div>
        <div class="discount">Discount</div>
    </div>

    <div class="body-section">

        
        
    </div>

    <div class="footer-section">
        <form class="type-bar-container">
            <input type="text" placeholder="Type Here" class="type-msg">
            <button><img src="/images/message-icon.svg" alt="message-icon"></button>

        </form>
    </div>
</div>`



export function renderChatBox(){
    cart.setLeftSideContent(chatBoxTemplate);
    const chatForm = document.querySelector(".type-bar-container");

    chatForm.addEventListener('submit' , (e)=>{
        e.preventDefault();

        const input = chatForm.querySelector('input')
        const value = input?.value;
        Application.connection?.send(`MSG=${JSON.stringify({
            message: value,
            to:"pharmacy",
            type: 'customer',
            id:Application.userId,
            toId : Application.connectedWith,

        })}`);
        renderMessage(value);
        input.value = '';
    })
    

}


export function renderReply(message){
    const template = html`<div class="message"><span class="profile-pic"><img src="/users/1.jpg" alt="" width="40rem" height="40rem"></span>${message}</div>`;

    document.querySelector('.chat-box .body-section').insertAdjacentHTML('beforeend' , template);
    
    
    
    
}


export function renderMessage(reply){
    const template = html`<div class="message reply">${reply}<span class="profile-pic"><img src="/users/2.jpg" alt="" width="40rem" height="40rem"></span></div>`
    document.querySelector('.chat-box .body-section').insertAdjacentHTML('beforeend' , template);
}

