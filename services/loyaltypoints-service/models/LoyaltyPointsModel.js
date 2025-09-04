const Model = require("../../../common/Model");

class LoyaltyPointsModel extends Model{
    constructor(){
        super();

        this.name = {
            type:"VARCHAR(10)",
        }        

        this.date= {
            type:"Date",
            null : false,
        }


    }
}


const LoyaltyPoints = new LoyaltyPointsModel();
module.exports = LoyaltyPoints;