import Application from "../application/Application.js";




export async function getCustomerCarts({customerId = Application.userId}={}){
    try{

        const response = await fetch(`/api/v1/customers/${customerId}/cart` , {
            method : "GET",
        })
        
        const data = await response.json();

        if(data.status == "error"){
            throw new Error("something went wrong");
        }


        return {
            status:"success",
            results : data.results,
        }



    }catch(e){
        console.log(e);
        return {
            status:"error",
            results:[],
        }
    }
}


export async function addToCart(medicineId){
    try{

        if(!medicineId) throw new Error("medicine id not defined");

        const response = await fetch(`/api/v1/customers/${Application.userId}/cart` , {
            method:"POST",
            body : JSON.stringify({
                id : Application.userId,
                type : "medicine",
                quantity : 0,
                itemId : medicineId
            })
        });
        const data = await response.json();
        if(data.status == "success"){
            return data;
        }else{
            throw new Error(data.message);
        }
    }catch(e){
        console.log(e);
        return {
            status:"error",
            message: e.message,
            results : [],
        }
    }


}


export async function removeFromCart(medicineId){
    try{

        if(!medicineId) throw new Error("medicine id not defined");

        const response = await fetch(`/api/v1/customers/${Application.userId}/cart` , {
            method:"DELETE",
            body : JSON.stringify({
                id : Application.userId,
                type : "medicine",
                quantity : 0,
                itemId : medicineId
            })
        });
        if(response.status == 204){
            return {
                status:"success",
            };
        }else{
            throw new Error("remove form cart operation failed");
        }
    }catch(e){
        console.log(e);
        return {
            status:"error",
            message: e.message,
            results : [],
        }
    }


}