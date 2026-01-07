const http = require('http');
const https = require("https");
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/AppRouter');
const SubRouter = require('./common/SubRouter');
const { responseJson } = require('./common/response');

const { indexRouter } = require('./routes/web/index.Routes');
const authRouter = require('./routes/web/auth.Routes');
const customerRouter = require('./routes/web/customers.Routes');
const adminBlogsRouter = require('./routes/web/admin.blogs.Routes');
const adminRouter = require('./routes/web/admin.Routes');
const { adminPharmacyRouter, adminApiPharmacyRouter } = require('./routes/web/admin.pharmacy.Routes');
const { pharmacistRouter, pharmacyRouter } = require('./routes/web/pharmacy.Routes');
const { cashiersBillsApiRouter, cashiersBillsRouter, pharmacistBillsRouter, pharmacistBillsApiRouter, pharmacyOwnersBillsRouter, pharmacyOwnersBillsApiRouter } = require('./routes/web/pharmacy.bills.Routes');
const { cashierRouter, cashierApiRouter } = require('./routes/web/cashier.Routes');
const path = require('path');
const Payment = require('./payhere/Payment');
const { paymentApiRouter } = require('./routes/api/api.payment.Routes');
const { productsRouter } = require('./routes/web/products.Routes');
const { pharmacyApiStaffRouter, pharmacyApiRouter, pharmaciesApiRouter } = require('./routes/api/api.pharmacy.Routes');
const { transactionsRouter } = require('./routes/api/api.transactions.Routes');
// const { customerCartApiRouter } = require('./routes/api/api.customer.cart.Routes');
const { customerApiRouter } = require('./routes/api/api.customer.Routes');
const Pharmacies = require('./models/PharmacyModel');
const { ordersApiRouter } = require('./routes/api/api.oder.Routes');
const { pharmacyStaffRouter } = require('./routes/web/pharmacy.staff.Routes');
const { profileDetailsApiRouter } = require('./routes/api/api.profiles.Routes');
const { pharmacyTransactionsRouter } = require('./routes/api/api.pharmacy.transaction.Routes');


const { pharmacyProductApiRouter } = require('./routes/api/api.pharmacy.product.Routes');
const { adminUsersRouter } = require('./routes/web/admin.users.Routes');
const { adminMedicineRouter } = require('./routes/web/admin.medicines.Routes');
const { adminDashboardRouter } = require('./routes/web/admin.dashboard.Routes');
const { adminApiDashboardRouter } = require('./routes/web/admin.dashboard.Routes');


const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};


// const server = http.createServer((req , res)=>{
const server = https.createServer(options,(req , res)=>{
    try{
        const {url , method} = req;
        const URI = new URL(url , `https://${process.env.HOSTNAME}:${process.env.PORT}`);
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

        // web routes
        indexRouter.pipe(req , res);
        authRouter.pipe(req,res);
        customerRouter.pipe(req , res);
        adminRouter.pipe(req , res);
        adminDashboardRouter.pipe(req, res);
        adminBlogsRouter.pipe(req , res);
        adminPharmacyRouter.pipe(req , res);
        pharmacyStaffRouter.pipe(req,res);
        adminUsersRouter.pipe(req,res);
        adminMedicineRouter.pipe(req, res)
        pharmacistRouter.pipe(req , res);
        pharmacyRouter.pipe(req , res);
        cashiersBillsRouter.pipe(req ,res);
        pharmacistBillsRouter.pipe(req , res);
        pharmacyOwnersBillsRouter.pipe(req, res);
        cashierRouter.pipe(req , res);
        productsRouter.pipe(req , res);
        transactionsRouter.pipe(req, res);

        //api routes
        adminApiDashboardRouter.pipe(req, res);
        pharmacistBillsApiRouter.pipe(req , res);
        pharmacyOwnersBillsApiRouter.pipe(req, res);
        cashiersBillsApiRouter.pipe(req , res);
        pharmacyApiRouter.pipe(req , res);
        cashierApiRouter.pipe(req , res);
        paymentApiRouter.pipe(req , res);
        pharmacyApiStaffRouter.pipe(req , res);
        ordersApiRouter.pipe(req ,res);
        profileDetailsApiRouter.pipe(req , res);
        // customerCartApiRouter.pipe(req , res);
        adminApiPharmacyRouter.pipe(req , res);
        customerApiRouter.pipe(req , res);
        pharmaciesApiRouter.pipe(req ,res);
        pharmacyTransactionsRouter.pipe(req,res);

        AppRouter.pipe(req ,res).route('/admin/addUsers')
        ?.get(adminController.addUsers);


        return AppRouter.pipe(req ,res).end();

    }catch(e){
        console.log(e);
        responseJson(res  , 500 , {
            status:"error",
            message :"server not responding",
            error :e,
        });
    }
    


})



SubRouter.save("./routes.ReadME.md");





module.exports = server;