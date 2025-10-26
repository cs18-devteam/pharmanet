const Model = require("../../../common/Model")

class PharmacyOwnerModel extends Model{
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

const PharmacyOwners = new PharmacyOwnerModel();
module.exports = PharmacyOwners;