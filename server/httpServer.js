const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/AppRouter');
const indexController = require('./controllers/index.controller');
const blogController = require('./controllers/blogs/blog.controller');
const adminController = require('./controllers/admins/admin.controller');
const loginController = require('./controllers/auth/login.controller');
const signupController = require('./controllers/auth/signup.controller');
const contactUsController = require('./controllers/contactus.controller');
const pharmacyController = require('./controllers/pharmacy/pharmacy.controller');
const customerPharmacyController = require('./controllers/customer/customer.pharmacies.controller');
const { responseJson } = require('./common/response');
const adminPharmacyController = require('./controllers/admins/admin.pharmacy.controller');
const customerMedicineController = require('./controllers/customer/customer.medicines.controller');
const cashierController = require('./controllers/Cashier/cashier.controller');
const pharmacyAttendanceController = require('./controllers/pharmacy/pharmacy.attendance.controller');
const pharmacyStaffController = require('./controllers/pharmacy/pharmacy.staff.controller');
const verifyEmailController = require('./controllers/auth/verify.email.controller');
const verifyNumberController = require('./controllers/auth/verify.number.controller');
const otpController = require('./controllers/auth/sendOTP.controller');
const pharmacyMedicinesController = require('./controllers/pharmacy/pharmacy.medicines.controller');
const pharmacyMedicinesApiController = require('./controllers/pharmacy/pharmacy.medicines.api.controller');
const SubRouter = require('./common/SubRouter');
const customerRoutes = require('./routes/web/customers.Routes');


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




        SubRouter.pipe(req , res).route('/customers/:customerId')
        .subRoute('/' , customerRoutes.homeRouter)
        .subRoute('/medicines' , customerRoutes.medicineRouter)
        .subRoute('/pharmacy/register' , customerRoutes.pharmacyRegister)
        .subRoute('')
        
        




        //////////////////////////////////////////
        // :: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // :: ~~~~~~~~ ADMIN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
        







 



        AppRouter.pipe(req , res).route('/user/:userId/').router(userRouter)




        return AppRouter.pipe(req ,res).end();

    }catch(e){
        console.log(e);
        responseJson(res  , 500 , {
            status:"error",
            message :"server not responding",
            error :e,
        })
        // server.close(()=>{
        //     console.log("Server shutdown due to error");
        // })
    }
    


})







module.exports = server;