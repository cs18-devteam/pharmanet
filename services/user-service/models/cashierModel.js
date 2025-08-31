const Model = require("../../../common/Model");

class CashierModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }
    }


} 

module.exports = CashierModel;