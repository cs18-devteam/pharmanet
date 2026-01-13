import {swal} from "./../view/swal.js";      
try{

        const form = document.getElementById('loginForm');
        form.addEventListener('submit' ,async (e)=>{
            try{

                
                e.preventDefault(e);
                
                const data = {};
                const formData = new FormData(form);
                for(const [key , value] of formData.entries()){
                    data[key] = value;
                }
                
                const respond = await fetch("/login" , {
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify(data),
                });
                
                const result = await respond.json();
                console.log(result);


                if(result.status == "success"){
                  document.querySelectorAll('input').forEach(el=>{
                    el.classList.remove('utility-warn');
                    el.classList.add('utility-success');
                  });

                  document.body.classList.add("success");
                  let redirectUrl = "/login";
                  switch(result.user.role){
                    case "customer":
                      redirectUrl = `/customers/${result.user.id}`;
                      break;
                    case "admin":
                      redirectUrl = `/admin/${result.user.id}`;
                      break;
                    case "cashier":
                      redirectUrl = `/cashier-dashboard`;
                      break;
                  }

                  setTimeout(()=>{

                    window.location.href = redirectUrl;
                  } , 3000);

                  
                }else{
                  document.querySelectorAll('input').forEach(el=>{
                    el.classList.add('utility-warn')
                    el.classList.remove('utility-success')
                    swal({
                      icon: "error",
                      title: "User name or password invalid",
                      theme:"bulma",
                      footer: '<a href="/contactus">Why do I have this issue?</a>'
                      });  
                  });
                }

                
            }catch(error){
              console.log(error);
              throw error;  
                
            }
            


            
        })

    }catch(e){
      console.log(e);
      swal({
          icon: "error",
          title: "something went wrong",
          theme:"bulma",
          text: e.message,
          footer: '<a href="/contactus">Why do I have this issue?</a>'
          });    
    }