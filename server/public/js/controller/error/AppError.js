class AppError extends Error{

    constructor(error , errorCode){
        super();
        this.error = error;
        this.errorCode = errorCode;
        this.popup = new Notification(this.message);
    }


    handle(){
        const popup = document.createElement('div');
        
    }
}



class Notification{
    
    constructor(message,status='idle'){
        this.status = status;
        this.popup = document.createElement('div');
        this.popup.classList.add(`notify-popup popup-${this.status}`)
        document.body.appendChild(this.popup);
        this.closeBtn = document.createElement('button');
        this.closeBtn.classList.add('close');
        this.handleClose();
    }
    /**
     * 
     * @param {AppError} error 
     */
    renderError(error){
    }


    handleClose(){
        this.closeBtn.addEventListener('click' , (e)=>{
            document.body.removeChild(this.popup);
        })
    }
}

export default AppError;