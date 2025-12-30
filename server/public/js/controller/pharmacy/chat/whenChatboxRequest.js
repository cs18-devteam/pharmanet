import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { activateOnSubmitMessageCallback, onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, showIncomingMessage } from "../../../view/chatbox.js";
import { changeWindowTo } from "../../../view/pharmacy/changeWindow.js";
import { renderChatBox } from "../../../view/pharmacy/chat/renderChatbox.js";
import { renderWaitingList } from "../../../view/pharmacy/chat/renderWaitingList.js";

export async function whenChatBoxRequest(socket,message){
    const reqObj = ChatTemplates.readChatBoxRequest(message);
    console.log(reqObj);

    const user = {
        ...reqObj,
    };
    user.user = Application.getUserData(reqObj.customerId),
    
    Application.waitingList.push(reqObj);
    renderWaitingList();
    showIncomingMessage(user);
    
    onAcceptIncomingMessage(()=>{
        
        Application.connectedWith = reqObj.customerId;
        Application.connectedUser = Application.getUserData(Application.connectedWith);
        
    
        socket.send(ChatTemplates.acceptClient(true , reqObj.customerId));
        changeWindowTo('chats');
        renderChatBox();
        activateOnSubmitMessageCallback(socket);
    })

    onRejectIncomingMessage(()=>{
        socket.send(ChatTemplates.acceptClient(false , reqObj.customerId));
    })

    onAnyCaseIncomingMessage(()=>{
        removeIncomingMessage();
    })
}