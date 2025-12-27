import { fetchAndRenderProducts } from "./fetchAndRenderProduct.js";

export async function handleSearchBar() {
    const searchBar = document.querySelector('.products .search-bar input');
    searchBar?.addEventListener('input' , e=>{
        fetchAndRenderProducts(searchBar.value);
    })
}