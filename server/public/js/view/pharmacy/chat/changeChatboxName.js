import Application from "../../../model/application/Application.js";

export function changeChatBoxName(name){
    const nameTag = document.querySelector(".chat-customer-name");
    
        if(nameTag && Application.connectedUser){
            nameTag.textContent = `${Application.connectedUser.firstName} ${Application.connectedUser.lastName}`
        }
}