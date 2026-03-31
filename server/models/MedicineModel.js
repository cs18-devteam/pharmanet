const Model = require("../common/Model");

class MedicineModel extends Model {
  constructor() {
    super();

    this.geneticName = {
      type: "VARCHAR(1000)",
    };

    this.brandName = {
      type: "VARCHAR(100)",
    };

    this.image = {
      type: "VARCHAR(100)",
      default :"/medicines/general-med.png",
    };

    this.expiryDate = {
      type: "VARCHAR(50)",
    };
    // this.serialNumber = {
    //     type:"VARCHAR(100)",
    //     null: false,
    // }

    this.country = {
      type: "VARCHAR(100)",
    };

    this.schedule = {
      type: "VARCHAR(10)",
    };

    this.registrationNo = {
      type: "VARCHAR(100)",
    };

    this.agent = {
      type: "VARCHAR(100)",
    };

    this.registrationDate = {
      type: "DATE",
    };

    this.manufacturer = {
      type: "VARCHAR(100)",
    };
    this.packType = {
      type: "VARCHAR(100)",
    };
    this.packSize = {
      type: "VARCHAR(100)",
    };
    this.dosage = {
      type: "VARCHAR(100)",
    };
    this.category = {
      type: "VARCHAR(100)",
    };
    this.validation = {
      type: "VARCHAR(25)",
    };

    this.dossierNo = {
      type: "VARCHAR(25)",
    };
  }
}

const Medicines = new MedicineModel();
Medicines.createTable().catch((e) => {
  console.log(e);
  console.log("error in product model");
});
module.exports = Medicines;


