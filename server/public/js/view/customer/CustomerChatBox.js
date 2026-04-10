
import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { getPharmacyDetailsById } from "../../model/customer/pharmacies.model.js";
import { spinner } from "../chatbox.js";
import html from "../html.js";
import { swal } from "../swal.js";
import cart from "./Cart.js";


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





export default class CustomerChatBox {
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
        console.log(chatStatusIndicator);

        if (this.chatStatus == "connected") {
            chatStatusIndicator.style = "color:var(--color-green-01)";
            chatStatusIndicator.textContent = "connected";
        } else if (this.chatStatus == "closed") {
            chatStatusIndicator.style = "color:var(--color-yellow-01)";
            chatStatusIndicator.textContent = "disconnected";
        } else if (this.chatStatus == "loading") {
            cart.setLeftSideContent(spinner());
        } else {
            swal({ title: "some thing wrong with the connection", icon: 'error' });
            this.setChatboxState(false);
            cart.close();
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




    /**
     * 
     * @param {true | false} state 
     */
    static setChatboxState(state) {
        this.isOpen = state;

        const floatingChatButton = document.querySelector("div");
        if (this.isOpen) {
            Application.preventReload();
            floatingChatButton.classList.add("floatingChatButton");
            floatingChatButton.innerHTML = html`
                <div>
                    <div>Open</div>
                    <img src="/images/message-icon.svg" alt="message-icon">
                </div>
            `;

            document.body.insertAdjacentElement('beforeend', floatingChatButton);
            floatingChatButton.addEventListener("click", () => {
                this.renderChatBox();
            })
        } else {
            floatingChatButton.remove();
        }
    }


    static loading() {
        this.setUserState("loading");
    }

    static active() {
        this.setUserState("connected");
    }

    static renderChatBox(user = { firstName: "Unknown", lastName: "Unknown" }) {
        this.isOpen = true;
        cart.lock();

        cart.setLeftSideContent(
            html`
                <div class="chat-box">                    
                    <div class="header-section">
                        <div class="customer-name"><span class=".chat-customer-name">${user.firstName} ${user.lastName}</span> <br><span style="" class="chat-online-indicator"></span></div>

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
            </div>`)


        this.#handleDisconnect();
        // this.setChatboxState(true);
        // this.setUserState("connected");
        this.getChatBox();
        this.reloadMessages();

        cart.openLeftPanel();
        cart.openRightPanel()
    }

    static closeChatBox() {
        this.isOpen = false;

    }


    static handleInputMessage(func = () => { }) {
        const form = document.querySelector(".type-bar-container");
        form.addEventListener("submit", (e) => {
            try {

                e.preventDefault();

                const input = form.querySelector("input");
                const message = input.value;
                func(message);
                input.value = "";
                // Application.connection?.send(ChatTemplates.message(message));
                CustomerChatBox.outgoingMessage(message);
            } catch (e) {
                swal({
                    title: e.message || "something went wrong",
                    icon: "error",
                    text: "me be required hard refresh"
                })
                console.log(e);
            }

        })
    }

    static reloadMessages() {
        this.history.forEach(msg => {
            msg.reset();
            msg.render();
        })
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
        this.renderDisconnectNotice();
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
            this.disconnect();


        })
    }

    static onSelectPrescription(func = () => { }) {
        const uploadCard = document.querySelector('.card-prescription-upload');
        const input = uploadCard.querySelector('#prescription-upload-input');
        const skip = uploadCard.querySelector('.skip');

        input.addEventListener('change', (e) => func(e, input, uploadCard, skip));
    }

    static async renderDisconnectNotice() {
        if (!Application.remotePharmacy) {
            cart.close();
            cart.unlock();
            return;
        }

        const pharmacy = Application.remotePharmacy;

        document.body.insertAdjacentHTML("beforeend", `
    <div class="cus-disconnect-notice">
        <p>You have Disconnected , and if you want to contact or any issue you can connect pharmacy directly</p>
        <div>
            <div>contact Details</div>
            <div class="name">${pharmacy.name}</div>
            <div class="tel">${pharmacy.contact}</div>
            <div class="tel">${pharmacy.email}</div>
        </div>

        <div class="buttons">
            <div class="close-btn">close</div>
        </div>
    </div>`)

    }

}


document.body.addEventListener("click", e => {
    const target = e.target;
    const closeBtn = target.closest(".cus-disconnect-notice .buttons .close-btn");
    const notice = target.closest(".cus-disconnect-notice");

    if(closeBtn){
        notice.remove();
        cart.close();
        cart.unlock();
        cart.setLeftSideContent(" ");
        cart.setRightSideContent(" ");
        
    }
})

// Chatbox.renderChatBox();
// Chatbox.incomingMessage('hello')
// Chatbox.outgoingMessage('hi')



