// ************************************
// MOCKS
// ************************************
jest.mock("../../../../common/view", () => jest.fn());
jest.mock("../../../../common/response", () => ({
  response: jest.fn()
}));
jest.mock("../../../../models/UserModel", () => ({
  getById: jest.fn()
}));

// ************************************
// IMPORT AFTER MOCKS
// ************************************
const view = require("../../../../common/view");
const { response } = require("../../../../common/response");
const Users = require("../../../../models/UserModel");
const Controller = require("../../../../controllers/pharmacy/pharmacy.staff.controller");

// Silence console.log
beforeAll(() => {
  jest.spyOn(global.console, "log").mockImplementation(() => {});
});


describe("Pharmacy Staff Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderPharmacyStaff → should return HTML successfully", async () => {
    view.mockReturnValue("HTML_OUTPUT");

    const output = await Controller.renderPharmacyStaff({}, {});

    expect(view).toHaveBeenCalled();
    expect(output).toBe("HTML_OUTPUT");
  });

  test("renderPharmacyStaff → should return 404 on exception", async () => {
    view.mockImplementationOnce(() => { throw new Error("View failed"); });
    view.mockImplementationOnce(() => "404_VIEW");

    const req = {};
    const res = {};

    await Controller.renderPharmacyStaff(req, res);

    expect(response).toHaveBeenCalledWith(res, "404_VIEW", 404);
  });

  test("renderPharmacyStaffProfile → should return profile HTML", async () => {
    const userData = { id: 1, name: "Chathura" };
    Users.getById.mockResolvedValue([userData]);
    view.mockReturnValue("PROFILE_HTML");

    const req = { staffId: 1 };
    const res = {};

    const result = await Controller.renderPharmacyStaffProfile(req, res);

    expect(Users.getById).toHaveBeenCalledWith(1);
    expect(view).toHaveBeenCalledWith("pharmacy.staff.profile", userData);
    expect(result).toBe("PROFILE_HTML");
  });

  test("renderPharmacyStaffProfile → should throw if Users.getById fails", async () => {
    Users.getById.mockRejectedValue(new Error("DB Failed"));
    const req = { staffId: 1 };
    const res = {};

    await expect(Controller.renderPharmacyStaffProfile(req, res)).rejects.toThrow("DB Failed");
  });

  test("renderPharmacyStaffProfile → should throw if view fails", async () => {
    const fakeStaff = { id: 1, firstName: "John", lastName: "Doe", role: "pharmacist" };
    Users.getById.mockResolvedValue([fakeStaff]);
    view.mockImplementation(() => { throw new Error("View Failed"); });

    const req = { staffId: 1 };
    const res = {};

    await expect(Controller.renderPharmacyStaffProfile(req, res)).rejects.toThrow("View Failed");
  });

});
