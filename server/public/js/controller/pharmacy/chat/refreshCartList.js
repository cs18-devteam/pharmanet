import { getOrderItems } from "../../../model/pharmacy/orders.js";
import html from "../../../view/html.js";
import { updateChatBoxReceipt } from "../../../view/pharmacy/chat/updateChatBoxReceipt.js";
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
        if(item.itemType != "medicine") return;

        console.log(item.stock , item.discount , item );

        return html`
        <div class="medicine_card" data-orderItemId="${item.id}" data-medicineId="${item.details.id}" >
            <div class="medicine-card-header">
                <div class="dosage-icon">
                    <img width="60rem" src="${item.details.image}">  

                </div>


                <div class="details">
                    <div class="medicine__name">
                        <div class="name">Name</div>
                        ${item.details.geneticName}
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
                                <span>Rs<div class="price__value">&nbsp;${item.stock?.price || "Not Available"}</div></span>
                                
                            </span>
                        </div>
                    </div>
                
                    
                </div>

                <div class="remove-btn">
                    remove
                </div>
            </div>
            
            <div class="medicine-card-footer">
                ${item.stock ? html`
                    
                    <div class="card-footer unit">
                        Units <span>${item.quantity || 0}</span>
                    </div>
<!-- 
                    <div class="card-footer days">
                        Days <span>${item.days || 0}</span>
                    </div> -->

                    <div class="card-footer discount">
                        Discounts (Rs) <span>${item.discount || 0}</span>
                    </div>
                    ` : html`this medicine not available in pharmacy`
            
                }
            </div>

        </div>`;

    }))


    console.log(items);

    const productCards = items?.map((item=>{
        if(item.itemType != "product") return;


        return html`
        <div class="medicine_card product_card" type="product" data-orderItemId="${item.id}" data-medicineId="${item.details.id}" >
            <div class="medicine-card-header">
                <div class="dosage-icon">
                    <img width="60rem" src="${item.details.image}">  

                </div>


                <div class="details">
                    <div class="medicine__name">
                        <div class="name">Name</div>
                        ${item.details.name}
                    </div>
                    <div class="medicine__info">
                    
                        <div class="medicine__info__price">
                            <span>price</span>
                            <span class="price">
                                <span>Rs<div class="price__value">&nbsp;${item.details?.price || "Not Available"}</div></span>
                                
                            </span>
                        </div>
                    </div>
                
                    
                </div>

                <div class="remove-btn">
                    remove
                </div>
            </div>
            
            <div class="medicine-card-footer">
                ${item.details.quantity ? html`
                    
                    <div class="card-footer unit">
                        Units <span>${item.quantity}</span>
                    </div>


                    <div class="card-footer discount">
                        Discounts (Rs) <span>${items.discount || 0}</span>
                    </div>
                    ` : html`this medicine not available in pharmacy`
            
                }
            </div>

        </div>`;

    }))




    document.querySelector('.chats .middle .body-section').innerHTML  =  [...medicineCards , ...productCards].join(' ');



    updateChatBoxReceipt();

}