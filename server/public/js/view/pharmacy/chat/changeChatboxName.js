import Application from "../../../model/application/Application.js";

export function changeChatBoxName(name){
    const nameTag = document.querySelector(".chat-customer-name");
    Application.connectedUser.then(user=>{
        console.log(user);
        if(nameTag){
            nameTag.textContent = `${user.firstName} ${user.lastName}`
        }
    })
}