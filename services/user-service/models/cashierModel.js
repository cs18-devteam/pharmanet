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

const Cashiers = new CashierModel()

module.exports = Cashiers;