const App = require("./App");
const Database = require("./database/Database");
const env = require('./common/middlewares/env');
const userRouter= require("./services/user-service/routes/userRouter");
<<<<<<< HEAD
<<<<<<< HEAD
const orderRouter = require("./services/order-service/routes/orderRoutes");
=======
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
const medicineRouter = require("./services/medicine-service/routes/medicineRouter");
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0

const db = Database.getInstance();
const app = App.getInstance();
env();

app.public('./frontend');

app.route('/users' , userRouter);
<<<<<<< HEAD
<<<<<<< HEAD
app.route('/order', orderRouter);

=======
app.route('/medicine' , medicineRouter);
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
app.route('/medicine' , medicineRouter);
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0

app.run();