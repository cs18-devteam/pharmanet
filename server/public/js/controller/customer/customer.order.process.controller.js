import Application from "../../model/application/Application.js";
// import ChatTemplates from "../../model/application/ChatTemplates.js";
import { getPharmacies } from "../../model/customer/pharmacies.model.js";
import { createRequestCards, renderRequestCards } from "../../view/customer/pharmacyRequestCard.js";
import { openLiveConnection, requestConnectionWithPharmacy } from "./connection.js";
import cart from "./../../view/customer/Cart.js";
import handleConnection from "./chat/handleConnection.js";
import getCartsIdsAndCreateOrder from "./chat/getCartsIdsAndCreateOrder.js";
const nearByPharmaciesContainer = document.querySelector('.pharmacyRequestContainer--nearby');


const cartContinueButton = document.querySelector('.overlay-cart__continue.continue');
const cartCancelButton = document.querySelector('.overlay-cart__continue.cancel')

cartContinueButton?.addEventListener('click' ,async ()=>{
    cart.openLeftPanel();
    const {results: pharmacies} = await getPharmacies({mode :'online'});
    const pharmacyRequestCards = createRequestCards(pharmacies);
    renderRequestCards(nearByPharmaciesContainer , pharmacyRequestCards);

})


cartCancelButton?.addEventListener("click" , ()=>{
    cart.close();
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











 