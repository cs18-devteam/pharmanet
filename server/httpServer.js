const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/Router');
const indexController = require('./controllers/index.controller');
const cashierController = require('./controllers/Cashier/cashier.contreller');
const { isConstructorDeclaration } = require('typescript');


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

        
        AppRouter.pipe(req ,res).route('/signup')
        AppRouter.pipe(req ,res).end();


    

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})


/// line 135 & 137





module.exports = server;