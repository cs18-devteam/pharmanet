// ************************************
// MOCK MODELS BEFORE IMPORTING ANYTHING
// ************************************


jest.mock("../../../../models/MedicineModel", () => ({
  getById: jest.fn(),
  query: jest.fn(),
}));



jest.mock("../../../../models/PharmacyMedicinesModel", () => ({
  get: jest.fn(),
  getById: jest.fn(),
  query: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  deleteById: jest.fn(),
}));



// Mock response helpers
jest.mock("../../../../common/response", () => ({
  response: jest.fn(),
  responseJson: jest.fn((res, status, body) => {
    res.statusCode = status;
    res.body = body;
    return res;
  }),
}));

jest.mock("../../../../common/getRequestData", () => jest.fn());

jest.mock("../../../../common/view", () => jest.fn());


// Disable console logs
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});



// Import controller AFTER mocks
const Controller = require("../../../../controllers/pharmacy/pharmacy.medicines.api.controller");
const Medicines = require("../../../../models/MedicineModel");
const PharmacyMedicines = require("../../../../models/PharmacyMedicinesModel");
const getRequestData = require("../../../../common/getRequestData");
const { responseJson } = require ("../../../../common/response");

// Create a fake response object 
function mockRes() {
  return {
    statusCode: null,
    headers: {},
    body: null,
    writeHead(status, headers) {
      this.statusCode = status;
      this.headers = headers;
    },
    end(json) {
      this.body = JSON.parse(json);
    }
  };
}


// -----------------------
// TEST getAllMedicines()
// -----------------------
describe("getAllMedicines", () => {



  test("should return all medicines", async () => {
    const req = {};
    const res = mockRes();

    PharmacyMedicines.get.mockResolvedValue([
      { id: 1, name: "Panadol" },
    ]);

    await Controller.getAllMedicines(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: "Panadol" }
    ]);
  });



  test("Should return 404 on error" , async () => {
    const req = {};
    const res = mockRes();
    

    PharmacyMedicines.get.mockResolvedValue([]);

    await Controller.getAllMedicines(req, res);

    expect(res.statusCode).toBe(404);
  });


  
});



// ---------------------------------------
// TEST getMedicineDetailsByStockId()
// ---------------------------------------
describe("getMedicineDetailsByStockId", () => {



  test("Should return 400 if stockId is missing", async () => {
    const req = {};   //no stock id
    const res = mockRes();

    await Controller.getMedicineDetailsByStockId(req ,res);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("no medicine found");
  })



  test("should return medicine details for valid stock id", async () => {
    const req = { stockId: 5 };
    const res = mockRes();

    PharmacyMedicines.getById.mockResolvedValue([
      { stockId: 5, medicineId: 1 }
    ]);

    Medicines.getById.mockResolvedValue([
      { id: 1, name: "Amoxicillin" }
    ]);

    await Controller.getMedicineDetailsByStockId(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.results.stock.stockId).toBe(5);
  });



  test("should return error when stock not found", async () => {
    const req = { stockId: 5 };
    const res = mockRes();

    PharmacyMedicines.getById.mockResolvedValue([]);

    await Controller.getMedicineDetailsByStockId(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("medicine not found in stock");
  });


  test("should return error when stock found but medicine not found in database", async () => {
    const req = {stockId: 1};
    const res = mockRes();

    PharmacyMedicines.getById.mockResolvedValue([
      { stockId: 1, medicineId: 999 }
    ]);
    
    Medicines.getById.mockResolvedValue([]);

    await Controller.getMedicineDetailsByStockId(req,res);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("stock found but medicine not found in database");
  });

});


// ---------------------------------------
// TEST searchMedicinesByName()
// ---------------------------------------

describe("search searchMedicinesByName" , () => {


  test("Should retrn medicine list with stack data(with search terms)", async() => {
    const req = { 
      params: new Map ([["search", "pan"], ["limit", "50"]]),
      pharmacyId: 10,
    };

    const res = mockRes();

    Medicines.query.mockResolvedValue([
      {id:1, geneticName: "Panadol"}
    ]);

    PharmacyMedicines.get.mockResolvedValue([
      {stockId: 5, medicineId: 1, pharmacyId: 10, stock:40}
    ]);

    await Controller.searchMedicinesByName(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.count).toBe(1);
    expect(res.body.results[0].stock.stockId).toBe(5);

    expect(Medicines.query).toHaveBeenCalledWith(
      expect.stringContaining("geneticName like '%pan%'")
    );
  });


  test("should return medicine list without filtering when search is empty", async () => {
    const req = {
      params: new Map(), 
      pharmacyId: 10,
    };
    const res = mockRes();

    Medicines.query.mockResolvedValue([
      { id: 2, geneticName: "Amoxicillin" }
    ]);

    PharmacyMedicines.get.mockResolvedValue([]);

    await Controller.searchMedicinesByName(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.results[0].stock).toEqual({});
    expect(Medicines.query).toHaveBeenCalledWith(
      expect.stringContaining("limit 100")
    );
  });



  test("should return stock as empty object when stock not found", async () => {
    const req = {
      params: new Map([["search", "amo"]]),
      pharmacyId: 10,
    };
    const res = mockRes();

    Medicines.query.mockResolvedValue([
      { id: 3, geneticName: "Amoxicillin" }
    ]);

    PharmacyMedicines.get.mockResolvedValue([]); // no stock

    await Controller.searchMedicinesByName(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.results[0].stock).toEqual({});
  });



  test("should handle PharmacyMedicines.get errors and still return medicine", async () => {
    const req = {
      params: new Map([["search", "para"]]),
      pharmacyId: 10,
    };
    const res = mockRes();

    Medicines.query.mockResolvedValue([
      { id: 4, geneticName: "Paracetamol" }
    ]);

    PharmacyMedicines.get.mockRejectedValue(new Error("DB error"));

    await Controller.searchMedicinesByName(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.results[0].geneticName).toBe("Paracetamol");
    expect(res.body.results[0].stock).toBeUndefined(); // returns med only
  });



  test("should return 500 on fatal error", async () => {
    const req = {
      params: new Map(),
      pharmacyId: 10,
    };
    const res = mockRes();

    Medicines.query.mockRejectedValue(new Error("Fatal error"));

    await Controller.searchMedicinesByName(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe("error");
  });
});


// ---------------------
// TEST getMedicineStockInfo()
// ---------------------


describe("getMedicineStockInfo", () => {
  

  test("Should return correct stock count", async () => {
    const req ={pharmacyId: 3};
    const res = mockRes();

    //mock sql query results
    PharmacyMedicines.query
      .mockResolvedValueOnce([{"count(medicineId)": 50 }]) //total count
      .mockResolvedValueOnce([{"count(medicineId)": 30 }]) //sufficient
      .mockResolvedValueOnce([{"count(medicineId)": 15 }]) //low
      .mockResolvedValueOnce([{"count(medicineId)": 5 }])  //out 

      await Controller.getMedicineStockInfo(req,res);

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("success");

      expect(res.body.results.count).toBe(50);
      expect(res.body.results.sufficient).toBe(30);
      expect(res.body.results.low).toBe(15);
      expect(res.body.results.out).toBe(5);
  });


  test("Should return 500 on database error", async() => {
    const req= {pharmacyId: 3};
    const res = mockRes();

    PharmacyMedicines.query.mockRejectedValue(new Error ("DB Failed"));

    await Controller.getMedicineStockInfo(req,res);

    expect(res.statusCode).toBe(500);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("DB Failed");
  });
});


// ---------------------
// TEST createMedicineStock()
// ---------------------
describe("createMedicineStock" , () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("Should create a new stock successfully", async () =>{
    const req = {};
    const res = mockRes();


    const fakeBody = JSON.stringify({
      medicineId: 2,
      pharmacyId:1,
      price : 200,
      stock: 50,
      publickStock:20,
    });

    getRequestData.mockResolvedValue(fakeBody);

    PharmacyMedicines.save.mockResolvedValue([
      {
        stockId:100,
        medicineId: 2,
        pharmacyId:1,
        price : 200,
        stock: 50,
        publickStock:20,
      },
    ]);

      responseJson.mockImplementation((res, status, obj) => {
        res.writeHead(status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      });

      await Controller.createMedicineStock(req, res);

      expect(getRequestData).toHaveBeenCalled();
      expect(PharmacyMedicines.save).toHaveBeenCalled();

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.stock.stockId).toBe(100);
  });



   test("should return 400 when JSON parse or getRequestData fails", async () => {
    const req = {};
    const res = mockRes();

    getRequestData.mockRejectedValue(new Error("Invalid JSON"));

    responseJson.mockImplementation((res, status, obj) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(obj));
    });

    await Controller.createMedicineStock(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
  });



  test("should return 400 if PharmacyMedicines.save throws error", async () => {
    const req = {};
    const res = mockRes();

    const fakeBody = JSON.stringify({
      medicineId: 2,
      pharmacyId: 1,
      price: 200,
      stock: 50,
      publicStock: 20,
    });

    getRequestData.mockResolvedValue(fakeBody);

    PharmacyMedicines.save.mockRejectedValue(new Error("DB Insert Error"));

    responseJson.mockImplementation((res, status, obj) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(obj));
    });

    await Controller.createMedicineStock(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.error).toBeDefined();
  });


});


// -----------------------
// TEST updateMedicineStock()
// -----------------------
describe("updateMedicineStock", () => {



  test("should update stock", async () => {
    const req = {
      body: JSON.stringify({
        stockId: 1,
        medicineId: 1,
        pharmacyId: 2,
        price: 150,
        stock: 40,
        publicStock: 20,
      }),
      on: (event, cb) => {
        if (event === "data") cb(req.body);
        if (event === "end") cb();
      },
    };
    const res = mockRes();

    PharmacyMedicines.update.mockResolvedValue([
      { id: 1, price: 150 }
    ]);

    const getRequestData = require("../../../../common/getRequestData");
    getRequestData.mockResolvedValue(req.body);

    await Controller.updateMedicineStock(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
  });



});

// -----------------------
// TEST deleteMedicineStock()
// -----------------------
describe("deleteMedicineStock", () => {



  test("should delete stock", async () => {
    const req = { stockId: 1, pharmacyId: 2 };
    const res = mockRes();

    PharmacyMedicines.deleteById.mockResolvedValue({});

    await Controller.deleteMedicineStock(req, res);

    expect(res.statusCode).toBe(204);
    expect(res.body.status).toBe("success");
  });



});
