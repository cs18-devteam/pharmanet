import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { renderToast } from "../../../view/renderToast.js";
import { startSocketListening } from "./onIncommingMessage.js";


function stablishConnection(socket){
    socket.send(ChatTemplates.requestConnection());
}




export function onSocketOpened(socket){
    Application.connection = socket;
    stablishConnection(socket);
    renderToast('requesting connection');
    // startSocketListening(socket)
}


// startListingOutgoingMessages()