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
const adminMedicineControllerSpec = require('./controllers/admin.medicines.controller');
const { renderPharamcyStaffAttendance } = require('./controllers/pharmacy.staff.attendance.controller');
const { renderPharmacyStaffLeave } = require('./controllers/pharmacy.staff.leave.controller');
const medicineController = require('./controllers/medicines.controller');
const { renderMedicinesProfile } = require('./controllers/medicines.profile.controller');
const { renderAdminNotification } = require('./controllers/admin.notification.controller');
const { renderAdminNotificationProfile } = require('./controllers/admin.notification.profile.controller');
const { renderAdminTransactions } = require("./controllers/admin.transactions.controller");
const { renderAdminBlogs } = require("./controllers/admin.blogs.controller");
const { renderAdminCustomers } = require("./controllers/admin.customers.controller");
const { renderAdminCustomerDetails } = require("./controllers/admin.customers.customer.controller");
const { renderBlogs } = require("./controllers/blogs.controller");
const { renderBlogDetails } = require("./controllers/blog.details.controller");
const { renderBlogCreate } = require("./controllers/blog.create.controller");
const { renderCustomerPharmacyDetails } = require("./controllers/customer.pharmacy.details.controller");
const { renderCustomerHistory } = require("./controllers/customer.history.controller");
const { renderCustomerTransactions } = require("./controllers/customer.transactions.controller");
const { renderCustomerOrders } = require("./controllers/customer.orders.controller");
const { renderCustomerOrderDetails } = require("./controllers/customer.orders.order.controller");
const  {renderProducts, deleteProduct } = require("./controllers/product.controller");
const { renderCustomerMedicines } = require('./controllers/customer.medicines.controller');
const pharmacyProductController = require("./controllers/pharmacy.products.controller");
const cashierOrdersController = require("./controllers/cashier.order.controller");
const cashierController = require('./controllers/pharmacy/cashiers/cashier.controller');
const adminProductsController= require('./controllers/admin/product.controller');
const adminBlogController= require('./controllers/admin/blog.controller');
const adminMedicineController= require('./controllers/admin/medicine.controller');
const adminStaffController= require('./controllers/admin/staff.controller');


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

        AppRouter.pipe(req , res).route('/admin')

        // //all read operations
        AppRouter.pipe(req ,res).route('/admin/products')
        ?.get(adminProductsController.getAll);
        AppRouter.pipe(req ,res).route('/admin/staff')
        ?.get(adminStaffController.getAll);
        AppRouter.pipe(req ,res).route('/admin/medicines')
        ?.get(adminMedicineController.getAll);
        AppRouter.pipe(req ,res).route('/admin/blogs')
        ?.get(adminBlogController.getAll);
        
        // //all view operations
        AppRouter.pipe(req ,res).route('/admin/products/create')
        ?.get(adminProductsController.renderCreatePage)
        ?.post(adminProductsController.create);
        AppRouter.pipe(req ,res).route('/admin/staff/create')
        ?.get(adminStaffController.renderCreatePage)
        ?.post(adminStaffController.create);
        AppRouter.pipe(req ,res).route('/admin/medicines/create')
        ?.get(adminMedicineController.renderCreatePage)
        ?.post(adminMedicineController.create);
        AppRouter.pipe(req ,res).route('/admin/blogs/create')
        ?.get(adminBlogController.renderCreatePage)
        ?.post(adminBlogController.create);

        AppRouter.pipe(req , res).route('/admin/product/delete/:productId')
        ?.get(adminProductsController.getAll)


        // //all view operations
        AppRouter.pipe(req ,res).route('/admin/products/:id')
        ?.get(adminProductsController.getItem);
        AppRouter.pipe(req ,res).route('/admin/staff/:id')
        ?.get(adminStaffController.getItem);
        AppRouter.pipe(req ,res).route('/admin/medicines/:id')
        ?.get(adminMedicineController.getItem);
        AppRouter.pipe(req ,res).route('/admin/blogs/:id')
        ?.get(adminBlogController.getItem);


        
        // return AppRouter.pipe(req , res).end();

        //////////////////////////////
        //:: ROOT ROUTES
        AppRouter.pipe(req ,res).route('/')
            ?.get(indexController.renderIndexPage);


        //:: BLOG ROUTES
        AppRouter.pipe(req ,res).route('/users/blogs')
        
        AppRouter.pipe(req ,res).route('/users/blogs')
        AppRouter.pipe(req ,res).route('/users/blogs')

        //:: USER ROUTES
        AppRouter.pipe(req , res).route('/system/login')
            ?.get(loginController.renderLogin)
            ?.post(loginController.login);

        //:: USER ROUTES
        AppRouter.pipe(req , res).route('/login')
            ?.get(loginController.renderLogin)
            ?.post(loginController.login);

        AppRouter.pipe(req , res).route('/signup')
            ?.get(signupController.renderSignup)
            ?.post(signupController.createUser);

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
        
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/leaves")
        ?.get(renderPharmacyStaffLeave);
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/attendance")
        ?.get(renderPharmacyStaffAttendance);
        
        AppRouter.pipe(req ,res).route("/pharmacies/:pharmacyId/staff/:staffId/leaves/:leaveId")
        ?.get(renderPharmacyStaffLeaveProfile);



 



        //:: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //:: ~~~~~~~~~~~~~~~ SYSTEM STAFF ~~~~~~~~~~~~~~~~~~~~~~~~~~
        
        //:: ADMIN ROUTES
        AppRouter.pipe(req , res).route("/admin")
            ?.get(adminController.renderAdminDashboard);
        AppRouter.pipe(req , res).route("/admin/:adminId")
            ?.get(adminController.renderAdminDashboard);

        // -- ADMIN NOTIFICATION MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/notifications")
        ?.get(renderAdminNotification);
        AppRouter.pipe(req , res).route("/admin/:adminId/notifications/:notificationId")
        ?.get(renderAdminNotificationProfile);

        // -- ADMIN TRANSACTIONS MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/transactions")
        ?.get(renderAdminTransactions);
        AppRouter.pipe(req , res).route("/admin/:adminId/blogs")
        ?.get(renderAdminBlogs);
        
        // --ADMIN MEDICINES MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/medicines")
        ?.get(adminMedicineController.renderCreatePage);
        
        AppRouter.pipe(req , res).route("/admin/:adminId/medicine/create")
        ?.get(adminMedicineController.renderAdminCreateMedicine)
        ?.post(adminMedicineController.createMedicine);

        AppRouter.pipe(req , res).route("/admin/:adminId/medicines/:medicineId")
        ?.delete(adminMedicineController.deleteMedicine)
        ?.update(adminMedicineController.updateMedicine)
        ?.get(adminMedicineController.getMedicineById);


        // --ADMIN CUSTOMERS MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/customers")
        ?.get(renderAdminCustomers);
        AppRouter.pipe(req , res).route("/admin/:adminId/customers/:customerId")
        ?.get(renderAdminCustomerDetails);


        // --ADMIN PHARMACIES MANAGEMENTS
        AppRouter.pipe(req , res).route("/admin/:adminId/pharmacies")
        ?.get(adminPharmacyController.renderAdminPharmacyPage);
        AppRouter.pipe(req , res).route("/admin/:adminId/pharmacies/:pharmacyId")
            ?.get(adminPharmacyVerifyController.renderAdminPharmacyVerify);
        AppRouter.pipe(req , res).route("/admin/:adminId/pharmacy/:pharmacyId/verify")
            ?.get(adminPharmacyVerifyController.renderAdminPharmacyVerify);

        //:: SYSTEM STOCK MANAGERS
        AppRouter.pipe(req , res).route("/system/stockmanagers/:stockManagerId")
        ?.get(medicineController.renderMedicineManagement);
        
        //:: BLOGS ROUTES
        AppRouter.pipe(req ,res).route("/users/blogs")
        ?.get(renderBlogs);
        AppRouter.pipe(req ,res).route("/blogs/:blogId")
        ?.get(renderBlogDetails);
        AppRouter.pipe(req , res).route("/blogs/create")
        ?.get(renderBlogCreate);

        //:: PRODUCT ROUTES
        AppRouter.pipe(req ,res).route("/users/products")
        ?.get(renderProducts);
        AppRouter.pipe(req ,res).route("/products/:productId")
        ?.get(renderProductsProfile);


        //::MEDICINES ROUTES
        AppRouter.pipe(req , res).route('/users/medicines')
        ?.get(medicineController.renderMedicineManagement)

        //:: MEDICINES ROUTES
        AppRouter.pipe(req ,res).route("/medicines/:medicineId")
        ?.get(renderMedicinesProfile);
        
        AppRouter.pipe(req , res).route('/medicines')
        ?.post(medicineController.createMedicine)
        ?.get(medicineController.getMedicines)

        AppRouter.pipe(req , res).route('/medicines/:medicineId')
        ?.get(medicineController.getMedicine)
        ?.post(medicineController.createMedicine)
        ?.delete(medicineController.deleteMedicine)
        .update(medicineController.updateMedicine);


        //:: PHARMACIES ROUTES
        ///* ---   PHARMACY OWNERS ---
        AppRouter.pipe(req,res).route('/pharmacies/:pharmacyId/owners/:OwnerId')
        ?.get(pharmacyController.renderPharmacyDashboard);
        
        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/owners/:OwnerId/api/medicines')
        ?.get(pharmacyProductsController.getProducts)
        ?.post(pharmacyProductsController.createProduct)
        ?.update(pharmacyProductsController.updateProduct)
        ?.delete(pharmacyProductsController.deleteProduct);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/owners/:OwnerId/products')
        ?.get(pharmacyProductsController.renderPharmacyProducts)
        
        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/owners/:OwnerId/staff')
        
        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/owners/:OwnerId/api/products')
        ?.post(pharmacyProductController.createProduct)
        ?.get(pharmacyProductController.getProducts);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/owners/:OwnerId/api/products/:productId')
        ?.get(pharmacyProductController.getProduct)
        ?.update(pharmacyProductController.updateProduct)
        ?.delete(pharmacyProductController.deleteProduct);
        

        ///* --- PHARMACY CASHIERS

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/api/orders')
        ?.get(cashierOrdersController.getOrders)
        ?.post(cashierOrdersController.createOrder);
        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/api/orders/:orderId')
        ?.get(cashierOrdersController.getOrder)
        ?.update(cashierOrdersController.updateOrder)
        ?.delete(cashierOrdersController.deleteOrder);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId')
        ?.get(cashierController.renderCashierDashboard);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/bills')
        ?.get(cashierController.renderCashierCreateBill);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/customers')
        ?.get(cashierController.renderCashierCustomer);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/orders')
        ?.get(cashierController.renderCashierOrder);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/payment/qr')
        ?.get(cashierController.renderCashierPaymentQR);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/payment/card')
        ?.get(cashierController.renderCashierPaymentCard);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/payment/cash')
        ?.get(cashierController.renderCashierPaymentCash);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/products')
        ?.get(cashierController.renderCashierProduct);

        AppRouter.pipe(req , res).route('/pharmacies/:pharmacyId/cashiers/:cashierId/sales')
        ?.get(cashierController.renderCashierSales);

    

        //:: CUSTOMERS ROUTES
        AppRouter.pipe(req ,res).route("/customers/:customerId")
        // ?.authenticate()
        ?.get(customerController.renderCustomerHome);
        AppRouter.pipe(req ,res).route("/customers/:customerId/medicines")
            ?.get(renderCustomerMedicines);

        AppRouter.pipe(req ,res).route("/customers/:customerId/profile")
            ?.get(customerProfileController.renderCustomerProfile);

        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacy/register")
        ?.get(pharmacyController.renderPharmacyRegister);
        ;
        AppRouter.pipe(req ,res).route("/customers/:customerId/profile/edit");
        
        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies")
            ?.get(customerPharmacyController.renderCustomerPharmacies);

        AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies/:pharmacyId")
        ?.get(renderCustomerPharmacyDetails);

        AppRouter.pipe(req ,res).route("/customers/:customerId/history")
        ?.get(renderCustomerHistory);

        AppRouter.pipe(req ,res).route("/customers/:customerId/transaction")  ///not working
        ?.get(renderCustomerTransactions);

        AppRouter.pipe(req ,res).route("/customers/:customerId/orders")
        ?.get(renderCustomerOrders);

        AppRouter.pipe(req ,res).route("/customers/:customerId/orders/:orderId")
        ?.get(renderCustomerOrderDetails);

        
        AppRouter.pipe(req , res).end();

        








    
            


        




    

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})


/// line 135 & 137





module.exports = server;