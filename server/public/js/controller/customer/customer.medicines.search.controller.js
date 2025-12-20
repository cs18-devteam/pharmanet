import { addToCart } from "../../model/customer/cart.model.js";
import { renderToast } from "../../view/renderToast.js";

const medicineCardsContainer = document.querySelector(".landing .Medicines_grid");


if(medicineCardsContainer){
    medicineCardsContainer.addEventListener('click' ,async (e)=>{
        const target = e.target;
        const medicineCart = target.closest('.medicine-card');
        /**
         * @type {HTMLElement}
         */
        const addToCartBtn = target.closest('.add-to-cart');

        if(addToCartBtn){
            const medicineId = medicineCart.dataset.id;
            if(!medicineId) throw new Error("can not fine medicine id");

            addToCartBtn.textContent = "wait...";
            const newCartItem = await addToCart(medicineId);
            if(newCartItem.status =="success"){
                renderToast("added to cart");
                addToCartBtn.style.display = "none";
            }


        }
    })







}else{
    console.warn("medicine cards container can't find");
}