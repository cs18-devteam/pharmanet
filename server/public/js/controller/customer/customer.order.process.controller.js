import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { fetchOnlinePharmacies } from "../../model/customer/fetchPharmacies.js";
import { activateOnSubmitMessageCallback, createChatBox, createPrescriptionUploadCardContent, onSelectPrescription, renderMessage, renderReply, setOnSubmitMessageCallback, spinner } from "../../view/chatbox.js";
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

        Application.connectedWith = resObj.pharmacyId;
        if(resObj.accept){
            cart.setLeftSideContent(createChatBox());
            activateOnSubmitMessageCallback();

        }
    }else if(Chat.isMessage(message)){
        const msgObj = Chat.readMessage(message);

        renderMessage(msgObj.message);

    
    
    }else if(Chat.isMinorError(message)){
        renderToast("something wrong with connection" , "error");
        return;
    }else{
        const {opcode , data} = ChatTemplates.decodeString(message);
        console.log(opcode , data);

        if(opcode == ChatTemplates.requestPrescription){
            cart.setPopupContent(createPrescriptionUploadCardContent())
            cart.openPopup();

            onSelectPrescription(async (e , input , card , skip)=>{
                try{
                    skip.addEventListener('click' ,()=>cart.closePopup());



                    const file = input.files[0];
                    const formData = new FormData();
                    formData.append('prescription' , file);

                    const cartUploadButton = card.querySelector('label[for="prescription-upload-input"]');
                    const response = await fetch(`/api/v1/customers/${Application.userId}/chats/assets/prescriptions` , {
                        method:"POST",
                        body : formData,
                    });

                    const data = await response.json();
                    if(data.status == "success"){
                        Application.connection.send(ChatTemplates.statusPrescription(data.path , data.status));
                    }else{
                        renderToast("prescription upload failed" , 'error');    
                    }
                    cart.closePopup();



                    cartUploadButton.textContent = "uploading...";




                }catch(e){
                    console.log(e);
                }


            })

        }

    }

}





setOnSubmitMessageCallback((e , value)=>{
    console.log(ChatTemplates.message(value));
    Application.connection.send(ChatTemplates.message(value));  
    renderReply(value);
})







 