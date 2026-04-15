import Application from "../../model/application/Application.js";

export function changeChatBoxName(){

    const nameTag = document.querySelector(".chat-customer-name");
    console.log(nameTag , Application.remotePharmacy.name);
        if(nameTag && Application.remotePharmacy){
            nameTag.innerHTML = `${Application.remotePharmacy.name} <br> <span>${Application.remotePharmacy.contact}</span>`
        }
}