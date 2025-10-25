// id INT AUTO_INCREMENT PRIMARY KEY,
// name VARCHAR(100),
// category_id VARCHAR(50),
// type_id VARCHAR(100),
// price CHAR(10),
// stock INT(255),
// manufacturer VARCHAR(100),
// expiry_date VARCHAR(100),
// batch_number VARCHAR(100),
// description VARCHAR(100)

    //create table
    async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS medicines (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                category_id VARCHAR(50),
                type_id VARCHAR(100),
                price CHAR(10),
                stock INT(255),
                manufacturer VARCHAR(100),
                expiry_date VARCHAR(100),
                batch_number VARCHAR(100),
                description VARCHAR(100)
            )
        `;
        const medicines = await new Promise((resolve, reject) => {
    db.query("SELECT * FROM medicines", (err, results) => {
        if (err) return reject(err);
        resolve(results);
    });
});

console.log(medicines); // this will log all rows

    }

    //save data
    async save(data) {
        const {
            name,
            categoryId,
            typeId,
            price,
            stock,
            manufacturer,
            expiryDate,
            batchNumber,
            description
        } = data;

        const sql = `
            INSERT INTO medicines (
                name, categoryId, typeId, price,
                stock, manufacturer, expiryDate, batchNumber, description
            ) VALUES (${name}, ${categoryId},${typeId}, ${price}, ${stock}, ${manufacturer}, ${expiryDate}, ${batchNumber}, ${description})
        `;

        this.categoryId = {
            type: "INT",
            null:false
        }


        return await db.query(sql);
    
    }


        this.price = {
            type :"INT",
            null:false
        }

        this.stock ={
            type: "INT"
        }

        this.manufacturer= {
            type: "VARCHAR(100)",
            null:false
        }

        this.expiryDate = {
            type: "DATE",
            null:false
        }

        this.batchNumber = {
            type: "VARCHAR(100)",
            null:false
        }

        this.description = {
            type: "VARCHAR(200)"
        }
    }
}

const Medicines = new MedicineModel();
module.exports = Medicines;