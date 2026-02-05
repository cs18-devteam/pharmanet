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

        this.firstName = {
            type: "VARCHAR(255)",
           // default: "CURRENT_TIMESTAMP"
        }

        this.lastName = {
            type: "VARCHAR(255)",
        }

        this.role = {
            type: "VARCHAR(255)"
        }
    }
}

const Leaves = new LeaveModel();
Leaves.createTable().catch(e => {
    console.log(e);
    console.log("error in leave model");
});
module.exports = Leaves;