const UserModel = require("./UserModel");

class CustomerModel extends UserModel{
    constructor(){
        super();
    }
}

const Customers = new CustomerModel();
Customers.createTable().catch(e=>{
    console.log(e);
    console.log("customer table not created");
})
module.exports =  Customers;