// ************************************
// MOCK MODELS BEFORE IMPORTING ANYTHING
// ************************************

jest.mock("../../../../models/PharmacyModel", () => ({
  getById: jest.fn(),
}));

jest.mock("../../../../models/UserModel", () => ({
  getById: jest.fn(),
}));

jest.mock("../../../../common/view", () => jest.fn((file, data) => `VIEW:${file}`));

jest.mock("../../../../common/response", () => ({
  response: jest.fn(),
  responseJson: jest.fn(),
}));

// Disable console logs
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

// ************************************
// IMPORT AFTER MOCKS
// ************************************

const Controller = require("../../../../controllers/pharmacy/pharmacy.controller");
const Pharmacies = require("../../../../models/PharmacyModel");
const Users = require("../../../../models/UserModel");
const view = require("../../../../common/view");
const { response, responseJson } = require("../../../../common/response");

// Create fake response object
function mockRes() {
  return {
    status: null,
    body: null,
    data: null,
  };
}

// ------------------------
// TEST renderPharmacy()
// ------------------------

describe("renderPharmacy", () => {
  test("should render pharmacy page successfully", async () => {
    const req = {};
    const res = mockRes();

    await Controller.renderPharmacy(req, res);

    expect(response).toHaveBeenCalledWith(res, "VIEW:pharmacy", 200);
  });

  test("should return 404 on error", async () => {
    const req = {};
    const res = mockRes();

    view.mockImplementationOnce(() => {
      throw new Error("view error");
    });

    await Controller.renderPharmacy(req, res);

    expect(response).toHaveBeenCalledWith(res, "VIEW:404", 404);
  });
});

// ----------------------------------------
// TEST renderPharmacyRegister()
// ----------------------------------------

describe("renderPharmacyRegister", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should return 302 if customerId missing", async () => {
    const req = {};
    const res = mockRes();

    await Controller.renderPharmacyRegister(req, res);

    expect(responseJson).toHaveBeenCalledWith(res, 302, { status: "error" });
  });

  test("should render registration page", async () => {
    const req = { customerId: 5 };
    const res = mockRes();

    Users.getById.mockResolvedValue([{ id: 5, name: "John" }]);

    await Controller.renderPharmacyRegister(req, res);

    expect(response).toHaveBeenCalled();
    expect(view).toHaveBeenCalledWith("customer/pharmacy.register", expect.any(Object));
  });

  test("should return 400 on DB error", async () => {
    const req = { customerId: 5 };
    const res = mockRes();

    Users.getById.mockRejectedValue(new Error("DB Error"));

    await Controller.renderPharmacyRegister(req, res);

    expect(response).toHaveBeenCalledWith(200, "VIEW:404", 400);
  });
});

// ----------------------------------------
// TEST renderPharmacyProfile()
// ----------------------------------------

describe("renderPharmacyProfile", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should return error text if staff not found", async () => {
    const req = { pharmacistId: 10, pharmacyId: 5 };
    const res = mockRes();

    Users.getById.mockResolvedValue([]);
    Pharmacies.getById.mockResolvedValue([]);

    const result = await Controller.renderPharmacyProfile(req, res);

    expect(result).toBe("404 : No Staff Member");
  });

  test("should render pharmacy profile", async () => {
    const req = { pharmacistId: 10, pharmacyId: 5 };
    const res = mockRes();

    Users.getById.mockResolvedValue([{ id: 10, firstName: "John", lastName: "Doe" }]);
    Pharmacies.getById.mockResolvedValue([{ id: 5, name: "Lanka Pharmacy" }]);

    await Controller.renderPharmacyProfile(req, res);

    expect(response).toHaveBeenCalled();
    expect(view).toHaveBeenCalledWith(
      "pharmacy/pharmacy.profile",
      expect.any(Object)
    );
  });

  test("should return 404 on error", async () => {
    const req = { pharmacistId: 1, pharmacyId: 2 };
    const res = mockRes();

    Users.getById.mockRejectedValue(new Error("DB Error"));

    await Controller.renderPharmacyProfile(req, res);

    expect(response).toHaveBeenCalledWith(res, "VIEW:404", 404);
  });
});

// ----------------------------------------
// TEST renderPharmacyDashboard()
// ----------------------------------------

describe("renderPharmacyDashboard", () => {
  test("should render dashboard", async () => {
    const req = {};
    const res = mockRes();

    await Controller.renderPharmacyDashboard(req, res);

    expect(response).toHaveBeenCalledWith(res, expect.any(String), 200);
  });
});
