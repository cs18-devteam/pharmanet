const AppRouter = require("../../common/AppRouter");

//**  admin/ */
AppRouter.pipe(req ,res).route('/admin')
?.get(adminController.adminDashboard);



AppRouter.pipe(req ,res).route('/admin/pharmacy/create')
?.get(adminPharmacyController.adminAddPharmacy)
?.post(adminPharmacyController.createPharmacy);


//* ==========================================
        ///* ADMIN PHARMACY

        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy
        AppRouter.pipe(req ,res).route('/admin/pharmacy')
        ?.get(adminPharmacyController.pharmacy);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //**  admin/pharmacy/create/step/1 */
        AppRouter.pipe(req ,res).route('/admin/:adminId/pharmacy/create')
        ?.authenticate(req.adminId)
        ?.get(adminPharmacyController.adminAddPharmacy)
        ?.post(adminPharmacyController.createPharmacy);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/create/step/2 */
        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/2')
        // ?.authenticate(req.adminId)
        ?.get(adminPharmacyController.adminAddPharmacyStep02);

        ///* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/create/step/3 */
        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/3')
        // ?.authenticate(req.adminId)
        ?.get(adminPharmacyController.adminAddPharmacyStep03)
 
        ///* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/create/step/3 */
        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/4')
        ?.get(adminPharmacyController.adminAddPharmacyStep04);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/update
        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/update')
        ?.update(adminPharmacyController.updatePharmacy);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/id/edit
        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit')
        ?.get(adminPharmacyController.adminEditPharmacy)
        ?.update(adminPharmacyController.adminEditPharmacy);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/edit/step/2
        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/2')
        ?.get(adminPharmacyController.adminEditPharmacyStep02);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/edit/step/3
        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/3')
        ?.get(adminPharmacyController.adminEditPharmacyStep03);

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/edit/step/4
        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/4')
        ?.get(adminPharmacyController.adminEditPharmacyStep04)


        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/list
        AppRouter.pipe(req ,res).route('/admin/pharmacy/list')
        ?.get(adminPharmacyController.pharmacyList);

        /// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        ///* admin/pharmacy/view
        AppRouter.pipe(req ,res).route('/admin/pharmacy/view/:pharmacyId')
        ?.get(adminPharmacyController.getPharmacyDetails)
        ?.delete(adminPharmacyController.deletePharmacy);

        ///* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        // ADMIN/MEDICINE/MEDICINES
        AppRouter.pipe(req ,res).route('/admin/medicines')
        ?.get(adminController.medicines);

        //ADMIN/ASSETS
        AppRouter.pipe(req ,res).route('/admin/assets')
        ?.get(adminController.dataAssets);

        // ADMIN/USERS
        AppRouter.pipe(req ,res).route('/admin/users')
        ?.get(adminController.users);


        AppRouter.pipe(req ,res).route('/admin/:adminId/writers');
        AppRouter.pipe(req ,res).route('/admin/:adminId/writers/:writerId');
        
