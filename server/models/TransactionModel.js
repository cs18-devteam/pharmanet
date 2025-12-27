const Model = require("../common/Model");

class TransactionModel extends Model {
    constructor() {
        super();
        this.orderId = { type: "INT" };
        this.pharmacyId = { type: "INT" };
        this.amount = { type: "FLOAT" };
        this.userId = { type: "INT" };
        this.type = { type: "VARCHAR(50)" };
        this.staffID = { type: "INT" };
        this.method = { type: "VARCHAR(100)" };
        this.transactionDateTime = { type: "DATETIME" };
    }


       
    }


const Transactions = new TransactionModel();
Transactions.createTable().catch(e=>console.log(e));
module.exports = Transactions;
