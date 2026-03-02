import { addToCart } from "../../model/customer/cart.model.js";
import { renderToast } from "../../view/renderToast.js";

const cardsContainer = document.querySelector(".grid");


if(cardsContainer){
    cardsContainer.addEventListener('click' ,async (e)=>{
        const target = e.target;
        const cta = target.closest('.cta.medicine');
        /**
         * @type {HTMLElement}
         */

        if(cta){
            const medicineId = cta.dataset.id;
            if(!medicineId) throw new Error("can not fine medicine id");

            cta.textContent = "wait...";
            const newCartItem = await addToCart(medicineId);
            if(newCartItem.status =="success"){
                renderToast("added to cart");
                cta.textContent = "Added";
                cta.classList.add('added');
            }


        }
    })







}else{
    console.warn("medicine cards container can't find");
}