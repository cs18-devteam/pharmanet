export function updateProductsCount(count){
    if(!count) return;
    const productCount = document.querySelector('.products .amount-of-products');
    productCount.textContent = count;
}