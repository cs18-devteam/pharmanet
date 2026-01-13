const SubRouter = require("../../common/SubRouter");

exports.cashiersBillsRouter = SubRouter.route('/pharmacies/:pharmacyId')
.subRoute('/cashiers/:cashierId/bills/get')
.subRoute('/cashiers/:cashierId/bills/get/:billId')
.subRoute('/cashiers/:cashierId/bills/create')
.subRoute('/cashiers/:cashierId/bills/update/:billId')
.subRoute('/cashiers/:cashierId/bills/delete/:billId')


exports.cashiersBillsApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute('/cashiers/:cashierId/bills/get')
.subRoute('/cashiers/:cashierId/bills/get/:billId')
.subRoute('/cashiers/:cashierId/bills/create')
.subRoute('/cashiers/:cashierId/bills/update/:billId')
.subRoute('/cashiers/:cashierId/bills/delete/:billId');


exports.pharmacistBillsRouter = SubRouter.route('/pharmacies/:pharmacyId')
.subRoute('/pharmacist/:pharmacistId/bills/get')
.subRoute('/pharmacist/:pharmacistId/bills/get/:billId')
.subRoute('/pharmacist/:pharmacistId/bills/create')
.subRoute('/pharmacist/:pharmacistId/bills/update/:billId')
.subRoute('/pharmacist/:pharmacistId/bills/delete/:billId');

exports.pharmacistBillsApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute('/pharmacist/:pharmacistId/bills/get')
.subRoute('/pharmacist/:pharmacistId/bills/get/:billId')
.subRoute('/pharmacist/:pharmacistId/bills/create')
.subRoute('/pharmacist/:pharmacistId/bills/update/:billId')
.subRoute('/pharmacist/:pharmacistId/bills/delete/:billId');



exports.pharmacyOwnersBillsRouter = SubRouter.route('/pharmacies/:pharmacyId')
.subRoute('/owners/:ownerId/bills/get')
.subRoute('/owners/:ownerId/bills/get/:billId')
.subRoute('/owners/:ownerId/bills/create')
.subRoute('/owners/:ownerId/bills/update/:billId')
.subRoute('/owners/:ownerId/bills/delete/:billId');

exports.pharmacyOwnersBillsApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute('/owners/:ownerId/bills/get')
.subRoute('/owners/:ownerId/bills/get/:billId')
.subRoute('/owners/:ownerId/bills/create')
.subRoute('/owners/:ownerId/bills/update/:billId')
.subRoute('/owners/:ownerId/bills/delete/:billId');


