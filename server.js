const App = require("./App");
const Database = require("./database/Database");
const env = require('./common/middlewares/env');

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

app.run();