import Application from "../../model/application/Application.js";

let socket = undefined;

function stablishConnection(socket){
    socket.send(`STABLISH=${JSON.stringify({
            type:'customer',
            id : Application.id,
        })}`);
}



export async function requestConnectionWithPharmacy(pharmacyId){
    try{
        if(!socket) throw new Error("connection is not opened");
        socket.send(`REQ_PHR=${
            JSON.stringify({id : pharmacyId})
        }`)

    
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
                stablishConnection(socket);
                resolve(socket);  
            })
        }catch(e){
            reject(e);
        }
    })



}