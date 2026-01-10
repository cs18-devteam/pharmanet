import { onSocketOpened } from "./chat/onSocketOpened.js";
import { startSocketListening } from "./chat/onIncommingMessage.js";
import { startListingOutgoingMessages } from "./chat/onOutgoingMessage.js";


export const chatBoxBtnsAttributes = {
    prescriptionRequestBtn : {
        clickable : true,
    }
}


/**
 * @type {WebSocket}
 */

let socket = new Promise((resolve , reject)=>{
    window.cookieStore.getAll().then(cookies=>{
        const ip = cookies.find(c=>c.name == "ip")?.value;

        if(ip){
            resolve(new WebSocket(`wss://${ip}:3001`));
        }else{
            reject(undefined);
        }
    });


    
})



socket.then(socket=>socket.addEventListener('open' , ()=>{
    onSocketOpened(socket);
    startSocketListening(socket);
    // startListingOutgoingMessages();
}));