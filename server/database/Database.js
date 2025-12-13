const mysql = require('mysql2');


class Database{
    static #database = undefined;

    constructor(){
        this.createConnection();
    }

    query(queryString){
        try{

            return new Promise((resolve , reject)=>{
                try{
                    this.connection?.query(queryString , (error , data , fields)=>{
            

                            if(error) reject ({
                                status:"error",
                                error,
                            });
                            resolve(data , fields);
        
                    });
                }catch(e){
                    reject({
                        status:"error",
                        error:e , 
                    })
                }
            })
            
        }catch(e){
            throw e;
        }
    }

    execute(queryString , clb){
        try{

            this.connection.execute(queryString , clb);
        }catch(e){
            throw e;
        }
    }
    
    createConnection(){
        try{

            this.connection = mysql.createConnection({
                host: process.env.DATABASE_HOSTNAME,
                user: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD, 
            });
        }catch(e){
            throw e;
        }

        try{

            
            
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
            
        }catch(e){
            throw e;
        }
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