import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { fetchOnlinePharmacies } from "../../model/customer/fetchPharmacies.js";
import { activateOnSubmitMessageCallback, createChatBox, renderMessage, renderReply, setOnSubmitMessageCallback, spinner } from "../../view/chatbox.js";
import { createRequestCards, renderRequestCards } from "../../view/customer/pharmacyRequestCard.js";
import { renderToast } from "../../view/renderToast.js";
import { openLiveConnection, requestConnectionWithPharmacy } from "./connection.js";
import cart from "./customer.cart.controller.js";
const nearByPharmaciesContainer = document.querySelector('.pharmacyRequestContainer--nearby');
const Chat = Application.MessageTemplates;



const cartContinueButton = document.querySelector('.overlay-cart__continue.continue');

cartContinueButton?.addEventListener('click' ,async ()=>{
    cart.openLeftPanel();
    const {results: pharmacies} = await fetchOnlinePharmacies();
    const pharmacyRequestCards = createRequestCards(pharmacies);
    renderRequestCards(nearByPharmaciesContainer , pharmacyRequestCards);
})




nearByPharmaciesContainer?.addEventListener('click' , async (e)=>{
    const {target} =  e;

    const requestBtn = target.closest('.request-btn')
    if(requestBtn){
        Application.requestPharmacyId = requestBtn.dataset.id;
        cart.setLeftSideContent('');
        Application.connection = await openLiveConnection();
        Application.connection.addEventListener('message' , handleConnection)
    }
})



function handleConnection(msg){
    const message = msg.data;
    console.log(message);

    if(Chat.isRequestConnection(message)){
        const {status} = Chat.readStablishConn(message)

        if(status == "success"){
            renderToast("connected  :)" , "success");
            requestConnectionWithPharmacy(Application.requestPharmacyId);
            cart.setLeftSideContent(spinner())
        }else{
            console.log('connection unsuccessful');
        }


    }else if(Chat.isChatBoxResponseFromPharmacy(message)){
        const resObj = Chat.readChatBoxAcceptRequestFromServerToClient(message);
        console.log(resObj);

        Application.connectedWith = resObj.pharmacyId;
        if(resObj.accept){
            cart.setLeftSideContent(createChatBox());
            activateOnSubmitMessageCallback();

        }


    }else if(Chat.isMessage(message)){
        const msgObj = Chat.readMessage(message);

        renderMessage(msgObj.message);
    }

}





setOnSubmitMessageCallback((e , value)=>{
    Application.connection.send(ChatTemplates.message(value));  
    renderReply(value);
})




