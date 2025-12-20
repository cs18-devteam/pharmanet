import Application from "../application/Application.js";

export async function createOrder(cartsIds=[]) {
    try{
        const response = await fetch('/api/v1/orders' , {
            method: "POST",
            body : JSON.stringify({
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