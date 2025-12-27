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

    async get(filter = {}) {
        let where = "1=1";
        const values = [];

        if (filter.pharmacyId) {
            where += " AND pharmacyId = ?";
            values.push(filter.pharmacyId);
        }

        if (
            filter.transactionDateTime &&
            filter.transactionDateTime.$between
        ) {
            where += " AND transactionDateTime BETWEEN ? AND ?";
            values.push(
                filter.transactionDateTime.$between[0],
                filter.transactionDateTime.$between[1]
            );
        }

        const query = `
            SELECT * FROM transaction_table
            WHERE ${where}
            ORDER BY transactionDateTime DESC
        `;

        return this.query(query, values);
    }
}

const Transactions = new TransactionModel();
module.exports = Transactions;
