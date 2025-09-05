const mysql = require('mysql2');


class Database{
    static #database = undefined;

    constructor(){
        this.createConnection();
    }

    query(queryString){
        return new Promise((resolve , reject)=>{
            this.connection.query(queryString , (error , data , fields)=>{
                if(error) throw error;
                resolve(data , fields);
            });
        })
    }

    execute(queryString , clb){
        this.connection.execute(queryString , clb);
    }
    
    createConnection(){
        this.connection = mysql.createConnection({
            host:"localhost",
            user:"root",
            // password: '',
            database : "Pharmanet"
        }
        );

        
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