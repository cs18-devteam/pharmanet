const Model = require("../../../common/Model");

class PharmacyModel extends Model{
    constructor(){
        super();

        this.name = {
            type: "VARCHAR(50)",
        }

        this.email = {
            type:"VARCHAR(100)"
        }

        this.licensesNumber = {
            type:"VARCHAR(100)"
        }

        this.street = {
            type:"VARCHAR(100)"
        }
        this.town = {
            type:"VARCHAR(100)"
        }
        this.province = {
            type:"VARCHAR(100)"
        }
        this.no = {
            type:"VARCHAR(20)"
        }

        this.longitude = {
            type:"FLOAT"
        }

        this.latitude - {
            type:"FLOAT"
        }

        this.googleMapLink = {
            type :"TEXT"
        }
    }
}

const Pharmacies = new PharmacyModel();
module.exports = Pharmacies;