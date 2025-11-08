const SubRouter = require("../../common/SubRouter");
const adminPharmacyController = require("../../controllers/admins/admin.pharmacy.controller");


exports.adminPharmacyRouter = SubRouter.route('/admin/:adminId')
.subRoute('/pharmacies' , {
        get: adminPharmacyController.renderAllPharmacies
})
.subRoute('/pharmacies/create' , {
        get: adminPharmacyController.renderAdminCreatePharmacyViewStep01,
        post : adminPharmacyController.createPharmacy,
})
.subRoute('/pharmacies/create/step/2' , {
        get : adminPharmacyController.renderAdminCreatePharmacyViewStep02,
})
.subRoute('/pharmacies/create/step/3' , {
        get : adminPharmacyController.renderAdminCreatePharmacyViewStep03,
})
.subRoute('/pharmacies/create/step/4' , {
        get : adminPharmacyController.renderAdminCreatePharmacyViewStep04,
})
.subRoute('/pharmacies/:pharmacyId/update' , {
        get : adminPharmacyController.renderAdminEditPharmacyViewStep01,
        update : adminPharmacyController.updatePharmacy
})
.subRoute('/pharmacies/:pharmacyId/edit/step/2' , {
        get : adminPharmacyController.renderAdminCreatePharmacyViewStep02
})
.subRoute('/pharmacies/:pharmacyId/edit/step/3' , {
        get : adminPharmacyController.renderAdminEditPharmacyViewStep03
})
.subRoute('/pharmacies/:pharmacyId/edit/step/4' , {
        get : adminPharmacyController.renderAdminEditPharmacyViewStep04
})
.subRoute('/pharmacies/:pharmacyId' , {
        get : adminPharmacyController.renderPharmacyDetailsView,
})



exports.adminApiPharmacyRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/pharmacies' , {
        get : adminPharmacyController.sendJsonPharmaciesList,
})


