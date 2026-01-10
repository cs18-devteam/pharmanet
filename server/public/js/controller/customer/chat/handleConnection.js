import Application from "../../../model/application/Application.js";
import cart from "../../../view/customer/Cart.js";
import CustomerChatBox from "../../../view/customer/CustomerChatBox.js";
import onClickSkipBtnOfPrescriptionPopup from "../../../view/customer/onClickSkipBtnOfPrescriptionPopup.js";
import { renderToast } from "../../../view/renderToast.js";
import { disconnect } from "../../common/disconnect.js";
import { requestConnectionWithPharmacy } from "../connection.js";
import getCartsIdsAndCreateOrder from "./getCartsIdsAndCreateOrder.js";
import onSelectPerscription from "./onSelectPerscription.js";
import syncOrder from "./syncOrder.js";
const Chat = Application.MessageTemplates;


export default function handleConnection(msg){
    const message = msg.data;

    if(Chat.isRequestConnection(message)){
        const {status} = Chat.readStablishConn(message)

        if(status == "success"){
            renderToast("connected  :)" , "success");
            requestConnectionWithPharmacy(Application.requestPharmacyId);
            CustomerChatBox.loading();
        }else{
            CustomerChatBox.setUserState("error");
        }

    }else if(Chat.isChatBoxResponseFromPharmacy(message)){
        const resObj = Chat.readChatBoxAcceptRequestFromServerToClient(message);

        Application.connectedWith = resObj.pharmacyId;
        if(resObj.accept){
            getCartsIdsAndCreateOrder();
            CustomerChatBox.renderChatBox();

            CustomerChatBox.handleInputMessage((message)=>{
                Application.connection.send(Chat.message(message));
                
            })
            syncOrder(Application.remoteOrderId);
            // activateOnSubmitMessageCallback();

        }
    }else if(Chat.isMessage(message)){
        const msgObj = Chat.readMessage(message);
        CustomerChatBox.incomingMessage(msgObj.message);

    
    
    }else if(Chat.isMinorError(message)){
        renderToast("something wrong with connection" , "error");
        return;
    }else if(Chat.isDisconnect(message)){
        CustomerChatBox.disconnect();
        console.log("disconnecting");
        disconnect();
        renderToast("disconnected" , "error");

    }else{
        const {opcode , data} = ChatTemplates.decodeString(message);
        console.log(opcode , data);

        if(opcode == ChatTemplates.requestPrescriptionCode){
            cart.setPopupContent(createPrescriptionUploadCardContent())
            CustomerChatBox.onSelectPrescription(onSelectPerscription)
            onClickSkipBtnOfPrescriptionPopup();
            cart.openPopup();


        }

    }

}

