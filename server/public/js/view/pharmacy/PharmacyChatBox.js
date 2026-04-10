// import Application from "../../model/application/Application.js";
// import { spinner } from "../chatbox.js";
// import html from "../html.js";
// import { swal } from "../swal.js";

import { disconnect } from "../../controller/pharmacy/chat/disconnectNoticeHandler.js";
import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import html from "../html.js";
import { swal } from "../swal.js";


class Message {
    isRendered = false;
    /**
     * 
     * @param {string} message 
     * @param {"message" | "reply"} type 
     */
    constructor(message, type = "message" | "reply") {
        this.message = message;
        this.type = type;
        this.time = Date.now();
    }

    reset() {
        this.isRendered = false;
    }

    render() {
        if (this.isRendered) return;

        const element = document.querySelector('.chat-box .body-section');

        const message = html`
            <div class="${this.type} message">
                <span class="profile-pic">
                        <img src="/users/1.jpg" alt="" width="40rem" height="40rem">
                </span>
                ${this.message}
                <br>
            </div>
            <div class="${this.type}-time message-time">${new Date(this.time).toLocaleTimeString()}</div>
            `;

        element?.insertAdjacentHTML("beforeend", message);

        this.isRendered = true;
    }
}





export default class PharmacyChatbox {
    /**
     * @type {Message[]}
     */
    static history = [];
    static isOpen = false;
    static chatBox = undefined;
    static onDisconnect = () => { };

    /**
     * @type {"closed" | "connected" | "loading" | "error" }
     */
    static chatStatus = "closed";

    /**
     * @param {"closed" | "connected" | "loading" | "error" } status
    */
    static setUserState(status) {
        this.chatStatus = status;

        const chatStatusIndicator = document.querySelector(".chat-online-indicator");
        if (this.chatStatus == "connected") {
            chatStatusIndicator.style = "color:var(--color-green-01)";
            chatStatusIndicator.textContent = "connected";
        } else if (this.chatStatus == "closed") {
            chatStatusIndicator.style = "color:var(--color-yellow-01)";
            chatStatusIndicator.textContent = "disconnected";
        } else if (this.chatStatus == "loading") {
            // cart.setLeftSideContent(spinner());
        } else {
            swal({ title: "some thing wrong with the connection", icon: 'error' });
            this.setChatboxState(false);
            // cart.close();
        }
    }

    static getChatBox() {
        if (this.chatBox) return this.chatBox;
        this.chatBox = document.querySelector(".chat-box");
        return this.chatBox;
    }

    static attachOnDisconnectHandler(handler = this.onDisconnect) {
        this.onDisconnect = handler;
    }


    static renderCloseAndSaveOrder() {
        const chatContainer = document.querySelector('.chats.container');
        chatContainer?.insertAdjacentHTML('afterbegin', html`    
            <div class="disconnect-notice">
                <div>Your connection has lost . close window . Do you want to save order ?</div>
                <div class="buttons">
                    <button class="delete-order">Don't save</button>
                    <button class="save-order" data-id="${Application.remoteOrderId}">Confirm</button>

                </div>
            </div>
        `);
    }


    /**
     * 
     * @param {true | false} state 
     */
    static setChatboxState(state) {
        this.isOpen = state;

        // const floatingChatButton = document.querySelector("div");
        // if(this.isOpen){
        //     Application.preventReload();
        //     floatingChatButton.classList.add("floatingChatButton");
        //     floatingChatButton.innerHTML = html`
        //         <div>
        //             <div>Open</div>
        //             <img src="/images/message-icon.svg" alt="message-icon">
        //         </div>
        //     `;

        //     document.body.insertAdjacentElement( 'beforeend',floatingChatButton);
        //     floatingChatButton.addEventListener("click" , ()=>{
        //         this.renderChatBox();
        //     })
        // }else{
        //     floatingChatButton.remove();
        // }
    }


    static loading() {
        this.setUserState("loading");
    }

    static active() {
        this.setUserState("connected");
    }

    static renderChatBox(user = { firstName: "Unknown", lastName: "Unknown" }) {
        this.isOpen = true;

        const chatsContainer = document.querySelector(".container.chats");


        chatsContainer.innerHTML = html`
                <div class="left">
                            <div class="chat-box">                    
                    <div class="header-section">
                        <div class="customer-name"><span class="chat-customer-name">${user.firstName} ${user.lastName}</span> <br><span style="" class="chat-online-indicator"></span></div>

                        <div class="discount chat-disconnect-btn" style="height:fit-content;">Disconnect</div>
                    </div>

                    <div class="body-section">

                        
                    </div>

                    <div class="footer-section">
                        <form class="type-bar-container ">
                            <input type="text" placeholder="Type Here" class="type-msg">
                            <button><img src="/images/message-icon.svg" alt="message-icon"></button>
                            <div class="disconnect-text">You no longer connected</div>

                        </form>
                    </div>
            </div>
                        </div>
            
                        <div class="middle">
                            <div class="cart">
                                <div class="header-section">
                                    <div class="add-new-item-btn">Add New Item +</div>
                                </div>
            
                                <div class="body-section">
                                    
            
                                    <!-- <div class="medicine_card" >
                                        <div class="medicine-card-header">
                                            <div class="dosage-icon" >
                                            
                                                <img width="60rem" src="/images/bottel_of_pills.svg">  
            
                                            </div>
            
            
                                            <div class="details">
                                                <div class="medicine__name">
                                                    <div class="name">Name</div>
                                                    AMPICILLIN SODIUM FOR INJECTION BP 250MG
                                                </div>
                                                <div class="medicine__info">
                                                
                                                    <div class="medicine__info__price">
                                                        <span>
                                                            <div class="store-as__icon">
                                                                <img src="/images/price_tag.svg" width="20rem" >
                                                            </div>
                                                        </span>
                                                        <span>price</span>
                                                        <span class="price">
                                                            <span>Rs<div class="price__value">1,234</div></span>
                                                         
                                                        </span>
                                                    </div>
                                                </div>
                                            
                                                
                                            </div>
            
                                            <div class="added-btn">
                                                Added +
                                            </div>
                                        </div>
            
                                        <div class="medicine-card-footer">
            
                                            <div class="card-footer unit">
                                                Units <span>20</span>
                                            </div>
            
                                            <div class="card-footer days">
                                                Days <span>20</span>
                                            </div>
            
                                            <div class="card-footer discount">
                                                Discounts (Rs) <span>20</span>
                                            </div>
                                        </div>
                                    
            
                                    </div> -->
            
                                    <!-- <div class="medicine_card" >
                                        <div class="medicine-card-header">
                                            <div class="dosage-icon" >
                                            
                                                <img width="60rem" src="/images/bottel_of_pills.svg">  
            
                                            </div>
            
            
                                            <div class="details">
                                                <div class="medicine__name">
                                                    <div class="name">Name</div>
                                                    AMPICILLIN SODIUM FOR INJECTION BP 250MG
                                                </div>
                                                <div class="medicine__info">
                                                
                                                    <div class="medicine__info__price">
                                                        <span>
                                                            <div class="store-as__icon">
                                                                <img src="/images/price_tag.svg" width="20rem" >
                                                            </div>
                                                        </span>
                                                        <span>price</span>
                                                        <span class="price">
                                                            <span>Rs<div class="price__value">1,234</div></span>
                                                           
                                                        </span>
                                                    </div>
                                                </div>
                                            
                                                
                                            </div>
            
                                            <div class="added-btn">
                                                Added +
                                            </div>
                                        </div>
            
                                        <div class="medicine-card-footer">
            
                                            <div class="card-footer unit">
                                                Units <span>20</span>
                                            </div>
            
                                            <div class="card-footer days">
                                                Days <span>20</span>
                                            </div>
            
                                            <div class="card-footer discount">
                                                Discounts (Rs) <span>20</span>
                                            </div>
                                        </div>
                                    
            
                                    </div> -->
            
                                    
            
                                    
                                </div>
                                <!-- <div class="footer-section">
            
                                    <div class=" btn cancel-btn">Cancel</div>
                                    <div class="btn create-order-btn">Create Order</div>
                                </div> -->
                            </div>
                        </div>
            
                        <div class="right">
                            <div class="prescription">
                                <div class="request-prescription-btn">Request Prescription</div>
                            </div>
            
                            <div class="payment-details">
                                <h1>Payment Details</h1>
                                <div class="method">Method 
                                    <span class="method-selector">Cash</span>
            
                                </div>
                                <div class="status">Status
                                    <span class="status-selector">Pending</span>
            
                                </div>
            
                                <div class="request-payment-btn">Request Payment</div>
                            </div>
            
                            <div class="recipe-details">
                                <h1>Recipe Details</h1>
                                <div>
                                    <span>Order Id</span>
                                    <span>#<span class="remote-order-id"></span></span>
                                </div>
                                <div>
                                    <span>Total</span>
                                    <span>Rs<span class="total">1,345</span></span>
                                </div>
                                <div>
                                    <span>Discounts</span>
                                    <span>-Rs<span class="discount">100</span></span>
                                </div>
                                <!-- <div>
                                    <span>Loyality Dis</span>
                                    <span>-Rs<span class="loyalty">45</span></span>
                                </div> -->
                                <div class="final-price">
                                    <span>Final Price</span>
                                    <span>Rs<span class="final">1,200</span></span>
                                </div>
            
                                <!-- <div class="print-recipe">Print Recipe</div> -->
                                
                            </div>
                        </div>
            `;


        this.#handleDisconnect();
        this.setChatboxState(true);
        this.setUserState("connected");
        this.getChatBox();
        this.reloadMessages();
    }

    static closeChatBox() {
        this.isOpen = false;

    }


    static handleInputMessage(func = () => { }) {
        const form = document.querySelector(".chat-box .type-bar-container");
        console.log(form);
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const input = form.querySelector("input");
            const message = input.value;
            func(message);
            input.value = "";
            this.outgoingMessage(message);

        })
    }

    static reloadMessages() {
        this.history.forEach(msg => {
            msg.reset();
            msg.render();
        })
    }


    static clearHistory() {
        this.history = []
        Application.remoteOrderId = undefined;
        Application.waitingList = [];
        Application.connectedWith = undefined;
        Application.connectedUser = undefined;

    }

    static renderMessages() {
        this.history.forEach(msg => msg.render());
        this.scrollToBottom();
    }

    static incomingMessage(msg) {
        this.history.push(new Message(msg, 'message'));
        this.renderMessages();
    }

    static scrollToBottom() {
        /**
         * @type {HTMLElement}
         */


        const body = this.getChatBox().querySelector(".body-section");
        console.log(body.getBoundingClientRect().height);
        body.scrollTo({
            behavior: "smooth",
            top: body.scrollHeight,
        })
    }

    /**
     * @param {string} msg - Incoming message
     */
    static outgoingMessage(msg) {
        this.history.push(new Message(msg, 'reply'));
        this.renderMessages();
    }


    static disconnect() {
        this.setUserState("closed");
        this.getChatBox().classList.add("disconnect");
    }


    static #handleDisconnect() {
        const disconnectBtn = document.querySelector('.chat-disconnect-btn');
        disconnectBtn?.addEventListener("click", async () => {
            const results = await swal({
                title: "Do you want to disconnect ?",
                icon: "question",
                showConfirmButton: true,
                showCancelButton: true,
            })

            if (!results.isConfirmed) return;
            Application.connection?.send(ChatTemplates.disconnect());
            this.renderCloseAndSaveOrder();
            disconnect();
            this.disconnect();
            this.clearHistory();


        })
    }

}


// Chatbox.renderChatBox();
// Chatbox.incomingMessage('hello')
// Chatbox.outgoingMessage('hi')



