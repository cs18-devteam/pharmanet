// id INT AUTO_INCREMENT PRIMARY KEY,
// name VARCHAR(100),
// category_id VARCHAR(50),
// type_id VARCHAR(100),
// price CHAR(10),
// stock INT(255),
// manufacturer VARCHAR(100),
// expiry_date VARCHAR(100),
// batch_number VARCHAR(100),
// description VARCHAR(100)

const Model = require("../../../common/Model")

class MedicineModel extends Model{
    constructor(){
        super();

        this.name = {
            type: "VARCHAR(100)",
            null:false
        }

        this.categoryId = {
            type: "INT",
            null:false
        }

        this.typeId = {
            type: "INT",
            null:false
        }

        this.price = {
            type :"INT",
            null:false
        }

        this.stock ={
            type: "INT"
        }

        this.manufacturer= {
            type: "VARCHAR(100)",
            null:false
        }

        this.expiryDate = {
            type: "DATE",
            null:false
        }

        this.batchNumber = {
            type: "VARCHAR(100)",
            null:false
        }

        this.description = {
            type: "VARCHAR(200)"
        }
    }
}

const Medicines = new MedicineModel();
module.exports = Medicines;