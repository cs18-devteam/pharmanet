import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, showIncomingMessage } from "../../../view/chatbox.js";

export function whenChatBoxRequest(message){
    const reqObj = ChatTemplates.readChatBoxRequest(message);

    const user = {
        ...reqObj,
        user : Application.getUserData(reqObj.customerId),
    };

    Application.waitingList.push(reqObj);
    showIncomingMessage(user);
    
    onAcceptIncomingMessage(()=>{
        
        Application.connectedWith = reqObj.customerId;
        Application.connectedUser = Application.getUserData(Application.connectedWith);
        
    
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