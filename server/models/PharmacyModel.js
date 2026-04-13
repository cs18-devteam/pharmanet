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
        }

        this.email = {
            type:"VARCHAR(100)",
        }

        this.expireDate = {
            type:"DATE"
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
            type:"VARCHAR(100)",
            default:"retailer"
        }

        this.owner = {
            type:"VARCHAR(100)"
        }

        this.pharmacistLicense = {
            type:"VARCHAR(100)"
        }

        this.registrationDoc = {
            type : "TEXT",
        }

        this.ownerDoc = {
            type : "TEXT",
        }

        this.addressDoc = {
            type :"TEXT"
        }

        this.alive = {
            type:"bool",
            default :false,
        }

        this.img = {
            type : "VARCHAR(100)",
            default : '/pharmacyImages/general-pharmacy.png'
        }
        this.status = {
            type : "bool",
            default : "0",
        }

        this.status = {
            type: "bool"
        }
    }
}

const Pharmacies = new PharmacyModel();
Pharmacies.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Pharmacies;