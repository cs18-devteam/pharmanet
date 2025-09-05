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

const Admins = new SystemAdminModel();

module.exports = Admins;