const Model = require("../../../common/Model");

class SystemStockManagerModel extends Model{
    constructor(){
        super();

        this.uid = {
            type: 'INT',
            foreignKey: 'UserModel'
        }
    }
}

const SystemStockManagers = new SystemStockManagerModel();
module.exports = SystemStockManagers;