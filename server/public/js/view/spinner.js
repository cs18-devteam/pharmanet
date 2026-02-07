const spinner = document.createElement("div");
spinner.classList.add("loader");

export function renderSpinner(parent = document.body){
    parent.appendChild(spinner);
}

export function removeSpinner(parent = document.body){
    parent.removeChild(spinner);
}