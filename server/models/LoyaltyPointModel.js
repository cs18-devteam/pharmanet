const Model = require ("../common/Model")

class LoyaltyPointModel extends Model {
    constructor() {
        super()
        this.PharmacyId = {
            type: "INT",
        }
        this.CustomerId = {
            type : "INT",
        }
        this.LoyaltyPoints = {
            type: "float",
        }
    }    
}
const LoyaltyPoints = new LoyaltyPointModel();
LoyaltyPoints.createTable().catch (e=> {
    console.log(e)
    console.log("error in loyalty points")
});

module.exports = LoyaltyPoints;