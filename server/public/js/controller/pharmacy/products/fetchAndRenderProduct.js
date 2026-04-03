import { getProducts } from "../../../model/pharmacy/fetchProductsData.js";
import { createAndRenderProducts } from "../../../view/pharmacy/products/createAndRenderProducts.js";
import { updateProductsCount } from "../../../view/pharmacy/products/updateProductsStats.js";

export async function fetchAndRenderProducts(search){
    const data = await getProducts(search); 
    createAndRenderProducts(data.results);
    if(!(data.stat)) return;
    updateProductsCount(data.stat.count[0].count);
}