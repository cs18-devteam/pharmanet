class Convert{
    constructor(){

    }

    /**
     * 
     * @param {Date} date 
     * @returns {string}
     */
    static toSqlDate(date = Date.now()){
        return new Date(date).toISOString('si-LK').replace("T" , " ").split(".")[0]
    }
}


module.exports  = Convert;