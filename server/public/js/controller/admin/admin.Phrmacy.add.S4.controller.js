// import "/js/utilities/Popup.js";
// import Notify from "/js/view/Notify.js";
try{

    const form = document.getElementById('form');
    const btn_submit = document.querySelector('.btn-submit');

    const data = JSON.parse(localStorage.getItem('pharmacy')) || {};
    console.log(data);
    for(const [key,value] of Object.entries(data)){
      const field = field;
      if(field){
        field.value = value;
      }
    }



    btn_submit.addEventListener('click' , (e)=>{
      e.preventDefault();
      const formData = new FormData(form);

      for( const [key , value] of formData.entries()){
        const field = document.querySelector(`[name='${key}']`);

        if(/[^A-Za-z0-9]/.test(value)){
          field.classList.remove('utility-success');
          field.classList.add('utility-warn');
          field.parentElement.querySelector('p').textContent = "letters and numbers are only allowed";
          return;
        }
        if(key=="pharmacist" && /[^A-Za-z]/.test(value)){
          field.classList.remove('utility-success');
          field.classList.add('utility-warn');
          field.parentElement.querySelector('p').textContent = "letters are only allowed";
          return;
        }

        
        if(!value){
          field.classList.add('utility-warn');
          field.classList.remove('utility-success');
          console.log(field);
          return;
        }else{
          field.classList.add('utility-success');
          field.classList.remove('utility-warn');
        }
        data[key] = value;
      }
      
      //save to storage
      const previous = JSON.parse(localStorage.getItem('pharmacy'));
      if(!previous) window.location.href = "/admin/pharmacy/step/3";
      localStorage.setItem("pharmacy" , JSON.stringify({...previous , ...data }));

      fetch("/admin/pharmacy/create" , {
        method:"POST",
        body: localStorage.getItem("pharmacy"),
      }).then(data=>data.json()).then(data=>{
        if(data.status == "error"){
          throw new Error(data.message);
          return;
        }
        
        if(typeof (data?.[0]) == "object"){
          localStorage.setItem('pharmacy' , JSON.stringify({}));
          Notify.showSuccess('/admin/pharmacy');
          

        }
      }).catch(e=>{
        console.log(e);
        Notify.showError(e.message)

        

      }).finally(()=>{
        console.log(localStorage.getItem("pharmacy"))
      });      
    });

    }catch(e){
      console.log(e);
      Notify.showError(e.message)
    }