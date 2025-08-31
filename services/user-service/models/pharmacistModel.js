const Model = require("../../../common/Model");

class PharmacistModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }
    }
}


module.exports = PharmacistModel;