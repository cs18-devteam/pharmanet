const Model = require("../common/Model");

class UserModel extends Model{
    constructor(){
        super();
        this.email = {
            type:"VARCHAR(100)",
            null: false,
        }

        this.password = {
            type:"VARCHAR(400)",
            null : false,
        }

        this.firstName = {
            type:"VARCHAR(100)",
        }

        this.lastName = {
            type:"VARCHAR(100)",
        }

        this.nic = {
            type:"VARCHAR(30)",
        }

        this.fullName = {
            type:"VARCHAR(100)"
        }

        this.dateOfBirth = {
            type:"DATETIME"
        }

        this.addressNo = {
            type:"VARCHAR(10)",
        }

        this.street = {
            type:"VARCHAR(50)",
        }

        this.town = {
            type:"VARCHAR(50)",
        }

        this.province = {
            type:"VARCHAR(50)",
        }

        this.postalCode = {
            type:"INT"
        }

        this.bank = {
            type:"VARCHAR(50)",
        }

        this.accountNo = {
            type:"VARCHAR(50)"
        }

        this.bankBranch = {
            type:"VARCHAR(50)"
        }

        this.userName = {
            type:"VARCHAR(50)",
        }

        this.role = {
            type : "VARCHAR(50)",
        }

        this.emailOTP = {
            type:"INT",
        }

        this.emailOTPCreatedAt = {
            type:"DATETIME",
        }

    }
}

const Users = new UserModel();
Users.createTable().catch(e=>{
    console.log('user table not created');
})
module.exports = Users;