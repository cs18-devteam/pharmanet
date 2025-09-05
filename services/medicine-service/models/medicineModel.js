const Database = require("../../../database/Database"); // import class
const db = Database.getInstance();
class MedicineModel {

    //create table
    createTable() {
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
        return new Promise((resolve,reject) => {
        db.query(sql, (err) => {
            if (err) return reject (err);
            console.log("Medicine table ensured.");
        });
    });
    }

    //save data
    save(data) {
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;


        return new Promise((resolve, reject) => {
            db.query(sql, [
                name, categoryId, typeId, price,
                stock, manufacturer, expiryDate, batchNumber, description
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }


    //get all data
    getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM medicines", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    update(id, data) {
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
            UPDATE medicines SET
                name = ?, categoryId = ?, typeId = ?, price = ?,
                stock = ?, manufacturer = ?, expiryDate = ?, batchNumber = ?, description = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [
                name, categoryId, typeId, price,
                stock, manufacturer, expiryDate, batchNumber, description, id
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }


    //delete all data
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM medicines WHERE id = ?", [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = MedicineModel;
