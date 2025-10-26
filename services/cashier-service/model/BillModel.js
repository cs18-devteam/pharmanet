const Model = require("../common/Model");

class BillModel extends Model{
    constructor(){
        super();
        this.user = {
            type:"INT",
            null: false,
        }

        this.requestedDate = {
            type:"DATE",
            null : false,
        }

        this.acceptedDate = {
            type:"DATE",
        }

        this.datefrom = {
            type:"DATE",
        }

        this.dateTo = {
            type:"DATE",
        }


        this.reason = {
            type:"VARCHAR(100)"
        }

        this.acceptedBy = {
            type:"INT"
        }

    }
}

const Bills = new BillModel();
Bills.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Bills;