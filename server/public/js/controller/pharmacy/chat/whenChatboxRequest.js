import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, showIncomingMessage } from "../../../view/chatbox.js";

export function whenChatBoxRequest(message){
    const reqObj = ChatTemplates.readChatBoxRequest(message);

    showIncomingMessage(reqObj);

    onAcceptIncomingMessage(()=>{
        console.log("customer = " , reqObj);
        Application.connectedWith = reqObj.customerId;
    
        socket.send(ChatTemplates.acceptClient(true , reqObj.customerId));
        changeWindowTo('chats');
        activateChatBoxButtons(socket);
    })

    onRejectIncomingMessage(()=>{
        socket.send(ChatTemplates.acceptClient(false , reqObj.customerId));
    })

    onAnyCaseIncomingMessage(()=>{
        removeIncomingMessage();
    })
}