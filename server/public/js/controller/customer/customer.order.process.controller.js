import Application from "../../model/application/Application.js";
import ChatTemplates from "../../model/application/ChatTemplates.js";
import { getPharmacies } from "../../model/customer/pharmacies.model.js";
import { activateOnSubmitMessageCallback, createChatBox, createPrescriptionUploadCardContent, onSelectPrescription, renderMessage, renderReply, setOnSubmitMessageCallback, spinner } from "../../view/chatbox.js";
import { createRequestCards, renderRequestCards } from "../../view/customer/pharmacyRequestCard.js";
import { renderToast } from "../../view/renderToast.js";
import { openLiveConnection, requestConnectionWithPharmacy } from "./connection.js";
import cart from "./../../view/customer/Cart.js";
import { createOrder } from "../../model/customer/orders.js";
const nearByPharmaciesContainer = document.querySelector('.pharmacyRequestContainer--nearby');
const Chat = Application.MessageTemplates;
const navCartButton = document.querySelector('nav .setting-dropdown .cart-btn');


// async function startOrderProcess(e){
//     const data = await fetchCustomerCartData();
//     console.log(data);
//     cart.openLeftPanel();
// }

const cartContinueButton = document.querySelector('.overlay-cart__continue.continue');

cartContinueButton?.addEventListener('click' ,async ()=>{
    cart.openLeftPanel();
    const {results: pharmacies} = await getPharmacies({mode :'online'});
    const pharmacyRequestCards = createRequestCards(pharmacies);
    renderRequestCards(nearByPharmaciesContainer , pharmacyRequestCards);

})







nearByPharmaciesContainer?.addEventListener('click' , async (e)=>{
    const {target} =  e;

    const requestBtn = target.closest('.request-btn')
    if(requestBtn){
        Application.requestPharmacyId = requestBtn.dataset.id;
        cart.setLeftSideContent('');
        await getCartsIdsAndCreateOrder();
        Application.connection = await openLiveConnection();
        Application.connection.addEventListener('message' , handleConnection)
    }
})



async function getCartsIdsAndCreateOrder() {
    const carts = document.querySelectorAll('.carts_container > .cart_item .action-box .select input[type="checkbox"]');
    const cartsIds = new Set();
    Array.from(carts).forEach(el=>{
        if(el.checked){
            cartsIds.add(el.dataset.id);
        }
    });

    const data = await createOrder(Array.from(cartsIds));


    Application.remoteOrderId = data.results.orderId; 

    
    return Application.requestPharmacyId;


}

function syncOrder(){
    console.log('syncing...');
    if(!Application.remoteOrderId) throw new Error("no remote order Id");
    Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId))
}


function handleConnection(msg){
    const message = msg.data;

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
            getCartsIdsAndCreateOrder();
            cart.setLeftSideContent(createChatBox());
            syncOrder(Application.remoteOrderId);
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
                        Application.connection.send(ChatTemplates.syncConnection(data.orderId));
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













 