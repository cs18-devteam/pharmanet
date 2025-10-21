const notfound = require("../common/notfound");
const apiPharmacyController = require("../controllers/apiPharmacyController");


module.exports = function apiPharmacyRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiPharmacyController.getPharmacy(req , res);

        case 'POST':
            return apiPharmacyController.createPharmacy(req , res);

        case 'PATCH':
            return apiPharmacyController.updatePharmacy(req , res);

        case 'DELETE':
            return apiPharmacyController.deletePharmacy(req , res);
        default:
            return notfound(req , res);
    }
}