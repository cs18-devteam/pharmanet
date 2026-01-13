import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { renderToast } from "../../view/renderToast.js";

let socket = undefined;

function stablishConnection(socket){
    socket.send(ChatTemplates.requestConnection());
}



export async function requestConnectionWithPharmacy(pharmacyId){
    try{
        if(!Application.connection) throw new Error("connection is not opened");

        const reqString = Application.MessageTemplates.requestPharmacy(pharmacyId);
        Application.connection.send(reqString);

    
    }catch(e){
        console.log(e);
        throw e;
    }
}



export function openLiveConnection(){
    /**
 * @type {WebSocket}
 */

const socket = new Promise((resolve , reject)=>{
    window.cookieStore.getAll().then(cookies=>{
            const ip = cookies.find(c=>c.name == "ip")?.value;

            if(ip){
                resolve(new WebSocket(`wss://${ip}:3001`));
            }else{
                reject(undefined);
            }
        });
    })



    return new Promise((resolve ,reject)=>{
        try{
            socket.then(socket=>socket.addEventListener('open' , ()=>{
                renderToast("connecting");
                stablishConnection(socket);
                resolve(socket);  
            }))
        }catch(e){
            reject(e);
        }
    })



}
