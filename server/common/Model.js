const DB = require("../database/Database");
const db = DB.getInstance();

class Model{
    #table = undefined;

    constructor(){
        this.#table = (this.#createTableName(this.constructor.name));   
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

    #createTableName(name){
        try{

            //create table name
            // ex : UserModel -to lower-> usermodel -replace last model-> user_table
            return name.toLowerCase().replace(/model$/ , "_table");
        }catch(e){
            throw e;
        }
    }


    //save model to database (create table)
    async createTable(){
        try{

            const createTableQuery = this.#buildCreateTableQuery();
            await db.query(`use ${process.env.DATABASE_NAME}`);
            await db.query(createTableQuery);
            if(process.env.NODE_ENV == "development"){
                console.log(`${this.#table} created`);
            }
        }catch(e){
            throw e;
        }
    }

    async save(data){
        try{


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

        const results =await db.query(query);

        if(!results) return null;

        const createdUser = await db.query(`select * from ${this.#table} where id=${results.insertId}`);

        return createdUser;
        }catch(e){
            throw e;
        }

        
    }


    async update(data){
        try{

        const id = data.id;

        if(!id) throw new Error("no id in request body");

        let query = "UPDATE %%TABLE_NAME%% SET %%COLUMNS%%  WHERE id=%%U_ID%%";

        //add table name
        query = query.replace("%%TABLE_NAME%%" , this.#table);
        query = query.replace("%%U_ID%%" , id);


        const dataArray = [];
        for(const [columnName] of Object.entries(this)){

            if(columnName == "id") continue;

            const value = data?.[columnName];

            if(!value) continue;

            if(typeof value == "string"){
                dataArray.push(`${columnName}="${value}"`);
            }else{
                dataArray.push(`${columnName}= ${value}`);
            }
        }

        query = query.replace("%%COLUMNS%%" , dataArray.join(","));
        console.log(query);
        data =await db.query(query);

        if(data){
            data = await this.getById(id);
        }
        return data;
        }catch(e){
            throw e;
        }



    }
    
    //get using id
    async getById(id){
        try{

        const query = `SELECT * FROM ${this.#table} WHERE id=${id}`;
        const customer =await db.query(query);
        return customer;

        }catch(e){
            throw e;
        }

    }


    //delete using id
    async deleteById(id){
        try{

        const results =await db.query(`DELETE FROM ${this.#table} WHERE id=${id}`);
        console.log({deletedLog : results});
        return results;

        }catch(e){
            throw e;
        }

    }

    //get data from database
    async get(data){
        try{

        let query = `select * from  ${this.#table}`;

        if(data) query += " where ";

        if(data){
            let filters = [];
    
            for(const [column , value] of Object.entries(data)){
                if(typeof value == "string"){
                    filters.push(`${column}="${value}"`);
                    
                }else{
                    filters.push(`${column}=${value}`);
                }
            }
            query += filters.join(" AND ");
        }

        const results = await db.query(query);        
        return results;

        }catch(e){
            throw e;
        }

    }


    drop(){
        try{

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

        }catch(e){
            throw e;
        }

        
    }




}


module.exports = Model;