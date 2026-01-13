import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, showIncomingMessage } from "../../../view/chatbox.js";
import { changeWindowTo } from "../../../view/pharmacy/changeWindow.js";
import { renderWaitingList } from "../../../view/pharmacy/chat/renderWaitingList.js";
import PharmacyChatbox from "../../../view/pharmacy/PharmacyChatBox.js";
import { onClickAddNewItemButton } from "./onClickAddNewItemButton.js";
import { onPrescriptionRequest } from "./onPrescriptionRequest.js";
import { refreshCartList } from "./refreshCartList.js";

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
        PharmacyChatbox.renderChatBox();
        PharmacyChatbox.handleInputMessage((message)=>Application.connection.send(ChatTemplates.message(message)));
        Application.preventReload();
        onPrescriptionRequest();
        

        // activate add new item button
        onClickAddNewItemButton();






    })

    onRejectIncomingMessage(()=>{
        socket.send(ChatTemplates.acceptClient(false , reqObj.customerId));
    })

    onAnyCaseIncomingMessage(()=>{
        removeIncomingMessage();
    })
}