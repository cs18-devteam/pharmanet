const MedicineModel = require("../models/medicineModel");

const medicineInstance = new MedicineModel();

//=================================
//Get All Medicine

exports.getAllMedicines = async (req, res) => {
    try{
        //fetch all medicine from db
        const allMedicines= await medicineInstance.getAll(); 

        // return them as json --> tells the client/browser that the data being returned is in JSON format.
        res.writeHead(200,{"Content-Type" : "application/json"})

        res.write(JSON.stringify(allMedicines));  
        //res.write -> only accepts string and buffer 
        // (sends that string to the client.)
        // JSON.stringify() → turns JS object/array → JSON string.

        res.end();
    }
    catch (err) {
        //Haddle error
        console.error(err);
        res.status(500,{"content-type" : "application/json"});
        res.write(JSON.stringify({ error: "Failed to fetch medicine" }));
        res.end();
    }
};



//=======================================
//CREATE MEDICINE


exports.createMedicines = async (req, res) => {
    
        //it will store incomming request body data in chunk
        let body = "";

        //collect incomming request body data in chunk
        req.on("data", (chunk) => {

            //apprnd each chunk to data string
            body += chunk;
        });
        
        //when all data has been received
        req.on("end" , async() => {
            try{
                //it is used because when a form submits with multipart/form-data, 
                // the raw body is not JSON — you need to decode it into a 
                // usable object.
                //const formData = decodeMultipartFormData(req, data);

                const data = new URLSearchParams(body);

                const medicine = {
                    name: data.get("name"),
                    category_id: data.get("categoryId"),
                    type_id: data.get("typeId"),
                    price: data.get("price"),
                    stock: data.get("stock"),
                    manufacturer: data.get("manufacturer"),
                    expiry_date: data.get("e-expiry_date"),
                    batch_number: data.get("batch_number"),
                    description: data.get("description")
                };

                const result = await medicineInstance.save(medicine); 
                
                res.writeHead(201, {"content-Type" : "application/json"});
                res.write(JSON.stringify({message: "medicine added", id: result.insertId }));
                res.end();

            } catch (err) {
                console.error(err); 
                res.write(JSON.stringify({error: "Failed to create medicine"}));
                res.end();
            }
        });
    };

//===============================
//update data

exports.updateMedicines = async (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    

        req.on("end", async () => {
                try {
                    //const formData = decodeMultipartFormData(req, data);
                    const data = new URLSearchParams(body);
                    const id = req.url.split("/")[2];

                    const medicine = {
                        name: data.get("name"),
                        categoryId: data.get("categoryId"),
                        typeId: data.get("typeId"),
                        price: data.get("price"),
                        stock: data.get("stock"),
                        manufacturer: data.get("manufacturer"),
                        expiryDate: data.get("e-expiry_date"),
                        batchNumber: data.get("batch_number"),
                        description: data.get("description")
                };


                    const result = await medicineInstance.update(id, medicine);

                    if (result.affectedRows === 0) {
                        res.writeHead(404, { "Content-Type": "application/json" });
                        res.write(JSON.stringify({ message: "Medicine not found" }));
                        res.end();
                        return;
                    }

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ message: "Medicine updated", affected: result.affectedRows }));
                    res.end();
                }
                 catch (err) {
                    console.error(err);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ error: "Failed to update medicine" }));
                    res.end();
                }
            });
        };


// =============================
// DELETE Medicine 

exports.deleteMedicines = async (req, res) => {
   
        try {

            //const formData = decodeMultipartFormData(req, data);
            const id = req.url.split("/")[2]

            const result = await medicineInstance.delete(id);

            // If no rows were deleted → medicine not found
            if (result.affectedRows === 0) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ message: "Medicine not found" }));
                res.end();
                return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Medicine deleted", affected: result.affectedRows }));
            res.end();
        } catch (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ error: "Failed to delete medicine" }));
            res.end();
        }

};