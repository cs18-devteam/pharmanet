// D:\pharmanet\pharmanet\server\test\units\controllers\pharmacy\medicine.controller.test.js

const MedicineController = require("../../../../controllers/pharmacy/pharmacy.medicines.api.controller");
const Medicines = require("../../../../models/MedicineModel");
const PharmacyMedicines = require("../../../../models/PharmacyMedicinesModel");
const { getRequestData } = require("../../../../common/getRequestData");
const view = require("../../../../common/view");
const { response, responseJson } = require("../../../../common/response");


jest.mock("../../../../models/MedicineModel");
jest.mock("../../../../models/PharmacyMedicinesModel");
jest.mock("../../../../common/getRequestData");
jest.mock("../../../../common/view");
jest.mock("../../../../common/response");

describe("Medicine Controller Unit Tests", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("getAllMedicines", () => {
    it("should return all medicines", async () => {
      const medicines = [{ id: 1, name: "Paracetamol" }];
      PharmacyMedicines.get.mockResolvedValue(medicines);
      responseJson.mockImplementation((res, status, data) => res.json({ status, data }));

      await MedicineController.getAllMedicines(req, res);

      expect(PharmacyMedicines.get).toHaveBeenCalled();
      expect(responseJson).toHaveBeenCalledWith(res, 200, medicines);
    });
  });

  describe("getMedicineDetailsByStockId", () => {
    it("should return 400 if no stockId", async () => {
      req.stockId = null;
      responseJson.mockImplementation((res, status, obj) => res.json({ status, obj }));

      await MedicineController.getMedicineDetailsByStockId(req, res);

      expect(responseJson).toHaveBeenCalledWith(res, 400, {
        status: "error",
        error: "no medicine found",
        id: null,
      });
    });

    it("should return medicine and stock details if found", async () => {
      req.stockId = 1;
      const stock = { id: 1, medicineId: 1 };
      const medicine = { id: 1, name: "Paracetamol" };
      PharmacyMedicines.getById.mockResolvedValue([stock]);
      Medicines.getById.mockResolvedValue([medicine]);
      responseJson.mockImplementation((res, status, obj) => res.json({ status, obj }));

      await MedicineController.getMedicineDetailsByStockId(req, res);

      expect(responseJson).toHaveBeenCalledWith(res, 200, {
        status: "success",
        results: { ...medicine, stock },
      });
    });
  });

  describe("createMedicineStock", () => {
    it("should create new medicine stock", async () => {
      const stockData = {
        medicineId: 1,
        pharmacyId: 1,
        price: 100,
        stock: 50,
        publicStock: 30,
      };
      req.body = JSON.stringify(stockData);
      getRequestData.mockResolvedValue(JSON.stringify(stockData));
      PharmacyMedicines.save.mockResolvedValue([stockData]);
      responseJson.mockImplementation((res, status, obj) => res.json({ status, obj }));

      await MedicineController.createMedicineStock(req, res);

      expect(getRequestData).toHaveBeenCalledWith(req);
      expect(PharmacyMedicines.save).toHaveBeenCalledWith({
        medicineId: 1,
        pharmacyId: 1,
        price: 100,
        stock: 50,
        publicStock: 30,
      });
      expect(responseJson).toHaveBeenCalledWith(res, 201, {
        status: "success",
        stock: stockData,
      });
    });
  });

  describe("updateMedicineStock", () => {
    it("should update medicine stock", async () => {
      const stockData = {
        stockId: 1,
        medicineId: 1,
        pharmacyId: 1,
        price: 120,
        stock: 60,
        publicStock: 40,
      };
      req.body = JSON.stringify(stockData);
      getRequestData.mockResolvedValue(JSON.stringify(stockData));
      PharmacyMedicines.update.mockResolvedValue([stockData]);
      responseJson.mockImplementation((res, status, obj) => res.json({ status, obj }));

      await MedicineController.updateMedicineStock(req, res);

      expect(PharmacyMedicines.update).toHaveBeenCalledWith({
        id: 1,
        medicineId: 1,
        pharmacyId: 1,
        price: 120,
        stock: 60,
        publicStock: 40,
      });
      expect(responseJson).toHaveBeenCalledWith(res, 201, {
        status: "success",
        stock: stockData,
      });
    });
  });

  describe("deleteMedicineStock", () => {
    it("should delete medicine stock", async () => {
      req.stockId = 1;
      req.pharmacyId = 1;
      PharmacyMedicines.deleteById.mockResolvedValue(true);
      responseJson.mockImplementation((res, status, obj) => res.json({ status, obj }));

      await MedicineController.deleteMedicineStock(req, res);

      expect(PharmacyMedicines.deleteById).toHaveBeenCalledWith(1);
      expect(responseJson).toHaveBeenCalledWith(res, 204, {
        status: "success",
        stock: "item deleted successfully",
      });
    });
  });

});
