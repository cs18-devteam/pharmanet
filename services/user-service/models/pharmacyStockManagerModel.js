const Model = require("../../../common/Model");

class PharmacyStockManagerModel extends Model{
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


const PharmacyStockManagers = new PharmacyStockManagerModel();
module.exports  =  PharmacyStockManagers;