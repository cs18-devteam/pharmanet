// import "/js/utilities/Popup.js";
// import Notify from "/js/view/Notify.js";

try{

const form = document.getElementById('form');
const btn_next = document.querySelector('.btn-next');
const data = JSON.parse(localStorage.getItem('pharmacy')) || {};
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
    if(key == 'number'){
        if(/[^0-9]/.test(value)){
        field.classList.add('utility-warn');
        field.parentElement.insertAdjacentText("beforeend" , "only numbers are allowed")
        return;
        } 
        if(value.length < 10){
        field.classList.add('utility-warn');
        field.parentElement.insertAdjacentText("afterend" , "number can't have length less than 10");
        return;
        }

    }else if(key != "email"){
        if(/[^A-Za-z ]/.test(value)){
        field.classList.add('utility-warn');
        field.parentElement.insertAdjacentText('beforeEnd' , "only letters are allowed")

        return;
        }else{
        field.classList.remove('utility-warn');
        }
        
    }else{
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
        field.classList.add('utility-warn');
        return;
        }else{
        field.classList.remove('utility-warn');
        }
    }
    
    if(!value){
        document.querySelector(`input[name=${key}]`).classList.add('utility-warn');
        document.querySelector(`input[name="${key}"]`).classList.remove('utility-success');
        console.log(document.querySelector(`input[name=${key}]`));
        return;
    }else{
        document.querySelector(`input[name="${key}"]`).classList.add('utility-success')
        document.querySelector(`input[name="${key}"]`).classList.remove('utility-warn')
    }
    data[key] = value;
    }
    
    //save to storage
    const previous = JSON.parse(localStorage.getItem('pharmacy'));
    if(!previous) window.location.href = "/admin/pharmacy/step/2";
    localStorage.setItem("pharmacy" , JSON.stringify({...previous , ...data }));

    window.location.href = "/admin/pharmacy/step/3"
    
})

}catch(e){
    console.log(e);
    // Notify.showError(e.message);
}

    

