import { swal } from "../../view/swal.js";
import Application from "../application/Application.js";

export async function createOrder({
    userId  = undefined , 
    items = [{
         itemId ,
        itemType  : "product" || "medicine",
        quantity,
    }],
    paymentMethod = "cash" || "card",
    paymentStatus = "pending" || "complete",
}){
    try{

        const response =await fetch("/api/v1/orders" , {
            method:"POST",
            body: JSON.stringify({
                userId , 
                items,
                paymentMethod,
                paymentStatus,
                pharmacyId: Application.pharmacyId,
            })
        });
        
        const data = await response.json();
        
        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;
    }catch(e){
        console.log(e);
        return {
            results:"",
        }
    }

}



export async function updateOrder({
    userId , 
    prescription , 
    items = [{
        itemId , 
        itemType : "product" || "medicine",
        quantity ,
    }],
    paymentMethod = "cash" || "card",
    paymentStatus = "complete" || "pending",
}) {

    try{

        
        const formData = new FormData();
        formData.append('userId' , userId);
        formData.append('prescription' , prescription);
        formData.append('items' , items);
        formData.append('paymentMethod' , paymentMethod);
        formData.append('paymentStatus' , paymentStatus);
        
        
        const response = await fetch("/api/v1/orders" , {
            method:"PATCH",
            body : formData,
        })
        
        const data = await response.json();
        
        if(data.status == "error"){
            throw new Error(data.message);
        }
        
        return data;
    }catch(e){
        console.log(e);
        return {
            status:"error",
            results: [],
            message:e.message,
        }
    }
}

export async function addOrderItem({orderId , medicineId , productId , price , discount , quantity}){
    try{

        const response =await fetch(`/api/v1/orders/${Application.remoteOrderId}/items` , {
            method:"POST",
            body: JSON.stringify({
                orderId , 
                medicineId,
                productId,
                price,
                discount,
                quantity,
            })
        });
        
        const data = await response.json();
        
        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;
    }catch(e){
        console.log(e);
        return {
            results:"",
        }
    }
}

export async function getOrderItems(pharmacyId) {
      try{

        const response =await fetch(`/api/v1/orders/${Application.remoteOrderId}/items?pharmacyId=${pharmacyId ||Application.pharmacyId}`);
        
        const data = await response.json();
        
        if(data.status == "error"){
            throw new Error(data.message);
        }

        return data;
    }catch(e){
        console.log(e);
        return {
            results:"",
        }
    }
}


export async function getOrdersList() {
    try{
        const response =await fetch(`/api/v1/orders?pharmacy=${Application.pharmacyId}`);
        const data = await response.json();
        return data;


    }catch(e){
        console.log(e);
        return {
            results : ""
        }
    }
}




export async function  deleteOrder(orderId) {
    try{
        const response =await fetch(`/api/v1/orders/${orderId}` , {
            method:"DELETE",
        });
        if(response.status == 204){
            return {
                status:"success",
                message:"order deleted successfully"
            }
        }else{
            const data =  await response.json();
            if(data.status =="error"){
                throw new Error(data.message);
            }
        }


    }catch(e){
        console.log(e);



        return {
            status:'error',
            results : "",
            message:e.message || "internal server error",
        }
    }
}
