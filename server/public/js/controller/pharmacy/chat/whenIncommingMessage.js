import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { renderMessage } from "../../../view/chatbox.js";
import PharmacyChatbox from "../../../view/pharmacy/PharmacyChatBox.js";

export function whenIncomingMessage(message){
    const msgObj = ChatTemplates.readMessage(message)
    if(+Application.connectedWith !=  +msgObj.id){
        Application.connection.send(ChatTemplates.disconnect());
    } 
    PharmacyChatbox.incomingMessage(msgObj.message);
}