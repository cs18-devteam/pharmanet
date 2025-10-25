<<<<<<< HEAD
=======
<<<<<<< HEAD
const App = require("./App");
const Database = require("./database/Database");
const env = require('./common/middlewares/env');
<<<<<<< HEAD
const userRouter= require("./services/user-service/routes/userRouter");
const orderRouter = require("./services/order-service/routes/orderRoutes");

const db = Database.getInstance();
const app = App.getInstance();
env();

app.public('./frontend');

app.route('/users' , userRouter);
app.route('/order', orderRouter);
=======
>>>>>>> origin/hamdha/backend/order
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
const staffRouter = require('./services/staff-service/routes/staffRouter');
const userRouter= require("./services/user-service/routes/userRouter");
<<<<<<< HEAD
const attendanceRouter= require("./services/attendence-service/routes/attendancerouter");
const leaveRouter = require('./services/leave-service/routes/leaveRouter');
const medicineRouter = require('./services/medicine-service/routes/medicineRouter');


const MedicineModel = require("./services/medicine-service/models/medicineModel");
const PharmacyModel = require("./services/pharmacy-service/models/pharmacyModel");

=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/hamdha/frontend/order
const orderRouter = require("./services/order-service/routes/orderRoutes");
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");
<<<<<<< HEAD
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
>>>>>>> origin/hamdha/backend/leave
=======
const leaveRouter = require("./services/leave-service/routes/leaveRoutes");
>>>>>>> origin/hamdha/frontend/order

const db = Database.getInstance();
 const medicineInstance = new MedicineModel();
 const pharmacyInstance = new PharmacyModel();



 medicineInstance.createTable().catch(console.error);
 pharmacyInstance.createTable().catch(console.error);


const app = App.getInstance();

env();
// handle user Routes

//app.route('/',authenticate , usersReDirectRouter);

<<<<<<< HEAD
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
app.route('/pharmacy/staff' ,staffRouter);
app.route('/users' , userRouter);
<<<<<<< HEAD
//app.route('/attendance' , attendanceRouter);
app.route('/leaves' , leaveRouter);
<<<<<<< HEAD
app.route('/Medicines', medicineRouter);
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/hamdha/frontend/order
app.route('/order', orderRouter);
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order

app.route('/medicine' , medicineRouter);
<<<<<<< HEAD
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
app.route('/medicine' , medicineRouter);
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
>>>>>>> origin/hamdha/backend/leave
=======

app.route('/leave', leaveRouter);
>>>>>>> origin/hamdha/frontend/order

app.run();