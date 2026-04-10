import Application from "../application/Application.js";

export async function getPharmacies({mode="online" , carts = []}={}){
    try{

        console.log(carts);
        const response = await fetch(`/api/v1/pharmacies?mode=${mode}${carts.length ? `&&carts=${carts.join(',')}` : " "}`);
        const data = await response.json();
        if(data.status == "error"){
            throw new Error(data.error);
        }


        return {
            status: data.status,
            results: data.results,
        }
    }catch(e){
        return {
            status:"error",
            results:[],
            message:"something went wrong"
        }
    }
}


export async function getPharmacyDetailsById(id) {
    try{

        if(!id) return {
            status:"error",
            message:"no id",
        }   
        
        const res = await fetch(`/api/v1/customers/${Application.userId}/pharmacies/${id}`);
        const data = await res.json();
        console.log(data);
        return data;
    }catch(e){
        console.log(e);

        return {
            status:"error",
            message:e.message || "some thing went wrong"
        }
    }
}