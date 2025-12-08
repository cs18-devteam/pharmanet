const http = require('http');
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
const { pharmacistRouter, pharmacyApiRouter, pharmacyRouter } = require('./routes/web/pharmacy.Routes');
const { cashiersBillsApiRouter, cashiersBillsRouter, pharmacistBillsRouter, pharmacistBillsApiRouter, pharmacyOwnersBillsRouter, pharmacyOwnersBillsApiRouter } = require('./routes/web/pharmacy.bills.Routes');
const { cashierRouter, cashierApiRouter } = require('./routes/web/cashier.Routes');
const path = require('path');
const Payment = require('./payhere/Payment');
const { paymentApiRouter } = require('./routes/api/api.payment.Routes');


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

        indexRouter.pipe(req , res);
        authRouter.pipe(req,res);
        customerRouter.pipe(req , res);
        adminRouter.pipe(req , res);
        adminBlogsRouter.pipe(req , res);
        adminPharmacyRouter.pipe(req , res);
        adminApiPharmacyRouter.pipe(req , res);
        pharmacistRouter.pipe(req , res);
        pharmacyApiRouter.pipe(req , res);
        pharmacyRouter.pipe(req , res);
        cashiersBillsApiRouter.pipe(req , res);
        cashiersBillsRouter.pipe(req ,res);
        pharmacistBillsRouter.pipe(req , res);
        pharmacistBillsApiRouter.pipe(req , res);
        pharmacyOwnersBillsRouter.pipe(req, res);
        pharmacyOwnersBillsApiRouter.pipe(req, res);
        cashierRouter.pipe(req , res);
        cashierApiRouter.pipe(req , res);
        paymentApiRouter.pipe(req , res);

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