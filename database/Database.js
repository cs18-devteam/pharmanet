const mysql = require('mysql2');


class Database{
    static #database = undefined;

    constructor(){
        this.connection = mysql.createConnection({
            host:"localhost",
            user:"root",
<<<<<<< HEAD
            password: "Ham#2003"
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
        }
        );
        
        this.connection.connect((error)=>{
            if(error){
                console.error(error);
            }else{
                console.log("database connection Successful");
            }
        })

        return this.connection;

    }

    static getInstance(){
        if(!Database.#database){
            Database.#database = new Database();
        }
        return Database.#database;
    }
}

module.exports = Database;