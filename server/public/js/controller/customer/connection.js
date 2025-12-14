import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { renderToast } from "../../view/renderToast.js";

let socket = undefined;

function stablishConnection(socket){
    socket.send(ChatTemplates.requestConnection());
}



export async function requestConnectionWithPharmacy(pharmacyId){
    try{
        if(!socket) throw new Error("connection is not opened");

        const reqString = Application.MessageTemplates.requestPharmacy(pharmacyId);
        socket.send(reqString);

    
    }catch(e){
        console.log(e);
        throw e;
    }
}



export function openLiveConnection(){
    socket = new WebSocket('ws://localhost:3001/');

    return new Promise((resolve ,reject)=>{
        try{
            socket.addEventListener('open' , ()=>{
                renderToast("connecting");
                stablishConnection(socket);
                resolve(socket);  
            })
        }catch(e){
            reject(e);
        }
    })



}
