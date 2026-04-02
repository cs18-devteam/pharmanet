import html from "../html.js";
import Application from "../../model/application/Application.js";
import { getOrder, getOrderItems } from "../../model/pharmacy/orders.js";

export async function displayUploadedPrescription(prescription) {
    try {
        if (!prescription) return;

        const img = document.querySelector('.overlay-cart-right-side-open-prescription-image');

        if(img && img.getAttribute('src')){
            return;
        }

        document.querySelector(".overlay-cart .right-side open")?.insertAdjacentHTML('afterbegin', html`
                <img style="width: 10rem ; height: 10rem; border-radius: 1rem; overflow: hidden ; object-fit:cover; " class="overlay-cart-right-side-open-prescription-image" src="${prescription}" />    
        `)

    } catch (e) {
        console.log(e);
    }


}