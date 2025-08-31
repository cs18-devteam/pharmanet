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

module.exports = SystemStockManagerModel;