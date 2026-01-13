import { fetchAndRenderProducts } from "./fetchAndRenderProduct.js";
import { deleteProduct } from "../../../model/pharmacy/fetchProductsData.js";
import { swal } from "../../../view/swal.js";

export async function handleProductDeleteButton(){
    const deleteButton = document.querySelector(".additional_setting .delete");
    deleteButton?.addEventListener("click" , ()=>{
        swal({
            title:"Do you want to Delete ?",
            text :"do you want to delete this product and it's permanent",
            showConfirmButton : true,
            icon:"question",
            confirmButtonText: "delete",
            showCancelButton : true,
        }).then(async results=>{
            if(results.isConfirmed){
                const data = await deleteProduct(deleteButton.dataset.id);
                if(data.status == "error"){
                    swal({
                        title:"product not deleted !",
                        icon:"error",
                    })
                }else{
                    fetchAndRenderProducts();
                    swal({
                        title:"product deleted successful",
                        icon:"success",
                    })
                }
            }
        })
    })

}