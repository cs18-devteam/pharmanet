const Env = require("../../common/middlewares/env");
const Cashiers = require("../../services/user-service/models/cashierModel");
const Customers = require("../../services/user-service/models/customerModel");
const Pharmacists = require("../../services/user-service/models/pharmacistModel");
const PharmacyOwners = require("../../services/user-service/models/pharmacyOwnerModel");
const PharmacyStockManagers = require("../../services/user-service/models/pharmacyStockManagerModel");
const Admins = require("../../services/user-service/models/systemAdminModel");
const SystemPharmacyManagers = require("../../services/user-service/models/systemPhamarcyManagerModel");
const SystemStockManagers = require("../../services/user-service/models/systemStockManagerModel");
const Users = require("../../services/user-service/models/UserModel");
const Products = require("../../services/product-service/model/productModel");


Env();
const Database = require("../../database/Database");
const LoyaltyPoints = require("../../services/loyaltypoints-service/models/LoyaltyPointsModel");
const Pharmacies = require("../../services/pharmacy-service/model/PharmacyModel");
const Leaves = require("../../services/leave-service/models/LeaveModel");
const db = Database.getInstance();


// --this is only executes only once for creating tables
Users.createTable();
Admins.createTable();
Customers.createTable();
Pharmacies.createTable();
Cashiers.createTable();
Pharmacists.createTable();
PharmacyOwners.createTable();
PharmacyStockManagers.createTable();
SystemStockManagers.createTable();
SystemPharmacyManagers.createTable();
SystemStockManagers.createTable();
LoyaltyPoints.createTable();
Leaves.createTable();
Products.createTable();