import { getProductData } from "../../../model/pharmacy/fetchProductsData.js";
import html from "../../../view/html.js";
import { closeSidebar, openSidebar, setSidebarContent } from "../../../view/pharmacy/drawerView.js";
import { handleProductUpdateForm } from "./handleProductUpdateFrom.js";


const sidebarContent = html`
    <form class="product_update_form" enctype="multipart/form-data" id="product_update_form">
        <h2 class="product_update_form__header">Update Product</h2>



        <div class="field_container">
            <div class="field_header">Product Name</div>
            <p class="field_description">Enter a product name customers can easily identify.</p>
            <div class="field">
                    <input type="text" name="name" id="product_name" value="{name}">
            </div>
        </div>

        <div class="field_container">
            <div class="field_header">Product Price</div>
            <p class="field_description">Enter the selling price of the product.</p>
            <div class="field">
                    <input type="number" name="price" value="{price}" min="0">
            </div>
        </div>

        <div class="field_container">
            <div class="field_header">Select Product Image</div>
            <p class="field_description">Add a product image to help customers recognize it easily.</p>
            <div class="field">
                    <label class="upload-btn" for="product_image">upload</label>
                    <input type="file" name="image" id="product_image">
            </div>
        </div>


        
        <div class="field_container">
            <div class="field_header">Brand</div>
            <p class="field_description">Add the stock quantity visible to customers.</p>
            <div class="field">
                    <input type="text" name="brand" value="{brand}">
            </div>
        </div>

        <div class="field_container">
            <div class="field_header">Category</div>
            <p class="field_description">Add the stock quantity visible to customers.</p>
            <div class="field">
                    <input type="text" name="category" value="{category}">
            </div>
        </div>


        <div class="field_container">
            <div class="field_header">Public Stock</div>
            <p class="field_description">Add the stock quantity visible to customers.</p>
            <div class="field">
                    <input type="number" name="quantity" value="{quantity}"  min="0">
            </div>
        </div>
        
        
        <div class="form-btns">
            <button class="cancel-btn">cancel</button>
            <button class="update-btn" data-id="{id}">Update</button>
        </div>


    </form>
`



export async function handleProductUpdateButton() {
    const updateButton = document.querySelector(".additional_setting .update");
    
    updateButton?.addEventListener("click" ,async (e)=>{
        e.stopPropagation();
        const {results: product} =await getProductData(updateButton.dataset.id);
        setSidebarContent(sidebarContent
            .replace('{id}', product.id)
            .replace('{name}', product.name)
            .replace('{price}', product.price)
            .replace('{brand}', product.brand)
            .replace('{category}', product.category)
            .replace('{quantity}', product.quantity)
        )
        handleProductUpdateForm();
        
    })
}