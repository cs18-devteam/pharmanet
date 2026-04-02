const SubRouter = require("../../common/SubRouter");
const adminPharmacyController = require("../../controllers/admins/admin.pharmacy.controller");
const { authenticate } = require("../../middlewares/authenticate");


exports.adminPharmacyRouter = SubRouter.route('/admin/:adminId')
.subRoute('/pharmacies' , {
        get: [authenticate('adminId')  ,adminPharmacyController.renderAllPharmacies]
})
.subRoute('/pharmacies/create' , {
        get:[authenticate('adminId')  , adminPharmacyController.renderAdminCreatePharmacyViewStep01],
        post : [authenticate('adminId')  ,adminPharmacyController.createPharmacy],
})
.subRoute('/pharmacies/create/step/2' , {
        get : [authenticate('adminId')  ,adminPharmacyController.renderAdminCreatePharmacyViewStep02],
})
.subRoute('/pharmacies/create/step/3' , {
        get : [authenticate('adminId')  ,adminPharmacyController.renderAdminCreatePharmacyViewStep03],
})
.subRoute('/pharmacies/create/step/4' , {
        get : [authenticate('adminId')  ,adminPharmacyController.renderAdminCreatePharmacyViewStep04],
})
.subRoute('/pharmacies/:pharmacyId/update' , {
<<<<<<< HEAD
        get : [authenticate('adminId')  ,adminPharmacyController.renderAdminEditPharmacyViewStep01],
        update : [authenticate('adminId')  ,adminPharmacyController.updatePharmacy]
=======
        get : adminPharmacyController.renderAdminEditPharmacyViewStep01,
>>>>>>> kasun/admin/3.8
})
.subRoute('/pharmacies/:pharmacyId/edit/step/2' , {
        get : [authenticate('adminId')  ,adminPharmacyController.renderAdminCreatePharmacyViewStep02]
})
.subRoute('/pharmacies/:pharmacyId/edit/step/3' , {
        get : [authenticate('adminId')  ,adminPharmacyController.renderAdminEditPharmacyViewStep03]
})
.subRoute('/pharmacies/:pharmacyId/edit/step/4' , {
        get :[authenticate('adminId')  , adminPharmacyController.renderAdminEditPharmacyViewStep04]
})
.subRoute('/pharmacies/:pharmacyId' , {
        get : [authenticate('adminId')  ,adminPharmacyController.renderPharmacyDetailsView],
})



exports.adminApiPharmacyRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/pharmacies' , {
        get : [authenticate('adminId')  ,adminPharmacyController.sendJsonPharmaciesList],
})
.subRoute('/pharmacies/:pharmacyId' , {
        update : adminPharmacyController.updatePharmacy,
})


