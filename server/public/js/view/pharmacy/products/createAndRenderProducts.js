import html from "../../html.js";
import { updateProductsCount } from "./updateProductsStats.js";

const template = html`
    <div class="medicine_card" data-id="{id}">
    <div class="dosage-icon {type}">
        
        <img width="60rem" src="{image}">  

    </div>


    <div class="details">
        <div class="medicine__name">
            <div class="name">Name</div>
            {name}
        </div>
        <div class="medicine__info">
            
            <div class="medicine__info__price">
                <!-- <span>
                    <div class="store-as__icon">
                        <img src="{image}" width="20rem">
                    </div>
                </span> -->
                <span>price</span>
                <span class="price">
                    <div class="price__value">Rs. {price}</div>
                    <!-- <span class="price__identifier">(average)</span> -->
                </span>
            </div>
        </div>
        <!-- <div class="results">
            <span>
                <div class="map-serach">
                    <img src="/images/world.svg" width="20rem">
                    <span class="map__search">
                        <div class="map__search__value">2,453</div>
                    </span>
                </div>
                <div class="lock_result">
                    <img src="/images/lock.svg" width="20rem">
                    <span>
                        <div class="lock__result__value">150</div>
                    </span>
                </div> 
            </span>
        </div> -->
    </div>


    </div>
`



export function createAndRenderProducts(productsData = []){
    const productListContainer = document.querySelector(".products .product-list");
    if(productsData.length == 0){
        productListContainer.innerHTML = "<p style='text-align:center;opacity:.3;width:68%;position: absolute;margin: 2rem;'>You don't have any product <br> please create add new +</p>"
        return;
    }



    productListContainer.innerHTML = productsData.map((product)=>template
        .replaceAll('{id}' , product.id || "-" )
        .replace("{name}" , product.name.slice(0 , 50) || "---")
        .replace("{price}" , product.price || "-")
        .replace("{image}" , product.image || "_")
    ).join(' ');
}