
const Medicines =require("../models/MedicineModel")
const querystring = require("querystring");



exports.createMedicines = async (req ,res ) => {
    
    const newMedicine = await Medicines.save({
    name: "Paracetamol",
    categoryId: 1,
    typeId: 2,
    price: 15,
    stock: 100,
    manufacturer: "PharmaCorp",
    expiryDate: "2026-12-31",
    batchNumber: "BATCH001",
    description: "Fever and pain relief"
  });

  console.log(newMedicine);
}

exports.getMedicines = async (req ,res ) => {
    const allMedicines = await Medicines.get();
    //res.writeHead(200,{"Content-Type" : "text/html"});
    console.log(allMedicines);


}

exports.updateMedicines = async (req ,res ) => {

    const updated = await Medicines.update({
    id: 1, // make sure this ID exists
    name: "Updated Paracetamol",
    price: 20
    });

  console.log(updated)

  const deleted = await Medicines.deleteById(1); // replace 1 with the ID to delete
  console.log(deleted);
}

exports.deleteMedicines = async (req ,res ) => {
    
}