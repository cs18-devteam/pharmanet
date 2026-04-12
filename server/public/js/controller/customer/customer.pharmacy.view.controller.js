import Application from "../../model/application/Application.js";
import getCartsIdsAndCreateOrder from "./chat/getCartsIdsAndCreateOrder.js";
import handleConnection from "./chat/handleConnection.js";
import { openLiveConnection } from "./connection.js";

const searchbar = document.querySelector('.search-bar input');

const url = new URL(window.location.href);

if (searchbar) {

    searchbar.value = url.searchParams.get('search')
}

searchbar?.addEventListener("change", e => {
    const value = e.target.value;
    if (value) {
        window.location.href = `${url.origin}${url.pathname}?search=${value}`;
    } else {
        window.location.href = `${url.origin}${url.pathname}`;

    }
})


document.body.addEventListener('click', async e => {
    const target = e.target;
    const messageBtn = target.closest(".contact-card .btn");
    const contactCart = target.closest(".contact-card");
    if (messageBtn) {
        const pharmacyId = contactCart.dataset.id;
        Application.requestPharmacyId = pharmacyId;
        await getCartsIdsAndCreateOrder();
        Application.connection = await openLiveConnection();
        Application.connection.addEventListener('message', handleConnection)
    }
})
