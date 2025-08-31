const Model = require("../../../common/Model");

class SystemAdminModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }
    }
}


module.exports = SystemAdminModel;