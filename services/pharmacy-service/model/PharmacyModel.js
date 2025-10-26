<<<<<<< HEAD
const Model = require("../common/Model");
=======
const Model = require("../../../common/Model");
>>>>>>> origin/kasun/pharmacyLandingPage

class PharmacyModel extends Model{
    constructor(){
        super();
<<<<<<< HEAD
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
=======

        this.name = {
            type: "VARCHAR(50)",
        }

        this.email = {
            type:"VARCHAR(100)"
        }

        this.licensesNumber = {
            type:"VARCHAR(100)"
>>>>>>> origin/kasun/pharmacyLandingPage
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
<<<<<<< HEAD
        this.latitude = {
            type:"FLOAT"
=======
        this.no = {
            type:"VARCHAR(20)"
>>>>>>> origin/kasun/pharmacyLandingPage
        }

        this.longitude = {
            type:"FLOAT"
        }

<<<<<<< HEAD
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

=======
        this.latitude - {
            type:"FLOAT"
        }

        this.googleMapLink = {
            type :"TEXT"
        }
>>>>>>> origin/kasun/pharmacyLandingPage
    }
}

const Pharmacies = new PharmacyModel();
<<<<<<< HEAD
Pharmacies.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
=======
>>>>>>> origin/kasun/pharmacyLandingPage
module.exports = Pharmacies;