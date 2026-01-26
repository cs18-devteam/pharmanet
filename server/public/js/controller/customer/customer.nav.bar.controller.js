import { getCustomerCarts, removeFromCart } from "../../model/customer/cart.model.js";
import { createCartCards } from "../../view/customer/cart.card.js";
import { swal } from "../../view/swal.js";
import cart from "./../../view/customer/Cart.js";

const btn_navMyCartBtn = document.querySelector('.setting-dropdown .cart-btn');

async function createAndRenderCarts(){
    const customerCartData =await getCustomerCarts(1);
    const cartCards = createCartCards(customerCartData.results);
    const cartContainer = document.querySelector('.overlay-cart .carts_container');
    cartContainer.innerHTML = cartCards.join(' ');
}

btn_navMyCartBtn?.addEventListener('click' ,async ()=>{
    cart.openRightPanel();
    await createAndRenderCarts();
    const cartContainer = document.querySelector('.overlay-cart .carts_container');
    
    cartContainer.addEventListener('click' ,async e=>{
        const removeFromCartBtn = e.target.closest('.remove-from-cart-btn');
        if(removeFromCartBtn){
            const cart = e.target.closest('.cart_item');
            const id =(cart.dataset.id);

            if(!id){
                swal({
                    title:"something went wrong",
                    text: "no cart id found",
                })
            }

            const results = await removeFromCart(id);
            console.log(results);
            if(results.status == "success"){
                await createAndRenderCarts();
            }

        }
    })
})

