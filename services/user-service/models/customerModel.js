const Model = require("../../../common/Model");

class CustomerModel extends Model{
    constructor(){
        super();

        this.uid = {
            type:'INT',
            null: false,
        }
    }

}


module.exports = CustomerModel;