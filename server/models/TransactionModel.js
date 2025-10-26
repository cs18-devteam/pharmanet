const Model = require("../common/Model");

class Transaction extends Model{
    constructor(){
        super();
        this.name = {
            type:"VARCHAR(50)",
            null: false,
        }

        this.value = {
            type:"FLOAT",
            null : false,
        }

        this.description = {
            type:"VARCHAR(500)",
        }

    }
}

const Transactions = new Transaction();
Transactions.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Transactions;