import html from "./html.js";

export function renderToast(message , type){
    const toast = document.createElement('div');
    toast.classList.add("toast");
    if(type) toast.classList.add(type);
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(()=>{
        document.body.removeChild(toast);
    } , 5000)
}

