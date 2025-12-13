import Application from "../../model/application/Application.js";
import { fetchOnlinePharmacies } from "../../model/customer/fetchPharmacies.js";
import { createRequestCards, renderRequestCards } from "../../view/customer/pharmacyRequestCard.js";
import { openLiveConnection, requestConnectionWithPharmacy } from "./connection.js";
import cart from "./customer.cart.controller.js";
const nearByPharmaciesContainer = document.querySelector('.pharmacyRequestContainer--nearby');


let connection = undefined;
Application.requestPharmacyId = undefined;

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
        Application.requestPharmacyId = target.dataset.id;
        cart.setLeftSideContent('');
        connection = await openLiveConnection();
        connection.addEventListener('message' , handleConnection)
    }
})



async function handleConnection(msg){
    const content = msg.data;

    if(content.startsWith('STABLISH=')){
        const {status} = JSON.parse(content.replace("STABLISH=" , ''));

        if(status == "success"){
            alert("connected with server")
            requestConnectionWithPharmacy(Application.requestPharmacyId)
        }else{
            alert("connection feild")
        }
    }
}