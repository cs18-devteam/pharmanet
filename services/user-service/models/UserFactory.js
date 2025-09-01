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

    static async createUser(user=" " , data){

        const {
            username : userName,
            email : email,
            password : password,
            firstname : firstName,
            lastname : lastName,
            fullname : fullName,
            nic : NIC,
            dateofbirth : DateOfBirth,
            street,
            town,
            province,
            postalcode : postalCode ,
            bank ,
            accountnumber : accountNumber,
            bankingbranch : bankingBranch 
        } = data;

        const [newUser] = await Users.save({
            userName,
            email,
            password,
            firstName,
            lastName,
            fullName,
            DateOfBirth,
            NIC,
            street,
            town,
            province,
            postalCode,
            bank,
            accountNumber,
            bankingBranch
        });

        data.uid = newUser.id;

        switch (user){
            case UserTypes.ADMIN:
                const newAdmin =await Admins.save(data);
                newUser.adminId = newAdmin.id;
                break;

            case UserTypes.CASHIER:
                const newCashier =await Cashiers.save(data);
                newUser.cashierId = newCashier.id;
                break;

            case UserTypes.CUSTOMER:
                const newCustomer =await Customers.save(data);
                newUser.customerId = newCustomer.id;
                break;

            case UserTypes.PHARMACIST:
                const newPharmacist =await Pharmacists.save(data);
                newUser.pharmacistId = newPharmacist.id;
                break;
            
            case UserTypes.PHARMACY_OWNER:
                const newPharmacyOwner =await PharmacyOwners.save(data);
                newUser.pharmacyOwnerId = newPharmacyOwner.id;
                break;

            case UserTypes.STOCK_MANAGER:
                const newPharmacyStockManager =await PharmacyStockManagers.save(data);
                newUser.pharmacyStockManagerId = newPharmacyStockManager.id;
                break;
            
            case UserTypes.SYSTEM_PHARMACY_MANAGER:
                const newSystemPharmacyManager = SystemPharmacyManagers.save(data);
                newUser.systemPharmacyManagerId = newSystemPharmacyManager.id;
                break;

            case UserTypes.SYSTEM_STOCK_MANAGER:
                const newSystemStockManager = SystemStockManagers.save();
                newUser.systemStockMangerId = newSystemStockManager.id;
                break;

            default:
                Users.deleteById(newUser.id);
                throw new Error(`invalid user type : ${user}`);
        }

        return newUser;
    }
}

module.exports = UserFactory;