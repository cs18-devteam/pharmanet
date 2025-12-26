import { renderWaitingList } from "../../view/pharmacy/chat/renderWaitingList.js";

const chatsNavButton = document.querySelector(".nav_links li label[for='chats']");

chatsNavButton?.querySelector("click" , ()=>{
    console.log(e);
})


export default function init(){
    console.log('chats init');
    renderWaitingList();

}