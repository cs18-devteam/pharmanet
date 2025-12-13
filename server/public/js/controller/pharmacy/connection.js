import Application  from "../../model/application/Application.js";

/**
 * @type {WebSocket}
 */
const socket = new WebSocket('ws://localhost:3001');



function stablishConnection(){
    socket.send(`STABLISH=${JSON.stringify({
        type:'pharmacy',
        id : Application.pharmacyId,
    })}`)
}



socket.addEventListener('open' , ()=>{
    stablishConnection();
})