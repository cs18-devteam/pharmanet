const Model = require("../../../common/Model");

class PharmacyModel extends Model{
    constructor(){
        super();

        this.name = {
            type: "VARCHAR(50)",
        }
    }
}

const Pharmacies = new PharmacyModel();
module.exports = Pharmacies;