export async function fetchCustomerCartData(customerId){
    try{

        const response = await fetch(`/api/v1/customers/${customerId}/carts` , {
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