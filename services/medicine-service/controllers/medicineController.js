const DB = require("../../../database/Database");

const db = DB.getInstance();


exports.getAllMedicines = (req , res)=>{
    

    res.writeHead(200 , {"Content-Type" : "text/html"});
    res.write("<h1>medicine</h1>");
    res.end();

}
exports.updateMedicine = (req , res)=>{
    console.log("this is from update");
}
exports.createMedicine = (req , res)=>{
    console.log("this is from create");
    
}
exports.deleteMedicine = (req , res)=>{
    console.log("this is from delete");

}