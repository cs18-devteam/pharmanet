class AppError extends Error{
    constructor(error , code){
        super();
        this.error = error;
        this.code = code;


    }
}


module.exports = AppError;