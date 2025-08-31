const pharmacyModel = require("../models/pharmacyModel");

const Pharmacies = new pharmacyModel();

exports.gettAllPharmacies = async (req, res) => {
    try{
        const Pharmacies= await Pharmacies.getAll(); //fetch from database
        res.status(200).json(pharmacies);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch pharmacies" });
    }
};

exports.createPharmacies = async (req, res) => {
    try {
        const data = req.body;     // Get form data from client
        const result = await Pharmacies.save(data);    // Insert into DB
        res.status(201).json({ message: "Pharmacy created", id: result.insertId });
    } 
    catch (err) {
        console.error(err); // server errors
        res.status(500).json({ error: "Failed to create pharmacy" });
    }
};

exports.updatePharmacies = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from URL
        const data = req.body; // New updated data
        const result = await Pharmacies.update(id, data); // Update in DB
        res.status(200).json({ message: "Pharmacy updated", affected: result.affectedRows });  // affectedRows = How many rows were inserted/changed
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update pharmacy" });
    }
};

exports.deletePharmacies= async (req, res) => {
    try {
        const { id } = req.params; // Get pharmacy ID
        const result = await Pharmacies.delete(id); // Delete from DB
        res.status(200).json({ message: "Pharmacy deleted", affected: result.affectedRows });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete pharmacy" });
    }
};
