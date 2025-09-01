const App = require("./App");
const Database = require("./database/Database");
const env = require('./common/middlewares/env');
const orderRouter = require("./services/order-service/routes/orderRoutes");
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");
const leaveRouter = require("./services/leave-service/routes/leaveRoutes");

const db = Database.getInstance();
const app = App.getInstance();
env();

app.public('./frontend');

app.route('/order', orderRouter);

app.route('/medicine' , medicineRouter);

app.route('/leave', leaveRouter);

app.run();