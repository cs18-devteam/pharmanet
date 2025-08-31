const DB = require("../database/Database");
const db = DB.getInstance();

class Model{
    #table = undefined;

    constructor(){
        this.#table = (this.#createTableName(this.constructor.name));   
    }

    #createTableName(name){
        //create table name
        // ex : UserModel -to lower-> usermodel -replace last model-> user_table
        return name.toLowerCase().replace(/model$/ , "_table");
    }


    //save model to database (create table)
    createTable(){
        const createTableQuery = this.#buildCreateTableQuery();
        const useQueryHandler = (error , data , field)=>{
            if(error){
                console.log(error);
                return;
            }
            db.query(createTableQuery , createTableHandler);
        }
        
        const createTableHandler = (error , data ,field)=>{
            if(error){
                console.log(error);
                return;
            }
        }
        db.query(`use ${process.env.DATABASE_NAME}` , useQueryHandler);
        
    }

    save(data){

        let query = "INSERT INTO %%TABLE_NAME%%( %%COLUMNS%% ) VALUES( %%VALUES%% )";

        //add table name
        query = query.replace("%%TABLE_NAME%%" , this.#table);


        let columnsArray = [];
        let valuesArray = [];
        for(const [columnName] of Object.entries(this)){
            
            if(columnName == "id") continue;

            const value = data?.[columnName];

            if(!value) continue;

            if(typeof value == "string"){
                valuesArray.push(`"${value}"`);
            }else{
                valuesArray.push(value);
            }

            columnsArray.push(columnName);

        }

        query = query.replace("%%COLUMNS%%" , columnsArray.join(","));
        query = query.replace("%%VALUES%%" , valuesArray.join(','));

        db.query(query , (error , data , fields)=>{
            console.log(error);
        })

        console.log(data , query);
    }


    update(data){

        let query = "UPDATE %%TABLE_NAME%%( %%COLUMNS%% ) VALUES( %%VALUES%% where id=%%U_ID%% )";

        //add table name
        query = query.replace("%%TABLE_NAME%%" , this.#table);
        query = query.replace("%%U_ID%%" , data.id);


        let columnsArray = [];
        let valuesArray = [];
        for(const [columnName] of Object.entries(this)){

            if(columnName == "id") continue;

            const value = data?.[columnName];

            if(!value) continue;

            if(typeof value == "string"){
                valuesArray.push(`"${value}"`);
            }else{
                valuesArray.push(value);
            }

            columnsArray.push(columnName);

        }

        query = query.replace("%%COLUMNS%%" , columnsArray.join(","));
        query = query.replace("%%VALUES%%" , valuesArray.join(','));


        db.query(query , (error , data , fields)=>{
            console.log(error);
        })

        console.log(data , query);
    }

    
    //get using id
    getById(id){
        const query = `SELECT * FROM ${this.#table} WHERE id=${id}`;
        // return data get from database as object
        const queryHandler = (error , data , fields)=>{
            if(error){
                console.log(error );
                throw error;
            }
            console.log(data , fields)
            return data;
        }

        db.query(query , queryHandler);
    }


    //delete using id
    deleteById(id){
        const query = `DELETE FROM ${this.#table} WHERE id=${id}`;
        // return data get from database as object
        const queryHandler = (error , data , fields)=>{
            if(error){
                console.log(error );
                throw error;
            }
            console.log(data , fields)
            return data;
        }

        db.query(query , queryHandler);
        // return deleted data from database
    }

    //update using id
    updateById(id , data){
        const query = `DELETE FROM ${this.#table} WHERE id=${id}`;
        // return data get from database as object
        const queryHandler = (error , data , fields)=>{
            if(error){
                console.log(error );
                throw error;
            }
            console.log(data , fields)
            return data;
        }

        db.query(query , queryHandler);
        // return update and return updated row as object
    }


    //get data from database
    get(callback){
        // return set of object that callback is matching
    }

    //delete data from database
    delete(callback){
        // return set of deleted objects(rows) that match callback

    }

    drop(){
        const query = `drop table ${this.#table}`;
        // return data get from database as object
        const queryHandler = (error , data , fields)=>{
            if(error){
                console.log(error );
                throw error;
            }
            console.log(data , fields)
            return data;
        }

        db.query(query , queryHandler);
        
    }



    #buildCreateTableQuery(){
        try{
            // build create table query
            let query = "CREATE TABLE IF NOT EXISTS %%TABLE_NAME%%(%%COLUMN_DATA%%  %%TABLE_CONSTRAINTS%% )"; 
            
            const tableConstraints = [];
            const columns = [];
            let columnQueryTemplate;
            let hasPrimaryKey = false;

            for(const [name   , value] of Object.entries(this)){
                columnQueryTemplate = " %%COLUMN_NAME%% %%DATA_TYPE%% %%CONSTRAINTS%%";
                
                columnQueryTemplate = columnQueryTemplate.replace("%%COLUMN_NAME%%" , name);
                if(!value.type) throw new Error(`${name} data type not defined`);
                columnQueryTemplate = columnQueryTemplate.replace("%%DATA_TYPE%%" , value.type);
                
                // add column constraints
                const constraints = [];
                if(value.unique == true) constraints.push("UNIQUE");
                if(value.null == false) constraints.push("NOT NULL");
                    
                if(value.primaryKey == true){
                    tableConstraints.push(`PRIMARY KEY(${name})`);
                    hasPrimaryKey = true;
                }

                if(value.foreignKey){
                    //generate foreign key constraints
                    let foreignKey = 'id';
                    let tableName = ' ';
                    
                    if(typeof value.foreignKey == "string"){
                        tableName = this.#createTableName(value.foreignKey);
                    }else if(value.foreignKey.value){
                        foreignKey = value.foreignKey.value;
                    }else{
                        tableName = this.#createTableName(value.foreignKey.Model);
                    }

                    tableConstraints.push(`FOREIGN KEY (${name}) REFERENCES ${tableName}(${foreignKey})`)
                }

                columnQueryTemplate = columnQueryTemplate.replace("%%CONSTRAINTS%%" , constraints.join(" "));
                columns.push(columnQueryTemplate);
            }

            query = query.replace("%%TABLE_NAME%%" , this.#table);

            query = query.replace("%%COLUMN_DATA%%" , columns.join(',').concat(","));

            if(true || !hasPrimaryKey){
                tableConstraints.push("id int auto_increment primary key");
            }

            query = query.replace("%%TABLE_CONSTRAINTS%%", tableConstraints.join(','));

            return query;

        }catch(error){
            console.log(error);
            throw error;
        }
    }
}


module.exports = Model;