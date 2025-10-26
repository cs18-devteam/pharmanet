const Model = require("../common/Model");

class PharmacyModel extends Model{
    constructor(){
        super();
        this.name = {
            type:"VARCHAR(100)",
            null: false,
        }

        this.licenseNumber = {
            type:"VARCHAR(100)",
            null : false,
        }

        this.email = {
            type:"VARCHAR(100)",
        }

        this.addressNo = {
            type:"VARCHAR(20)",
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
        this.latitude = {
            type:"FLOAT"
        }

        this.longitude = {
            type:"FLOAT"
        }

        this.googleMapLink = {
            type:"VARCHAR(100)"
        }

        this.contact = {
            type:"VARCHAR(15)"
        }

        this.postalCode = {
            type:"INT"
        }
        this.pharmacist = {
            type:"VARCHAR(100)"
        }
        this.type = {
            type:"VARCHAR(100)"
        }

    }
}

const Pharmacies = new PharmacyModel();
Pharmacies.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Pharmacies;