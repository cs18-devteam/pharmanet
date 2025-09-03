//const DB = require("../../../database/Database");

//const db = DB.getInstance();


//exports.getAllMedicines = (req , res)=>{
    

   // res.writeHead(200 , {"Content-Type" : "text/html"});
    //res.write("<h1>medicine</h1>");
    //res.end();

//}
const MedicineModel = require("../models/medicineModel");

const medicineInstance = new MedicineModel();

exports.getAllMedicines = async (req, res) => {
    try{
        const allMedicines= await medicineInstance.getAll(); 
        res.status(200).json(allMedicines);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch medicine" });
    }
};

exports.createMedicines = async (req, res) => {
    try {
        const data = req.body;     
        const result = await medicineInstance.save(data);    
        res.status(201).json({ message: "Medicine add", id: result.insertId });
    } 
    catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Failed to create medicine" });
    }
};

exports.updateMedicines = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = req.body; 
        const result = await medicineInstance.update(id, data); 
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.status(200).json({ message: "Medicine updated", affected: result.affectedRows });  
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update medicine" });
    }
};

exports.deleteMedicines= async (req, res) => {
    try {
        const { id } = req.params; 
        const result = await medicineInstance.delete(id); 
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.status(200).json({ message: "Medicine deleted", affected: result.affectedRows });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete medicine" });
    }
};
