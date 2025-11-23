const Model = require("../common/Model");
const { users } = require("../controllers/admins/admin.controller");

class UserModel extends Model{
    constructor(){
        super();
        this.name = {
            type : "VARCHAR(30)",
            null : false,
        }

        this.email = {
            type : "VARCHAR(50)",
            null : false,
        }

        this.pharmacy = {
            type : "VARCHAR(30)",
            null : false,
        } 

        this.role = {
            type : "VARCHAR(20)",
            null : false,
        }
    }
}

const Users = new UserModel();
Users.createTable().catch(e =>{
    console.log(e);
    console.log("error in user model")
});
module.exports = Users;