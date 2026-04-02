import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import { removeOrderItem, updateOrder } from "../../../model/pharmacy/orders.js";
import { swal } from "../../../view/swal.js";
import { refreshCartList } from "./refreshCartList.js";


export function onClickRemoveItemOnCart(){
    const cartContainer = document.querySelector(".chats .middle .body-section");
    cartContainer?.addEventListener("click" ,async e=>{
        const target = e.target;
        if(target.classList.contains("remove-btn")){
            const medicineCard = target.closest(".medicine_card");
            if(medicineCard){
                const itemId = medicineCard.dataset.orderitemid;
                const results = await removeOrderItem(Application.remoteOrderId , itemId )

                if(results.status == "success"){
                    Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId));
                    refreshCartList();

                    swal({
                        title:"order item removed",
                        icon:"success",
                    })
                }


            }
        }
    })

}