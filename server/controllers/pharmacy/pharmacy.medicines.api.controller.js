const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const { getRequestData } = require("../../common/getRequestData");
const { apiCatchAsync } = require("../../common/catchAsync");
const PharmacyOrdersItems = require("../../models/PharmacyOrderItemsModel");
const Pharmacies = require("../../models/PharmacyModel");



exports.getAllMedicines = async (req, res) => {
    try {
        let data = [];
        data = await PharmacyMedicines.get();

        // Check if data is empty
        if (!data || data.length === 0) {
            // return 404 if no medicines
            return responseJson(res, 404, { error: "No medicines found" });
        }

        // Return 200 if medicines exist
        return responseJson(res, 200, data);

    } catch (e) {
        console.log(e);
        return response(res, view('404'), 500); // Internal Server Error for exceptions
    }
};

exports.getMedicinesById = async (req, res) => {
    try{
        let data = await PharmacyMedicines.getByVarId('pharmacyId',req.pharmacyId);
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
        data = data.map(async (m) => {
        const [medicine] = await Medicines.getById(m.medicineId);
        if (!medicine) return null;
    
    return { ...m, ...medicine, ...pharmacy, medicineId: medicine.id };
  });
  

  data = (await Promise.all(data)).filter(Boolean);
  return responseJson(res, 200, {
    status: "success",
    results: data,
    count: data.length,
  });
    }catch(e){
        console.log(e);
        return response(res, view('404'), 500);
    }
};


exports.getMedicineDetailsByStockId = async (req, res) => {

    try {
        const id = req.stockId;
        if (!id) return responseJson(res, 400, {
            status: "error",
            error: "no medicine found",
            id: id,

        })
        const [stock] = await PharmacyMedicines.getById(id);
        if (!stock) {
            return responseJson(res, 404, {
                status: "error",
                error: "medicine not found in stock",
            })
        }

        const [medicine] = await Medicines.getById(stock.medicineId);
        if (!medicine) {
            return responseJson(res, 404, {
                status: "error",
                error: "stock found but medicine not found in database",
            })
        }


        return responseJson(res, 200, {
            status: "success",
            results: {
                ...medicine,
                stock,
            }
        })


    } catch (e) {
        console.log(e);
        return responseJson(res, 400, {
            status: "error",
            error: e,
        })

    }
}

exports.searchMedicinesByName = async (req, res) => {
    try {
        const searchName = req.params.get('search');
        const limit = req.params.get('limit');
        const pharmacyId = req.pharmacyId;



        const medicines = await Medicines.query(`select * from this.table ${searchName ? `where geneticName like '%${searchName}%' ` : ''} limit ${limit || 100}`);


        const stockMedicines = medicines.map(async med => {
            try {

                const stock = await PharmacyMedicines.get({
                    medicineId: med.id,
                    pharmacyId: pharmacyId,
                })


                return { ...med, stock: stock[0] || {} };
            } catch (e) {
                console.log(e);
                return med;
            }
        })

        return Promise.all(stockMedicines).then((data) => {



            return responseJson(res, 200, {
                status: "success",
                count: data.length,
                results: data,
            });
        });

    } catch (e) {
        console.log(e);
        return responseJson(res, 500, {
            status: "error",
            message: e.message,
            error: e,
        })
    }
}



exports.getMedicineStockInfo = async (req, res) => {
    try {
        const [{ 'count(medicineId)': count }] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId}`)
        const [{ 'count(medicineId)': sufficient }] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId} and publicStock >= 10`);
        const [{ 'count(medicineId)': low }] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId} and publicStock < 10`)
        const [{ 'count(medicineId)': out }] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId} and publicStock < 1`);


        return responseJson(res, 200, {
            status: "success",
            results: {
                count,
                sufficient,
                low,
                out,
            }
        });

    } catch (e) {
        return responseJson(res, 500, {
            status: "error",
            message: e.message,
            error: e,
        })
    }
}


exports.createMedicineStock = async (req, res) => {
    try {

        const medicine = JSON.parse(await getRequestData(req));

        const [newStock] = await PharmacyMedicines.save({
            medicineId: medicine.medicineId,
            pharmacyId: medicine.pharmacyId,
            price: medicine.price,
            stock: medicine.stock,
            publicStock: medicine.publicStock
        });


        return responseJson(res, 201, {
            status: "success",
            stock: newStock,
        })



    } catch (e) {
        console.log(e);
        return responseJson(res, 400, {
            status: "error",
            error: e,
        });

    }
}
exports.updateMedicineStock = async (req, res) => {
    try {
        const medicine = JSON.parse(await getRequestData(req));

        const [updated] = await PharmacyMedicines.update({
            id: medicine.stockId,
            medicineId: medicine.medicineId,
            pharmacyId: medicine.pharmacyId,
            price: medicine.price,
            stock: medicine.stock,
            publicStock: medicine.publicStock
        });


        return responseJson(res, 201, {
            status: "success",
            stock: updated,
        })



    } catch (e) {
        console.log(e);
        return responseJson(res, 400, {
            status: "error",
            error: e,
        });

    }
}
exports.deleteMedicineStock = async (req, res) => {
    try {
        const stockId = req.stockId;
        const pharmacyId = req.pharmacyId;

        const deleted = await PharmacyMedicines.deleteById(stockId);

        return responseJson(res, 204, {
            status: "success",
            stock: 'item deleted successfully',
        })



    } catch (e) {
        console.log(e);
        return responseJson(res, 400, {
            status: "error",
            error: e,
        });

    }
}



exports.getMedicineStatics = apiCatchAsync(async (req, res) => {
    let globalStat = await PharmacyOrdersItems.query(`SELECT itemId AS medicineId,SUM(quantity) AS quantity FROM this.table WHERE itemType = 'medicine' GROUP BY itemId Limit 10`);

    globalStat = await Promise.all(globalStat.map(async stat=>{
        const name  = (await Medicines.getById(stat.medicineId))?.[0]?.geneticName
        const [available] = await PharmacyMedicines.get({
            medicineId : stat.medicineId,
            pharmacyId : req.pharmacyId,
        })

        return {
            ... stat , 
            name,
            available : (available) ? true : false,
        };
    }))



    // const localStat = await PharmacyOrdersItems.query(`SELECT itemId AS medicineId, SUM(quantity) AS quantity FROM this.table WHERE itemType = 'medicine' AND pharmacyId = ${req.pharmacyId} GROUP BY itemId limit 10`);


    return responseJson(res, 200, {
        status: "success",
        results: {
            global: globalStat,
        }
    })
})