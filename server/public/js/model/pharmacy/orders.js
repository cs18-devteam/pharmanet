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

export async function getOrderItems() {
      try{

        const response =await fetch(`/api/v1/orders/${Application.remoteOrderId}/items`);
        
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


