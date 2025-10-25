const mysql = require('mysql2');


class Database{
    static #database = undefined;

    constructor(){
<<<<<<< HEAD
=======

        this.connection = mysql.createConnection({
            host:"localhost",
            user:"root",
<<<<<<< HEAD
            password: "Ham#2003"
        }
        );

>>>>>>> origin/hamdha/backend/order
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
<<<<<<< HEAD
            host: process.env.HOSTNAME || "localhost",
            user: process.env.DATABASE_USERNAME || "root",
            password: process.env.DATABASE_PASSWORD 
        });

<<<<<<< HEAD
=======
            host:"localhost",
            user:"root",
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/hamdha/frontend/order
            password: "Ham#2003"
        }
        );
>>>>>>> origin/hamdha/backend/leave
=======

>>>>>>> origin/hamdha/backend/order
        
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
<<<<<<< HEAD
            
=======
>>>>>>> origin/hamdha/backend/order

        }

        return Database.#database;
    }
}

module.exports = Database;