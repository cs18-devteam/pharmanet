const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Medicines = require("../../models/MedicineModel");
const db = Database.getInstance();
const { hashPassword } = require("../../common/encrypt");
const { catchAsync } = require("../../common/catchAsync");
const ActivityLogService = require("../../../services/activityLogService/activityLogService");
const fs = require("fs");
const path = require("path");
const readExcel = require("../../../services/excelRead-service/excelReader");



exports.renderAdminMedicinesView = async (req, res) => {
  const [admin] = await Medicines.getById(req.adminId);

  return response(
    res,
    view("admin/medicines", {
      sidebar: view("admin/component.sidebar", admin),
      header: view("component.header", {
        name: "Medicines || Pharmanet - Manage all medicines here",
      }),
    }),
    200,
  );
};

exports.addMedicine = async (req, res) => {
  try {
    const data = JSON.parse(await getRequestData(req));
    console.log(data);
    console.log("Received data:", data);
    await db.query(`USE ${process.env.DATABASE_NAME}`); // Select the database
    const newMedicine = await Medicines.save({...data , geneticName : data.name});
    console.log("Saved medicine:", newMedicine);

    await ActivityLogService.logActivity(
      req.adminId, // WHO did it (the admin's ID)
      "CREATE", // WHAT action (CREATE, UPDATE, DELETE)
      "medicine", // CATEGORY
      "Added new medicine", // DESCRIPTION
      data.name, // ENTITY NAME (the medicine name)
      newMedicine.insertId, // ENTITY ID (the new medicine's ID)
    );

    return responseJson(res, 201, newMedicine); // Changed to 201 for success
  } catch (e) {
    console.error("Error adding medicine:", e);
    return responseJson(res, 400, {
      error: e.message || "Failed to add medicine",
    });
  }
};

exports.getMedicines = async (req, res) => {
  try {
    await db.query(`USE ${process.env.DATABASE_NAME}`); // Select the database
    const medicines = await Medicines.get();
    return responseJson(res, 200, medicines);
  } catch (e) {
    console.log(e);
    return responseJson(res, 400, { error: "Failed to fetch medicines" });
  }
};

exports.deleteMedicine = catchAsync(async (req, res) => {
  const medicineId = req.medicineId;
  const adminId = req.adminId;

  console.log(medicineId);
  if (!medicineId || isNaN(medicineId)) {
    return response(res, "Invalid Medicine ID", 400);
  }

  let medicineName = `${medicineId}`;
  try {
    const [medicine] = await Medicines.getById(medicineId);
    if (medicine) {
      medicineName =
        medicine.name || medicine.title || medicine.slug || `${medicineId}`;
    }
  } catch (e) {
    console.log("Failed to fetch medicine before delete:", e);
  }

  const deleted = await Medicines.deleteById(medicineId);

  if (adminId) {
    try {
      await ActivityLogService.logActivity(
        adminId, // WHO did it (the admin's ID)
        "DELETE", // WHAT action (CREATE, UPDATE, DELETE)
        "medicine", // CATEGORY
        "Deleted medicine", // DESCRIPTION
        medicineName, // ENTITY NAME (the medicine name)
        medicineId, // ENTITY ID (the deleted medicine's ID)
      );
    } catch (e) {
      console.log("Failed to log delete activity :", e);
    }
  }
  return responseJson(res, 200, deleted);
});

exports.sendJsonMedicinesList = async (req, res) => {
  try {
    const allMedicines = await Medicines.get();
    return response(res, JSON.stringify(allMedicines), 200);
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};


exports.uploadMedicine = async (req, res) => {
  let body = Buffer.alloc(0);
  
  // Wrap the req.on callbacks in a Promise
  const processUpload = new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      body = Buffer.concat([body, chunk]);
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });

  try {
    // Wait for the upload to complete
    body = await processUpload;


    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("boundary=")) {
      res.writeHead(400);
      return res.end("Invalid Content-Type header");
    }

    const boundary = contentType.split("boundary=")[1];
    const bodyString = body.toString("binary");
    const boundaryString = `--${boundary}`;

    let filename = null;
    let fileStartPos = -1;
    let fileEndPos = -1;

    const parts = bodyString.split(boundaryString);

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].includes("filename=")) {
        const filenameMatch = parts[i].match(/filename="([^"]+)"/);
        filename = filenameMatch ? filenameMatch[1] : "upload.xlsx";

        const headerEndPos = parts[i].indexOf("\r\n\r\n");
        if (headerEndPos === -1) continue;

        let currentPos = 0;
        for (let j = 0; j <= i; j++) {
          if (j > 0) currentPos += boundaryString.length;
          if (j === i) {
            fileStartPos = currentPos + headerEndPos + 4;
            break;
          }
          currentPos += parts[j].length;
        }

        if (i + 1 < parts.length) {
          fileEndPos = currentPos + parts[i].length - 2;
        }
        break;
      }
    }

    if (fileStartPos === -1 || fileEndPos === -1 || !filename) {
      res.writeHead(400);
      return res.end("No file uploaded or invalid format");
    }

    const fileData = body.slice(fileStartPos, fileEndPos);
    const uploadsDir = path.join(__dirname, "../../storage/medicineUploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, fileData);

    // Read Excel and insert medicines
    const rows = readExcel(filePath);
    console.log(rows);
    await db.query(`USE ${process.env.DATABASE_NAME}`);

    let insertedCount = 0;
    let skippedCount = 0;

    // Process each row from Excel
    for (const row of rows) {
      try {
        // Skip empty rows
        if (!row['Product Name']) {
          // console.log('Skipping empty row');
          continue;
        }

        const medicineName = row['Product Name'];


        // Check if medicine already exists
        const existing = await Medicines.get({
          geneticName : medicineName
        });

        // console.log(`Checking medicine: ${medicineName}, exists:`, existing ? existing.length : 0);

        if (!existing || existing.length === 0) {
          // Insert new medicine
          const medicineData = {
            geneticName: medicineName,
            description: row.description || row.Description || '',
            expiryDate: row['Expiry Date'],
            schedule: row['Schedule '],
            brandName: row['Brand Name'],
            manufacturer: row.manufacturer || row.Manufacturer || '',
            // Add other fields based on your Excel columns and database schema
          };
          console.log('Inserting medicine:', medicineData);
          await Medicines.save(medicineData);
          insertedCount++;
        } else {
          console.log(`Medicine ${medicineName} already exists, skipping`);
          skippedCount++;
        }
      } catch (err) {
        console.error('Error processing row:', err);
        console.error('Row data:', row);
        skippedCount++;
      }
    }

    // Log activity
    if (req.adminId) {
      await ActivityLogService.logActivity(
        req.adminId,
        "CREATE",
        "medicine",
        "Bulk uploaded medicines from Excel",
        filename,
        null
      );
    }

    res.writeHead(200);
    res.end(
      `Upload complete. Inserted: ${insertedCount}, Skipped (duplicates): ${skippedCount}`
    );

    // Delete temp file
    fs.unlinkSync(filePath);

  } catch (err) {
    console.error("Upload error:", err);
    res.writeHead(500);
    res.end("Upload error: " + err.message);
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    console.log("Hi");
  }catch (e) {
    return responseJson(res, 400, {
      error: e.message || "update failed"
    });
  }
}