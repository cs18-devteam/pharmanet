const Model = require("../../../common/Model");

class UserModel extends Model{
    constructor(){
        super();

        this.userName = {
            type: "VARCHAR(256)" ,
            unique: true,
        };

        this.email = {
            type: "VARCHAR(256)",
            validate : (value)=>{
                if(value.contains("@")) return true;
                return false;
            }
        }

        this.password = {
            type: "VARCHAR(256)",
        }

        this.firstName = {
            type : "VARCHAR(256)" , 
        }

        this.lastName = {
            type : "VARCHAR(256)",
        }

        this.fullName = {
            type : "VARCHAR(256)",
        };

        this.NIC = {
            type : 'VARCHAR(20)',
        };

        this.HomeNo = {
            type : 'VARCHAR(10)',
        };

        this.DateOfBirth = {
            type : 'DATE'
        };

        this.street = {
            type : "VARCHAR(20)"
        };

        this.town = {
            type : "VARCHAR(30)",
        };
        
        this.province = {
            type : "VARCHAR(30)",
        };
        
        this.postalCode = {
            type : "VARCHAR(30)",
        };
        
        this.bank = {
            type : "VARCHAR(30)",
        };

        this.accountNumber = {
            type : "VARCHAR(30)",
        };
        
        this.bankingBranch = {
            type : "VARCHAR(30)",
        }; 

    }
}


const Users = new UserModel();
module.exports = Users;