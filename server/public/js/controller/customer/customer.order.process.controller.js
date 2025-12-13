import Application from "../../model/application/Application.js";
import { fetchOnlinePharmacies } from "../../model/customer/fetchPharmacies.js";
import { renderChatBox, renderReply } from "../../view/customer/chatBox.js";
import { createRequestCards, renderRequestCards } from "../../view/customer/pharmacyRequestCard.js";
import { openLiveConnection, requestConnectionWithPharmacy } from "./connection.js";
import cart from "./customer.cart.controller.js";
const nearByPharmaciesContainer = document.querySelector('.pharmacyRequestContainer--nearby');



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
    const content = msg.data;
    console.log(content);

    if(content.startsWith('STABLISH=')){
        const {status} = JSON.parse(content.replace("STABLISH=" , ''));

        if(status == "success"){
            console.log("connected with server")
            requestConnectionWithPharmacy(Application.requestPharmacyId);
            
        }else{
            alert("connection feild")
        }
    }else if(content.startsWith('RES_PHR=')){
        const resObj = JSON.parse(content.replace("RES_PHR=" , ''));
        Application.connectedWith = resObj.pharmacyId;
        if(resObj.accept){
            renderChatBox();

        }
    }else if(content.startsWith("MSG=")){
        const msgObj = JSON.parse(content.replace("MSG=" , ''));

        renderReply(msgObj.message);
    }

}




