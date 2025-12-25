import html from "../../html.js";
import { openSidebar, setSidebarContent } from "../drawerView.js";

const sideBarContent = html`<div class="product_data">
        <h2>Product Data</h2>
        <p>View and manage complete product information including name, price, availability, and stock status. Keep your inventory accurate and up to date for easy tracking and quick access.</p>
        <div class="field">
            <div class="label">id</div>
            <div class="value">{id}</div>
        </div>
        <div class="field">
            <div class="label">name</div>
            <div class="value">{name}</div>
        </div>
        <div class="field">
            <div class="label">quantity</div>
            <div class="value">{quantity}</div>
        </div>
        <div class="field">
            <div class="label">price</div>
            <div class="value">Rs {price}</div>
        </div>
        <div class="field">
            <div class="label">brand</div>
            <div class="value">{brand}</div>
        </div>
        <div class="field">
            <div class="label">category</div>
            <div class="value">{category}</div>
        </div>


        <div class="additional_setting">
            <h2 class="additional_setting__heading">
                Additional settings
            </h2>

            <p>Update product details or delete products easily. Manage changes quickly to keep your product list accurate and organized.</p>


            <div class="update-center setting-center">
              <h3 class="setting-center__heading">
                update center
              </h3>
              <p>Quickly update product details in one place.</p>
              <button class="update" data-id="{id}">update</button>
              
            </div>
            <div class="delete-center setting-center">
                <h3 class="setting-center__heading">
                    delete center
                </h3>
                <p>Remove products quickly and manage deletions easily.</p>
                <button class="delete" data-id="{id}">delete</button>

            </div>

        </div>

    </div>`;

export function renderProductData(product){
    if(!product) return;
    setSidebarContent(sideBarContent
        .replace('{name}' , product.name)
        .replaceAll('{id}' , product.id)
        .replace('{quantity}' , product.quantity)
        .replace('{price}' , product.price)
        .replace('{brand}' , product.brand || " ")
        .replace('{category}' , product.category || " ")
    );
    openSidebar()
}