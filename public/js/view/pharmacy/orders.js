import Application from "../../model/application/Application.js";

export async function getOrderData(id){
    try{
        const response = await fetch(`/api/v1/orders?id=${id}`);
        const data = await response.json();
        
        if(data.status == "error"){
            throw new Error(data.message);
        }
        
        return data;




    }catch(e){
        console.log(e);
        return {
            status:"error",
            data: [],
            message: e.message,
        }
    }
}