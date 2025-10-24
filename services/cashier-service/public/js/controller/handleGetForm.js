import { get } from "../model/productModel";

export default async function handleGetForm(formData){
    try{
        const respond = await get(formData);
        if(respond){
            console.log(respond);
        }
    }catch(e){
        console.error("Error from handleGetForm :" , {formData , e});
    }
    

}