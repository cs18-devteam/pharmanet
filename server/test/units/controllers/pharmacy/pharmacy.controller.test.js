
// D:\pharmanet\pharmanet\server\test\units\controllers\pharmacy\pharmacy.controller.test.js

const PharmacyController = require("../../../../controllers/pharmacy/pharmacy.controller");
const Users = require("../../../../models/UserModel");
const Pharmacies = require("../../../../models/PharmacyModel");
const view = require("../../../../common/view");
const { response, responseJson } = require("../../../../common/response");

jest.mock("../../../../models/UserModel");
jest.mock("../../../../models/PharmacyModel");
jest.mock("../../../../common/view");
jest.mock("../../../../common/response");

describe("Pharmacy Controller Unit Tests", () => {
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

  describe("renderPharmacy", () => {
    it("should call view and response with 200", async () => {
      view.mockReturnValue("<pharmacy-view>");
      response.mockImplementation((res, html, status) => res.send({ html, status }));

      await PharmacyController.renderPharmacy(req, res);

      expect(view).toHaveBeenCalledWith("pharmacy");
      expect(response).toHaveBeenCalledWith(res, "<pharmacy-view>", 200);
    });
  });

  describe("renderPharmacyRegister", () => {
    it("should return 302 if no customerId", async () => {
      req.customerId = null;
      responseJson.mockImplementation((res, status, obj) => res.json({ status, obj }));

      await PharmacyController.renderPharmacyRegister(req, res);

      expect(responseJson).toHaveBeenCalledWith(res, 302, { status: "error" });
    });

    it("should return pharmacy register view if customer exists", async () => {
      req.customerId = 1;
      const customer = [{ id: 1, firstName: "John", lastName: "Doe" }];
      Users.getById.mockResolvedValue(customer);
      view.mockReturnValue("<register-view>");
      response.mockImplementation((res, html, status) => res.send({ html, status }));

      await PharmacyController.renderPharmacyRegister(req, res);

      expect(Users.getById).toHaveBeenCalledWith(1);
      expect(response).toHaveBeenCalledWith(res, "<register-view>", 200);
    });
  });

  describe("renderPharmacyProfile", () => {
    it("should return error if staff not found", async () => {
      req.pharmacistId = 1;
      req.pharmacyId = 2;
      Users.getById.mockResolvedValue([]);
      Pharmacies.getById.mockResolvedValue([{ id: 2 }]);

      const result = await PharmacyController.renderPharmacyProfile(req, res);

      expect(result).toBe("404 : No Staff Member");
    });

    it("should return pharmacy profile view if staff exists", async () => {
      req.pharmacistId = 1;
      req.pharmacyId = 2;
      const staff = { id: 1, firstName: "John", lastName: "Doe" };
      const pharmacy = { id: 2, name: "Lanka Pharmacy" };
      Users.getById.mockResolvedValue([staff]);
      Pharmacies.getById.mockResolvedValue([pharmacy]);
      view.mockReturnValue("<profile-view>");
      response.mockImplementation((res, html) => res.send({ html }));

      await PharmacyController.renderPharmacyProfile(req, res);

      expect(response).toHaveBeenCalledWith(res, "<profile-view>");
    });
  });

  describe("renderPharmacyDashboard", () => {
    it("should return dashboard view with header", async () => {
      view.mockReturnValue("<dashboard-view>");
      response.mockImplementation((res, html, status) => res.send({ html, status }));

      await PharmacyController.renderPharmacyDashboard(req, res);

      expect(view).toHaveBeenCalledWith("pharmacy/pharmacy.dashboard", {
        header: view("component.header", { name: "Pharmacy Dashboard" }),
      });
      expect(response).toHaveBeenCalledWith(res, "<dashboard-view>", 200);
    });
  });
});
