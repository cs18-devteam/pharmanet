// ************************************
// MOCKS
// ************************************
jest.mock("../../../../common/view", () => jest.fn());
jest.mock("../../../../common/response", () => ({
  response: jest.fn()
}));

// ************************************
// IMPORT AFTER MOCKS
// ************************************
const view = require("../../../../common/view");
const { response } = require("../../../../common/response");
const Controller = require("../../../../controllers/pharmacy/pharmacy.staff.leave.profile.controller");

// Silence console.log
beforeAll(() => {
  jest.spyOn(global.console, "log").mockImplementation(() => {});
});

describe("Pharmacy Staff Leave profile Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderPharmacyStaffLeaveProfile → should return HTML successfully", async () => {


    view
      .mockImplementationOnce(() => "HEADER_HTML")          
      .mockImplementationOnce(() => "LEAVE_PAGE_HTML");     

    const req = {};
    const res = {};

    const result = await Controller.renderPharmacyStaffLeaveProfile(req, res);

    expect(view).toHaveBeenCalledWith("component.header", { name: "Antibiotics" });
    expect(view).toHaveBeenCalledWith("pharmacy.staff.leave.profile", {
      header: "HEADER_HTML"
    });

    expect(response).toHaveBeenCalledWith(res, "LEAVE_PAGE_HTML", 200);
    expect(result).toBeUndefined();
  });

  test("renderPharmacyStaffLeaveProfile → should return 404 view if main view fails", async () => {
    
    view
      .mockImplementationOnce(() => { throw new Error("View Failed"); })
      .mockImplementationOnce(() => "404_VIEW"); 

    const req = {};
    const res = {};

    await Controller.renderPharmacyStaffLeaveProfile(req, res);

    expect(response).toHaveBeenCalledWith(res, "404_VIEW", 404);
  });

  test("renderPharmacyStaffLeaveProfile → should return 404 view if header view fails", async () => {
    
    view
      .mockImplementationOnce(() => { throw new Error("Header Failed"); })
      .mockImplementationOnce(() => "404_VIEW"); 

    const req = {};
    const res = {};

    await Controller.renderPharmacyStaffLeaveProfile(req, res);

    expect(response).toHaveBeenCalledWith(res, "404_VIEW", 404);
  });

});
