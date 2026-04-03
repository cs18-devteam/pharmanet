import Application from "../../../model/application/Application.js";
import ChatTemplates from "../../../model/application/ChatTemplates.js";
import Payment from "../../../model/Payment.js";
import { getOrder } from "../../../model/pharmacy/orders.js";
import cart from "../../../view/customer/Cart.js";
import { renderToast } from "../../../view/renderToast.js";
import { swal } from "../../../view/swal.js";

export async function handlePaymentPopup() {
    try {
        const paymentCard = document.querySelector(".payment-popup .payment-methods .card");
        const paymentCash = document.querySelector(".payment-popup .payment-methods .cash");

        console.log(paymentCard , paymentCash);

        if (!paymentCard) return;
        if (!paymentCash) return;

        const { status, data: order } = await getOrder(Application.remoteOrderId);
        if (status != "success") {
            // swal({
            //     title: "Connection Issue",
            //     text: "can't find order",
            //     icon: "error",
            // })
            renderToast("connection issue" , "error");
            cart.closePopup();
            return;
            
            
        }

        console.log(paymentCard , paymentCash , order);
        
        if (!order) {
            // swal({
                //     title: "Remote Order not found",
                //     text: "can't find order",
                //     icon: "error",
                // })
                renderToast("Remote Order Not Found" , "error");
            cart.closePopup();
            return;

        }




        paymentCard.addEventListener("click", async () => {
            cart.closePopup();

            if (!order.total) {
                // swal({
                //     title: "your order still has no value",
                //     text: "click payment after order has some value",
                //     icon: "warning",
                // })
                renderToast("Still No order Item" ,"error");
                cart.closePopup();
                return;
            }

            const payment = await Payment.create({
                orderId: Application.remoteOrderId,
                first_name: Application?.user?.firstName || " ",
                last_name: Application?.user?.lastName || " ",
                address: Application.user?.town || "-",
                amount: order.total,
                callback : ()=>{
                    Application.connection.send(ChatTemplates.syncConnection(Application.remoteOrderId));
                }
            })

            await payment.makePayment();
            // swal({
            //     title: "payment complete",
            //     icon: "success",
            // })
        })

        paymentCash.addEventListener("click", () => {
            cart.closePopup();
        })




    } catch (e) {
        console.log(e);
        swal({
            title: "payment failed",
            icon: "error",
            text: e.message || "",
        })
    }
}