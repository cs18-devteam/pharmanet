import { renderChatBox } from "../../view/pharmacy/chat/renderChatbox.js";
import { renderWaitingList } from "../../view/pharmacy/chat/renderWaitingList.js";
import PharmacyChatbox from "../../view/pharmacy/PharmacyChatBox.js";

// const chatsNavButton = document.querySelector(".nav_links li label[for='chats']");

// chatsNavButton?.querySelector("click" , ()=>{
//     console.log(e);
// })


export default function init(){
    if(!PharmacyChatbox.isOpen){
        renderWaitingList();
    }

}

