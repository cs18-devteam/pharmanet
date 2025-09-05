const Model = require("../../../common/Model");

class CashierModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }

        this.pharmacyId = {
            type:"INT",
            foreignKey:'PharmacyModel'
        }
    }


} 

const Cashiers = new CashierModel()

module.exports = Cashiers;