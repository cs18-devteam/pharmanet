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
            host: process.env.DATABASE_HOSTNAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD, 
        });

        
        this.connection.connect((error)=>{
            if(error){
                console.error(error);
                throw error;
            }else{
                this.createDB();
                this.use();
                console.log("database connection Successful");
                return true;
            }
        });

        this.connection.execute(`Create database if not exists ${process.env.DATABASE_NAME}` , ()=>{
            if(process.env.NODE_ENV == "development"){
                console.log(process.env.DATABASE_NAME , " connected");

            }
        });

    }

    createDB(){
        try{
            Database.#database.query(`create database if not exists ${process.env.DATABASE_NAME} `)   
            console.log(`now using ${process.env.DATABASE_NAME} `); 
        }catch(error){
            console.log(error);
            throw error;
        }
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