import Application from "../../model/application/Application.js";
import { getOrderItems } from "../../model/pharmacy/orders.js";
import html from "../html.js";
import cart from "./Cart.js";

export async function customerSyncOrder(){
    await refreshCartList();
}





async function refreshCartList(){
    const data = await getOrderItems(Application.connectedWith);
    if (data.status == "error") {
        swal({
            title: "something went wrong",
            text: "can't request order cart data , may be its issue with your connection",
            icon: "error",
        })
    };


    let items = data.results.items;
    items = items.map(i=>{
        return html`
        <div class="cart_item">
            <div class="content">
                <img src="${i.details.image}" alt="">
                <div class="description">
                    <h4>
                        <div>Name</div>
                        <div>${i.details.geneticName}</div>
                    
                    </h4>
                    <div class="price">
                        <div class="label">
                            <img src="/cart/tag.svg" alt="🏷️">
                            price ${i.stock?.price}
                        </div>
                        <div class="amount">${i.quantity}</div>
                    </div>

                </div>
            </div>


            <!-- <div class="action-box select">
                <div class="select">
                    <input type="checkbox" id="select-8" name="id" data-id="8">
                    <label class="text" for="select-8">select</label>
                </div>


                <div class="remove">
                    <input type="checkbox" id="remove-8" data-id="8">
                    <label class="text" for="remove-8">
                        <img src="/cart/remove.svg" alt="X">
                        remove
                        
                    </label>
                </div>

                <div class="available">
                    <input type="checkbox" id="available-8" data-id="8">
                    <label class="text" for="available-8">
                        <img src="/cart/available.svg" alt="X">
                        available
                        
                    </label>
                </div>

                <div class="added">
                    <input type="checkbox" id="added-8" data-id="8">
                    <label class="text" for="added-8">
                        <img src="/cart/added.svg" alt="X">
                        added
                        
                    </label>
                </div>
                
            </div> -->
        </div>`
    })


    cart.setRightSideContent(items.join(' '));
    
    
}