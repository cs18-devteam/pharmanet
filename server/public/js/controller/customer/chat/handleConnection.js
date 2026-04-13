import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { getPharmacyDetailsById } from "../../../model/customer/pharmacies.model.js";
import { createPrescriptionUploadCardContent } from "../../../view/chatbox.js";
import cart from "../../../view/customer/Cart.js";
import { createPaymentPopup } from "../../../view/customer/createPaymentPopup.js";
import CustomerChatBox from "../../../view/customer/CustomerChatBox.js";
import onClickSkipBtnOfPrescriptionPopup from "../../../view/customer/onClickSkipBtnOfPrescriptionPopup.js";
import { customerSyncOrder } from "../../../view/customer/syncOrder.js";
import html from "../../../view/html.js";
import { renderToast } from "../../../view/renderToast.js";
import { swal } from "../../../view/swal.js";
import { disconnect } from "../../common/disconnect.js";
import { requestConnectionWithPharmacy } from "../connection.js";
import getCartsIdsAndCreateOrder from "./getCartsIdsAndCreateOrder.js";
import { handlePaymentPopup } from "./handlePaymentPopup.js";
import onSelectPerscription from "./onSelectPerscription.js";
import { redirect } from "./redirectChat.js";
import { removeWait } from "./setUploadBoxToWaitingState.js";
import syncOrder from "./syncOrder.js";
const Chat = Application.MessageTemplates;


export default function handleConnection(msg){
    const message = msg.data;
    console.log(message);

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
        getPharmacyDetailsById(resObj.pharmacyId).then(e=>{
            Application.remotePharmacy = e.data;
        })


        

        if(resObj.accept){
            removeWait();
            getCartsIdsAndCreateOrder();
            CustomerChatBox.renderChatBox();
            Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId));

            CustomerChatBox.handleInputMessage((message)=>{
                Application.connection.send(Chat.message(message));
                
            })
            syncOrder(Application.remoteOrderId);
            // activateOnSubmitMessageCallback();

        }else{
            if(Application.remoteRedirectMode){
                if(Application.remotePharmacyList.length){
                    redirect();
                }else{
                    swal({
                        title:"Couldn't connect any pharmacy",
                        icon:"warning",
                        text :"you can try again , by uploading prescription again",
                    })
                }
            }
            cart.closeLeftPanel();
            renderToast("pharmacy rejected" , "error");



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
    }else if(Chat.isSyncRequest(message)){
        Application.remoteOrderId = ChatTemplates.decodeString(message).data.orderId;
        customerSyncOrder();
    }else{
        const {opcode , data} = ChatTemplates.decodeString(message);
        console.log(opcode , data);

        if(ChatTemplates.isRequestPayment(message)){
            cart.setPopupContent(createPaymentPopup())
            cart.openPopup();
            handlePaymentPopup();
        }



        if(opcode == ChatTemplates.requestPrescriptionCode){
            cart.setPopupContent(createPrescriptionUploadCardContent());
            CustomerChatBox.onSelectPrescription(onSelectPerscription)
            onClickSkipBtnOfPrescriptionPopup();
            cart.openPopup();


        }

    }

}

