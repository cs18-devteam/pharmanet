const db = require("../../db");

class PharmacyModel {
    // Create table if it doesn't exist
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS pharmacies (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                licenseNumber VARCHAR(100) UNIQUE,
                email VARCHAR UNIQUE(100),
                contactNumber1 TEXT UNIQUE(10),
                contactNumber2 TEXT UNIQUE(10),
                password VARCHAR(255),
                location VARCHAR(255),
                googleLink TEXT,
                latitude VARCHAR(50),
                longitude VARCHAR(50)
            )
        `;
        db.query(sql, (err) => {
            if (err) throw err;
            console.log("Pharmacy table ensured.");
        });
    }

    // Insert new pharmacy
    save(data) {
        const {
            name, licenseNumber, email, contactNumber1, contactNumber2,
            password, location, googleLink, latitude, longitude
        } = data;

        const sql = `
            INSERT INTO pharmacies (
                name, licenseNumber, email, contactNumber1, contactNumber2,
                password, location, googleLink, latitude, longitude
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [
                name, licenseNumber, email, contactNumber1, contactNumber2,
                password, location, googleLink, latitude, longitude
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Get all pharmacies
    getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM pharmacies", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Update a pharmacy
    update(id, data) {
        const {
            name, licenseNumber, email, contactNumber1, contactNumber2,
            password, location, googleLink, latitude, longitude
        } = data;

        const sql = `
            UPDATE pharmacies SET
                name = ?, licenseNumber = ?, email = ?, contactNumber1 = ?, contactNumber2 = ?,
                password = ?, location = ?, googleLink = ?, latitude = ?, longitude = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [
                name, licenseNumber, email, contactNumber1, contactNumber2,
                password, location, googleLink, latitude, longitude, id
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Delete a pharmacy
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM pharmacies WHERE id = ?", [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = PharmacyModel;
