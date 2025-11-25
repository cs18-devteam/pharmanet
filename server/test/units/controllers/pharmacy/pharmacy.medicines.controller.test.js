// D:\pharmanet\pharmanet\server\test\units\controllers\pharmacy\pharmacy.medicines.controller.test.js

const MedicineController = require("../../../../controllers/pharmacy/pharmacy.medicines.controller");
const PharmacyMedicines = require("../../../../models/PharmacyMedicinesModel");
const { getRequestData } = require("../../../../common/getRequestData");
const view = require("../../../../common/view");
const { response } = require("../../../../common/response");

jest.mock("../../../../models/PharmacyMedicinesModel");
jest.mock("../../../../common/getRequestData");
jest.mock("../../../../common/view");
jest.mock("../../../../common/response");

describe("Pharmacy Medicines Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getAllMedicines", () => {
    it("should call PharmacyMedicines.query and return response", async () => {
      const mockData = [{ id: 1, name: "Paracetamol" }];
      PharmacyMedicines.query.mockResolvedValue(mockData);
      view.mockReturnValue("<404-view>");
      response.mockImplementation((res, html, status) => res.send({ html, status }));

      await MedicineController.getAllMedicines(req, res);

      expect(PharmacyMedicines.query).toHaveBeenCalled();
      expect(view).toHaveBeenCalledWith("404");
      expect(response).toHaveBeenCalledWith(res, "<404-view>", 404);
    });

    it("should handle errors and return 404", async () => {
      PharmacyMedicines.query.mockRejectedValue(new Error("DB Error"));
      view.mockReturnValue("<404-view>");
      response.mockImplementation((res, html, status) => res.send({ html, status }));

      await MedicineController.getAllMedicines(req, res);

      expect(PharmacyMedicines.query).toHaveBeenCalled();
      expect(view).toHaveBeenCalledWith("404");
      expect(response).toHaveBeenCalledWith(res, "<404-view>", 404);
    });
  });
});
