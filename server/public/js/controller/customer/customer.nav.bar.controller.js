import { getCustomerCarts, removeFromCart } from "../../model/customer/cart.model.js";
import { createCartCards } from "../../view/customer/cart.card.js";
import { swal } from "../../view/swal.js";
import cart from "./../../view/customer/Cart.js";
import { activateLocations } from "./location.controller.js";
activateLocations();

const btn_navMyCartBtn = document.querySelector('.setting-dropdown .cart-btn');

async function createAndRenderCarts(){
    cart.setRightSideContent(`<div class="header">
            <h2>Your cart</h2>
            <p>
              Here’s the list of medicines you selected. Nothing is saved until you continue with the process.
            </p>

          </div>

          <div class="carts_container">
            {carts}
          </div>

          <div class="cart-footer">
            <p class="info">Click Continue to see pharmacies that offer your selected medicines. Your information won’t be saved until you pick a pharmacy. If any medicine requires a prescription, you’ll be asked to upload it.</p>

            <div style="display: flex; margin-top: 2rem; justify-content: flex-end; gap: 1rem;">
              <button style="padding: 1rem 2rem; border-radius: 3rem; font-size: 1.8rem; color: #333;" class="overlay-cart__continue cancel">Cancel</button>
              <button class="overlay-cart__continue continue">continue</button>
            </div>
          </div>`);
    const customerCartData =await getCustomerCarts(1);
    const cartCards = createCartCards(customerCartData.results);
    const cartContainer = document.querySelector('.overlay-cart .carts_container');
    cartContainer.innerHTML = cartCards.join(' ');
}

btn_navMyCartBtn?.addEventListener('click' ,async ()=>{
    cart.openRightPanel();
    await createAndRenderCarts();
    const cartContainer = document.querySelector('.overlay-cart');
    
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
            if(results.status == "success"){
                await createAndRenderCarts();
            }

        }
    })
})

