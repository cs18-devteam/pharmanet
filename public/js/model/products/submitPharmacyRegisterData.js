export async function submitPharmacyRegisterData(formData , customerId){
    try{
        const response = await fetch(`/api/v1/customers/${customerId}/pharmacy/register` , {
            method:"POST",
            body: formData,
        })

        const data = await response.json();

        if(data.status == "error"){
            throw new Error(data.error);
        }

        return {
            status:"success",
            results: data.results,
        }


    }catch(e){
        console.log(e);
        return {
            status:"error",
            message:"something went wrong",
            error: e,
        }
    }
}