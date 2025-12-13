import html from "./html.js";

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

     element?.insertAdjacentHTML(element , templateReply);
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

     element?.insertAdjacentHTML(element , templateReply);
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

