import html from "./html.js";
import { renderWaitingList } from "./pharmacy/chat/renderWaitingList.js";
const tone_incomingCall = new Audio('/music/message.mp3');
const tone_acceptCall = new Audio('/music/accept.mp3');
const tone_rejectCall = new Audio('/music/reject.mp3');



const incomingMessage = document.querySelector('.incoming_messege_box');


export function showIncomingMessage(data){
     tone_incomingCall.play();
     data.user.then(data=>{
          incomingMessage.querySelector('img').src = data.profile;
     })
     
     renderWaitingList();
     handleIncomingMessageBtns();
}
    
export function removeIncomingMessage(){
    incomingMessage?.classList.remove('open');
}

const handleIncomingMessageFunctions = {
     onAccept : ()=>{},
     onReject : ()=>{},
     onAny : ()=>{}
}

const chatBoxCallbackFunctions = {
     onSubmitMessage : ()=>{}
}


function handleIncomingMessageBtns(){
     incomingMessage?.addEventListener('click' , (e)=>{
                 const target = e.target;
     
                 const acceptButton = target.closest('.accept');
                 const rejectButton = target.closest('.reject');
     
                 if(acceptButton){
                    handleIncomingMessageFunctions.onAccept(); 
                    
                 }else if(rejectButton){
                    handleIncomingMessageFunctions.onReject();
               
                 }
     
                 if(acceptButton || rejectButton){
                     handleIncomingMessageFunctions.onAny();
                 }
             })
}



export function onAcceptIncomingMessage(func){
     tone_acceptCall.play();
     handleIncomingMessageFunctions.onAccept = func;
}

export function onRejectIncomingMessage(func){
     tone_rejectCall.play();
     handleIncomingMessageFunctions.onReject = func;
}

export function onAnyCaseIncomingMessage(func){
     handleIncomingMessageFunctions.onAny = func;

}

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} message 
 */
export function renderMessage( message){
     const element = document.querySelector('.chat-box .body-section');

     const templateReply = html`
          <div class="message">
               <span class="profile-pic">
                    <img src="/users/1.jpg" alt="" width="40rem" height="40rem">
               </span>
               ${message}
          </div>`;

     element?.insertAdjacentHTML("beforeend" , templateReply);
}
/**
 * 
 * @param {HTMLElement} element 
 * @param {string} message 
 */
export function renderReply(message){
     const element = document.querySelector('.chat-box .body-section');
     const templateReply = html`
          <div class="message reply">
               <span class="profile-pic">
                    <img src="/users/1.jpg" alt="" width="40rem" height="40rem">
               </span>
               ${message}
          </div>`;

     element?.insertAdjacentHTML("beforeend" , templateReply);
}

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


export function createChatBox(){
     return chatBoxTemplate;
}




export function activateOnSubmitMessageCallback(){
     const chatBoxForm = document.querySelector('.chat-box .footer-section .type-bar-container');


     if(!chatBoxForm) {
         console.error("chat container not found");
          return;
     }
     const input = chatBoxForm.querySelector('input');
     
     chatBoxForm.addEventListener('submit' ,(e)=>{
          e.preventDefault();
          const value = input.value;
          chatBoxCallbackFunctions.onSubmitMessage(e , value);
          if(input) input.value = '';

     });
}


export function setOnSubmitMessageCallback(func){
     chatBoxCallbackFunctions.onSubmitMessage = func; 
}



export function spinner(){
     const template = html`
          <div class="spinner">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"/></svg>
          </div>
     `;

     return template;
}



export function createPrescriptionUploadCardContent(){
     return html`
          <div class="card-prescription-upload">
               <h4>please upload prescription</h4>
               <p>Please upload your prescription so we can accurately verify your medication details and process your order safely.</p>

               <input type="file" id="prescription-upload-input" accept="image/*">
               <label for="prescription-upload-input"  >Upload</label>
               <button class="skip">skip</button>
          </div>

     `;
}


export function onSelectPrescription(func=()=>{}){
     const uploadCard = document.querySelector('.card-prescription-upload');
     const input = uploadCard.querySelector('#prescription-upload-input');
     const skip = uploadCard.querySelector('.skip');

     input.addEventListener('change' , (e)=>func(e , input , uploadCard , skip));
   
}


