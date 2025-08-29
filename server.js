const http = require('node:http');
const Database = require('./database/Database'); 
const App = require("./app");
const env = require('./common/middlewares/env');

// add environment variables from .env file
env();

// get database connection
const db = Database.getInstance();

//create app
App.createApp({
    port:process.env.APP_PORT,
    hostname: process.env.DEVELOPMENT_HOSTNAME,
})

const app = App.getInstance();

app.public("./frontend");


app.run();
