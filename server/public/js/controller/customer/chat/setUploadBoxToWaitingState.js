const uploadBox = document.querySelector(".upload-box");

export function setWait(){
    uploadBox.classList.add("waiting");
}

export function removeWait(){
    uploadBox.classList.remove("waiting");
}