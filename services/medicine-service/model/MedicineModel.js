const Model = require("../common/Model");

class MedicineModel extends Model{
    constructor(){
        super();
        this.serialNumber = {
            type:"VARCHAR(100)",
            null: false,
        }

        this.countryCode = {
            type:"VARCHAR(100)",
        }

        this.geneticName = {
            type:"VARCHAR(100)",
        }

        this.schedule = {
            type:"VARCHAR(10)",
        }

        this.registrationNo = {
            type:"VARCHAR(100)",
        }

        this.agentCode = {
            type:"VARCHAR(100)"
        }

        this.menuCode = {
            type:"VARCHAR(100)"
        }
        this.packType = {
            type:"VARCHAR(100)"
        }
        this.dosageCode = {
            type:"VARCHAR(100)"
        }

    }
}

const Medicines = new MedicineModel();
Medicines.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Medicines;