const fs = require("node:fs");

module.exports = class CSV{
    constructor(filePath){
        this.adapter = new CSV_Adapter(filePath);
    }

    get(column){
        if(this.adapter) return this.adapter.getByColumnName(column);
    }
}


class CSV_Adapter{
    csvData = undefined;

    constructor(filePath){
        this.filePath = filePath;
        this.content = fs.readFileSync(filePath ,{ encoding: 'utf-8'});
        this.#textToArray();
    }
    
    #textToArray(){
        if(!this.csvData){
            this.data = this.content.split('\n').map(row=>row.split(','));
            const headers = this.data.splice(0 , 1).flat();
            this.csvData = {};
            headers.forEach((columnName , columnIndex) => {
                this.csvData[columnName] = this.data.map((row)=>row[columnIndex]);
            });
        }

        return this.csvData;        
    }


    getByColumnName(name){
        if(name==undefined) return this.csvData;

        return this.csvData[name];
    }
}