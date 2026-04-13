const uploadBox = document.querySelector(".upload-box");

export function setWait(){
    try{
        if(!uploadBox) return;
        uploadBox.classList.add("waiting");
    }catch(e){
        console.log(e);
    }
}

export function removeWait(){
    try{
        if(!uploadBox) return;
        uploadBox.classList.remove("waiting");
    }catch(e){
        console.log(e);
    }
}