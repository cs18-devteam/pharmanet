import { createProduct } from "../../../model/pharmacy/fetchProductsData.js";
import { closeSidebar } from "../../../view/pharmacy/drawerView.js";
import { swal } from "../../../view/swal.js";
import { fetchAndRenderProducts } from "./fetchAndRenderProduct.js";

export async function handleProductAddForm(){
    const productAddForm = document.getElementById('product_add_form');
    productAddForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const formData = new FormData(productAddForm);
        const data = await createProduct(formData);
        if(data.status == "success"){
            swal({
                title:"product created",
                icon:"success",
            })
            fetchAndRenderProducts();
            closeSidebar();
        }else{
            swal({
                title:"product not created",
                text: data.message,
                icon:"error"
            })
        }
    })
}