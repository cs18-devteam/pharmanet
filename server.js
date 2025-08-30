const App = require("./App");
const Database = require("./database/Database");
const env = require('./common/middlewares/env');
const userRouter= require("./services/user-service/routes/userRouter");
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");

const db = Database.getInstance();
const app = App.getInstance();
env();

app.public('./frontend');

app.route('/users' , userRouter);
app.route('/medicine' , medicineRouter);

app.run();