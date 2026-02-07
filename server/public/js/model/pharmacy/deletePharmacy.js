import Application from "../application/Application.js"

export async function deletePharmacy() {
    try{
        const response = await fetch(`/pharmacy/${Application.pharmacyId}` , {
            method:"DELETE"
        })
        const data = await response.json();
        if(data.status == "success"){
            return {
                status:"success",
            }
        }else{
            throw new Error(data.message || "pharmacy not deleted");
        }




    }catch(e){
        return {
            status:"error",
            message : e.message,
        }
    }
}