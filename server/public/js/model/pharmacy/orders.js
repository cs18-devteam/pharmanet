export async function createOrder({
    userId  = undefined , 
    items = [{
         itemId ,
        itemType  : "product" || "medicine",
        quantity,
    }]
}){
    try{

        const response =await fetch("/api/v1/orders" , {
            method:"POST",
            body: JSON.stringify({
                userId , 
                items,
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


