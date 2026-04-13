import Application from "../../../model/application/Application.js";
import { createOrder } from "../../../model/customer/orders.js";
import { swal } from "../../../view/swal.js";
import { sendConnectionRequests } from "./sendBatchConnectionRequest.js";

export async function redirect(){
    try{
        const order = await createOrder([] , Application.remotePrescription);
        if(order.status == "error"){
            throw new Error("some thing went wrong");
        }
        sendConnectionRequests(order.results.orderId);
    }catch(e){
        console.log(e);
        swal({
            title:"error",
            icon:"error",
            text:  e.message,
        })
    }
}