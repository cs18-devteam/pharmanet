const Model = require("../../../common/Model");

class TransactionModel extends Model{
    constructor(){
        super()

        this.paymentMethod = {
            type:`ENUM("cash","card")`,
            null : false,
        }

        this.value = {
            type: "FLOAT(2)",
        }


    }
}

module.exports = TransactionModel;