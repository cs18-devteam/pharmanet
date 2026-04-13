class Cart{
    overlayVisibility = false;
    rightPanelVisibility = false;
    leftPanelVisibility = false;
    popupVisibility = false;
    locked = false;

    /**
     * @type {HTMLElement}
     */
    leftSide = undefined;
    /**
     * @type {HTMLElement}
     */
    rightSide = undefined;
    /**
     * @type {HTMLElement}
     */
    popup = undefined;

    /**
     * 
     * @param {string} selector 
     */
    constructor(selector=".overlay-cart"){
        this.element = document.querySelector(selector);
        if(!this.element) return;
        this.leftSide = this.element.querySelector('.left-side');
        this.rightSide = this.element.querySelector('.right-side');
        this.popup = this.element.querySelector('.popup');
        this.#autoClose();
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {string} className 
     * @param {boolean} isAdd 
     * @param {string} visibilityVar 
     */
    #modifyClassList(element , className , isAdd , visibilityVar){
        this[visibilityVar] = isAdd;

        if(isAdd){
            element.classList.add(className);
        }else{
            element.classList.remove(className);
        }
    }


    lock(){
        this.locked = true;
    }

    unlock(){
        this.locked = false;
    }
    /**
     * 
     * @param {string} html 
     */
    setRightSideContent(html){
        this.rightSide.innerHTML = html;
    }

    /**
     * 
     * @param {string} html 
     */
    setLeftSideContent(html){
        this.leftSide.innerHTML = html;
    }


    #autoClose(){
        this.element.addEventListener('click' , (e)=>{
            if(e.target == this.element && !this.locked){
                this.close();
            }
        })
    }

    /**
     * 
     * @param {string} html 
     */
    setPopupContent(html){
        this.popup.innerHTML = html;
    }

    open(){
       this.#modifyClassList(this.element , 'open' , true , "overlayVisibility");
    }
    
    close(){
        this.#modifyClassList(this.element , 'open' , false , "overlayVisibility");
        if(this.rightPanelVisibility) this.closeRightPanel();
        if(this.leftPanelVisibility) this.closeLeftPanel();
    }
    
    openRightPanel(){
        if(!this.overlayVisibility) this.open();
        this.#modifyClassList(this.rightSide , 'open' , true , "rightPanelVisibility");
    }
    closeRightPanel(){
        this.#modifyClassList(this.rightSide , 'open' , false , "rightPanelVisibility");
        if(!this.leftPanelVisibility && !this.rightPanelVisibility && this.overlayVisibility){
            this.close();
        }
    }
    
    openLeftPanel(){
        if(!this.overlayVisibility) this.open()
        this.#modifyClassList(this.leftSide , 'open' , true , "leftPanelVisibility");
    }
    closeLeftPanel(){
        this.#modifyClassList(this.leftSide , 'open' , false , "leftPanelVisibility");
        if(!this.leftPanelVisibility && !this.rightPanelVisibility && this.overlayVisibility){
            this.close();
        }
    }
    
    openPopup(){
        if(!this.overlayVisibility) this.open()
        this.#modifyClassList(this.popup , 'open' , true , "popupVisibility");
    }

    closePopup(){
        this.#modifyClassList(this.popup , 'open' , false , "popupVisibility");
        if(!this.leftPanelVisibility && !this.rightPanelVisibility && this.overlayVisibility && !this.popupVisibility){
            this.setPopupContent('');
            this.close();
        }
    }

}

const cart = new Cart('.overlay-cart');

export default cart;

