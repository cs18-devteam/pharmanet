// import "../utilities/Popup.js";

class Notify{
    constructor(){

    }

    static showError(message){
        document.querySelector('.notify').querySelector("[data-role='popup-container']").setAttribute('status' ,'open');
        document.querySelector('.popup-window-content').textContent = message;
        console.log(document.querySelector('.popup-window-content'))
    }

    static showSuccess(redirect , msg = "operation successful"){
        document.querySelector('.notify').querySelector("[data-role='popup-container']").setAttribute('status' ,'open');
        document.querySelector('.popup-window-content').textContent = msg;
        document.querySelector('.popup-close-btn').addEventListener('click' , ()=>{
        //   window.location.href = "/admin/pharmacy";
          window.location.href = redirect;
        })
    }
}


const popup = `<div class="notify">

    <popup-window id="popup" class="notify-window popup-window-error" status="close">
            <p class="popup-window-content">
                

            </p>
            <popup-close class="popup-close-btn" for="popup">
                close
            </popup-close>
  </popup-window>
  </div>`;

document.body.insertAdjacentHTML('afterbegin' , popup);
