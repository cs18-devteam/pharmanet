const Model = require("../../../common/Model");

class PharmacyStockManagerModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }
    }
}


const PharmacyStockManagers = new PharmacyStockManagerModel();
module.exports  =  PharmacyStockManagers;