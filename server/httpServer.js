const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/Router');
const indexController = require('./controllers/index.controller');
const adminController = require('./controllers/admins/admin.controller');
const loginController = require('./controllers/auth/login.controller');
const signupController = require('./controllers/auth/signup.controller');
const contactUsController = require('./controllers/contactus.controller');

const customerController = require("./controllers/customer/customer.controller");
const pharmacyController = require('./controllers/pharmacy/pharmacy.controller');
const customerPharmacyController = require('./controllers/customer/customer.pharmacies.controller');
const { responseJson } = require('./common/response');
const adminPharmacyController = require('./controllers/admins/admin.pharmacy.controller');
const customerMedicineController = require('./controllers/customer/customer.medicines.controller');


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

        

        AppRouter.pipe(req , res).route('/')
        ?.get(indexController.renderIndexPage);


        AppRouter.pipe(req , res).route('/contactus')
        ?.get(contactUsController.renderContactus)

        //:: USER ROUTES
        AppRouter.pipe(req , res).route('/login')
            ?.get(loginController.renderLogin)
            ?.post(loginController.login);

        AppRouter.pipe(req , res).route('/signup')
            ?.get(signupController.renderSignup)
            ?.post(signupController.signup);

        AppRouter.pipe(req , res).route('/verify/email')
            ?.get(verifyEmailController.renderVerifyEmail);

        AppRouter.pipe(req , res).route('/verify/number')
            ?.get(verifyNumberController.renderVerifyNumber);

        //////////////////////////////////////////

        AppRouter.pipe(req ,res).route('/admin')
        ?.get(adminController.adminDashboard);

        AppRouter.pipe(req ,res).route('/admin/:adminId/pharmacy/create')
        ?.authenticate(req.adminId)
        ?.get(adminPharmacyController.adminAddPharmacy)
        ?.post(adminPharmacyController.createPharmacy);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/2')
        ?.get(adminPharmacyController.adminAddPharmacyStep02);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/3')
        ?.get(adminPharmacyController.adminAddPharmacyStep03)
 
        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/4')
        ?.get(adminPharmacyController.adminAddPharmacyStep04);

        AppRouter.pipe(req ,res).route('/admin/:adminId')
        ?.get(adminController.adminDashboard);


        AppRouter.pipe(req ,res).route('/admin/medicines')
        ?.get(adminController.medicines);

        AppRouter.pipe(req ,res).route('/admin/assets')
        ?.get(adminController.dataAssets);

        AppRouter.pipe(req ,res).route('/admin/users')
        ?.get(adminController.users);


        ////////////////////////////////////////////////


        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/update')
        ?.update(adminPharmacyController.updatePharmacy)


        AppRouter.pipe(req ,res).route('/admin/pharmacy')
        ?.get(adminPharmacyController.pharmacy);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/list')
        ?.get(adminPharmacyController.pharmacyList);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/view/:pharmacyId')
        ?.get(adminPharmacyController.getPharmacyDetails)
        ?.delete(adminPharmacyController.deletePharmacy);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit')
        ?.get(adminPharmacyController.adminEditPharmacy)
        ?.update(adminPharmacyController.adminEditPharmacy);


        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/2')
        ?.get(adminPharmacyController.adminEditPharmacyStep02);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/3')
        ?.get(adminPharmacyController.adminEditPharmacyStep03);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/4')
        ?.get(adminPharmacyController.adminEditPharmacyStep04)


        //////////////////////////////

        //:: CUSTOMERS ROUTES
        AppRouter.pipe(req ,res).route("/customers/:customerId")
        // ?.authenticate(req.customerId)
        ?.get(customerController.renderCustomerHome);


        AppRouter.pipe(req ,res).route("/customers/:customerId/medicines")
            ?.get(customerMedicineController.renderCustomerMedicines);

        AppRouter.pipe(req ,res).route("/customers/:customerId/profile")
        ?.get(customerController.renderCustomerProfile);

        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacy/register")
        ?.get(pharmacyController.renderPharmacyRegister);
        ;
        AppRouter.pipe(req ,res).route("/customers/:customerId/profile/edit");
        
        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies")
            ?.get(customerPharmacyController.renderCustomerPharmacies);

        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies/:pharmacyId")
        ?.get(customerPharmacyController.renderCustomerPharmacy);

        AppRouter.pipe(req ,res).route("/customers/:customerId/history")
        ?.get(renderCustomerHistory);

        AppRouter.pipe(req ,res).route("/customers/:customerId/transaction")  ///not working
        ?.get(renderCustomerTransactions);

        AppRouter.pipe(req ,res).route("/customers/:customerId/orders")
        ?.get(renderCustomerOrders);

        AppRouter.pipe(req ,res).route("/customers/:customerId/orders/:orderId")
        ?.get(renderCustomerOrderDetails);


        AppRouter.pipe(req ,res).route('/admin/:adminId/writers');
        AppRouter.pipe(req ,res).route('/admin/:adminId/writers/:writerId');
        AppRouter.pipe(req ,res).route('/admin/:adminId/writers/:writerId');
        AppRouter.pipe(req ,res).route('/admin/:adminId/writers/:writerId');
        AppRouter.pipe(req ,res).route('/admin/:adminId/writers/:writerId');




        return AppRouter.pipe(req ,res).end();

    }catch(e){
        console.log(e);
        responseJson(res  , 500 , {
            status:"error",
            message :"server not responding",
            error :e,
        })
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})







module.exports = server;