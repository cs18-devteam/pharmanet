class Convert {
    constructor() {

    }

    /**
     * 
     * @param {Date} date 
     * @returns {string}
     */
    static toSqlDate(date = Date.now()) {
        const options = {
            timeZone: 'Asia/Colombo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };


        return new Date(date).toLocaleString('en-CA', options).replace(',' , '')
    }
}


module.exports = Convert;
