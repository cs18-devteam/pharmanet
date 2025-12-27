import html from "../../../view/html.js";
import { openSidebar, setSidebarContent } from "../../../view/pharmacy/drawerView.js";
import { handleProductAddForm } from "./handleProductAddForm.js";

const productCreationForm = html`
    <form class="product_add_form" id="product_add_form">
        <h2 class="product_add_form__header">Create New Product</h2>



        <div class="field_container">
            <div class="field_header">Product Name</div>
            <p class="field_description">Enter a product name customers can easily identify.</p>
            <div class="field">
                    <input type="text" name="name" id="product_name">
            </div>
        </div>

        <div class="field_container">
            <div class="field_header">Product Price</div>
            <p class="field_description">Enter the selling price of the product.</p>
            <div class="field">
                    <input type="number" name="price" min="0">
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
                    <input type="text" name="brand">
            </div>
        </div>

        <div class="field_container">
            <div class="field_header">Category</div>
            <p class="field_description">Add the stock quantity visible to customers.</p>
            <div class="field">
                    <input type="text" name="category">
            </div>
        </div>

        <!-- <div class="field_container">
            <div class="field_header">Expire Date</div>
            <p class="field_description">Add the stock quantity visible to customers.</p>
            <div class="field">
                    <input type="text" name="category">
            </div>
        </div> -->

        <div class="field_container">
            <div class="field_header">Public Stock</div>
            <p class="field_description">Add the stock quantity visible to customers.</p>
            <div class="field">
                    <input type="number" name="quantity"  min="0">
            </div>
        </div>
        
        
        <div class="form-btns">
            <button class="save-btn">save</button>
        </div>


    </form>
`;

export function onClickAddProductBtn(){
    setSidebarContent(productCreationForm);
    openSidebar();
    handleProductAddForm();


    


}