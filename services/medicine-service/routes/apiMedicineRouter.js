const notfound = require("../common/notfound");
const apiMedicineController = require("../controllers/apiMedicineController");


module.exports = function apiMedicineRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiMedicineController.getMedicines(req , res);

        case 'POST':
            return apiMedicineController.createMedicine(req , res);

        case 'PATCH':
            return apiMedicineController.updateMedicine(req , res);

        case 'DELETE':
            return apiMedicineController.deleteMedicine(req , res);
        default:
            return notfound(req , res);
    }
}