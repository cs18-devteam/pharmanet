AppRouter.pipe(req ,res).route('/pharmacies/:pharmacyId/pharmacist/:pharmacistId/attendance')
?.get(pharmacyAttendanceController.renderAttendance);

AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/pharmacist/:pharmacistId')
?.get(pharmacyController.renderPharmacyDashboard);

AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId')
?.get(pharmacyController.renderPharmacyDashboard);

AppRouter.pipe(req ,res).route('/pharmacies/:pharmacyId/pharmacist/:pharmacistId/staff')
?.get(pharmacyStaffController.renderPharmacyStaff);

AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/medicines')
?.get(pharmacyMedicinesController.getAllMedicines);


AppRouter.pipe(req , res).route('/api/pharmacies/:pharmacyId/medicines')
?.get(pharmacyMedicinesApiController.searchMedicinesByName);

AppRouter.pipe(req , res).route('/api/pharmacies/:pharmacyId/medicines/info')
?.get(pharmacyMedicinesApiController.getMedicineStockInfo)