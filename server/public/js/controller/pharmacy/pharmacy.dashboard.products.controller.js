import { getProducts } from "../../model/pharmacy/fetchProductsData.js";
import { createAndRenderProducts } from "../../view/pharmacy/products/createAndRenderProducts.js";
import { updateProductsCount } from "../../view/pharmacy/products/updateProductsStats.js";
import { fetchAndRenderProducts } from "./products/fetchAndRenderProduct.js";
import { handleProductCardClicks } from "./products/handleProductCardClicks.js";
import { handleSearchBar } from "./products/handleSearchBar.js";
import { onClickAddProductBtn } from "./products/onClickAddProductBtn.js";

export default async function init(){
    fetchAndRenderProducts();
    handleSearchBar();
    handleProductCardClicks();


    //? add new product
    const createProductBtn = document.querySelector('.products.container .btn-add-new');
    createProductBtn?.addEventListener('click' , onClickAddProductBtn);
}