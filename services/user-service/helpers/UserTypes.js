class UserTypes{
    static ADMIN = "admin";
    static CUSTOMER = "customer";
    static STOCK_MANAGER = "stock-manager";
    static PHARMACIST = "pharmacist";
    static PHARMACY_OWNER = "pharmacy-owner";
    static CASHIER = "cashier";
    static SYSTEM_STOCK_MANAGER = "system-stock-manager";
    static SYSTEM_PHARMACY_MANAGER = "system-pharmacy-manager";
}

Object.freeze(UserTypes);


module.exports = UserTypes;
