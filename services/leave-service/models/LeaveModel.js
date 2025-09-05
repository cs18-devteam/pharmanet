const Model = require("../../../common/Model")

class LeaveModel extends Model{
    constructor(){
        super();

        this.name = {
            type:"VARCHAR(100)",
            null:false,
            unique: true,
        }

        this.time = {
            type :"DATE"
        }

        this.email = {
            type: "VARCHAR(100)"
        }

        this.userId = {
            foreignKey : 'UserModel',
            type:'INT'
        }

    }
}


const Leaves = new LeaveModel();
module.exports = Leaves;