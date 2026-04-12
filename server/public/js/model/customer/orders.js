import Application from "../application/Application.js";

export async function createOrder(cartsIds=[]) {
    try{
        const response = await fetch('/api/v1/orders' , {
            method: "POST",
            body : JSON.stringify({
                staffId : Application.staffId,
                userId : Application.userId,
                carts: cartsIds,
            })
        })

        const data = await response.json();
        return data;

    }catch(e){
        console.log(e);
        return {
            status:"error",
            results: [],
            message: e.message,
        }
    }
}


export async function uploadPrescriptionAndCreateOrder(prescription){
    try{
        if(!prescription) return;
        const form = new FormData();
        form.append("prescription" , prescription)

        const response = await fetch("/api/v1/orders/prescription" , {
            method :"POST",
            body : form,
        });

        const results = await response.json();
        return results;

    }catch(e){
        return {
            status:"error",
            message: e.message || "file not uploaded"
        }

    }
}