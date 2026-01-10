import { getOrderItems } from "../../../model/pharmacy/orders.js";
import html from "../../../view/html.js";
import { renderMedicineCards } from "../../../view/pharmacy/renderMedicineCards.js";
import { swal } from "../../../view/swal.js";

export async function refreshCartList() {
    const data = await getOrderItems();
    if (data.status == "error") {
        swal({
            title: "something went wrong",
            text: "can't request order cart data , may be its issue with your connection",
            icon: "error",
        })
    }

    const items = data.results.items;

    const medicineCards = items?.map((item=>{
        return html`
        <div class="medicine_card">
            <div class="medicine-card-header">
                <div class="dosage-icon">
                    <img width="60rem" src="/images/bottel_of_pills.svg">  

                </div>


                <div class="details">
                    <div class="medicine__name">
                        <div class="name">Name</div>
                        AMPICILLIN SODIUM FOR INJECTION BP 250MG
                    </div>
                    <div class="medicine__info">
                    
                        <div class="medicine__info__price">
                            <span>
                                <div class="store-as__icon">
                                    <img src="/images/price_tag.svg" width="20rem">
                                </div>
                            </span>
                            <span>price</span>
                            <span class="price">
                                <span>Rs<div class="price__value">${item.price || "unknown"}</div></span>
                                
                            </span>
                        </div>
                    </div>
                
                    
                </div>

                <div class="added-btn">
                    Added +
                </div>
            </div>

            <div class="medicine-card-footer">

                <div class="card-footer unit">
                    Units <span>${item.quantity}</span>
                </div>

                <div class="card-footer days">
                    Days <span>${items.days}</span>
                </div>

                <div class="card-footer discount">
                    Discounts (Rs) <span>${items.discount}</span>
                </div>
            </div>
        

        </div>`;

    }))


    document.querySelector('.chats .middle .body-section').innerHTML  =  medicineCards.join(' ');

}