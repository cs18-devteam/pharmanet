// import "/js/utilities/Popup.js";
// import Notify from "/js/view/Notify.js";
try{

const form = document.getElementById('form');
const btn_next = document.querySelector('.btn-next');

const data = JSON.parse(localStorage.getItem('pharmacy')) || {};
console.log(data);
for(const [key,value] of Object.entries(data)){
    const field = document.querySelector(`[name=${key}]`);
    if(field){
    field.value = value;
    }
}

btn_next.addEventListener('click' , (e)=>{
    e.preventDefault();
    const formData = new FormData(form);

    for( const [key , value] of formData.entries()){
    const field = document.querySelector(`[name='${key}']`);

    if(key != "email" && new RegExp(value).test(/^[a-zA-Z]/)){
        field.classList.add('utility-warn');
        return;
    }else{
        field.classList.remove('utility-warn');
    }

    if(key=="email" && new RegExp(value).test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        field.classList.add('utility-warn');

    }else{
        field.classList.remove('utility-warn');
    }
    
    if(!value){
        field.classList.add('utility-warn');
        field.classList.remove('utility-success');
        return;
    }else{
        field.classList.add('utility-success')
        field.classList.remove('utility-warn')
    }
    data[key] = value;
    }
    
    //save to storage
    localStorage.setItem("pharmacy" , JSON.stringify(data));
    window.location.href = "/admin/pharmacy/step/2";

    


})
}catch(e){
    console.log(e);
    Notify.showError(e.message);
}

