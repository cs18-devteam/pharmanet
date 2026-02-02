const Model = require("../common/Model");

class LeaveModel extends Model {
    constructor() {
        super();
        this.user = {
            type: "INT",
            null: false,
        }

        this.leaveType = {
            type: "VARCHAR(50)",
            null: false,
        }

        this.startDate = {
            type: "DATE",
            null: false,
        }

        this.endDate = {
            type: "DATE",
            null: false,
        }

        this.leaveCategory = {
            type: "VARCHAR(50)",
        }

        this.reason = {
            type: "VARCHAR(500)"
        }

        this.document = {
            type: "VARCHAR(255)"
        }

        this.coveredBy = {
            type: "VARCHAR(255)"
        }

        this.status = {
            type: "VARCHAR(20)",
            //default: "pending"
        }

        this.requestedDate = {
            type: "TIMESTAMP",
           // default: "CURRENT_TIMESTAMP"
        }

        this.acceptedDate = {
            type: "DATE",
        }

        this.acceptedBy = {
            type: "INT"
        }
    }
}

const Leaves = new LeaveModel();
Leaves.createTable().catch(e => {
    console.log(e);
    console.log("error in leave model");
});
module.exports = Leaves;