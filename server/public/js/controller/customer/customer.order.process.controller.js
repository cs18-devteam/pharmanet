import Application from "../../model/application/Application.js";
// import ChatTemplates from "../../model/application/ChatTemplates.js";
import { getPharmacies } from "../../model/customer/pharmacies.model.js";
import { createRequestCards, renderRequestCards } from "../../view/customer/pharmacyRequestCard.js";
import { openLiveConnection, requestConnectionWithPharmacy } from "./connection.js";
import cart from "./../../view/customer/Cart.js";
import handleConnection from "./chat/handleConnection.js";
import getCartsIdsAndCreateOrder, { getCartIds } from "./chat/getCartsIdsAndCreateOrder.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";


const overlayRightSide = document.querySelector(".overlay-cart .right-side");
overlayRightSide?.addEventListener("click", (e) => {

    const target = e.target;
    const cartContinueButton = target.closest('.overlay-cart__continue.continue');

    cartContinueButton?.addEventListener('click', async () => {
        cart.openLeftPanel();
        renderSpinner();
        const { results: pharmacies } = await getPharmacies({ mode: 'online', carts: getCartIds() });
        removeSpinner();

        if (!pharmacies.length) {
            swal({
                title: "Pharmacies not available this time",
                text: "try again later or you can directly call",
                icon: 'warning',
            })
        }
        const pharmacyRequestCards = createRequestCards(pharmacies);
        renderRequestCards(pharmacyRequestCards);


    })

    const cartCancelButton = target.closest(".overlay-cart__continue.cancel");


    cartCancelButton?.addEventListener("click", () => {
        cart.close();
    })
})

const overlayLeftSide = document.querySelector(".overlay-cart .left-side");

overlayLeftSide?.addEventListener('click', async e => {
    const { target } = e;

    const requestBtn = target.closest('.request-btn')
    if (requestBtn) {
        Application.requestPharmacyId = requestBtn.dataset.id;
        cart.setLeftSideContent('');
        await getCartsIdsAndCreateOrder();
        Application.connection = await openLiveConnection();
        Application.connection.addEventListener('message', handleConnection)
    }

})













