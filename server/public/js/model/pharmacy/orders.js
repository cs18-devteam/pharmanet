import { swal } from "../../view/swal.js";
import Application from "../application/Application.js";
import ChatTemplates from "../application/ChatTemplates.js";

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
    id ,
    prescription , 
    paymentMethod,
    paymentStatus ,
    pharmacyId,
    status , 
}) {

    try{

        if(!id) throw new Error("no order id");
        const formData = {};
        formData.id = id;
        if(userId) formData.userId =  userId;
        if(prescription) formData.prescription= prescription ;
        if(paymentMethod) formData.paymentMethod= paymentMethod ;
        if(paymentStatus) formData.paymentStatus= paymentStatus ;
        if(pharmacyId) formData.pharmacyId= pharmacyId ;
        if(status) formData.status= status ;
        

        console.log(formData);
        
        const response = await fetch("/api/v1/orders" , {
            method:"PATCH",
            body : JSON.stringify(formData),
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
        swal({
            title :"Stock error",
            icon:"error",
            message: e.message,
        })


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


export async function removeOrderItem(orderId , itemId) {
    try{
        const res = await fetch(`/api/v1/orders/${orderId}/items` , {
            method:"DELETE",
            body : JSON.stringify({
                id : itemId,
            }),
        })

        if(!res.ok) throw new Error("Item not removed");
        if(res.status == 201){ 
            return {
                status:"success",
                message:"item removed successful",
            }
        }else{
            throw new Error("item not removed");
        }


    }catch(e){
        console.log(e);
        return {
            status:"error",
            error:'item cannot remove from the cart',
            message: e.message || " ",

        }
    }
}


export async function getOrder(orderId) {
    try{
        const res = await fetch(`/api/v1/orders?id=${orderId}`);
        const data = await res.json();
        return data;
    }catch(e){
        console.log(e);
        return {
            status:"error",
            error: e.message || "can not get order details"
        }
    }
}



export async function getTotalOrdersAndOrderCount(){
    try{
        const res = await fetch(`/api/v1/orders/summery?pharmacy=${Application.pharmacyId}`)

        const data = await res.json();
        return data;

    }catch(e){
        console.log(e);
        return {
            status:"success",
            error:"connection error",
            data :[]
        }
    }
    
}
