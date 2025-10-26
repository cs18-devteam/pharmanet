const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/Router');
const indexController = require('./controllers/index.controller');
const blogController = require('./controllers/blogs/blog.controller');
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

        AppRouter.pipe(req ,res).route('/signup')
        AppRouter.pipe(req ,res).route('/antibiotics')
        ?.get(blogController.antibiotics);
        AppRouter.pipe(req , res).route('/contactus')
        ?.get(contactUsController.renderContactus)

        //:: USER / LOGIN
        AppRouter.pipe(req , res).route('/login')
            ?.get(loginController.renderLogin)
            ?.post(loginController.login);

        // :: USER / SIGNUP
        AppRouter.pipe(req , res).route('/signup')
            ?.get(signupController.renderSignup)
            ?.post(signupController.signup);

        // :: USER / VERIFY EMAIL / MOBILE NUMBER
        AppRouter.pipe(req , res).route('/verify/email')
            ?.get(verifyEmailController.renderVerifyEmail);

        AppRouter.pipe(req , res).route('/verify/number')
            ?.get(verifyNumberController.renderVerifyNumber);

        //////////////////////////////////////////
        // :: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // :: ~~~~~~~~ ADMIN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //**  admin/ */
        // AppRouter.pipe(req ,res).route('/admin')
        // ?.get(adminController.adminDashboard);

        // AppRouter.pipe(req ,res).route('/admin/:adminId')
        // ?.authenticate(req.adminId)
        // ?.get(adminController.adminDashboard);

        // AppRouter.pipe(req ,res).route('/admin/pharmacy/create')
        // ?.get(adminController.adminAddPharmacy)
        // ?.post(adminController.createPharmacy);

        // AppRouter.pipe(req ,res).route('/admin/pharmacy/step/2')
        // ?.get(adminController.adminAddPharmacyStep02);

        // AppRouter.pipe(req ,res).route('/admin/pharmacy/step/3')
        // ?.get(adminController.adminAddPharmacyStep03)
 
        // AppRouter.pipe(req ,res).route('/admin/pharmacy/step/4')
        // ?.get(adminController.adminAddPharmacyStep04);

        AppRouter.pipe(req ,res).route('/blogManage')
        ?.get(blogController.blogManage);

        AppRouter.pipe(req ,res).route('/blogView')
        ?.get(blogController.blogView);

        AppRouter.pipe(req ,res).route('/createNewBlog')
        ?.get(blogController.createNewBlog);

        AppRouter.pipe(req ,res).route('/diabetics')
        ?.get(blogController.diabetics);

        AppRouter.pipe(req ,res).route('/editBlog1')
        ?.get(blogController.editBlog1);

        AppRouter.pipe(req ,res).route('/hypertension')
        ?.get(blogController.hypertension);
  
        AppRouter.pipe(req ,res).route('/supplement')
        ?.get(blogController.supplement);

        AppRouter.pipe(req , res).route("/api/blogs")
        ?.post(blogController.createBlog)
        ?.get(blogController.getAllBlogs);

        AppRouter.pipe(req ,res).route('/api/blogs/:id')
        ?.delete(blogController.deleteBlog)

        AppRouter.pipe(req ,res).route('/blog/delete/:id')
        ?.get(blogController.delete);

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
        AppRouter.pipe(req ,res).route("/customers/:customerId/medicines")
            ?.get(customerMedicineController.renderCustomerMedicines);


        //:: CUSTOMERS ROUTES
        AppRouter.pipe(req ,res).route("/customers/:customerId")
        // ?.authenticate(req.customerId)
        ?.get(customerController.renderCustomerHome);




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


        AppRouter.pipe(req ,res).route('/cashier-dashboard')
        ?.get(cashierController.renderCashierDashboard);

        AppRouter.pipe(req ,res).route('/cashier-customer')
        ?.get(cashierController.renderCashierCustomer);

        AppRouter.pipe(req ,res).route('/cashier-createBill')
        ?.get(cashierController.renderCashierBillPage);

        AppRouter.pipe(req ,res).route('/cashier-order')
        ?.get(cashierController.renderCashierorder);

        AppRouter.pipe(req ,res).route('/cashier-sales')
        ?.get(cashierController.renderCashierSale);

        AppRouter.pipe(req ,res).route('/cashier-product')
        ?.get(cashierController.renderCashierProduct);
        
        AppRouter.pipe(req ,res).route('/Product-management')
        ?.get(cashierController.cashierProductManagement);

        AppRouter.pipe(req, res).route('/api/products')
        ?.post(cashierController.createProduct);

        AppRouter.pipe(req, res).route('/cashier-payment-cash')
        ?.post(cashierController.paymentcash);

        AppRouter.pipe(req, res).route('/cashier-payment-card')
        ?.post(cashierController.paymentcard);

        AppRouter.pipe(req, res).route('/cashier-payment-QR')
        ?.post(cashierController.paymentQR);
        
        AppRouter.pipe(req, res).route('/cashier-product')
        ?.put(cashierController.renderCashierProduct);

        AppRouter.pipe(req, res).route('/cashier-product')
        ?.delete(cashierController.renderCashierProduct);

        AppRouter.pipe(req , res).route('/api/products')
        ?.get(cashierController.getAllProducts)
        ?.post(cashierController.createProduct);

        AppRouter.pipe(req , res).route('/api/products/:productId')
        ?.get(cashierController.getProductById)
        ?.update(cashierController.updateProduct)
        ?.delete(cashierController.deleteProduct);

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