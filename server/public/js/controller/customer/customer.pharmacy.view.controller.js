const searchbar = document.querySelector('.search-bar input');

const url =  new URL(window.location.href);
console.log(url);

if(searchbar){
    
    searchbar.value = url.searchParams.get('search')
}

searchbar?.addEventListener("change", e=>{
    const value = e.target.value;
    if(value){
        window.location.href = `${url.origin}${url.pathname}?search=${value}`;
    }else{
        window.location.href = `${url.origin}${url.pathname}`;
        
    }
})
