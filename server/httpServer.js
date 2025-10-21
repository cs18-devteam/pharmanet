const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/Router');
const  indexController  = require('./controllers/index.controller');
const pharmacyStaffController = require('./controllers/pharmacy.staff.controller');
const loginController = require('./controllers/login.controller');
const signupController = require('./controllers/signup.controller');
const adminController = require('./controllers/admin.controller');
const verifyEmailController = require('./controllers/verify.email.controller');
const verifyNumberController = require('./controllers/verify.number.controller');
const pharmacyController = require('./controllers/pharmacy.controller');
const pharmacyProductsController = require('./controllers/pharmacy.products.controller');
const pharmacyMedicinesController = require('./controllers/pharmacy.medicines.controller');
const adminPharmacyVerifyController = require('./controllers/admin.pharmacy.verify.controller');
const adminPharmacyController = require('./controllers/admin.pharmacies.controller');
const customerController = require('./controllers/customer.controller');
const customerProfileController = require('./controllers/customer.profile.controller');
const customerPharmacyController = require('./controllers/customer.pharmacies.controller');
const adminMedicineController = require('./controllers/admin.medicines.controller');

const server = http.createServer((req , res)=>{
    try{
        const {url , method} = req;
        const URI = new URL(url , `http://${process.env.HOSTNAME}:${process.env.PORT}`);
        const params = URI.searchParams;
        const path = URI.pathname;

        req.path = path;
        req.params = params;

        //set public folder 
        const file = requestFile(path);
        if(file){

            res.writeHead(200 , {
                "content-type" : file.type,
            });
            res.write(file.content);
            res.end();
            return;
        }
        if(process.env.NODE_ENV == "development"){
            console.log(method , url  , path)
        }

        //////////////////////////////
        //:: ROOT ROUTES
        AppRouter.pipe(req ,res).route('/')
            ?.get(indexController.renderIndexPage);

        //:: USER ROUTES
        AppRouter.pipe(req , res).route('/login')
            ?.get(loginController.renderLogin);

        AppRouter.pipe(req , res).route('/signup')
            ?.get(signupController.renderSignup);

        AppRouter.pipe(req , res).route('/verify/email')
            ?.get(verifyEmailController.renderVerifyEmail);

        AppRouter.pipe(req , res).route('/verify/number')
            ?.get(verifyNumberController.renderVerifyNumber);

        //:: PHARMACY ROUTES

        /////////////////////////////////////////
        // ---- PHARMACY ROOTS
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId")
            ?.get(pharmacyController.renderPharmacy);
        AppRouter.pipe(req , res).route("/pharmacy/register")
            ?.get(pharmacyController.renderPharmacyRegister);

        //////////////////////////////////////////
        // -- PHARMACY PRODUCTS MANAGEMENTS
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/products")
            ?.get(pharmacyProductsController.renderPharmacyProducts);
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/products/:productId")
            ?.get(pharmacyProductsController.renderSelectedPharmacyProduct);
        
        //////////////////////////////////////////
        // -- PHARMACY MEDICINES MANAGEMENTS
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/medicines")
            ?.get(pharmacyMedicinesController.renderPharmacyMedicines);

        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/medicines/:medicinesId")
            ?.get(pharmacyMedicinesController.renderSelectedPharmacyMedicine);
        
        //////////////////////////////////////////
        // -- PHARMACY STAFF MANAGEMENTS
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff")
            ?.get(pharmacyStaffController.renderPharmacyStaff);

        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId")
            ?.get(pharmacyStaffController.renderPharmacyStaffProfile);
        
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/leaves");
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/attendance");
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/attendance");
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/leaves");
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/leaves/:leaveId");



        //:: MEDICINES ROUTES
        AppRouter.pipe(req ,res).route("/medicines");
        AppRouter.pipe(req ,res).route("/medicines/:medicineId");

        //:: PRODUCT ROUTES
        AppRouter.pipe(req ,res).route("/products");
        AppRouter.pipe(req ,res).route("/products/:productId");

        //:: ADMIN ROUTES
        AppRouter.pipe(req , res).route("/admin")
            ?.get(adminController.renderAdminDashboard);
        AppRouter.pipe(req , res).route("/admin/:adminId")
            ?.get(adminController.renderAdminDashboard);

        // -- NOTIFICATION MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/notifications");
        AppRouter.pipe(req , res).route("/admin/:adminId/notifications/:notificationId");

        // -- TRANSACTIONS MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/transactions");
        AppRouter.pipe(req , res).route("/admin/:adminId/blogs");
        
        // -- MEDICINES MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/medicines")
        ?.get(adminMedicineController.getAllMedicines);
        
        AppRouter.pipe(req , res).route("/admin/:adminId/medicine/create")
        ?.get(adminMedicineController.renderAdminCreateMedicine)
        ?.post(adminMedicineController.createMedicine);

        AppRouter.pipe(req , res).route("/admin/:adminId/medicines/:medicineId")
        ?.delete(adminMedicineController.deleteMedicine)
        ?.update(adminMedicineController.updateMedicine)
        ?.get(adminMedicineController.getMedicineById);


        // -- CUSTOMERS MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/customers");
        AppRouter.pipe(req , res).route("/admin/:adminId/customers/:customerId");


        // -- PHARMACIES MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/pharmacies")
        AppRouter.pipe(req , res).route("/admin/:adminId/pharmacies/:pharmacyId")
            ?.get(adminPharmacyController.renderAdminPharmacies);
        AppRouter.pipe(req , res).route("/admin/:adminId/pharmacy/:pharmacyId/verify")
            ?.get(adminPharmacyVerifyController.renderAdminPharmacyVerify);

        
        //:: BLOGS ROUTES
        AppRouter.pipe(req ,res).route("/blogs");
        AppRouter.pipe(req ,res).route("/blogs/:blogId");
        AppRouter.pipe(req , res).route("/blogs/create")

        //:: CUSTOMERS ROUTES
        AppRouter.pipe(req ,res).route("/customers/:customerId")
            ?.get(customerController.renderCustomerHome);

        AppRouter.pipe(req ,res).route("/customers/:customerId/profile")
            ?.get(customerProfileController.renderCustomerProfile);

        AppRouter.pipe(req ,res).route("/customers/:customerId/profile/edit");
        
        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies")
            ?.get(customerPharmacyController.renderCustomerPharmacies);

        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies/:pharmacyId");

        AppRouter.pipe(req ,res).route("/customers/:customerId/history");

        AppRouter.pipe(req ,res).route("/customers/:customerId/transaction");

        AppRouter.pipe(req ,res).route("/customers/:customerId/orders");

        AppRouter.pipe(req ,res).route("/customers/:customerId/orders/:orderId");

        
        AppRouter.pipe(req , res).end();

        








    
            


        




    

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})





module.exports = server;