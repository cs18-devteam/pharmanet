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
const SignUpRouter = require('./services/auth-service/routes/SignUpRouter');
const LogInRouter = require('./services/auth-service/routes/LogInRouter');
const loyaltyPointsRouter = require('./services/loyaltypoints-service/routes/loyaltyPointsRouter');
const usersReDirectRouter = require('./services/user-service/routes/userRouter');
const { authenticate } = require('./services/auth-service/middlewares/authenticate');

const userRouter= require("./services/user-service/routes/userRouter");
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");
const pharmacyRouter = require("./services/pharmacy-service/routes/pharmacyRouter");

const MedicineModel = require("./services/medicine-service/models/medicineModel");
const PharmacyModel = require("./services/pharmacy-service/models/pharmacyModel");


const db = Database.getInstance();
 const medicineInstance = new MedicineModel();
 const pharmacyInstance = new PharmacyModel();



 medicineInstance.createTable().catch(console.error);
 pharmacyInstance.createTable().catch(console.error);

const app = App.getInstance();

env();

app.public('./frontend');
app.route('/users' , userRouter);
app.route('/medicine' , medicineRouter);
app.route('/pharmacies' , pharmacyRouter);

// handle user Routes
//app.route('/',authenticate , usersReDirectRouter);
app.route('/login' , LogInRouter)
app.route('/signup' , SignUpRouter);
app.route('/users/customers' , customerRouter);
app.route('/users/pharmacy/owners' , pharmacyOwnerRouter);
app.route('/users/pharmacy/pharmacists' , pharmacistRouter);
app.route('/users/pharmacy/cashiers' , cashierRouter);
app.route('/users/pharmacy/stockmanager' , pharmacyStockManagerRouter);
app.route('/users/system/stockmanager' , systemStockManagerRouter)
app.route('/users/system/pharmacymanager' , systemPharmacyManagerRouter)
app.route('/users/system/admin' , systemAdminRouter );
app.route('/customers/loyalty' ,  loyaltyPointsRouter);

app.run();