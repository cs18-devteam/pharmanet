import { getProductData } from "../../../model/pharmacy/fetchProductsData.js";
import { handleProductDeleteButton } from "./handleProductDeleteButton.js";
import { handleProductUpdateButton } from "./handleProductUpdateButton.js";
import { renderProductData } from "../../../view/pharmacy/products/renderProductData.js";

export async function handleProductCardClicks(){
    const productCardContainer = document.querySelector(".product-list");
    productCardContainer?.addEventListener('click' , async e=>{
        const target = e.target;

        const productCard = target.closest(".medicine_card");

        if(productCard){
            const data = await getProductData(productCard.dataset.id);
            renderProductData(data.results);
            handleProductDeleteButton();
            handleProductUpdateButton();
        }

    })
}