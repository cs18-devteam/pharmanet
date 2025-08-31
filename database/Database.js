const mysql = require('mysql2');


class Database{
    static #database = undefined;

    constructor(){
        this.createConnection();
    }

    query(queryString , clb){
        this.connection.query(queryString , clb);
    }

    execute(queryString , clb){
        this.connection.execute(queryString , clb);
    }
    
    createConnection(){
        this.connection = mysql.createConnection({
            host: process.env.HOSTNAME || "localhost",
            user: process.env.DATABASE_USERNAME || "root",
            password: process.env.DATABASE_PASSWORD 
        });
        
        this.connection.connect((error)=>{
            if(error){
                console.error(error);
                throw error;
            }else{
                this.use();
                console.log("database connection Successful");
                return true;
            }
        })

    }

    printName(){
        console.log("chathura");
    }

    use(){
        try{
            Database.#database.query(`use ${process.env.DATABASE_NAME} `)   
            console.log(`now using ${process.env.DATABASE_NAME} `); 
        }catch(error){
            console.log(error);
            throw error;
        }


    }

    static getInstance(){
        if(!Database.#database){
            Database.#database = new Database();
            

        }

        return Database.#database;
    }
}

module.exports = Database;