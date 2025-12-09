export function extractFormData(form){
    const formData = new FormData(form);

    const data = {};
    for(const [key , value] of formData.entries()){
        data[key] = value;
    }
    return data;
}   

export function stopPropagation(){
    const form = document.querySelector('.medicine-edit-form');
    form.addEventListener('submit' , e=>{
        e.preventDefault();
    })
}

export function setTextContent(element , content){
    if(element){
        element.textContent = content;
    }
}


