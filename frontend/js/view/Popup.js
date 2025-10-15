class Popup{
    popUpOpenBtns = [];
    popUpCloseBtns = [];
    popupWindow = undefined;
    popupContainer = undefined;
    status="close";
    pointerEventListener = undefined;

    constructor(tag){
        this.tag = tag;
        this.init();
<<<<<<< HEAD
=======
        this.#activatePopupButtons();
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
        return this.popupContainer;

    }

    #createPopupButtons(){
        ['open' , 'close'].forEach((type)=>{

            this.popUpBtns = document.querySelectorAll(`popup-${type}[for=${this.id}]`);
            if(this.popUpBtns.length == 0) return;
<<<<<<< HEAD

            console.log(this.popUpBtns);
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
            
            this.popUpBtns.forEach((btn=>{
                let popupBtn = document.createElement('button');
                popupBtn = this.#copyAttributes(btn , popupBtn);

                popupBtn.dataset.role=`popup-${type}`;
                popupBtn.innerHTML = btn.innerHTML;

<<<<<<< HEAD
                console.log(btn , popupBtn);
                btn.replaceWith(popupBtn);

                popupBtn.addEventListener('click' , ()=>{
                    if(this.status == "open"){
                        this.popupClose();
                    }else{
                        this.popupOpen();
                    }

                    console.log(this.status);
                })
=======
                btn.replaceWith(popupBtn);
                
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
            }))
        })

    }

<<<<<<< HEAD
=======
    #activatePopupButtons(){
        document.addEventListener('click' , (e)=>{
            const target = e.target;
            const popupOpenBtn = target.closest(`button[for=${this.id}]`);

            if(popupOpenBtn?.dataset.role=="popup-open"){
                this.popupOpen();
            }else if(popupOpenBtn?.dataset.role=="popup-close"){
                this.popupClose();
            }
        })
    }

>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf

    popupBoxCursorEffect(){
        const pointer = document.createElement("div");
        pointer.id = "pointer";
        this.popupContainer.insertAdjacentElement('beforeEnd' , pointer);

        this.popupContainer.addEventListener('mousemove' , (e)=>{
            pointer.style.top = e.pageY + "px";
            pointer.style.left = e.pageX + "px";
            
        })
    }

    #copyAttributes(from , to){
        for (let attr of from.attributes) {
            to.setAttribute(attr.name, attr.value);
        }
        return to;
    }

    popupOpen(){
        this.status = "open";
        this.popupContainer.setAttribute('status' , this.status);
    }

    popupClose(){
        this.status = "close";
        this.popupContainer.setAttribute('status' , this.status);
    }

    init(){
        this.popupWindow = document.createElement('div');
        this.popupWindow = this.#copyAttributes(this.tag , this.popupWindow);
        this.popupContainer = document.createElement('div');
        this.popupContainer.dataset.role="popup-container";
        this.popupWindow.dataset.role="popup-window";
        this.popupWindow.innerHTML = this.tag.innerHTML;
        this.id = this.popupWindow.id;

        
        this.status = (this.popupWindow.getAttribute('status')) || this.status;
        this.popupContainer.setAttribute('status' , this.status);
        this.popupWindow.removeAttribute('status');
        this.popupContainer.insertAdjacentElement('afterbegin' , this.popupWindow);
        this.tag.replaceWith(this.popupContainer);
        this.#createPopupButtons();

        
        this.popupBoxCursorEffect();
    }
}





const popupTags = document.querySelectorAll('popup-window');

popupTags.forEach((tag)=>{

    const popup = new Popup(tag);
    console.log(popup);


})