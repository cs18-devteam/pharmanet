const UserTypes = require("../helpers/UserTypes");
const CashierModel = require("./cashierModel");
const CustomerModel = require("./customerModel");
const PharmacistModel = require("./pharmacistModel");
const SystemAdminModel = require("./systemAdminModel");
const UserModel = require("./UserModel");
const pharmacyOwnerModel = require("./pharmacyOwnerModel");
const pharmacyStockManagerModel = require("./pharmacyStockManagerModel");
const SystemPharmacyManagerModel = require("./systemPhamarcyManagerModel");
const SystemStockManagerModel = require("./systemStockManagerModel");

const Users = new UserModel();

const Admins = new SystemAdminModel();
const Cashiers = new CashierModel();
const Customers = new CustomerModel();
const Pharmacists = new PharmacistModel();
const PharmacyOwners = new pharmacyOwnerModel();
const PharmacyStockManagers = new pharmacyStockManagerModel();
const SystemStockManagers = new SystemStockManagerModel();
const SystemPharmacyManagers = new SystemPharmacyManagerModel();



// --this is only executes only once for creating tables
Users.createTable();
Cashiers.createTable();
Customers.createTable();
Admins.createTable();
Pharmacists.createTable();
PharmacyOwners.createTable();
PharmacyStockManagers.createTable();
SystemStockManagers.createTable();
SystemPharmacyManagers.createTable();
SystemStockManagers.createTable();



class UserFactory{
    constructor(){}

    static createUser(user=" " , data){
        switch (user){
            case UserTypes.ADMIN:
                return Users.save(data);

            case UserTypes.CASHIER:
                return Cashiers.save(data);

            case UserTypes.CUSTOMER:
                return Customers.save(data);

            case UserTypes.PHARMACIST:
                return Pharmacists.save(data);
            
            case UserTypes.PHARMACY_OWNER:
                return PharmacyOwners.save(data);

            case UserTypes.STOCK_MANAGER:
                return PharmacyStockManagers.save(data);
            
            case UserTypes.SYSTEM_PHARMACY_MANAGER:
                return SystemPharmacyManagers.save(data);

            case UserTypes.SYSTEM_STOCK_MANAGER:
                return SystemStockManagers.save();

            default:
                throw new Error(`invalid user type : ${user}`);
        }
    }
}

module.exports = UserFactory;