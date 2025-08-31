//const DB = require("../../../database/Database");

//const db = DB.getInstance();


//exports.getAllMedicines = (req , res)=>{
    

   // res.writeHead(200 , {"Content-Type" : "text/html"});
    //res.write("<h1>medicine</h1>");
    //res.end();

//}
const medicineModel = require("../models/medicineModel");

const medicines = new medicineModel();

exports.gettAllMedicines = async (req, res) => {
    try{
        const medicines= await medicines.getAll(); 
        res.status(200).json(medicines);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch medicine" });
    }
};

exports.createMedicines = async (req, res) => {
    try {
        const data = req.body;     
        const result = await medicines.save(data);    
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
        const result = await medicines.update(id, data); 
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
        const result = await medicines.delete(id); 
        res.status(200).json({ message: "Medicine deleted", affected: result.affectedRows });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete medicine" });
    }
};
