const Model = require("../../../common/Model");

class SystemPharmacyManagerModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }
    }
}


module.exports = SystemPharmacyManagerModel;