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

        // const express = require("express");
        // const mysql = require("mysql2");
        // const cors = require("cors");

        // const app = express();
        // app.use(cors());
        // app.use(express.json());

        // ✅ MySQL Connection
        // const db = mysql.createConnection({
        // host: "localhost",
        // user: "root",        // 👈 your MySQL username
        // password: "",        // 👈 your MySQL password
        // database: "blog_service",  // 👈 the database you created
        // });

        // db.connect((err) => {
        // if (err) throw err;
        // console.log("✅ MySQL Connected!");
        // })
        

        AppRouter.pipe(req , res).route('/')
        ?.get(indexController.renderIndexPage);


        AppRouter.pipe(req ,res).route('/signup')
        AppRouter.pipe(req ,res).route('/antibiotics')
        ?.get(blogController.antibiotics);
        AppRouter.pipe(req , res).route('/contactus')
        ?.get(contactUsController.renderContactus)

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

        //////////////////////////////////////////

        AppRouter.pipe(req ,res).route('/admin')
        ?.get(adminController.adminDashboard);

        AppRouter.pipe(req,res).route('/admin/pharmacy')
        ?.get(adminController.adminPharmacy);

        AppRouter.pipe(req,res).route('/admin/medicines')
        ?.get(adminController.medicines);

        AppRouter.pipe(req,res).route('/admin/users')
        ?.get(adminController.users);

        AppRouter.pipe(req ,res).route('/admin/addUsers')
        ?.get(adminController.addUsers);

        AppRouter.pipe(req, res).route('/api/admin/users')
        ?.post(adminController.createUser)
        ?.get(adminController.getAllBlogs);

        AppRouter.pipe(req ,res).route('/admin/dataAssets')
        ?.get(adminController.dataAssets);

        AppRouter.pipe(req,res).route('/admin/viewProfile')
        ?.get(adminController.viewProfile);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/create')
        ?.get(adminController.adminAddPharmacy)
        ?.post(adminController.createPharmacy);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/2')
        ?.get(adminController.adminAddPharmacyStep02);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/3')
        ?.get(adminController.adminAddPharmacyStep03)
 
        AppRouter.pipe(req ,res).route('/admin/pharmacy/step/4')
        ?.get(adminController.adminAddPharmacyStep04);

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
        // ?.get(blogController.getBlogbyId)
        // // ?.get(blogController.getAllBlogs)
        // ?.post(blogController.createBlog)
        // ?.update(blogController.updateBlog)

        AppRouter.pipe(req ,res).route('/delete/:id')
        ?.get(blogController.delete);

        AppRouter.pipe(req ,res).route('/customer/orderManage')
        ?.get(customerController.orderManage);




     

        return AppRouter.pipe(req ,res).end()
  



        ////////////////////////////////////////////////


        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/update')
        ?.update(adminController.updatePharmacy)


        AppRouter.pipe(req ,res).route('/admin/pharmacy')
        ?.get(adminController.pharmacy);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/list')
        ?.get(adminController.pharmacyList);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/view/:pharmacyId')
        ?.get(adminController.getPharmacyDetails)
        ?.delete(adminController.deletePharmacy);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit')
        ?.get(adminController.adminEditPharmacy)
        ?.update(adminController.adminEditPharmacy);


        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/2')
        ?.get(adminController.adminEditPharmacyStep02);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/3')
        ?.get(adminController.adminEditPharmacyStep03);

        AppRouter.pipe(req ,res).route('/admin/pharmacy/:pharmacyId/edit/step/4')
        ?.get(adminController.adminEditPharmacyStep04)


        //////////////////////////////

        //:: CUSTOMERS ROUTES
        AppRouter.pipe(req ,res).route("/customers/:customerId")
        ?.authenticate()
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



        AppRouter.pipe(req ,res).route('/admin/medicines')
        ?.get(adminController.medicines);

        

        AppRouter.pipe(req ,res).route('/admin/users')
        ?.get(adminController.users);

        AppRouter.pipe(req ,res).route('/admin/addUsers')
        ?.get(adminController.addUsers);


        return AppRouter.pipe(req ,res).end();

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})


/// line 135 & 137





module.exports = server;