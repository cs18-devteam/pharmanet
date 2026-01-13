import { updateProduct } from "../../../model/pharmacy/fetchProductsData.js";
import { closeSidebar } from "../../../view/pharmacy/drawerView.js";
import { swal } from "../../../view/swal.js";
import { fetchAndRenderProducts } from "./fetchAndRenderProduct.js";

export async function handleProductUpdateForm() {
    const form = document.getElementById("product_update_form");
    form?.addEventListener('submit' , async e=>{
        e.preventDefault();
        const updateBtn = form.querySelector('.update-btn');

        const formData = new FormData(form)
        const data = await updateProduct(updateBtn.dataset.id ,formData);
        
        if(data.status == "success"){
            swal({
                title:"product Updated",
                icon:"success",
            }).then(()=>closeSidebar())
            fetchAndRenderProducts();
            
        }

    })

    form.addEventListener('click' , e=>{
        const target  = e.target;
        
        
        if(target.closest('.cancel-btn')){
            e.stopPropagation();
            closeSidebar();
        }
    })
}