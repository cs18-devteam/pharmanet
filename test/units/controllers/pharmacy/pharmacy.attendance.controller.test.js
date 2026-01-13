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

// ---------------------------------------
// IMPORT AFTER MOCKS
// ---------------------------------------
const view = require("../../../../common/view");
const { response } = require("../../../../common/response");
const Users = require("../../../../models/UserModel");
const Controller = require("../../../../controllers/pharmacy/pharmacy.attendance.controller");

// Silence console.log
beforeAll(() => {
  jest.spyOn(global.console, "log").mockImplementation(() => {});
});

describe("Pharmacy Attendance Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderAttendance → should return HTML successfully", async () => {
    // Mock user data
    const staffData = { id: 1, firstName: "John", lastName: "Doe", role: "pharmacist" };
    Users.getById.mockResolvedValue([staffData]);

    // Mock view rendering
    view.mockImplementation((template, data) => `${template}_HTML`);

    const req = { pharmacistId: 1 };
    const res = {};

    const result = await Controller.renderAttendance(req, res);

    // Check Users.getById called correctly
    expect(Users.getById).toHaveBeenCalledWith(1);

    // Check view calls
    expect(view).toHaveBeenCalledWith('component.header', { name: "Antibiotics" });
    expect(view).toHaveBeenCalledWith('navbar.staff', {
      header: `${'component.header'}_HTML`,
      ...staffData,
      name: `${staffData.firstName} ${staffData.lastName}`
    });
    expect(view).toHaveBeenCalledWith('pharmacy/attendance', {
      navbar: `${'navbar.staff'}_HTML`
    });

    // Check response called correctly
    expect(response).toHaveBeenCalledWith(res, 'pharmacy/attendance_HTML', 200);

    // The function returns whatever response returns
    expect(result).toBeUndefined(); // Since response() usually doesn't return anything
  });

  test("renderAttendance → should return 404 view if Users.getById fails", async () => {
    Users.getById.mockRejectedValue(new Error("DB Failed"));
    view.mockReturnValue("404_VIEW");

    const req = { pharmacistId: 1 };
    const res = {};

    await Controller.renderAttendance(req, res);

    expect(response).toHaveBeenCalledWith(res, "404_VIEW", 200);
  });

  test("renderAttendance → should return 404 view if view fails", async () => {
    const staffData = { id: 1, firstName: "John", lastName: "Doe", role: "pharmacist" };
    Users.getById.mockResolvedValue([staffData]);

    view.mockImplementationOnce(() => { throw new Error("View Failed"); });
    view.mockImplementationOnce(() => "404_VIEW"); // fallback for error handling

    const req = { pharmacistId: 1 };
    const res = {};

    await Controller.renderAttendance(req, res);

    expect(response).toHaveBeenCalledWith(res, "404_VIEW", 200);
  });

});
