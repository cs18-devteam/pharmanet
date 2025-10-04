export function getFormData(formElement , submitterElement){
    try{
        const formData = new FormData(formElement , submitterElement );
        return formData;
    }catch(e){
        console.error("Error From GetFormData :\n" , {formElement , submitterElement , e});
        throw e;
    }
}

export function handleForm(formEl , callback){
    formEl.addEventListener('submit' ,async (e)=>{
        const formData = getFormData(formEl , e.target);
        return await callback(formData);
    } )
}