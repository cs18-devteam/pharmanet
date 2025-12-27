const env = require("../common/middlewares/env");
const path = require("path");
env();
// const Database = require("../database/Database");
const csvtojson = require('csvtojson');
const Medicines = require("../models/MedicineModel");
const Users = require("../models/UserModel");
const Bills = require("../models/BillModel");
const Blogs = require("../models/BlogModel");
const Carts = require("../models/CartModel");

Medicines.drop();
Users.drop();
Bills.drop();
Blogs.drop();
Carts.drop();



