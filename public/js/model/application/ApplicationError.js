class ApplicationError{



    constructor(errorCode ,error , stack){
        this.error = error;
        this.errorCode = errorCode;
        this.stack = stack;


        try{
            if(process?.env.NODE_ENV == "development"){
                console.log({
                    errorCode , 
                    error , 
                    stack,
                })
            }else{
                console.log({
                    errorCode , 
                    error , 
                })
            }
        }catch(error){
            throw error;
        }
    }





}


export default ApplicationError;