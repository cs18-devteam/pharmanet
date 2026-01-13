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
    const field = document.querySelector(`[name=${key}]`);
    if(/[^A-Za-z0-9]/.test(value)){
        field.classList.remove('utility-success');
        field.classList.add('utility-warn');
        field.parentElement.querySelector('p').textContent = "letters and numbers are only allowed";
        return;
    }
    if(key=="province" && /[^A-Za-z]/.test(value)){
        field.classList.remove('utility-success');
        field.classList.add('utility-warn');
        field.parentElement.querySelector('p').textContent = "letters are only allowed";
        return;
    }

    
    if(!value){
        document.querySelector(`[name=${key}]`).classList.add('utility-warn');
        document.querySelector(`[name="${key}"]`).classList.remove('utility-success');
        return;
    }else{
        document.querySelector(`[name="${key}"]`).classList.add('utility-success')
        document.querySelector(`[name="${key}"]`).classList.remove('utility-warn')
    }
    data[key] = value;
    }
    
    //save to storage
    const previous = JSON.parse(localStorage.getItem('pharmacy'));
    if(!previous) window.location.href = "/admin/pharmacy/step/3";
    localStorage.setItem("pharmacy" , JSON.stringify({...previous , ...data }));

    window.location.href = "/admin/pharmacy/step/4"
    

})
}catch(e){
    console.log(e);
    Notify.showError(e.message);
}
