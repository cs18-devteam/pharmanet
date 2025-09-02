const Model = require("../../../common/Model")

class PharmacyOwnerModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }

    }
}

const PharmacyOwners = new PharmacyOwnerModel();
module.exports = PharmacyOwners;