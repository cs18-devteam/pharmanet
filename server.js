const env = require('./common/middlewares/env');
const Database = require("./database/Database");
const App = require("./App");
const customerRouter = require("./services/user-service/routes/customerRouter");
const pharmacyOwnerRouter = require("./services/user-service/routes/pharmacyOwnerRouter");
const pharmacistRouter = require("./services/user-service/routes/pharmacistRouter");
const cashierRouter = require("./services/user-service/routes/cashierRouter");
const pharmacyStockManagerRouter = require("./services/user-service/routes/pharmacyStockManagerRouter");
const systemStockManagerRouter = require("./services/user-service/routes/systemStockManagerRouter");
const systemPharmacyManagerRouter = require("./services/user-service/routes/systemPharmacyManagerRouter");
const systemAdminRouter = require("./services/user-service/routes/systemAdminRouter");

env();
const app = App.getInstance();
const db = Database.getInstance();
app.public('./frontend');


// handle user Routes
app.route('/users/customers' , customerRouter);
app.route('/users/pharmacy/owners' , pharmacyOwnerRouter);
app.route('/users/pharmacy/pharmacists' , pharmacistRouter);
app.route('/users/pharmacy/cashiers' , cashierRouter);
app.route('/users/pharmacy/stockmanager' , pharmacyStockManagerRouter);
app.route('/users/system/stockmanager' , systemStockManagerRouter)
app.route('/users/system/pharmacymanager' , systemPharmacyManagerRouter)
app.route('/users/system/admin' , systemAdminRouter );

app.run();