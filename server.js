const Database = require('./database/Database'); 
const App = require("./app");
const userRouter = require('./services/user-service/routes/userRoutes');

// add environment variables from .env file
const env = require('./common/middlewares/env');
env();

// get database connection
const db = Database.getInstance();
const app = App.getInstance();

//set public as frontend directory
app.public("./frontend");

app.route("/users" , userRouter);

app.run();
