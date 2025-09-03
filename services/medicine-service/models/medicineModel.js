const Database = require("../../../database/Database"); // import class
const db = Database.getInstance();
class MedicineModel {
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS medicines (
                id INT AUTO_INCREMENT PRIMARY KEY,
                registrationNumber VARCHAR(100),
                schedule VARCHAR(50),
                serialNumber VARCHAR(100),
                countryCode VARCHAR(10),
                genericName VARCHAR(255),
                dosageCode VARCHAR(100),
                packType VARCHAR(100),
                agentCode VARCHAR(100),
                manuType VARCHAR(100)
            )
        `;
        return new Promise((resolve,reject) => {
        db.query(sql, (err) => {
            if (err) return reject (err);
            console.log("Medicine table ensured.");
        });
    });
    }

    save(data) {
        const {
            registrationNumber,
            schedule,
            serialNumber,
            countryCode,
            genericName,
            dosageCode,
            packType,
            agentCode,
            manuType
        } = data;

        const sql = `
            INSERT INTO medicines (
                registrationNumber, schedule, serialNumber, countryCode,
                genericName, dosageCode, packType, agentCode, manuType
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [
                registrationNumber, schedule, serialNumber, countryCode,
                genericName, dosageCode, packType, agentCode, manuType
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

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
            registrationNumber,
            schedule,
            serialNumber,
            countryCode,
            genericName,
            dosageCode,
            packType,
            agentCode,
            manuType
        } = data;

        const sql = `
            UPDATE medicines SET
                registrationNumber = ?, schedule = ?, serialNumber = ?,
                countryCode = ?, genericName = ?, dosageCode = ?,
                packType = ?, agentCode = ?, manuType = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [
                registrationNumber, schedule, serialNumber,
                countryCode, genericName, dosageCode,
                packType, agentCode, manuType, id
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

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
