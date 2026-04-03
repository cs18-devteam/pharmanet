import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { updateOrder } from "../../../model/pharmacy/orders.js";
import { onAcceptIncomingMessage, onAnyCaseIncomingMessage, onRejectIncomingMessage, removeIncomingMessage, showIncomingMessage } from "../../../view/chatbox.js";
import { changeWindowTo } from "../../../view/pharmacy/changeWindow.js";
import { changeChatBoxName } from "../../../view/pharmacy/chat/changeChatboxName.js";
import { renderWaitingList } from "../../../view/pharmacy/chat/renderWaitingList.js";
import PharmacyChatbox from "../../../view/pharmacy/PharmacyChatBox.js";
import { renderToast } from "../../../view/renderToast.js";
import { onClickAddNewItemButton } from "./onClickAddNewItemButton.js";
import { onClickMedicineCardOnNewItemMenu } from "./onClickMedicineCardOnNewItemMenu.js";
import { onClickPaymentRequest } from "./onClickPaymentRequest.js";
import { onClickRemoveItemOnCart } from "./onClickRemoveItemOnCart.js";
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
    
    onAcceptIncomingMessage(async ()=>{
        
        Application.connectedWith = reqObj.customerId;
        Application.connectedUser = Application.getUserData(Application.connectedWith);
        
    
        socket.send(ChatTemplates.acceptClient(true , reqObj.customerId));
        changeWindowTo('chats');
        PharmacyChatbox.renderChatBox();
        changeChatBoxName();
        onClickMedicineCardOnNewItemMenu();

        PharmacyChatbox.handleInputMessage((message)=>Application.connection.send(ChatTemplates.message(message)));
        Application.preventReload();
        onPrescriptionRequest();
        onClickPaymentRequest();



        
        
        // activate add new item button
        onClickAddNewItemButton();
        onClickRemoveItemOnCart();





 

    })

    onRejectIncomingMessage(()=>{
        socket.send(ChatTemplates.acceptClient(false , reqObj.customerId));
    })

    onAnyCaseIncomingMessage(()=>{
        removeIncomingMessage();
    })
}